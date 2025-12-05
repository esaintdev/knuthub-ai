'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState({
        maintenanceMode: false,
        allowSignups: true,
        maxFreeTrialDays: 14,
        defaultPlan: 'Starter'
    })

    const [saving, setSaving] = useState(false)

    const handleSave = async () => {
        setSaving(true)
        // TODO: Implement settings save
        await new Promise(resolve => setTimeout(resolve, 1000))
        setSaving(false)
        alert('Settings saved successfully!')
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    System Settings
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Configure platform-wide settings
                </p>
            </div>

            {/* General Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>Basic platform configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="maintenance">Maintenance Mode</Label>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Disable access to the platform for maintenance
                            </p>
                        </div>
                        <input
                            type="checkbox"
                            id="maintenance"
                            checked={settings.maintenanceMode}
                            onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                            className="h-5 w-5 rounded border-gray-300"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="signups">Allow New Signups</Label>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Enable or disable new user registrations
                            </p>
                        </div>
                        <input
                            type="checkbox"
                            id="signups"
                            checked={settings.allowSignups}
                            onChange={(e) => setSettings({ ...settings, allowSignups: e.target.checked })}
                            className="h-5 w-5 rounded border-gray-300"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="trial">Free Trial Duration (days)</Label>
                        <Input
                            id="trial"
                            type="number"
                            value={settings.maxFreeTrialDays}
                            onChange={(e) => setSettings({ ...settings, maxFreeTrialDays: parseInt(e.target.value) })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="plan">Default Subscription Plan</Label>
                        <select
                            id="plan"
                            value={settings.defaultPlan}
                            onChange={(e) => setSettings({ ...settings, defaultPlan: e.target.value })}
                            className="flex h-11 w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-2 text-sm"
                        >
                            <option value="Starter">Starter</option>
                            <option value="Professional">Professional</option>
                            <option value="Business">Business</option>
                        </select>
                    </div>

                    <Button onClick={handleSave} disabled={saving} className="w-full">
                        {saving ? 'Saving...' : 'Save Settings'}
                    </Button>
                </CardContent>
            </Card>

            {/* API Configuration */}
            <Card>
                <CardHeader>
                    <CardTitle>API Configuration</CardTitle>
                    <CardDescription>Manage external service integrations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-800 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Google Gemini AI</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Content generation service</p>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                            Connected
                        </span>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-800 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Paystack</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Payment processing</p>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            Not Configured
                        </span>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-800 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Supabase</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Database service</p>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                            Connected
                        </span>
                    </div>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200 dark:border-red-800">
                <CardHeader>
                    <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
                    <CardDescription>Irreversible and destructive actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Clear All Content</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Delete all generated content from the database
                            </p>
                        </div>
                        <Button variant="destructive" size="sm">
                            Clear Content
                        </Button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Reset All Subscriptions</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Cancel all active subscriptions
                            </p>
                        </div>
                        <Button variant="destructive" size="sm">
                            Reset Subscriptions
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
