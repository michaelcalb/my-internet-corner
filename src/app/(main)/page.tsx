'use client'

import Window from '@/components/Window/Window'
import styles from './page.module.css'
import StackIcon from 'tech-stack-icons'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

const stackLanguages = ['typescript', 'js', 'python', 'c++']
const stackWeb = [
    'html5',
    'css3',
    'react',
    'electron',
    'nextjs',
    'nodejs',
    'expressjs',
    'flask',
    'nestjs'
]
const stackDatabases = [
    'mongodb',
    'mysql',
    'postgresql',
    'firebase',
    'cassandradb'
]
type StackVariant = 'light' | 'dark'
const subscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

function StackList({
    stacks,
    variant,
    mounted
}: {
    stacks: string[]
    variant: StackVariant
    mounted: boolean
}) {
    return (
        <ul className={styles.stack}>
            {stacks.map((stack) => (
                <li
                    key={stack}
                    aria-label={stack}
                    data-tooltip={stack}
                    className={styles.stackItem}
                >
                    {mounted && <StackIcon name={stack} variant={variant} />}
                </li>
            ))}
        </ul>
    )
}

export default function Home() {
    const { resolvedTheme } = useTheme()
    const mounted = useSyncExternalStore(
        subscribe,
        getClientSnapshot,
        getServerSnapshot
    )
    const stackVariant = resolvedTheme === 'dark' ? 'dark' : 'light'

    return (
        <Window title="Home">
            <div className={`${styles.page} window-scroll`}>
                <div className={styles.welcomeSection}>
                    <h2>Welcome</h2>
                    <p>
                        This is my personal internet corner, or a portfolio, if
                        you will.
                    </p>
                    <p>
                        Feel free to check out my projects, get in touch or just
                        explore around, you might find a thing or two.
                    </p>
                    <p>
                        I hope you enjoy your stay.{' '}
                        <span className="mono">:)</span>
                    </p>
                </div>

                <section className={styles.stacksSection}>
                    <h2>My Stacks</h2>
                    <div className={styles.stacksContainer}>
                        <div className={styles.stackGroup}>
                            <h3>Languages</h3>
                            <StackList
                                stacks={stackLanguages}
                                variant={stackVariant}
                                mounted={mounted}
                            />
                        </div>
                        <div className={styles.stackGroup}>
                            <h3>Web</h3>
                            <StackList
                                stacks={stackWeb}
                                variant={stackVariant}
                                mounted={mounted}
                            />
                        </div>
                        <div className={styles.stackGroup}>
                            <h3>Databases</h3>
                            <StackList
                                stacks={stackDatabases}
                                variant={stackVariant}
                                mounted={mounted}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </Window>
    )
}
