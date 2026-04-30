'use client'

import Window from '@/components/Window/Window'
import styles from './page.module.css'

type HistoryLine = {
    id: number
    type: 'input' | 'output' | 'error'
    text: string
}

export default function Home() {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    return (
        <Window title="Home">
            <div className={styles.home}>
                <div className={styles.terminal}>
                    <p className={styles.warning}>
                        This place is still a work in progress.
                    </p>
                    <p className={styles.text}>
                        Welcome to my personal internet corner, or a portfolio, if you will.
                    </p>
                    <p className={styles.text}>
                        Feel free to check out my projects, get in touch or just explore around, you might find a thing or two.
                    </p>
                    <p className={styles.note}>
                        I hope you enjoy your stay. :)
                    </p>
                    <div className={styles.terminalLine}>
                        <span>&gt;&nbsp;</span>
                        <div
                            contentEditable
                            spellCheck={false}
                            autoFocus
                            className={styles.editableArea}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
            </div>
        </Window>
    )
}
