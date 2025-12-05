'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false
            })

            if (result?.error) {
                setError('Invalid email or password')
            } else {
                router.push('/dashboard')
                router.refresh()
            }
        } catch (error) {
            setError('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-black px-4">
            <div className="w-full max-w-md space-y-6">
                {/* Back to Home */}
                <Link href="/" className="flex items-center justify-center gap-2 text-white hover:text-gray-300 transition-colors">
                    <img src="/icon.png" alt="Knuthub AI" className="h-8 w-8" />
                    <span className="text-xl font-bold font-manrope">Knuthub AI</span>
                </Link>

                <Card className="w-full max-w-md bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-500 to-orange-300 bg-clip-text text-transparent">
                            Welcome Back
                        </CardTitle>
                        <CardDescription className="text-center">
                            Sign in to your account to continue
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
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-orange-300 hover:from-purple-500 hover:to-orange-300" size="lg" disabled={loading}>
                                {loading ? 'Signing in...' : 'Sign In'}
                            </Button>
                            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                                Don&apos;t have an account?{' '}
                                <Link href="/signup" className="font-medium text-orange-300 hover:text-orange-300">
                                    Sign up
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}
