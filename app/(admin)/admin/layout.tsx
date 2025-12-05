import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/layout/navbar'
import AdminSidebar from '@/components/layout/admin-sidebar'
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
        <div className="min-h-screen bg-black">
            <Navbar />
            <div className="flex">
                <AdminSidebar />
                <main className="flex-1 p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
