import { redirect } from 'next/navigation'
import { verifyPayment } from '@/lib/paystack'
import { supabase } from '@/lib/supabase'

export default async function VerifyPaymentPage({
    searchParams,
}: {
    searchParams: Promise<{ reference: string }>
}) {
    const { reference } = await searchParams

    if (!reference) {
        return redirect('/billing?error=MissingReference')
    }

    let redirectPath = '/billing?error=VerificationFailed'

    try {
        const verification = await verifyPayment(reference)

        if (verification.status && verification.data.status === 'success') {
            const metadata = verification.data.metadata
            const userId = metadata.user_id
            const planId = metadata.plan_id

            // Calculate end date (assume monthly for now based on Plan)
            const endDate = new Date()
            endDate.setMonth(endDate.getMonth() + 1)

            // Upsert subscription (update existing or create new)
            // This handles the unique_user_id constraint by updating if it exists
            const { error } = await supabase
                .from('subscriptions')
                .upsert({
                    user_id: userId,
                    plan_id: planId,
                    status: 'active',
                    current_period_start: new Date().toISOString(),
                    current_period_end: endDate.toISOString(),
                    paystack_subscription_code: verification.data.id
                }, { onConflict: 'user_id' })

            if (error) {
                console.error('DB Update Error:', error)
                redirectPath = '/billing?error=DatabaseError'
            } else {
                redirectPath = '/billing?success=PaymentSuccessful'
            }
        } else {
            redirectPath = '/billing?error=PaymentFailed'
        }
    } catch (error) {
        console.error('Verification Error:', error)
        // Keep default failure path
    }

    redirect(redirectPath)
}
