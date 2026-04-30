'use server'

import { cookies } from "next/headers"

export async function unlockCtf() {
    const cookieStore = await cookies()
    cookieStore.set('ctf_unlocked', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 365,
        path: '/'
    })
}