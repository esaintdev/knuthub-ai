import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import DeletionRequestForm from '@/components/settings/deletion-request-form'

export default async function SettingsPage() {
    const session = await auth()

    if (!session?.user?.id) {
        redirect('/login')
    }

    const { data: existingRequest } = await supabase
        .from('deletion_requests')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('status', 'pending')
        .single()


    return (
        <div className="max-w-4xl space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Settings
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Manage your account settings
                </p>
            </div>

            <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-red-900/30">
                <CardHeader>
                    <CardTitle className="text-red-500">Danger Zone</CardTitle>
                    <CardDescription>
                        Irreversible account actions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between p-4 border border-red-900/30 rounded-lg bg-red-950/10">
                        <div>
                            <h3 className="font-medium text-white">Delete Account</h3>
                            <p className="text-sm text-gray-400 mt-1">
                                Request to permanently delete your account and all associated data.
                            </p>
                        </div>
                        <DeletionRequestForm userId={session.user.id} hasPendingRequest={!!existingRequest} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
