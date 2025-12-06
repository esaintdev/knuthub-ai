import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import PlanActions from '@/components/admin/plan-actions'
import CreatePlanButton from '@/components/admin/create-plan-button'

export default async function AdminPlansPage() {
    const { data: plans } = await supabase
        .from('subscription_plans')
        .select('*')
        .order('price', { ascending: true })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Plans & Limits
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Manage subscription plans and content generation limits
                    </p>
                </div>
                <CreatePlanButton />
            </div>

            <Card className='bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50'>
                <CardHeader>
                    <CardTitle>Subscription Plans</CardTitle>
                    <CardDescription>Configure usage limits for each tier</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-800">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Plan Name</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Price</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Interval</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Content Limit/Month</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {plans?.map((plan: any) => (
                                    <tr key={plan.id} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                                        <td className="py-3 px-4">
                                            <p className="font-medium text-white">{plan.name}</p>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-300">
                                            {formatCurrency(plan.price, plan.currency)}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-300 capitalize">
                                            {plan.interval}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${plan.generation_limit === -1
                                                ? 'bg-purple-900/30 text-purple-200 border border-purple-800'
                                                : 'bg-gray-800 text-gray-300 border border-gray-700'
                                                }`}>
                                                {plan.generation_limit === -1 ? 'Unlimited' : plan.generation_limit}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <PlanActions plan={plan} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
