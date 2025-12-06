'use server'

import { auth } from '@/auth'
import { supabase } from '@/lib/supabase'
import { initializePayment, verifyPayment } from '@/lib/paystack'
import { redirect } from 'next/navigation'

export async function initiateSubscription(planId: string) {
    const session = await auth()
    if (!session?.user?.id || !session.user.email) {
        throw new Error('Unauthorized')
    }

    // Get plan details
    const { data: plan } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('id', planId)
        .single()

    if (!plan) {
        throw new Error('Plan not found')
    }

    if (plan.price === 0) {
        // Handle free plan downgrade/upgrade logic if needed separately, or throw error as this is for payment
        // For now assuming this is strictly for paid plans
        return { url: null, error: 'Cannot pay for free plan' }
    }

    // Initialize Paystack transaction
    // Callback URL points to a verify page
    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/billing/verify`

    // Metadata to track plan ID and user ID
    const metadata = {
        plan_id: planId,
        user_id: session.user.id,
        custom_fields: [
            {
                display_name: "Plan Name",
                variable_name: "plan_name",
                value: plan.name
            }
        ]
    }

    try {
        const result = await initializePayment(
            session.user.email,
            plan.price, // Price is already stored in smallest currency unit (e.g. pence/kobo) ? 
            // Wait, I stored prices as GBP 1000 for £10?
            // Paystack expects kobo/pence.
            // If my DB has 1000 for £10.00, that is 1000 pence. Correct.
            // If user enters '99' in UI and I saved as 9900.
            // So plan.price is correct unit.
            callbackUrl,
            metadata
        )

        return { url: result.data.authorization_url }
    } catch (error: any) {
        return { error: error.message }
    }
}
