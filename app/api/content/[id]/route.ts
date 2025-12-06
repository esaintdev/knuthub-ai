import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { supabase } from '@/lib/supabase'

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { data: content, error } = await supabase
            .from('contents')
            .select('*')
            .eq('id', id)
            .eq('user_id', session.user.id)
            .single()

        if (error || !content) {
            return NextResponse.json({ error: 'Content not found' }, { status: 404 })
        }

        return NextResponse.json({ content })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const { title, content: contentText, status } = body

        // Verify ownership
        const { data: existingContent } = await supabase
            .from('contents')
            .select('id')
            .eq('id', id)
            .eq('user_id', session.user.id)
            .single()

        if (!existingContent) {
            return NextResponse.json({ error: 'Content not found' }, { status: 404 })
        }

        const { data: updatedContent, error } = await supabase
            .from('contents')
            .update({
                title,
                content: contentText,
                status
            })
            .eq('id', id)
            .select()
            .single()

        if (error || !updatedContent) {
            return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
        }

        return NextResponse.json({ content: updatedContent })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Verify ownership
        const { data: content } = await supabase
            .from('contents')
            .select('id')
            .eq('id', id)
            .eq('user_id', session.user.id)
            .single()

        if (!content) {
            return NextResponse.json({ error: 'Content not found' }, { status: 404 })
        }

        const { error } = await supabase
            .from('contents')
            .delete()
            .eq('id', id)

        if (error) {
            return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 })
        }

        return NextResponse.json({ message: 'Content deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
