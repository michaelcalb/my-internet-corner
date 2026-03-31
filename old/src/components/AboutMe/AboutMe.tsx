import styles from './AboutMe.module.css'

import type { TypewriterRule } from "../../types"
import useTypewriter from "../../hooks/useTypewriter"

const typewriterRules: TypewriterRule[] = [
    { write: 'Michas' },
    { delete: 1 },
    { write: 'el' },
    { write: 'calb' },
    { delete: 6 },
    { write: 's' }
]

export default function AboutMe() {
    const email = 'michaelcalb.dev@gmail.com'
    let currYear = new Date().getFullYear()

    if (new Date().getMonth() < 9 || new Date().getMonth() === 9 && new Date().getDate() < 5) {
        currYear -= 1
    }

    return (
        <div className={styles.aboutMe}>
            <section className={styles.greeting}>Hi, I'm <span className={styles.typewriterMyName}>{useTypewriter({rules: typewriterRules, loopFrom: 1})}</span></section>
            <section className={styles.bio}>
                <span className={styles.bioText}>
                    A {currYear - 2005}yo software developer from Brazil with a focus on full stack web development and cybersecurity. I sometimes participate in CTF events and puzzle hunts with friends. Game dev in my free time. Always learning new stuff and sharing knowledge.
                </span>
            </section>
            <section className={styles.social}>
                <a href="https://github.com/michaelcalb" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" className={styles.socialIcon}>
                        <path
                            d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58 
                            0-.28-.01-1.02-.02-2-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77
                            -1.1-.75.08-.74.08-.74 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.83 1.32 
                            3.52 1 .1-.78.42-1.32.76-1.62-2.66-.3-5.47-1.33-5.47-5.93 
                            0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 
                            0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.3-1.23 
                            3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.9 1.24 3.22 
                            0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22 
                            0 1.6-.01 2.88-.01 3.27 0 .32.22.69.82.57C20.56 21.8 24 17.3 24 12 
                            24 5.37 18.63 0 12 0z"
                            fill="currentColor"
                        />
                    </svg>
                </a>
                <a href={`mailto:${email}`} onClick={() => navigator.clipboard.writeText(email)}>
                    <svg viewBox="0 0 24 24" className={styles.socialIcon}>
                        <path
                            d="M22,5V9L12,13,2,9V5A1,1,0,0,1,3,4H21A1,1,0,0,1,22,5ZM2,11.154V19a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V11.154l-10,4Z"
                            fill="currentColor"
                        />
                    </svg>
                </a>
            </section>
        </div>
    )
}