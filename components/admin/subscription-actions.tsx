'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate } from '@/lib/utils'
import { cancelSubscription } from '@/app/actions/admin'

export default function SubscriptionActions({ subscription }: { subscription: any }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleCancel = async () => {
        if (!confirm('Are you sure you want to cancel this subscription?')) return

        setIsLoading(true)
        const result = await cancelSubscription(subscription.id)
        setIsLoading(false)

        if (result.success) {
            setIsOpen(false)
        } else {
            alert('Failed to cancel subscription')
        }
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
                Manage
            </button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Manage Subscription"
            >
                <div className="space-y-4">
                    <div className="bg-black/40 rounded-lg p-4 border border-gray-800 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Plan</span>
                            <span className="text-white font-medium">{subscription.plan?.name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Price</span>
                            <span className="text-white font-medium">{formatCurrency(subscription.plan?.price, subscription.plan?.currency)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Status</span>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${subscription.status === 'active'
                                    ? 'bg-green-900/30 text-green-200 border border-green-800'
                                    : 'bg-red-900/30 text-red-200 border border-red-800'
                                }`}>
                                {subscription.status}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Period</span>
                            <span className="text-white text-sm">
                                {formatDate(subscription.current_period_start)} - {formatDate(subscription.current_period_end)}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-4">
                        {subscription.status === 'active' && (
                            <Button
                                variant="destructive"
                                onClick={handleCancel}
                                disabled={isLoading}
                                className="w-full bg-red-900/50 hover:bg-red-900 text-red-100 border border-red-800"
                            >
                                {isLoading ? 'Cancelling...' : 'Cancel Subscription'}
                            </Button>
                        )}

                        <Button variant="outline" onClick={() => setIsOpen(false)} className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                            Close
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
