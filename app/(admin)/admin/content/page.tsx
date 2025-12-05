import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'

export default async function AdminContentPage() {
    const { data: contents } = await supabase
        .from('contents')
        .select(`
      *,
      user:users (name, email),
      brand:brands (name)
    `)
        .order('created_at', { ascending: false })
        .limit(100)

    // Stats by type
    const contentByType = contents?.reduce((acc: any, content: any) => {
        acc[content.type] = (acc[content.type] || 0) + 1
        return acc
    }, {})

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Content Moderation
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Review and manage generated content
                </p>
            </div>

            {/* Stats by Type */}
            <div className="grid gap-6 md:grid-cols-4">
                {Object.entries(contentByType || {}).map(([type, count]) => (
                    <Card key={type} className='bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50'>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-gray-400 capitalize">
                                {type}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-white">{count as number}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Content Table */}
            <Card className='bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50'>
                <CardHeader>
                    <CardTitle>Recent Content ({contents?.length || 0})</CardTitle>
                    <CardDescription>Latest 100 generated content pieces</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {contents?.map((content: any) => (
                            <div key={content.id} className="border border-gray-800 rounded-lg p-4 bg-black/20 hover:bg-black/40 transition-colors">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="font-medium text-white">{content.title}</h3>
                                        <p className="text-sm text-gray-400">
                                            by {content.user?.name || content.user?.email} • {content.brand?.name}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="inline-flex items-center rounded-full bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-200 border border-blue-800">
                                            {content.type}
                                        </span>
                                        <span className="inline-flex items-center rounded-full bg-purple-900/30 px-2.5 py-0.5 text-xs font-medium text-purple-200 border border-purple-800">
                                            {content.sub_type}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-300 line-clamp-2 mb-2">
                                    {content.content}
                                </p>
                                <div className="flex items-center justify-between text-xs text-gray-400">
                                    <span>{formatDate(content.created_at)}</span>
                                    <button className="text-purple-400 hover:text-purple-300">
                                        View Full Content
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
