import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FiPlus, FiEdit } from 'react-icons/fi'

export default async function BrandsPage() {
    const session = await auth()

    if (!session?.user?.id) {
        redirect('/login')
    }

    const { data: brands } = await supabase
        .from('brands')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Brand Profiles
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Manage your business brand profiles
                    </p>
                </div>
                <Link href="/brands/new">
                    <Button size="lg">
                        <FiPlus className="mr-2" />
                        Create Brand
                    </Button>
                </Link>
            </div>

            {!brands || brands.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                No brands yet
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Create your first brand profile to start generating content
                            </p>
                            <Link href="/brands/new">
                                <Button>
                                    <FiPlus className="mr-2" />
                                    Create Your First Brand
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {brands.map((brand: any) => (
                        <Card key={brand.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-xl">{brand.name}</CardTitle>
                                        <CardDescription className="mt-1">
                                            {brand.niche.charAt(0).toUpperCase() + brand.niche.slice(1)}
                                        </CardDescription>
                                    </div>
                                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        {brand.tone}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Target Audience
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                        {brand.target_audience}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={`/brands/${brand.id}/edit`} className="flex-1">
                                        <Button variant="outline" className="w-full" size="sm">
                                            <FiEdit className="mr-2 h-4 w-4" />
                                            Edit
                                        </Button>
                                    </Link>
                                    <Link href={`/generate?brandId=${brand.id}`} className="flex-1">
                                        <Button className="w-full" size="sm">
                                            Generate
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
