'use client'

import { Code, Flag, House, Mail, Moon, Sun } from 'lucide-react'
import styles from './NavBar.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSecret } from '@/contexts/SecretContext'
import clsx from 'clsx'
import { useTheme } from '@/hooks/useTheme'

const itemSize = 28

const navItems = [
    { href: '/', label: <House size={itemSize} />, aria: "Home" },
    { href: '/projects', label: <Code size={itemSize} />, aria: "Projects" },
    { href: '/contact', label: <Mail size={itemSize} />, aria: "Contact" },
]

export default function NavBar() {
    const { isUnlocked } = useSecret()
    const pathname = usePathname()
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === 'dark'
    const themeLabel = isDark ? 'White mode' : 'Dark mode'
    const ThemeIcon = isDark ? Sun : Moon

    return (
        <nav className={styles.navBar}>
            <ul className={styles.navList}>
                {navItems.map((item) => (
                    <li key={item.href} className={styles.navItem}>
                        <Link href={item.href} className={clsx(styles.navLink, { [styles.active]: pathname === item.href })} aria-label={item.aria}>
                            <span className={styles.navContent} data-tooltip={item.aria}>
                                {item.label}
                            </span>
                        </Link>
                    </li>
                ))}
                {isUnlocked && (
                    <li className={clsx(styles.navItem, styles.secretItem)}>
                        <Link href="/ctf" className={styles.navLink} aria-label="CTF">
                            <span className={styles.navContent} data-tooltip="CTF">
                                <Flag size={itemSize} />
                            </span>
                        </Link>
                    </li>
                )}
                <li className={styles.navItem}>
                    <button
                        type="button"
                        className={clsx(styles.navLink, styles.navButton)}
                        onClick={toggleTheme}
                        aria-label={`Switch to ${themeLabel.toLowerCase()}`}
                    >
                        <span className={styles.navContent} data-tooltip={themeLabel}>
                            <ThemeIcon size={itemSize} />
                        </span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}
