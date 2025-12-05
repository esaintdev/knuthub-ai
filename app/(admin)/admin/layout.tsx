import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session?.user?.id) {
        redirect('/login')
    }

    // Check if user is admin
    const { data: user } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single()

    if (user?.role !== 'admin') {
        redirect('/dashboard')
    }

    return (
        <div className="min-h-screen bg-transparent">
            <nav className="sticky top-0 z-50 border-b border-purple-800/30 bg-black/70 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-8">
                            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-orange-300 bg-clip-text text-transparent font-manrope">
                                Admin Panel
                            </h1>
                            <nav className="flex gap-6">
                                <a href="/admin" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                    Dashboard
                                </a>
                                <a href="/admin/users" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                    Users
                                </a>
                                <a href="/admin/subscriptions" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                    Subscriptions
                                </a>
                                <a href="/admin/content" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                    Content
                                </a>
                                <a href="/admin/settings" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                    Settings
                                </a>
                            </nav>
                        </div>
                        <a href="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Back to App →
                        </a>
                    </div>
                </div>
            </nav>
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    )
}
