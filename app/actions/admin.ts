'use server'

import { auth } from '@/auth'
import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

async function checkAdmin() {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Unauthorized')

    const { data: user } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single()

    if (user?.role !== 'admin') throw new Error('Unauthorized')
    return true
}

export async function approveDeletion(requestId: string, userId: string) {
    try {
        await checkAdmin()

        // 1. Delete user from 'users' table (Cascade should handle subscriptions, generations, etc.)
        // Note: This does NOT delete from auth.users (Supabase Auth). 
        // In a real app, you'd use the Supabase Admin API (service role) to delete from auth.users.
        // For this task scope, deleting from public.users is the main "App Logic".

        // HOWEVER, if I delete the user row, the 'deletion_requests' row might be deleted too due to CASCADE?
        // My SQL said: user_id UUID REFERENCES users(id) ON DELETE CASCADE
        // So yes, approving it deletes the request record too.
        // That effectively "closes" it.

        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', userId)

        if (error) {
            console.error('Delete User Error:', error)
            return { success: false, error: 'Failed to delete user' }
        }

        revalidatePath('/admin/requests')
        return { success: true }
    } catch (error) {
        console.error('Approve Error:', error)
        return { success: false, error: 'Failed to approve deletion' }
    }
}

export async function rejectDeletion(requestId: string) {
    try {
        await checkAdmin()

        const { error } = await supabase
            .from('deletion_requests')
            .update({ status: 'rejected' })
            .eq('id', requestId)

        if (error) throw error

        revalidatePath('/admin/requests')
        return { success: true }
    } catch (error) {
        console.error('Reject Error:', error)
        return { success: false, error: 'Failed to reject deletion' }
    }
}

export async function deleteUser(userId: string) {
    try {
        await checkAdmin()

        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', userId)

        if (error) throw error

        revalidatePath('/admin/users')
        return { success: true }
    } catch (error) {
        console.error('Delete Error:', error)
        return { success: false, error: 'Failed' }
    }
}

export async function banUser(userId: string) {
    try {
        await checkAdmin()

        const { error } = await supabase
            .from('users')
            .update({ role: 'banned' })
            .eq('id', userId)

        if (error) throw error

        revalidatePath('/admin/users')
        return { success: true }
    } catch (error) {
        console.error('Ban Error:', error)
        return { success: false, error: 'Failed' }
    }
}

export async function activateUser(userId: string) {
    try {
        await checkAdmin()

        const { error } = await supabase
            .from('users')
            .update({ role: 'user' }) // Default to user
            .eq('id', userId)

        if (error) throw error

        revalidatePath('/admin/users')
        return { success: true }
    } catch (error) {
        console.error('Activate Error:', error)
        return { success: false, error: 'Failed' }
    }
}

export async function updateUser(userId: string, data: { name: string, email: string, role: string }) {
    try {
        await checkAdmin()

        const { error } = await supabase
            .from('users')
            .update(data)
            .eq('id', userId)

        if (error) throw error

        revalidatePath('/admin/users')
        return { success: true }
    } catch (error) {
        console.error('Update Error:', error)
        return { success: false, error: 'Failed' }
    }
}

export async function cancelSubscription(subscriptionId: string) {
    try {
        await checkAdmin()

        const { error } = await supabase
            .from('subscriptions')
            .update({ status: 'cancelled' })
            .eq('id', subscriptionId)

        if (error) throw error

        revalidatePath('/admin/subscriptions')
        return { success: true }
    } catch (error) {
        console.error('Cancel Subscription Error:', error)
        return { success: false, error: 'Failed' }
    }
}
