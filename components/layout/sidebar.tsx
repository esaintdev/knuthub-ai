'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { FiHome, FiTag, FiZap, FiFileText, FiCreditCard, FiSettings } from 'react-icons/fi'

export const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'Brands', href: '/brands', icon: FiTag },
    { name: 'Generate', href: '/generate', icon: FiZap },
    { name: 'Content Library', href: '/content', icon: FiFileText },
    { name: 'Billing', href: '/billing', icon: FiCreditCard },
    { name: 'Settings', href: '/settings', icon: FiSettings },
]

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:border-purple-800/30 lg:bg-black/40 backdrop-blur-xl h-[calc(100vh-5rem)] sticky top-20">
            <nav className="flex-1 space-y-1 px-4 py-6">
                {navigation.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200',
                                isActive
                                    ? 'bg-gradient-to-r from-purple-600 to-orange-400 text-white shadow-lg shadow-purple-500/20'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}
