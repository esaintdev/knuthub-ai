import { supabase } from '@/lib/supabase'
import { getCurrentMonth } from './utils'

export async function canGenerateContent(userId: string): Promise<{
    canGenerate: boolean
    reason?: string
    currentUsage: number
    limit: number
}> {
    const currentMonth = getCurrentMonth()

    // Get user's subscription and plan
    const { data: subscription } = await supabase
        .from('subscriptions')
        .select(`
            *,
            plan:subscription_plans (*)
        `)
        .eq('user_id', userId)
        .eq('status', 'active')
        .single()

    if (!subscription) {
        // Allow trial users to generate content if they are still within trial period
        // But for now, require active subscription
        return {
            canGenerate: false,
            reason: 'No active subscription found',
            currentUsage: 0,
            limit: 0
        }
    }

    const limit = (subscription.plan as any).generation_limit

    if (limit === -1) {
        return {
            canGenerate: true,
            currentUsage: 0,
            limit: -1
        }
    }

    // Get current usage
    const { data: usage } = await supabase
        .from('usage')
        .select('generation_count')
        .eq('user_id', userId)
        .eq('month', currentMonth)
        .single()

    const currentUsage = usage?.generation_count || 0

    if (currentUsage >= limit) {
        return {
            canGenerate: false,
            reason: `Monthly limit reached (${limit} generations)`,
            currentUsage,
            limit
        }
    }

    return {
        canGenerate: true,
        currentUsage,
        limit
    }
}

export async function incrementUsage(userId: string): Promise<void> {
    const currentMonth = getCurrentMonth()

    // Check if usage record exists
    const { data: usage } = await supabase
        .from('usage')
        .select('id, generation_count')
        .eq('user_id', userId)
        .eq('month', currentMonth)
        .single()

    if (usage) {
        await supabase
            .from('usage')
            .update({ generation_count: usage.generation_count + 1 })
            .eq('id', usage.id)
    } else {
        await supabase
            .from('usage')
            .insert({
                user_id: userId,
                month: currentMonth,
                generation_count: 1
            })
    }
}

export async function getCurrentUsage(userId: string): Promise<{
    current: number
    limit: number
    percentage: number
}> {
    const currentMonth = getCurrentMonth()

    // Get subscription limit
    const { data: subscription } = await supabase
        .from('subscriptions')
        .select('plan:subscription_plans(generation_limit)')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single()

    const limit = (subscription?.plan as any)?.generation_limit || 0

    // Get usage
    const { data: usage } = await supabase
        .from('usage')
        .select('generation_count')
        .eq('user_id', userId)
        .eq('month', currentMonth)
        .single()

    const current = usage?.generation_count || 0
    const percentage = limit === -1 ? 0 : limit === 0 ? 100 : (current / limit) * 100

    return {
        current,
        limit,
        percentage
    }
}

export async function resetMonthlyUsage(userId: string): Promise<void> {
    // This would typically be called by a scheduled job or webhook
    // For now, we manually track by month string so reset implies just not looking at old months
}
