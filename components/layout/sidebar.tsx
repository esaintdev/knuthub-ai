'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { FiHome, FiTag, FiZap, FiFileText, FiCreditCard } from 'react-icons/fi'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'Brands', href: '/brands', icon: FiTag },
    { name: 'Generate', href: '/generate', icon: FiZap },
    { name: 'Content Library', href: '/content', icon: FiFileText },
    { name: 'Billing', href: '/billing', icon: FiCreditCard },
]

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:border-gray-200 dark:lg:border-gray-800 lg:bg-white dark:lg:bg-gray-900">
            <nav className="flex-1 space-y-1 px-4 py-6">
                {navigation.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
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
