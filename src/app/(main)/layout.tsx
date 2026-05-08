import AboutMe from '@/components/AboutMe/AboutMe'
import styles from './layout.module.css'
import clsx from 'clsx'
import NavBar from '@/components/NavBar/NavBar'
import { cookies } from 'next/headers'
import { SecretProvider } from '@/contexts/SecretContext'
import { LanyardProvider } from '@/contexts/LanyardContext'
import { Suspense } from 'react'

async function SecretProviderWrapper({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies()
    const initialUnlocked = !!cookieStore.get('ctf_unlocked')

    return <SecretProvider initialUnlocked={initialUnlocked}>{children}</SecretProvider>
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    return (
        <Suspense>
            <SecretProviderWrapper>
                <LanyardProvider>
                    <main className={styles.main}>
                        <aside
                            className={clsx(
                                styles.asideContainer,
                                styles.windowContainer,
                            )}
                        >
                            <AboutMe />
                        </aside>
                        <section
                            className={clsx(
                                styles.windowContainer,
                                styles.contentContainer,
                            )}>
                            {children}
                        </section>
                    </main>
                    <NavBar />
                </LanyardProvider>
            </SecretProviderWrapper>
        </Suspense>
    )
}
