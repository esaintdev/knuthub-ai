'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { initiateSubscription } from '@/app/actions/billing'
import { FiCreditCard, FiLoader } from 'react-icons/fi'

interface UpgradeButtonProps {
    planId: string
    price: number
    isCurrent: boolean
    isLower?: boolean
}

export default function UpgradeButton({ planId, price, isCurrent, isLower }: UpgradeButtonProps) {
    const [loading, setLoading] = useState(false)

    const handleUpgrade = async () => {
        if (isCurrent || isLower) return

        setLoading(true)
        try {
            const result = await initiateSubscription(planId)

            if (result.error) {
                alert(result.error)
                setLoading(false)
                return
            }

            if (result.url) {
                window.location.href = result.url
            }
        } catch (error) {
            console.error('Upgrade error:', error)
            alert('Something went wrong')
            setLoading(false)
        }
    }

    if (isCurrent) {
        return (
            <Button disabled variant="secondary" className="w-full">
                Current Plan
            </Button>
        )
    }

    if (isLower) {
        return (
            <Button disabled variant="outline" className="w-full opacity-50 cursor-not-allowed">
                Lower Plan
            </Button>
        )
    }

    if (price === 0) {
        return (
            <Button disabled variant="outline" className="w-full">
                Free Plan
            </Button>
        )
    }

    return (
        <Button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-orange-400 hover:from-purple-500 hover:to-orange-300 text-white border-0"
        >
            {loading ? (
                <>
                    <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                </>
            ) : (
                <>
                    <FiCreditCard className="mr-2 h-4 w-4" />
                    Upgrade Now
                </>
            )}
        </Button>
    )
}
