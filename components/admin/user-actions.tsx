'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatDate } from '@/lib/utils'
import { deleteUser, banUser, activateUser, updateUser } from '@/app/actions/admin'

export default function UserActions({ user }: { user: any }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'user'
    })

    const handleSave = async () => {
        setIsLoading(true)
        const result = await updateUser(user.id, formData)
        setIsLoading(false)
        if (result.success) {
            setIsEditing(false)
            // Ideally we'd show a success toast here
        } else {
            alert('Failed to update user')
        }
    }

    const handleBanToggle = async () => {
        const action = user.role === 'banned' ? 'activate' : 'ban'
        if (!confirm(`Are you sure you want to ${action} this user?`)) return

        setIsLoading(true)
        const result = user.role === 'banned' ? await activateUser(user.id) : await banUser(user.id)
        setIsLoading(false)

        if (result.success) {
            setIsOpen(false)
        } else {
            alert(`Failed to ${action} user`)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Are you sure? This action cannot be undone and will delete all user data.')) return

        setIsLoading(true)
        const result = await deleteUser(user.id)
        setIsLoading(false)

        if (result.success) {
            setIsOpen(false)
        } else {
            alert('Failed to delete user. They might have related data that needs to be cleaned up first.')
        }
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
                View Details
            </button>

            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false)
                    setIsEditing(false)
                }}
                title={isEditing ? "Edit User" : "User Details"}
            >
                <div className="space-y-6">
                    {/* User Info / Edit Form */}
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <label className="text-xs text-gray-500 uppercase font-medium">Full Name</label>
                            {isEditing ? (
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="bg-black/20 border-gray-700 text-white"
                                />
                            ) : (
                                <p className="font-medium text-white">{user.name || 'N/A'}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-gray-500 uppercase font-medium">Email Address</label>
                            {isEditing ? (
                                <Input
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="bg-black/20 border-gray-700 text-white"
                                />
                            ) : (
                                <p className="font-medium text-white">{user.email}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-gray-500 uppercase font-medium">User Role</label>
                            {isEditing ? (
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-gray-700 bg-black/20 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                >
                                    <option value="user" className="bg-gray-900">User</option>
                                    <option value="admin" className="bg-gray-900">Admin</option>
                                    <option value="banned" className="bg-gray-900">Banned</option>
                                </select>
                            ) : (
                                <div>
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${user.role === 'admin'
                                            ? 'bg-purple-900/30 text-purple-200 border border-purple-800'
                                            : user.role === 'banned'
                                                ? 'bg-red-900/30 text-red-200 border border-red-800'
                                                : 'bg-gray-800 text-gray-300 border border-gray-700'
                                        }`}>
                                        {user.role || 'user'}
                                    </span>
                                </div>
                            )}
                        </div>

                        {!isEditing && (
                            <div className="space-y-2">
                                <label className="text-xs text-gray-500 uppercase font-medium">Joined Date</label>
                                <p className="font-medium text-white">{formatDate(user.created_at)}</p>
                            </div>
                        )}
                    </div>

                    {/* Subscription Info (Read-only for now) */}
                    {!isEditing && (
                        <div className="border-t border-gray-800 pt-4">
                            <h3 className="text-xs text-gray-500 uppercase font-medium mb-3">Subscription Status</h3>
                            {user.subscriptions && user.subscriptions.length > 0 ? (
                                <div className="bg-black/40 rounded-lg p-3 border border-gray-800">
                                    <p className="text-white font-medium">{user.subscriptions[0].plan?.name}</p>
                                    <p className="text-sm text-gray-400 capitalize">Status: <span className="text-white">{user.subscriptions[0].status}</span></p>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 italic">No active subscription</p>
                            )}
                        </div>
                    )}

                    {/* Actions Footer */}
                    <div className="border-t border-gray-800 pt-4 flex justify-between items-center gap-4">
                        {isEditing ? (
                            <>
                                <Button
                                    variant="ghost"
                                    onClick={() => setIsEditing(false)}
                                    disabled={isLoading}
                                    className="text-gray-400 hover:text-white"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    disabled={isLoading}
                                    className="bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </>
                        ) : (
                            <>
                                <div className="flex gap-2">
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={handleBanToggle}
                                        disabled={isLoading}
                                        className={user.role === 'banned' ? "bg-green-900/50 hover:bg-green-900 text-green-100 border border-green-800" : "bg-orange-900/50 hover:bg-orange-900 text-orange-100 border border-orange-800"}
                                    >
                                        {user.role === 'banned' ? 'Activate User' : 'Ban User'}
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={handleDelete}
                                        disabled={isLoading}
                                        className="bg-red-900/50 hover:bg-red-900 text-red-100 border border-red-800"
                                    >
                                        Delete
                                    </Button>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setIsEditing(true)}
                                        className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-400 hover:text-white"
                                    >
                                        Close
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    )
}
