import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(req.url)
        const type = searchParams.get('type')
        const brandId = searchParams.get('brandId')

        let query = supabase
            .from('contents')
            .select('*')
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: false })

        if (type) {
            query = query.eq('type', type)
        }

        if (brandId) {
            query = query.eq('brand_id', brandId)
        }

        const { data: contents, error } = await query

        if (error) {
            return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
        }

        return NextResponse.json({ contents })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
