'use server'

import { auth } from '@/auth'
import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function cancelSubscription(subscriptionId: string) {
    try {
        const session = await auth()

        // 1. Verify admin
        if (!session?.user?.id) throw new Error('Unauthorized')

        const { data: user } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single()

        if (user?.role !== 'admin') throw new Error('Unauthorized: Admin access required')

        // 2. Update subscription status
        const { error } = await supabase
            .from('subscriptions')
            .update({
                status: 'cancelled',
                current_period_end: new Date().toISOString() // End immediately or keep period? Usually end at period, but for admin force cancel we might want immediate or just status change.
                // Let's just set status to cancelled for now.
            })
            .eq('id', subscriptionId)

        if (error) throw error

        revalidatePath('/admin/subscriptions')
        revalidatePath('/admin/users')
        return { success: true }
    } catch (error) {
        console.error('Error cancelling subscription:', error)
        return { success: false, error: 'Failed to cancel subscription' }
    }
}
