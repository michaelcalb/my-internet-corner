import AboutMe from '@/components/AboutMe/AboutMe'
import styles from './layout.module.css'
import clsx from 'clsx'
import NavBar from '@/components/NavBar/NavBar'
import { LanyardProvider } from '@/contexts/LanyardContext'
import ScrollDock from '@/components/ScrollDock'

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <LanyardProvider>
            <main className={styles.main}>
                <aside
                    className={clsx(
                        styles.asideContainer,
                        styles.windowContainer
                    )}
                >
                    <AboutMe />
                </aside>
                <section
                    className={clsx(
                        styles.windowContainer,
                        styles.contentContainer
                    )}
                >
                    {children}
                </section>
            </main>
            <NavBar />
            <ScrollDock />
        </LanyardProvider>
    )
}
