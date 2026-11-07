import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    /* MAINTENANCE MODE */
    const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true'

    if (
        isMaintenanceMode &&
        !request.nextUrl.pathname.startsWith('/maintenance')
    ) {
        return NextResponse.rewrite(new URL('/maintenance', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}
