'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updatePlanLimit } from '@/app/actions/plans'

interface Plan {
    id: string
    name: string
    generation_limit: number
}

export default function PlanActions({ plan }: { plan: Plan }) {
    const [isOpen, setIsOpen] = useState(false)
    const [limit, setLimit] = useState(plan.generation_limit.toString())
    const [isLoading, setIsLoading] = useState(false)

    const handleSave = async () => {
        setIsLoading(true)
        const newLimit = parseInt(limit)

        if (isNaN(newLimit)) {
            alert('Please enter a valid number')
            setIsLoading(false)
            return
        }

        const result = await updatePlanLimit(plan.id, newLimit)
        setIsLoading(false)

        if (result.success) {
            setIsOpen(false)
        } else {
            alert('Failed to update plan limit')
        }
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
                Edit Limit
            </button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={`Edit ${plan.name} Limits`}
            >
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Monthly Content Generation Limit</label>
                        <p className="text-xs text-gray-500 mb-2">Set to -1 for unlimited access</p>
                        <Input
                            type="number"
                            value={limit}
                            onChange={(e) => setLimit(e.target.value)}
                            className="bg-black/20 border-gray-700 text-white"
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            variant="ghost"
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
