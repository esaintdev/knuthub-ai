'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createPlan } from '@/app/actions/plans'
import { FiPlus, FiX } from 'react-icons/fi'

export default function CreatePlanButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Form state
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [interval, setInterval] = useState('month')
    const [genLimit, setGenLimit] = useState('')
    const [brandLimit, setBrandLimit] = useState('')
    const [features, setFeatures] = useState<string[]>([])
    const [newFeature, setNewFeature] = useState('')

    const handleAddFeature = () => {
        if (newFeature.trim()) {
            setFeatures([...features, newFeature.trim()])
            setNewFeature('')
        }
    }

    const removeFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index))
    }

    const handleSubmit = async () => {
        setIsLoading(true)

        const result = await createPlan({
            name,
            price: Math.round(parseFloat(price) * 100), // Convert to pence
            interval,
            generation_limit: parseInt(genLimit),
            brand_limit: parseInt(brandLimit),
            features
        })

        setIsLoading(false)

        if (result.success) {
            setIsOpen(false)
            // Reset form
            setName('')
            setPrice('')
            setGenLimit('')
            setBrandLimit('')
            setFeatures([])
        } else {
            alert('Failed to create plan')
        }
    }

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-orange-400 text-white border-0"
            >
                <FiPlus className="mr-2 h-4 w-4" />
                Create New Plan
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Create Subscription Plan"
            >
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Plan Name</label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Diamond"
                                className="bg-black/20 border-gray-700 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Price (£)</label>
                            <Input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="99.99"
                                className="bg-black/20 border-gray-700 text-white"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Interval</label>
                            <select
                                value={interval}
                                onChange={(e) => setInterval(e.target.value)}
                                className="w-full h-10 px-3 rounded-md bg-black/20 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="month">Monthly</option>
                                <option value="year">Yearly</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Generations Limit</label>
                            <Input
                                type="number"
                                value={genLimit}
                                onChange={(e) => setGenLimit(e.target.value)}
                                placeholder="-1 for unlimited"
                                className="bg-black/20 border-gray-700 text-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Brand Profiles Limit</label>
                        <Input
                            type="number"
                            value={brandLimit}
                            onChange={(e) => setBrandLimit(e.target.value)}
                            placeholder="-1 for unlimited"
                            className="bg-black/20 border-gray-700 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Features</label>
                        <div className="flex gap-2">
                            <Input
                                value={newFeature}
                                onChange={(e) => setNewFeature(e.target.value)}
                                placeholder="Add a feature..."
                                className="bg-black/20 border-gray-700 text-white"
                                onKeyDown={(e) => e.key === 'Enter' && handleAddFeature()}
                            />
                            <Button onClick={handleAddFeature} variant="secondary">Add</Button>
                        </div>
                        <div className="space-y-2 mt-2">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center justify-between bg-white/5 p-2 rounded text-sm text-gray-300">
                                    <span>{feature}</span>
                                    <button onClick={() => removeFeature(index)} className="text-red-400 hover:text-red-300">
                                        <FiX />
                                    </button>
                                </div>
                            ))}
                        </div>
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
                            disabled={isLoading || !name || !price || !genLimit}
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                            {isLoading ? 'Creating...' : 'Create Plan'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
