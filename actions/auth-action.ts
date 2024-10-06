'use server'

import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import * as jose from 'jose'
import { redirect } from 'next/navigation'
import { cookies, headers } from 'next/headers'

export async function signIn(formData: FormData) {
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    try {
        if (!username || !password) {
            return { error: 'username and password is required', status: false }
        }

        const userExits = await db.user.findUnique({
            where: {
                username
            },
        })

        if (!userExits) {
            return { error: 'username or password is incorrect', status: false }
        }

        const passwordMatch = await bcrypt.compare(password, userExits.password)

        if (!passwordMatch) {
            return { error: 'username or password is incorrect', status: false }
        }

        const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_TOKEN || '')
        const token = await new jose.SignJWT({
            id: userExits.id,
            username: userExits.username,
            role: userExits.role
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('30d')
            .setSubject(userExits.id.toString())
            .sign(secret)

        cookies().set('token_user', token, {
            maxAge: 60 * 60 * 24 * 30,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        })

        
        return { message: 'Sign in successfully', status: true }

    } catch (error: any) {
        console.log(error)
        return { error: error.message, status: false }
    }
}

export async function signOut() {
    const usernameHeader = headers().get('x-user-username')
    cookies().set('token_user', '')
    console.log(usernameHeader + ' logged out!')
    redirect('/signin')
}