import type { Metadata } from 'next'
import { Trispace } from 'next/font/google'
import AboutMe from '@/components/AboutMe/AboutMe'
import Window from '@/components/Window/Window'
import layoutStyles from './layout.module.css'
import './globals.css'
import clsx from 'clsx'
import Maintenance from './maintenance/page'
import NavBar from '@/components/NavBar/NavBar'

const trispace = Trispace({
    variable: '--font-trispace',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'michas.dev',
    description: 'my internet corner',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true'

    if (isMaintenanceMode) {
        return (
            <html lang="en" className={trispace.variable}>
                <body>
                    <Maintenance />
                </body>
            </html>
        )
    }

    return (
        <html lang="en" className={trispace.variable}>
            <body>
                <main className={layoutStyles.main}>
                    <aside
                        className={clsx(
                            layoutStyles.aboutMeContainer,
                            layoutStyles.windowContainer,
                        )}
                    >
                        <Window title="About Me">
                            <AboutMe />
                        </Window>
                    </aside>
                    <section className={layoutStyles.windowContainer}>
                        {children}
                    </section>
                </main>
                <NavBar />
            </body>
        </html>
    )
}
