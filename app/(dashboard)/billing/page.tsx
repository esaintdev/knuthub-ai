import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatDate } from '@/lib/utils'
import { getCurrentUsage } from '@/lib/usage'

export default async function BillingPage() {
    const session = await auth()

    if (!session?.user?.id) {
        redirect('/login')
    }

    const [{ data: subscription }, usage] = await Promise.all([
        supabase
            .from('subscriptions')
            .select('*, plan:subscription_plans(*)')
            .eq('user_id', session.user.id)
            .single(),
        getCurrentUsage(session.user.id)
    ])

    if (!subscription) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Billing
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        No active subscription found
                    </p>
                </div>
            </div>
        )
    }

    const plan = subscription.plan as any

    return (
        <div className="max-w-4xl space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Billing & Subscription
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Manage your subscription and billing information
                </p>
            </div>

            <Card className='bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50'>
                <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>Your active subscription details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-white">
                                {plan?.name}
                            </h3>
                            <p className="text-sm text-gray-400">
                                {formatCurrency(plan?.price || 0, plan?.currency || 'GBP')} / {plan?.interval}
                            </p>
                        </div>
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${subscription.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                        </span>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Plan Features</h4>
                        <ul className="space-y-2">
                            {(Array.isArray(plan?.features) ? plan.features : JSON.parse(plan?.features || '[]')).map((feature: string, index: number) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <span className="text-green-600 mt-0.5">✓</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Current Period Start</p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {formatDate(subscription.current_period_start)}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Current Period End</p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {formatDate(subscription.current_period_end)}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className='bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50'>
                <CardHeader>
                    <CardTitle>Usage This Month</CardTitle>
                    <CardDescription>Track your content generation usage</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Content Generations
                            </span>
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                {usage.current} / {usage.limit === -1 ? '∞' : usage.limit}
                            </span>
                        </div>
                        {usage.limit !== -1 && (
                            <div className="w-full bg-gray-800 rounded-full h-3 border border-gray-700">
                                <div
                                    className="bg-gradient-to-r from-purple-600 to-orange-400 h-3 rounded-full transition-all duration-300 shadow-lg shadow-purple-500/20"
                                    style={{ width: `${Math.min(usage.percentage, 100)}%` }}
                                />
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div >
    )
}
