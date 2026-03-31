import type { Metadata } from 'next'
import { Trispace } from 'next/font/google'
import AboutMe from '@/components/AboutMe/AboutMe'
import Window from '@/components/Window/Window'
import layoutStyles from './layout.module.css'
import './globals.css'
import clsx from 'clsx'
import Maintenance from './maintenance/page'

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

    return (
        <html lang="en" className={trispace.variable}>
            <body>
                {isMaintenanceMode ? (
                    <Maintenance />
                ) : (
                    <main className={layoutStyles.main}>
                        <aside
                            className={clsx(
                                layoutStyles.aboutMeContainer,
                                layoutStyles.windowContainer,
                            )}
                        >
                            <Window title="About me">
                                <AboutMe />
                            </Window>
                        </aside>
                        <section className={layoutStyles.windowContainer}>
                            {children}
                        </section>
                    </main>
                )}
            </body>
        </html>
    )
}
