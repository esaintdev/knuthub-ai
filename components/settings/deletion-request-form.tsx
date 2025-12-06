'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input' // or Textarea
import { requestAccountDeletion } from '@/app/actions/settings'
import { FiTrash2, FiAlertTriangle } from 'react-icons/fi'

interface DeletionRequestFormProps {
    userId: string
    hasPendingRequest: boolean
}

export default function DeletionRequestForm({ userId, hasPendingRequest }: DeletionRequestFormProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [reason, setReason] = useState('')

    const handleSubmit = async () => {
        setIsLoading(true)
        const result = await requestAccountDeletion(reason)
        setIsLoading(false)

        if (result.success) {
            setIsOpen(false)
            // Page will revalidate and show "Pending" state
        } else {
            alert(result.error)
        }
    }

    if (hasPendingRequest) {
        return (
            <Button variant="outline" disabled className="border-yellow-600/50 text-yellow-500 bg-yellow-500/10">
                Deletion Pending Review
            </Button>
        )
    }

    return (
        <>
            <Button
                variant="destructive"
                onClick={() => setIsOpen(true)}
                className="bg-red-600 hover:bg-red-700"
            >
                Request Deletion
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Request Account Deletion"
            >
                <div className="space-y-4">
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg flex gap-3 text-red-200">
                        <FiAlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                            <p className="font-semibold">Are you sure?</p>
                            <p className="mt-1 opacity-90">
                                This action cannot be undone. We will review your request and permanently delete your account and all data.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Reason (Optional)</label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Why are you leaving?"
                            className="w-full h-24 px-3 py-2 rounded-md bg-black/20 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t border-gray-800">
                        <Button
                            variant="ghost"
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            variant="destructive"
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isLoading ? 'Submitting...' : 'Submit Request'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
