import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { FiFileText } from 'react-icons/fi'

export default async function ContentPage() {
    const session = await auth()

    if (!session?.user?.id) {
        redirect('/login')
    }

    const { data: contents } = await supabase
        .from('contents')
        .select(`
      *,
      brand:brands (name)
    `)
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(50)

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Content Library
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    View and manage all your generated content
                </p>
            </div>

            {!contents || contents.length === 0 ? (
                <Card className='bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50'>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <div className="text-center">
                            <FiFileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                No content yet
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Generate your first piece of content to see it here
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {contents.map((content: any) => (
                        <Card key={content.id} className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50 hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg">{content.title}</CardTitle>
                                        <CardDescription className="mt-1">
                                            {content.brand?.name} • {formatDate(content.created_at)}
                                        </CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="inline-flex items-center rounded-full bg-blue-900/50 px-3 py-1 text-xs font-medium text-blue-200 border border-blue-800">
                                            {content.type}
                                        </span>
                                        <span className="inline-flex items-center rounded-full bg-purple-900/50 px-3 py-1 text-xs font-medium text-purple-200 border border-purple-800">
                                            {content.sub_type}
                                        </span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="p-4 bg-black/40 border border-gray-800 rounded-lg">
                                    <p className="text-sm text-gray-300 line-clamp-4 whitespace-pre-wrap">
                                        {content.content}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
