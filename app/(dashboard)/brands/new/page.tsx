'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { BrandNiche, BrandTone } from '@/types'

const niches: { value: BrandNiche; label: string }[] = [
    { value: 'churches', label: 'Churches & Religious Organizations' },
    { value: 'restaurants', label: 'Restaurants & Cafes' },
    { value: 'salons', label: 'Salons & Beauty Services' },
    { value: 'chauffeurs', label: 'Chauffeurs & Transportation' },
]

const tones: { value: BrandTone; label: string }[] = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'formal', label: 'Formal' },
    { value: 'enthusiastic', label: 'Enthusiastic' },
]

export default function NewBrandPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        niche: 'restaurants' as BrandNiche,
        tone: 'friendly' as BrandTone,
        targetAudience: '',
        usps: '',
        services: '',
        values: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch('/api/brands', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || 'Failed to create brand')
                setLoading(false)
                return
            }

            router.push('/brands')
            router.refresh()
        } catch (error) {
            setError('An error occurred. Please try again.')
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Create Brand Profile
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Tell us about your business to generate personalized content
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Brand Information</CardTitle>
                        <CardDescription>
                            Provide details about your business brand
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {error && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="name">Business Name *</Label>
                            <Input
                                id="name"
                                placeholder="e.g., Bella's Bistro"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="niche">Industry/Niche *</Label>
                            <select
                                id="niche"
                                className="flex h-11 w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900"
                                value={formData.niche}
                                onChange={(e) => setFormData({ ...formData, niche: e.target.value as BrandNiche })}
                                required
                                disabled={loading}
                            >
                                {niches.map((niche) => (
                                    <option key={niche.value} value={niche.value}>
                                        {niche.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tone">Brand Tone *</Label>
                            <select
                                id="tone"
                                className="flex h-11 w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900"
                                value={formData.tone}
                                onChange={(e) => setFormData({ ...formData, tone: e.target.value as BrandTone })}
                                required
                                disabled={loading}
                            >
                                {tones.map((tone) => (
                                    <option key={tone.value} value={tone.value}>
                                        {tone.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="targetAudience">Target Audience *</Label>
                            <Textarea
                                id="targetAudience"
                                placeholder="Describe your ideal customers (e.g., families looking for authentic Italian cuisine, young professionals seeking quick lunch options)"
                                value={formData.targetAudience}
                                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="usps">Unique Selling Points *</Label>
                            <Textarea
                                id="usps"
                                placeholder="What makes your business special? (e.g., family recipes passed down for generations, locally sourced ingredients, award-winning chef)"
                                value={formData.usps}
                                onChange={(e) => setFormData({ ...formData, usps: e.target.value })}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="services">Services/Products *</Label>
                            <Textarea
                                id="services"
                                placeholder="List your main services or products (e.g., dine-in, takeaway, catering, private events)"
                                value={formData.services}
                                onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="values">Brand Values (Optional)</Label>
                            <Textarea
                                id="values"
                                placeholder="What does your brand stand for? (e.g., sustainability, community, excellence)"
                                value={formData.values}
                                onChange={(e) => setFormData({ ...formData, values: e.target.value })}
                                disabled={loading}
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                disabled={loading}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading} className="flex-1">
                                {loading ? 'Creating...' : 'Create Brand'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}
