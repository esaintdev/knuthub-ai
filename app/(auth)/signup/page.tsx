'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignupPage() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters')
            return
        }

        setLoading(true)

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || 'An error occurred')
                setLoading(false)
                return
            }

            // Auto-login after signup
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false
            })

            if (result?.error) {
                setError('Account created but login failed. Please try logging in.')
                setLoading(false)
            } else {
                router.push('/dashboard')
                router.refresh()
            }
        } catch (error) {
            setError('An error occurred. Please try again.')
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-black px-4 py-12">
            <div className="w-full max-w-md space-y-6">
                {/* Back to Home */}
                <Link href="/" className="flex items-center justify-center gap-2 text-white hover:text-gray-300 transition-colors">
                    <img src="/icon.png" alt="Knuthub AI" className="h-8 w-8" />
                    <span className="text-xl font-bold font-manrope">Knuthub AI</span>
                </Link>

                <Card className="w-full max-w-md bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-500 to-orange-300 bg-clip-text text-transparent">
                            Create Account
                        </CardTitle>
                        <CardDescription className="text-center">
                            Start generating amazing content for your business
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-orange-300 hover:from-purple-500 hover:to-orange-300" size="lg" disabled={loading}>
                                {loading ? 'Creating account...' : 'Create Account'}
                            </Button>
                            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                                Already have an account?{' '}
                                <Link href="/login" className="font-medium text-orange-300 hover:text-orange-300">
                                    Sign in
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}
