'use client'

import { useSyncExternalStore } from 'react'
import { Code, Flag, House, ImageIcon, Mail, Moon, Sun } from 'lucide-react'
import styles from './NavBar.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSecret } from '@/contexts/SecretContext'
import clsx from 'clsx'
import { useTheme } from 'next-themes'

const itemSize = 28
const subscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

const navItems = [
	{ href: '/', label: <House size={itemSize} />, aria: 'Home' },
	{ href: '/projects', label: <Code size={itemSize} />, aria: 'Projects' },
	{ href: '/contact', label: <Mail size={itemSize} />, aria: 'Contact' },
	{
		href: '/keep-going',
		label: <ImageIcon size={itemSize} />,
		aria: 'Keep Going',
	},
]

export default function NavBar() {
	const { isUnlocked } = useSecret()
	const pathname = usePathname()
	const { resolvedTheme, setTheme } = useTheme()
	const mounted = useSyncExternalStore(
		subscribe,
		getClientSnapshot,
		getServerSnapshot,
	)
	const isDark = resolvedTheme === 'dark'
	const themeLabel = isDark ? 'White mode' : 'Dark mode'
	const ThemeIcon = isDark ? Sun : Moon

	function toggleTheme() {
		if (!mounted) {
			return
		}

		setTheme(isDark ? 'light' : 'dark')
	}

	return (
		<nav className={styles.navBar}>
			<ul className={styles.navList}>
				{navItems.map((item) => (
					<li key={item.href} className={styles.navItem}>
						<Link
							href={item.href}
							className={clsx(styles.navLink, {
								[styles.active]: pathname === item.href,
							})}
							aria-label={item.aria}
						>
							<span
								className={styles.navContent}
								data-tooltip={item.aria}
							>
								{item.label}
							</span>
						</Link>
					</li>
				))}
				{isUnlocked && (
					<li className={clsx(styles.navItem, styles.secretItem)}>
						<Link
							href='/ctf'
							className={styles.navLink}
							aria-label='CTF'
						>
							<span
								className={styles.navContent}
								data-tooltip='CTF'
							>
								<Flag size={itemSize} />
							</span>
						</Link>
					</li>
				)}
				<li className={styles.navItem}>
					<button
						type='button'
						className={clsx(styles.navLink, styles.navButton)}
						onClick={toggleTheme}
						disabled={!mounted}
						aria-label={
							mounted
								? `Switch to ${themeLabel.toLowerCase()}`
								: 'Theme toggle'
						}
					>
						<span
							className={styles.navContent}
							data-tooltip={mounted ? themeLabel : 'Theme'}
						>
							{mounted ? (
								<ThemeIcon size={itemSize} />
							) : (
								<Moon
									size={itemSize}
									aria-hidden='true'
									style={{ visibility: 'hidden' }}
								/>
							)}
						</span>
					</button>
				</li>
			</ul>
		</nav>
	)
}
