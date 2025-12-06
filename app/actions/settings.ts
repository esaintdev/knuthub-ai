'use server'

import { auth } from '@/auth'
import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function requestAccountDeletion(reason: string) {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Unauthorized')

    try {
        // Check for existing pending request
        const { data: existing } = await supabase
            .from('deletion_requests')
            .select('id')
            .eq('user_id', session.user.id)
            .eq('status', 'pending')
            .single()

        if (existing) {
            return { success: false, error: 'You already have a pending deletion request.' }
        }

        const { error } = await supabase
            .from('deletion_requests')
            .insert({
                user_id: session.user.id,
                reason: reason || null,
                status: 'pending'
            })

        if (error) {
            console.error('Deletion Request Error:', error)
            return { success: false, error: 'Failed to submit request.' }
        }

        revalidatePath('/settings')
        return { success: true }
    } catch (error) {
        console.error('Deletion Request Error:', error)
        return { success: false, error: 'Something went wrong.' }
    }
}
