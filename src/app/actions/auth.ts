'use server'

import { createUser, signInUser } from '@/lib/api'

export async function signUp(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Email and password are required' }
    }

    try {
        const user = await createUser(email, password)
        return { user }
    } catch (error) {
        return { error: (error as Error).message }
    }
}

export async function signIn(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Email and password are required' }
    }

    try {
        const user = await signInUser(email, password)
        return { user }
    } catch (error) {
        return { error: 'Invalid email or password' }
    }
}