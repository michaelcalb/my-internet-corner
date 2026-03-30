import type { Metadata } from 'next'
import { Trispace } from 'next/font/google'
import AboutMe from '@/components/AboutMe/AboutMe'
import Window from '@/components/Window/Window'
import layoutStyles from './layout.module.css'
import './globals.css'

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
                <aside className={layoutStyles.aboutMeContainer}>
                    <Window title="About me">
                        <AboutMe />
                    </Window>
                </aside>
                <main className={layoutStyles.main}>
                    <div className={layoutStyles.windowContainer}>
                        {children}
                    </div>
                </main>
            </body>
        </html>
    )
}
