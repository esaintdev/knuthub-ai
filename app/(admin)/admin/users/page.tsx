import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import UserActions from '@/components/admin/user-actions'

export default async function AdminUsersPage() {
    const { data: users } = await supabase
        .from('users')
        .select(`
      *,
      subscriptions (
        status,
        plan:subscription_plans (name)
      )
    `)
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    User Management
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Manage all user accounts
                </p>
            </div>

            <Card className='bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50'>
                <CardHeader>
                    <CardTitle>All Users ({users?.length || 0})</CardTitle>
                    <CardDescription>View and manage user accounts</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-800">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">User</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Email</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Role</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Subscription</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Joined</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((user: any) => (
                                    <tr key={user.id} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                                        <td className="py-3 px-4">
                                            <p className="font-medium text-white">{user.name || 'No name'}</p>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-400">{user.email}</td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${user.role === 'admin'
                                                ? 'bg-purple-900/30 text-purple-200 border border-purple-800'
                                                : 'bg-gray-800 text-gray-300 border border-gray-700'
                                                }`}>
                                                {user.role || 'user'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            {user.subscriptions?.[0] ? (
                                                <div>
                                                    <p className="text-sm font-medium text-white">
                                                        {user.subscriptions[0].plan?.name}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        {user.subscriptions[0].status}
                                                    </p>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-400">No subscription</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-400">
                                            {formatDate(user.created_at)}
                                        </td>
                                        <td className="py-3 px-4">
                                            <UserActions user={user} />
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
