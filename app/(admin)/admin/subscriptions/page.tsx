import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatDate } from '@/lib/utils'

export default async function AdminSubscriptionsPage() {
    const { data: subscriptions } = await supabase
        .from('subscriptions')
        .select(`
      *,
      user:users (id, name, email),
      plan:subscription_plans (name, price, currency)
    `)
        .order('created_at', { ascending: false })

    // Calculate stats
    const activeCount = subscriptions?.filter(s => s.status === 'active').length || 0
    const totalRevenue = subscriptions
        ?.filter(s => s.status === 'active')
        .reduce((sum, s) => sum + (s.plan?.price || 0), 0) || 0

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Subscription Management
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Manage all subscriptions and billing
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Active Subscriptions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{activeCount}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Monthly Revenue
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{formatCurrency(totalRevenue, 'GBP')}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Total Subscriptions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{subscriptions?.length || 0}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Subscriptions Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Subscriptions</CardTitle>
                    <CardDescription>View and manage subscription details</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-800">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">User</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Plan</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Period</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscriptions?.map((sub: any) => (
                                    <tr key={sub.id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <td className="py-3 px-4">
                                            <p className="font-medium text-gray-900 dark:text-white">{sub.user?.name || 'No name'}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{sub.user?.email}</p>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">{sub.plan?.name}</td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${sub.status === 'active'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                    : sub.status === 'cancelled'
                                                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                }`}>
                                                {sub.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                                            {formatDate(sub.current_period_start)} - {formatDate(sub.current_period_end)}
                                        </td>
                                        <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                                            {formatCurrency(sub.plan?.price || 0, sub.plan?.currency || 'GBP')}
                                        </td>
                                        <td className="py-3 px-4">
                                            <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
                                                Manage
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
