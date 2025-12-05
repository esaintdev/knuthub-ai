'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'

export default function UserActions({ user }: { user: any }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
                View Details
            </button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="User Details"
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="font-medium text-white">{user.name || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Email Address</p>
                            <p className="font-medium text-white">{user.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">User Role</p>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mt-1 ${user.role === 'admin'
                                    ? 'bg-purple-900/30 text-purple-200 border border-purple-800'
                                    : 'bg-gray-800 text-gray-300 border border-gray-700'
                                }`}>
                                {user.role || 'user'}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Joined Date</p>
                            <p className="font-medium text-white">{formatDate(user.created_at)}</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-4">
                        <h3 className="text-sm font-medium text-gray-400 mb-3">Subscription Status</h3>
                        {user.subscriptions && user.subscriptions.length > 0 ? (
                            <div className="bg-black/40 rounded-lg p-3 border border-gray-800">
                                <p className="text-white font-medium">{user.subscriptions[0].plan?.name}</p>
                                <p className="text-sm text-gray-400 capitalize">Status: <span className="text-white">{user.subscriptions[0].status}</span></p>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 italic">No active subscription</p>
                        )}
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button variant="outline" onClick={() => setIsOpen(false)} className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                            Close
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
