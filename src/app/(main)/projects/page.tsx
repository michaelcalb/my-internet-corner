import ProjectList from '@/components/ProjectList/ProjectList'
import styles from './page.module.css'
import Window from '@/components/Window/Window'
import GitHub from '@/assets/icons/github.svg'
import Docs from '@/assets/icons/docs.svg'
import Link from 'next/link'

export default function Projects() {
    return (
        <Window title="Projects">
            <div className={styles.page}>
                <header className={styles.header}>
                    <Link href={'https://github.com/michaelcalb'} target='_blank' rel='noopener noreferrer' className={styles.link}>
                        <GitHub className={styles.icon}/>
                        GitHub
                    </Link>
                    <Link href={'https://docs.michas.dev'} target='_blank' rel='noopener noreferrer' className={styles.link}>
                        <Docs className={styles.icon}/>
                        Docs
                    </Link>
                </header>
                <hr className={styles.hr}/>
                <ProjectList />
            </div>
        </Window>
    )
}
