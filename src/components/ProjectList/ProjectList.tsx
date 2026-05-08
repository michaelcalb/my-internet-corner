import Link from 'next/link'
import styles from './ProjectList.module.css'
import { GitFork, Star } from 'lucide-react'
import clsx from 'clsx'
import { languageColors } from '@/utils/colors'

interface Project {
    id: number
    name: string
    html_url: string
    description: string
    fork: boolean
    stargazers_count: number
    language: string
}

const githubUsername = 'michaelcalb'

export default async function ProjectList() {
    const res = await fetch(`https://api.github.com/users/${githubUsername}/repos`, {
        next: { revalidate: 3600 }
    })
    const projects: Project[] = await res.json()

    return (
        <ul className={styles.projectList}>
            {projects
                .filter((p) => ![githubUsername, 'docs'].includes(p.name))
                .map((p, index) => (
                    <li key={p.id} className={styles.projectItem} style={{ '--i': index } as React.CSSProperties}>
                        <Link href={p.html_url} target="_blank" rel="noopener noreferrer" className={styles.projectCard}>
                            <div className={styles.header}>
                                <h3 className={styles.name}>{p.name}</h3>
                                <span className={styles.stars}><Star size='18' className={styles.starIcon} />&nbsp;{p.stargazers_count}</span>
                            </div>
                            <div className={styles.meta}>
                                {p.language && (
                                    <span className={styles.language}>
                                        <span className={styles.languageDot} style={{ backgroundColor: languageColors[p.language] || languageColors.default }} />
                                        &nbsp;{p.language}
                                    </span>
                                )}
                                {p.fork && <span className={styles.fork}><GitFork size='14' />&nbsp;forked</span>}
                            </div>
                            {p.description ? <p className={styles.description} title={p.description}>{p.description}</p> : <p className={clsx(styles.description, styles.noDescription)}>No description</p>}
                        </Link>
                    </li>
                ))}
        </ul>
    )
}