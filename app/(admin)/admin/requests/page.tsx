import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import DeletionActions from '@/components/admin/deletion-actions'
import { formatDate } from '@/lib/utils'

export default async function AdminRequestsPage() {
    const { data: requests } = await supabase
        .from('deletion_requests')
        .select('*, user:users(name, email)')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Deletion Requests
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Review and approve user account deletion requests
                </p>
            </div>

            <Card className='bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50'>
                <CardHeader>
                    <CardTitle>Pending Requests</CardTitle>
                    <CardDescription>
                        {requests?.length || 0} pending request{(requests?.length || 0) !== 1 && 's'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-gray-400 border-b border-gray-800">
                                <tr>
                                    <th className="py-3 px-4">User</th>
                                    <th className="py-3 px-4">Reason</th>
                                    <th className="py-3 px-4">Requested</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {!requests?.length ? (
                                    <tr>
                                        <td colSpan={4} className="py-8 text-center text-gray-500">
                                            No pending requests
                                        </td>
                                    </tr>
                                ) : (
                                    requests.map((req: any) => (
                                        <tr key={req.id} className="hover:bg-white/5">
                                            <td className="py-3 px-4">
                                                <div className="font-medium text-white">{req.user?.name || 'Unknown'}</div>
                                                <div className="text-gray-500">{req.user?.email}</div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-300 max-w-xs truncate">
                                                {req.reason || 'No reason provided'}
                                            </td>
                                            <td className="py-3 px-4 text-gray-400">
                                                {formatDate(req.created_at)}
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <div className="flex justify-end">
                                                    <DeletionActions requestId={req.id} userId={req.user_id} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
