'use server'

import { auth } from '@/auth'
import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function updatePlanLimit(planId: string, limit: number) {
    try {
        const session = await auth()
        if (!session?.user?.id) throw new Error('Unauthorized')

        // Verify admin
        const { data: user } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single()

        if (user?.role !== 'admin') throw new Error('Unauthorized')

        const { error } = await supabase
            .from('subscription_plans')
            .update({ generation_limit: limit })
            .eq('id', planId)

        if (error) throw error

        revalidatePath('/admin/plans')
        revalidatePath('/billing') // Update user billing page too
        return { success: true }
    } catch (error) {
        console.error('Error updating plan limit:', error)
        return { success: false, error: 'Failed to update plan limit' }
    }
}

export async function createPlan(data: {
    name: string
    price: number
    interval: string
    generation_limit: number
    brand_limit: number
    features: string[]
}) {
    try {
        const session = await auth()
        if (!session?.user?.id) throw new Error('Unauthorized')

        // Verify admin
        const { data: user } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single()

        if (user?.role !== 'admin') throw new Error('Unauthorized')

        const { error } = await supabase
            .from('subscription_plans')
            .insert({
                name: data.name,
                price: data.price,
                currency: 'GBP',
                interval: data.interval,
                generation_limit: data.generation_limit,
                brand_limit: data.brand_limit,
                features: JSON.stringify(data.features)
            })

        if (error) throw error

        revalidatePath('/admin/plans')
        revalidatePath('/billing')
        revalidatePath('/') // Landing page
        return { success: true }
    } catch (error) {
        console.error('Error creating plan:', error)
        return { success: false, error: 'Failed to create plan' }
    }
}
