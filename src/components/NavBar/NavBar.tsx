import { House, Code, Mail, LockKeyhole } from 'lucide-react'
import styles from './NavBar.module.css'
import Link from 'next/link'

const itemSize = 28
const navItems = [
    { href: '/', label: <House size={itemSize} />, aria: "Home" },
    { href: '/projects', label: <Code size={itemSize} />, aria: "Projects" },
    { href: '/contact', label: <Mail size={itemSize} />, aria: "Contact" },
    { href: '/???', label: <LockKeyhole size={itemSize} />, aria: "???" },
]

export default function NavBar() {
    return (
        <nav className={styles.navBar}>
            <ul className={styles.navList}>
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className={styles.navLink}>
                        <li className={styles.navItem} aria-label={item.aria}>
                            {item.label}
                        </li>
                    </Link>
                ))}
            </ul>
        </nav>
    )
}