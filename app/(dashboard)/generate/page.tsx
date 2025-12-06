'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FiZap, FiCopy, FiCheck } from 'react-icons/fi'

const contentTypes = [
    {
        value: 'website', label: 'Website Content', subtypes: [
            { value: 'homepage', label: 'Homepage' },
            { value: 'about', label: 'About Page' },
            { value: 'services', label: 'Services Page' },
            { value: 'contact', label: 'Contact Page' },
        ]
    },
    {
        value: 'social', label: 'Social Media', subtypes: [
            { value: 'instagram', label: 'Instagram Post' },
            { value: 'facebook', label: 'Facebook Post' },
            { value: 'linkedin', label: 'LinkedIn Post' },
            { value: 'twitter', label: 'Twitter/X Post' },
        ]
    },
    {
        value: 'ads', label: 'Ad Copy', subtypes: [
            { value: 'google-ads', label: 'Google Ads' },
            { value: 'facebook-ads', label: 'Facebook Ads' },
        ]
    },
    {
        value: 'email', label: 'Email Sequences', subtypes: [
            { value: 'welcome-series', label: 'Welcome Email' },
            { value: 'promotional', label: 'Promotional Email' },
            { value: 'nurture', label: 'Nurture Email' },
        ]
    },
]

import { Suspense } from 'react'

function GenerateForm() {
    const searchParams = useSearchParams()

    const preselectedBrandId = searchParams.get('brandId')

    const [brands, setBrands] = useState<any[]>([])
    const [selectedBrand, setSelectedBrand] = useState('')
    const [contentType, setContentType] = useState('website')
    const [subType, setSubType] = useState('homepage')
    const [additionalContext, setAdditionalContext] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [generatedContent, setGeneratedContent] = useState<any>(null)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        fetchBrands()
    }, [])

    useEffect(() => {
        if (preselectedBrandId && brands.length > 0) {
            setSelectedBrand(preselectedBrandId)
        }
    }, [preselectedBrandId, brands])

    useEffect(() => {
        // Update subtype when content type changes
        const type = contentTypes.find(t => t.value === contentType)
        if (type && type.subtypes.length > 0) {
            setSubType(type.subtypes[0].value)
        }
    }, [contentType])

    const fetchBrands = async () => {
        try {
            const response = await fetch('/api/brands')
            const data = await response.json()
            setBrands(data.brands || [])
            if (data.brands?.length > 0 && !preselectedBrandId) {
                setSelectedBrand(data.brands[0].id)
            }
        } catch (error) {
            console.error('Error fetching brands:', error)
        }
    }

    const handleGenerate = async () => {
        if (!selectedBrand) {
            setError('Please select a brand')
            return
        }

        setError('')
        setLoading(true)
        setGeneratedContent(null)

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    brandId: selectedBrand,
                    type: contentType,
                    subType,
                    additionalContext
                })
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || 'Failed to generate content')
                setLoading(false)
                return
            }

            setGeneratedContent(data.content)
        } catch (error) {
            setError('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = () => {
        if (generatedContent?.content) {
            navigator.clipboard.writeText(generatedContent.content)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const currentType = contentTypes.find(t => t.value === contentType)

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Generate Content
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Create AI-powered marketing content for your brand
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Configuration Panel */}
                <Card className='bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50'>
                    <CardHeader>
                        <CardTitle>Content Settings</CardTitle>
                        <CardDescription>
                            Configure what type of content to generate
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="brand">Select Brand</Label>
                            {brands.length === 0 ? (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    No brands found. Create a brand first.
                                </p>
                            ) : (
                                <select
                                    id="brand"
                                    className="flex h-11 w-full rounded-lg border border-gray-800 bg-black/20 px-4 py-2 text-sm text-white transition-colors focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={selectedBrand}
                                    onChange={(e) => setSelectedBrand(e.target.value)}
                                    disabled={loading}
                                >
                                    {brands.map((brand) => (
                                        <option key={brand.id} value={brand.id} className='bg-gray-900 text-white'>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contentType">Content Type</Label>
                            <select
                                id="contentType"
                                className="flex h-11 w-full rounded-lg border border-gray-800 bg-black/20 px-4 py-2 text-sm text-white transition-colors focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                                value={contentType}
                                onChange={(e) => setContentType(e.target.value)}
                                disabled={loading}
                            >
                                {contentTypes.map((type) => (
                                    <option key={type.value} value={type.value} className='bg-gray-900 text-white'>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subType">Specific Type</Label>
                            <select
                                id="subType"
                                className="flex h-11 w-full rounded-lg border border-gray-800 bg-black/20 px-4 py-2 text-sm text-white transition-colors focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                                value={subType}
                                onChange={(e) => setSubType(e.target.value)}
                                disabled={loading}
                            >
                                {currentType?.subtypes.map((sub) => (
                                    <option key={sub.value} value={sub.value} className='bg-gray-900 text-white'>
                                        {sub.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="context">Additional Context (Optional)</Label>
                            <Textarea
                                id="context"
                                placeholder="Add any specific details or requirements for this content..."
                                value={additionalContext}
                                onChange={(e) => setAdditionalContext(e.target.value)}
                                disabled={loading}
                                rows={4}
                                className="bg-black/20 border-gray-800 text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20"
                            />
                        </div>

                        <Button
                            onClick={handleGenerate}
                            disabled={loading || brands.length === 0}
                            className="w-full bg-gradient-to-r from-purple-500 to-orange-300 hover:from-purple-600 hover:to-orange-400 text-white border-0 shadow-lg shadow-purple-500/20"
                            size="lg"
                        >
                            <FiZap className="mr-2" />
                            {loading ? 'Generating...' : 'Generate Content'}
                        </Button>
                    </CardContent>
                </Card>

                {/* Generated Content Panel */}
                <Card className='bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50'>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Generated Content</CardTitle>
                                <CardDescription>
                                    Your AI-generated marketing content
                                </CardDescription>
                            </div>
                            {generatedContent && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleCopy}
                                    className="border-gray-700 text-gray-300 hover:text-white hover:bg-white/10"
                                >
                                    {copied ? (
                                        <>
                                            <FiCheck className="mr-2" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <FiCopy className="mr-2" />
                                            Copy
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                                    <p className="text-gray-400">
                                        Generating your content...
                                    </p>
                                </div>
                            </div>
                        ) : generatedContent ? (
                            <div className="space-y-4">
                                <div className="p-4 bg-black/40 border border-gray-800 rounded-lg">
                                    <pre className="whitespace-pre-wrap text-sm text-gray-100 font-sans">
                                        {generatedContent.content}
                                    </pre>
                                </div>
                                <div className="flex gap-2 text-xs text-gray-400">
                                    <span>Type: {generatedContent.type}</span>
                                    <span>•</span>
                                    <span>Subtype: {generatedContent.subType}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center py-12 text-center">
                                <div>
                                    <FiZap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Configure your settings and click Generate to create content
                                    </p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
