'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from '@/auth'
import { FiMenu, FiX, FiLogOut, FiUser, FiSettings } from 'react-icons/fi'
import { cn } from '@/lib/utils'
import { navigation } from '@/components/layout/sidebar'
import { Button } from '@/components/ui/button'

interface MobileNavProps {
    user?: {
        email?: string | null
        role?: string
    }
    onSignOut: () => Promise<void>
}

export default function MobileNav({ user, onSignOut }: MobileNavProps) {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    if (pathname === '/') return null

    // Close on route change
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <>
            <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-gray-400 hover:text-white"
                onClick={() => setIsOpen(true)}
            >
                <FiMenu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
            </Button>

            {isOpen && createPortal(
                <div className="fixed inset-0 z-40 flex lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Sidebar */}
                    <div className="relative flex w-full max-w-xs flex-1 flex-col bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50 pt-24 pb-4 animate-in slide-in-from-left duration-300">
                        <div className="absolute top-0 right-0 -mr-12 pt-4">
                            <button
                                type="button"
                                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="sr-only">Close sidebar</span>
                                <FiX className="h-6 w-6 text-white" aria-hidden="true" />
                            </button>
                        </div>

                        <div className="flex flex-shrink-0 items-center px-4">
                            {/* <img
                                className="h-8 w-auto"
                                src="/icon.png"
                                alt="Knuthub AI"
                            />
                            <span className="ml-2 text-xl font-bold text-white font-manrope">Knuthub AI</span> */}
                        </div>

                        <div className="flex flex-col flex-1 py-8">
                            <div className="mt-2 flex-1 overflow-y-auto px-2">
                                <nav className="space-y-1">
                                    {navigation.map((item) => {
                                        const Icon = item.icon
                                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={cn(
                                                    'flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-all duration-200',
                                                    isActive
                                                        ? 'bg-gradient-to-r from-purple-600 to-orange-400 text-white shadow-lg shadow-purple-500/20'
                                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                                )}
                                            >
                                                <Icon className="h-6 w-6 flex-shrink-0" />
                                                {item.name}
                                            </Link>
                                        )
                                    })}

                                    {/* Admin Link Mobile */}
                                    {user?.role === 'admin' && (
                                        <Link
                                            href="/admin"
                                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-purple-400 hover:bg-white/5 hover:text-purple-300"
                                        >
                                            <FiSettings className="h-6 w-6 flex-shrink-0" />
                                            Admin Dashboard
                                        </Link>
                                    )}
                                </nav>
                            </div>

                            {/* User Section Mobile */}
                            {user && (
                                <div className="border-t border-gray-800 p-4">
                                    <div className="flex items-center gap-3 px-4 mb-4">
                                        <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                                            <FiUser className="h-4 w-4 text-purple-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate">
                                                {user.email}
                                            </p>
                                            <p className="text-xs text-gray-500 capitalize">
                                                {user.role || 'User'}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-gray-400 hover:text-white border-gray-700 hover:bg-white/5"
                                        onClick={() => onSignOut()}
                                    >
                                        <FiLogOut className="mr-3 h-5 w-5" />
                                        Sign Out
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}
