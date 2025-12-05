import Link from 'next/link'
import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import { FiLogOut, FiUser } from 'react-icons/fi'

export default async function Navbar() {
    const session = await auth()

    return (
        <nav className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href={session ? '/dashboard' : '/'} className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ContentAI
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {session ? (
                            <>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <FiUser />
                                    <span>{session.user?.email}</span>
                                </div>
                                <form
                                    action={async () => {
                                        'use server'
                                        await signOut({ redirectTo: '/' })
                                    }}
                                >
                                    <Button type="submit" variant="ghost" size="sm">
                                        <FiLogOut className="mr-2" />
                                        Sign Out
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost">Sign In</Button>
                                </Link>
                                <Link href="/signup">
                                    <Button>Get Started</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
