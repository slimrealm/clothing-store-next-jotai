'use client'

import { useRouter } from 'next/navigation'
import { useSetAtom } from 'jotai'
import { currentUserAtom } from '@/lib/atoms'
import { signIn } from '../actions/auth'
import { useState } from 'react'

export default function SignIn() {
    const [error, setError] = useState('')
    const router = useRouter()
    const setCurrentUser = useSetAtom(currentUserAtom)

    async function handleSubmit(formData: FormData) {
        const result = await signIn(formData)
        if (result.error) {
            setError(result.error)
        } else if (result.user) {
            setCurrentUser(result.user)
            router.push('/')
        }
    }

    return (
        <div className="max-w-md mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Sign In</h1>
            <form action={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Sign In
                </button>
            </form>
        </div>
    )
}