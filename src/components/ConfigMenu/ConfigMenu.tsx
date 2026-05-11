'use client'

import { Moon, Sun, X } from 'lucide-react'
import { useEffect } from 'react'
import clsx from 'clsx'
import { useTheme } from '@/hooks/useTheme'
import styles from './ConfigMenu.module.css'

type ConfigMenuProps = {
    onClose: () => void
}

export default function ConfigMenu({ onClose }: ConfigMenuProps) {
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    return (
        <div
            className={styles.backdrop}
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    onClose()
                }
            }}
        >
            <section
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-label="Configuration"
            >
                <header className={styles.header}>
                    <h2 className={styles.title}>Configuration</h2>
                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Close configuration menu"
                    >
                        <X size={20} />
                    </button>
                </header>

                <div className={styles.content}>
                    <section className={styles.settingRow}>
                        <h3 className={styles.settingTitle}>Color mode</h3>
                        <div className={styles.segmentedControl} role="group" aria-label="Color mode">
                            <button
                                type="button"
                                className={clsx(styles.segmentButton, theme === 'light' && styles.selectedSegment)}
                                onClick={() => setTheme('light')}
                                aria-pressed={theme === 'light'}
                            >
                                <Sun size={18} />
                                <span>White</span>
                            </button>
                            <button
                                type="button"
                                className={clsx(styles.segmentButton, theme === 'dark' && styles.selectedSegment)}
                                onClick={() => setTheme('dark')}
                                aria-pressed={theme === 'dark'}
                            >
                                <Moon size={18} />
                                <span>Dark</span>
                            </button>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    )
}
