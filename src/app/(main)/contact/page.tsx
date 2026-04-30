'use client'

import Link from 'next/link'
import styles from './page.module.css'
import Window from '@/components/Window/Window'
import Email from '@/assets/icons/email.svg'
import Discord from '@/assets/icons/discord.svg'
import GitHub from '@/assets/icons/github.svg'
import Steam from '@/assets/icons/steam.svg'
import { usePresence } from '@/contexts/LanyardContext'
import { Copy, Check } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

export default function Contact() {
    const status = usePresence()
    const discordUsername = status?.discord_user.username ?? '\u00A0'
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>, textToCopy: string, index: number) => {
        e.preventDefault()

        try {
            await navigator.clipboard.writeText(textToCopy)
            setCopiedIndex(index)

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            timeoutRef.current = setTimeout(() => setCopiedIndex(null), 1000)
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    const contactItems = [
        {
            icon: <Email className={clsx(styles.icon, styles.emailIcon)} />,
            text: 'For professional inquiries',
            label: <>michaelcalb.dev<span className={styles.mailDomain}>@gmail.com</span></>,
            copyText: 'michaelcalb.dev@gmail.com' ,
            href: 'mailto:michaelcalb.dev@gmail.com'
        },
        {
            icon: <Discord className={clsx(styles.icon, styles.discordIcon)} />,
            text: 'For anything else',
            label: discordUsername,
            copyText: discordUsername,
            href: 'https://discordapp.com/users/316699326581702657'
        }
    ]

    const socialItems = [
        {
            icon: <GitHub className={styles.cardIcon} />,
            href: 'https://github.com/michaelcalb'
        },
        {
            icon: <Steam className={styles.cardIcon} />,
            href: 'https://steamcommunity.com/profiles/76561198344422424'
        }
    ]

    return (
        <Window title="Contact">
            <div className={styles.contact}>
                <section className={styles.contactSection}>
                    {contactItems.map((item, index) => {
                        const isCopied = copiedIndex === index
                        return (
                            <div key={index} className={styles.contactItem} style={{ '--i': index } as React.CSSProperties}>
                                <p className={styles.contactText}>{item.text}</p>
                                <div className={styles.contactActions}>
                                    <Link className={styles.contactLink} href={item.href} target='_blank' rel='noopener noreferrer'>
                                        {item.icon}
                                    <span className={styles.label}>{item.label}</span>
                                    </Link>
                                    <button onClick={(e) => handleCopy(e, item.copyText, index)} className={styles.copyBtn} title='Copy to clipboard'>
                                        <Copy className={clsx(styles.btnIcon, isCopied && styles.inactiveIcon)}/>
                                        <Check className={clsx(styles.btnIcon, !isCopied && styles.inactiveIcon)}/>
                                    </button>
                                </div>
                            </div> 
                        )
                    })}
                </section>
                <section className={styles.socialSection}>
                    <p className={styles.socialText}>You can also find me on</p>
                    <div className={styles.socialCardGroup}>
                        {socialItems.map((item, index) => (
                            <Link key={index} className={styles.socialLink} style={{ '--i': index } as React.CSSProperties} href={item.href} target='_blank' rel='noopener noreferrer'>{item.icon}</Link>
                        ))}
                    </div>
                </section>
            </div>
        </Window>
    )
}
