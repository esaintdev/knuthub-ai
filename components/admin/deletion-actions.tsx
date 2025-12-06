'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { approveDeletion, rejectDeletion } from '@/app/actions/admin'
import { FiCheck, FiX, FiLoader } from 'react-icons/fi'

interface DeletionActionsProps {
    requestId: string
    userId: string
}

export default function DeletionActions({ requestId, userId }: DeletionActionsProps) {
    const [status, setStatus] = useState<'idle' | 'approving' | 'rejecting'>('idle')

    const handleApprove = async () => {
        if (!confirm('Are you sure you want to permanently delete this user?')) return
        setStatus('approving')
        await approveDeletion(requestId, userId)
        setStatus('idle')
    }

    const handleReject = async () => {
        setStatus('rejecting')
        await rejectDeletion(requestId)
        setStatus('idle')
    }

    return (
        <div className="flex gap-2">
            <Button
                size="sm"
                variant="destructive"
                onClick={handleApprove}
                disabled={status !== 'idle'}
                className="bg-red-500 hover:bg-red-600 h-8 px-2"
            >
                {status === 'approving' ? <FiLoader className="animate-spin" /> : <FiCheck />}
            </Button>
            <Button
                size="sm"
                variant="outline"
                onClick={handleReject}
                disabled={status !== 'idle'}
                className="h-8 px-2"
            >
                {status === 'rejecting' ? <FiLoader className="animate-spin" /> : <FiX />}
            </Button>
        </div>
    )
}
