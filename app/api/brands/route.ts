import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { supabase } from '@/lib/supabase'

export async function GET() {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { data: brands, error } = await supabase
            .from('brands')
            .select('*')
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: false })

        if (error) {
            return NextResponse.json({ error: 'Failed to fetch brands' }, { status: 500 })
        }

        return NextResponse.json({ brands })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const { name, niche, tone, targetAudience, usps, services, values } = body

        if (!name || !niche || !tone || !targetAudience || !usps || !services) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Check subscription and brand limit
        const { data: subscription } = await supabase
            .from('subscriptions')
            .select('plan:subscription_plans(brand_limit)')
            .eq('user_id', session.user.id)
            .eq('status', 'active')
            .single()

        if (!subscription) {
            return NextResponse.json(
                { error: 'No active subscription' },
                { status: 403 }
            )
        }

        const { count: brandCount } = await supabase
            .from('brands')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', session.user.id)

        const brandLimit = (subscription.plan as any)?.brand_limit || 1

        if (brandCount !== null && brandCount >= brandLimit) {
            return NextResponse.json(
                { error: `Brand limit reached. Your plan allows ${brandLimit} brand(s).` },
                { status: 403 }
            )
        }

        const { data: brand, error } = await supabase
            .from('brands')
            .insert({
                user_id: session.user.id,
                name,
                niche,
                tone,
                target_audience: targetAudience,
                usps,
                services,
                values: values || null
            })
            .select()
            .single()

        if (error || !brand) {
            return NextResponse.json({ error: 'Failed to create brand' }, { status: 500 })
        }

        return NextResponse.json({ brand }, { status: 201 })
    } catch (error) {
        console.error('Brand creation error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
