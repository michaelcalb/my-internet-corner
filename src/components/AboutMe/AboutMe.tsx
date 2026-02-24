import styles from './AboutMe.module.css'

import type { TypewriterRule } from "../../types"
import useTypewriter from "../../hooks/useTypewriter"

const typewriterRules: TypewriterRule[] = [
    { write: 'michas' },
    { delete: 1 },
    { write: 'el' },
    { write: 'calb' },
    { delete: 6 },
    { write: 's' }
]

export default function AboutMe() {
    return (
        <div className={styles.aboutMe}>
            Hi, I'm <span className={styles.typewriterMyName}>{useTypewriter({rules: typewriterRules, loopFrom: 1})}</span>
        </div>
    )
}