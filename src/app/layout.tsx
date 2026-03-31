import type { Metadata } from 'next'
import { Trispace } from 'next/font/google'
import AboutMe from '@/components/AboutMe/AboutMe'
import Window from '@/components/Window/Window'
import layoutStyles from './layout.module.css'
import './globals.css'
import clsx from 'clsx'

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
    return (
        <html lang="en" className={trispace.variable}>
            <body>
                <main className={layoutStyles.main}>
                    <aside
                        className={clsx(layoutStyles.aboutMeContainer, layoutStyles.windowContainer)}
                    >
                        <Window title="About me">
                            <AboutMe />
                        </Window>
                    </aside>
                    <section className={layoutStyles.windowContainer}>
                        {children}
                    </section>
                </main>
            </body>
        </html>
    )
}
