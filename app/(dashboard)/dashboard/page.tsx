import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FiPlus, FiZap } from 'react-icons/fi'
import { getCurrentUsage } from '@/lib/usage'

export default async function DashboardPage() {
    const session = await auth()

    if (!session?.user?.id) {
        redirect('/login')
    }

    // Get counts
    const [
        { count: brandCount },
        { count: contentCount },
        usage,
        { data: subscription }
    ] = await Promise.all([
        supabase.from('brands').select('*', { count: 'exact', head: true }).eq('user_id', session.user.id),
        supabase.from('contents').select('*', { count: 'exact', head: true }).eq('user_id', session.user.id),
        getCurrentUsage(session.user.id),
        supabase
            .from('subscriptions')
            .select('*, plan:subscription_plans(*)')
            .eq('user_id', session.user.id)
            .single()
    ])

    const plan = subscription?.plan as any

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Dashboard
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Welcome back! Here's your content generation overview.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Brand Profiles
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{brandCount || 0}</div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {plan?.brand_limit === -1 ? 'Unlimited' : `of ${plan?.brand_limit || 1} allowed`}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Content Generated
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{contentCount || 0}</div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Total pieces created
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Monthly Usage
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{usage.current}</div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {usage.limit === -1 ? 'Unlimited' : `of ${usage.limit} this month`}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Current Plan */}
            <Card>
                <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>Your active subscription</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {plan?.name || 'No Plan'}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {subscription?.status === 'active' ? 'Active' : 'Inactive'}
                            </p>
                        </div>
                        <Link href="/billing">
                            <Button variant="outline">Manage Subscription</Button>
                        </Link>
                    </div>

                    {usage.limit !== -1 && (
                        <div className="mt-6">
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-gray-600 dark:text-gray-400">Usage this month</span>
                                <span className="font-medium">{usage.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                                <div
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                                    style={{ width: `${Math.min(usage.percentage, 100)}%` }}
                                />
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <Link href="/brands/new">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                    <FiPlus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <CardTitle>Create Brand Profile</CardTitle>
                                    <CardDescription>Add a new business brand</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                    </Link>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <Link href="/generate">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                    <FiZap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <CardTitle>Generate Content</CardTitle>
                                    <CardDescription>Create AI-powered content</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                    </Link>
                </Card>
            </div>
        </div>
    )
}
