import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FiUsers, FiDollarSign, FiFileText, FiTrendingUp } from 'react-icons/fi'

export default async function AdminDashboard() {
    // Get statistics
    const [
        { count: totalUsers },
        { count: activeSubscriptions },
        { count: totalContent },
        { data: recentUsers }
    ] = await Promise.all([
        supabase.from('users').select('*', { count: 'exact', head: true }),
        supabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('contents').select('*', { count: 'exact', head: true }),
        supabase.from('users').select('id, email, name, created_at').order('created_at', { ascending: false }).limit(5)
    ])

    // Calculate revenue (mock calculation)
    const monthlyRevenue = (activeSubscriptions || 0) * 29 // Average plan price

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Admin Dashboard
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Platform overview and statistics
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className='bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50 hover:shadow-lg transition-shadow'>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">
                            Total Users
                        </CardTitle>
                        <FiUsers className="h-5 w-5 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">{totalUsers || 0}</div>
                        <p className="text-xs text-gray-400 mt-1">
                            Registered accounts
                        </p>
                    </CardContent>
                </Card>

                <Card className='bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50 hover:shadow-lg transition-shadow'>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">
                            Active Subscriptions
                        </CardTitle>
                        <FiTrendingUp className="h-5 w-5 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">{activeSubscriptions || 0}</div>
                        <p className="text-xs text-gray-400 mt-1">
                            Paying customers
                        </p>
                    </CardContent>
                </Card>

                <Card className='bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50 hover:shadow-lg transition-shadow'>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">
                            Monthly Revenue
                        </CardTitle>
                        <FiDollarSign className="h-5 w-5 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">£{monthlyRevenue}</div>
                        <p className="text-xs text-gray-400 mt-1">
                            Estimated MRR
                        </p>
                    </CardContent>
                </Card>

                <Card className='bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50 hover:shadow-lg transition-shadow'>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">
                            Content Generated
                        </CardTitle>
                        <FiFileText className="h-5 w-5 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">{totalContent || 0}</div>
                        <p className="text-xs text-gray-400 mt-1">
                            Total pieces
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Users */}
            <Card className='bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50'>
                <CardHeader>
                    <CardTitle>Recent Users</CardTitle>
                    <CardDescription>Latest user registrations</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentUsers?.map((user: any) => (
                            <div key={user.id} className="flex items-center justify-between border-b border-gray-800 pb-3 last:border-0">
                                <div>
                                    <p className="font-medium text-white">{user.name || 'No name'}</p>
                                    <p className="text-sm text-gray-400">{user.email}</p>
                                </div>
                                <p className="text-sm text-gray-400">
                                    {new Date(user.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className='bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50'>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <a href="/admin/users" className="block p-3 rounded-lg border border-gray-800 hover:bg-gray-800 hover:border-purple-500/50 transition-all group">
                            <p className="font-medium text-white group-hover:text-purple-300">Manage Users</p>
                            <p className="text-sm text-gray-400">View and edit user accounts</p>
                        </a>
                        <a href="/admin/subscriptions" className="block p-3 rounded-lg border border-gray-800 hover:bg-gray-800 hover:border-purple-500/50 transition-all group">
                            <p className="font-medium text-white group-hover:text-purple-300">Manage Subscriptions</p>
                            <p className="text-sm text-gray-400">Handle billing and plans</p>
                        </a>
                        <a href="/admin/content" className="block p-3 rounded-lg border border-gray-800 hover:bg-gray-800 hover:border-purple-500/50 transition-all group">
                            <p className="font-medium text-white group-hover:text-purple-300">Content Moderation</p>
                            <p className="text-sm text-gray-400">Review generated content</p>
                        </a>
                    </CardContent>
                </Card>

                <Card className='bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50'>
                    <CardHeader>
                        <CardTitle>System Health</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Database</span>
                            <span className="inline-flex items-center rounded-full bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-200 border border-green-800">
                                Healthy
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">AI Service</span>
                            <span className="inline-flex items-center rounded-full bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-200 border border-green-800">
                                Operational
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Payment Gateway</span>
                            <span className="inline-flex items-center rounded-full bg-yellow-900/30 px-2.5 py-0.5 text-xs font-medium text-yellow-200 border border-yellow-800">
                                Not Configured
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
