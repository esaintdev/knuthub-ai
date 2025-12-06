import { supabase } from '@/lib/supabase'
import { getCurrentMonth, getCurrentDate } from './utils'

export async function canGenerateContent(userId: string): Promise<{
    canGenerate: boolean
    reason?: string
    currentUsage: number
    limit: number
    period: string
}> {
    const currentMonth = getCurrentMonth()
    const currentDate = getCurrentDate()

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
            limit: 0,
            period: currentMonth
        }
    }

    const planName = (subscription.plan as any).name
    const isFree = planName === 'Free'
    const limit = (subscription.plan as any).generation_limit
    const period = isFree ? currentDate : currentMonth

    if (limit === -1) {
        return {
            canGenerate: true,
            currentUsage: 0,
            limit: -1,
            period
        }
    }

    // Get current usage
    const { data: usage } = await supabase
        .from('usage')
        .select('generation_count')
        .eq('user_id', userId)
        .eq('month', period)
        .single()

    const currentUsage = usage?.generation_count || 0

    if (currentUsage >= limit) {
        return {
            canGenerate: false,
            reason: `${isFree ? 'Daily' : 'Monthly'} limit reached (${limit} generations)`,
            currentUsage,
            limit,
            period
        }
    }

    return {
        canGenerate: true,
        currentUsage,
        limit,
        period
    }
}

export async function incrementUsage(userId: string, period: string): Promise<void> {
    // Check if usage record exists
    const { data: usage } = await supabase
        .from('usage')
        .select('id, generation_count')
        .eq('user_id', userId)
        .eq('month', period)
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
                month: period,
                generation_count: 1
            })
    }
}

export async function getCurrentUsage(userId: string): Promise<{
    current: number
    limit: number
    percentage: number
    isDayBased: boolean
}> {
    const currentMonth = getCurrentMonth()
    const currentDate = getCurrentDate()

    // Get subscription limit
    const { data: subscription } = await supabase
        .from('subscriptions')
        .select('plan:subscription_plans(name, generation_limit)')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single()

    const planName = (subscription?.plan as any)?.name
    const isFree = planName === 'Free'
    const period = isFree ? currentDate : currentMonth
    const limit = (subscription?.plan as any)?.generation_limit || 0

    // Get usage
    const { data: usage } = await supabase
        .from('usage')
        .select('generation_count')
        .eq('user_id', userId)
        .eq('month', period)
        .single()

    const current = usage?.generation_count || 0
    const percentage = limit === -1 ? 0 : limit === 0 ? 100 : (current / limit) * 100

    return {
        current,
        limit,
        percentage,
        isDayBased: isFree
    }
}

export async function resetMonthlyUsage(userId: string): Promise<void> {
    // This would typically be called by a scheduled job or webhook
    // For now, we manually track by month string so reset implies just not looking at old months
}
