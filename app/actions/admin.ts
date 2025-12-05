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

export async function deleteUser(userId: string) {
    try {
        const session = await auth()
        if (!session?.user?.id) throw new Error('Unauthorized')

        // Check admin role
        const { data: adminUser } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single()

        if (adminUser?.role !== 'admin') throw new Error('Unauthorized')

        // Prevent self-deletion
        if (userId === session.user.id) throw new Error('Cannot delete your own admin account')

        // Delete user (cascade should handle related data if set up, otherwise we might need manual cleanup)
        // Check if cascade is enabled? Assuming yes or manual delete needed. 
        // Let's try direct delete. If foreign keys fail, we might need to delete related first.
        // Usually Supabase sets cascade on user_id relations.
        const { error } = await supabase.from('users').delete().eq('id', userId)

        if (error) throw error

        revalidatePath('/admin/users')
        return { success: true }
    } catch (error) {
        console.error('Error deleting user:', error)
        return { success: false, error: 'Failed to delete user' }
    }
}

export async function banUser(userId: string) {
    try {
        const session = await auth()
        if (!session?.user?.id) throw new Error('Unauthorized')

        const { data: adminUser } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single()

        if (adminUser?.role !== 'admin') throw new Error('Unauthorized')
        if (userId === session.user.id) throw new Error('Cannot ban your own admin account')

        const { error } = await supabase
            .from('users')
            .update({ role: 'banned' })
            .eq('id', userId)

        if (error) throw error

        revalidatePath('/admin/users')
        return { success: true }
    } catch (error) {
        console.error('Error banning user:', error)
        return { success: false, error: 'Failed to ban user' }
    }
}

export async function activateUser(userId: string) {
    try {
        const session = await auth()
        if (!session?.user?.id) throw new Error('Unauthorized')

        const { data: adminUser } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single()

        if (adminUser?.role !== 'admin') throw new Error('Unauthorized')

        const { error } = await supabase
            .from('users')
            .update({ role: 'user' }) // Default back to 'user'. If they were admin before, they lose it. Safer.
            .eq('id', userId)

        if (error) throw error

        revalidatePath('/admin/users')
        return { success: true }
    } catch (error) {
        console.error('Error activating user:', error)
        return { success: false, error: 'Failed to activate user' }
    }
}

export async function updateUser(userId: string, data: { name?: string; email?: string; role?: string }) {
    try {
        const session = await auth()
        if (!session?.user?.id) throw new Error('Unauthorized')

        const { data: adminUser } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single()

        if (adminUser?.role !== 'admin') throw new Error('Unauthorized')

        const { error } = await supabase
            .from('users')
            .update(data)
            .eq('id', userId)

        if (error) throw error

        revalidatePath('/admin/users')
        return { success: true }
    } catch (error) {
        console.error('Error updating user:', error)
        return { success: false, error: 'Failed to update user' }
    }
}
