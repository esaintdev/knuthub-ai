import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { supabase } from '@/lib/supabase'

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { data: brand, error } = await supabase
            .from('brands')
            .select('*')
            .eq('id', params.id)
            .eq('user_id', session.user.id)
            .single()

        if (error || !brand) {
            return NextResponse.json({ error: 'Brand not found' }, { status: 404 })
        }

        return NextResponse.json({ brand })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const { name, niche, tone, targetAudience, usps, services, values } = body

        // Verify ownership
        const { data: existingBrand } = await supabase
            .from('brands')
            .select('id')
            .eq('id', params.id)
            .eq('user_id', session.user.id)
            .single()

        if (!existingBrand) {
            return NextResponse.json({ error: 'Brand not found' }, { status: 404 })
        }

        const { data: brand, error } = await supabase
            .from('brands')
            .update({
                name,
                niche,
                tone,
                target_audience: targetAudience,
                usps,
                services,
                values
            })
            .eq('id', params.id)
            .select()
            .single()

        if (error || !brand) {
            return NextResponse.json({ error: 'Failed to update brand' }, { status: 500 })
        }

        return NextResponse.json({ brand })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Verify ownership
        const { data: brand } = await supabase
            .from('brands')
            .select('id')
            .eq('id', params.id)
            .eq('user_id', session.user.id)
            .single()

        if (!brand) {
            return NextResponse.json({ error: 'Brand not found' }, { status: 404 })
        }

        const { error } = await supabase
            .from('brands')
            .delete()
            .eq('id', params.id)

        if (error) {
            return NextResponse.json({ error: 'Failed to delete brand' }, { status: 500 })
        }

        return NextResponse.json({ message: 'Brand deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
