import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
    const { username, password } = await request.json()

    try {
        if (!username || !password) {
            return NextResponse.json({ error: 'username and password is required' }, { status: 400 })
        }
    
        const userExists = await db.user.findUnique({
            where: {
                username
            }
        })
    
        const hash = await bcrypt.hash(password, 10)
    
        if (userExists) {
            return NextResponse.json({ message: 'username already exists' }, { status: 400 })
        }
    
        await db.user.create({
            data: {
                username,
                password: hash
            }
        })
    
        return NextResponse.json({ message: 'ok' }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}