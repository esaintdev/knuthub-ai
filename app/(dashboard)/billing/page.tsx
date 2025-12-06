import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatDate } from '@/lib/utils'
import { getCurrentUsage } from '@/lib/usage'
import UpgradeButton from '@/components/billing/upgrade-button'

export default async function BillingPage({
    searchParams
}: {
    searchParams: Promise<{ success?: string; error?: string }>
}) {
    const { success, error } = await searchParams
    const session = await auth()

    if (!session?.user?.id) {
        redirect('/login')
    }

    const [{ data: subscription }, usage, { data: plans }] = await Promise.all([
        supabase
            .from('subscriptions')
            .select('*, plan:subscription_plans(*)')
            .eq('user_id', session.user.id)
            .single(),
        getCurrentUsage(session.user.id),
        supabase
            .from('subscription_plans')
            .select('*')
            .order('price', { ascending: true })
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

                {success && (
                    <div className="mt-4 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400">
                        Payment successful! Your subscription has been updated.
                    </div>
                )}
                {error && (
                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
                        {error === 'PaymentFailed' ? 'Payment was not successful. Please try again.' : 'An error occurred during subscription update.'}
                    </div>
                )}
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
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <span className="text-green-600 mt-0.5">✓</span>
                                    {plan?.generation_limit === -1
                                        ? 'Unlimited'
                                        : plan?.generation_limit} content generations/month
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <span className="text-green-600 mt-0.5">✓</span>
                                    {plan?.brand_limit === -1
                                        ? 'Unlimited'
                                        : plan?.brand_limit} brand profile{plan?.brand_limit !== 1 && 's'}
                                </li>
                                {(Array.isArray(plan?.features) ? plan.features : JSON.parse(plan?.features || '[]'))
                                    .filter((f: string) =>
                                        !f.toLowerCase().includes('content generation') &&
                                        !f.toLowerCase().includes('brand profile')
                                    )
                                    .map((feature: string, index: number) => (
                                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <span className="text-green-600 mt-0.5">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                            </ul>
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
                    <CardTitle>Usage {usage.isDayBased ? 'Today' : 'This Month'}</CardTitle>
                    <CardDescription>Track your {usage.isDayBased ? 'daily' : 'monthly'} content generation usage</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {usage.isDayBased ? 'Usage Today' : 'Usage This Month'}
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


            <div className="pt-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Available Plans
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {plans?.map((p: any) => (
                        <Card key={p.id} className={`flex flex-col ${subscription.plan_id === p.id
                            ? 'border-purple-500 bg-purple-500/10'
                            : 'bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border-gray-800/50'
                            }`}>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>{p.name}</span>
                                    {subscription.plan_id === p.id && (
                                        <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full">Current</span>
                                    )}
                                </CardTitle>
                                <CardDescription>
                                    <span className="text-2xl font-bold text-white">
                                        {formatCurrency(p.price, p.currency)}
                                    </span>
                                    <span className="text-gray-400"> / {p.interval}</span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                                <ul className="space-y-2 mb-6">
                                    <li className="flex items-center gap-2 text-sm text-gray-300">
                                        <span className="text-purple-400">✓</span>
                                        {p.generation_limit === -1
                                            ? 'Unlimited generations'
                                            : `${p.generation_limit} generations/month`
                                        }
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-gray-300">
                                        <span className="text-purple-400">✓</span>
                                        {p.brand_limit === -1
                                            ? 'Unlimited brands'
                                            : `${p.brand_limit} brand profiles`
                                        }
                                    </li>
                                    {(Array.isArray(p.features) ? p.features : JSON.parse(p.features || '[]')).slice(0, 3).map((f: string, i: number) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                            <span className="text-purple-400">✓</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-auto">
                                    <UpgradeButton
                                        planId={p.id}
                                        price={p.price}
                                        isCurrent={subscription.plan_id === p.id}
                                        isLower={p.price < (plan?.price || 0)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div >
    )
}
