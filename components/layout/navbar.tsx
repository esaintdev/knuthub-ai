import Link from 'next/link'
import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import { FiLogOut, FiUser } from 'react-icons/fi'

export default async function Navbar() {
    const session = await auth()

    return (
        <nav className="sticky top-0 z-50 border-b border-purple-800/30 bg-black/70 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex items-center">
                        <Link href={session ? '/dashboard' : '/'} className="flex items-center gap-2">
                            <img src="/icon.png" alt="Knuthub AI" className="h-8 w-8" />
                            <span className="text-2xl font-bold text-white font-manrope">
                                Knuthub AI
                            </span>
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
                                    <Button className='bg-gradient-to-r from-purple-500 to-orange-300'>Get Started</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
