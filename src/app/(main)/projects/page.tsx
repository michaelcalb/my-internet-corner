import ProjectList from '@/components/ProjectList/ProjectList'
import styles from './page.module.css'
import Window from '@/components/Window/Window'

export default function Projects() {
    return (
        <Window title="Projects">
            <div className={styles.projects}>
                <ProjectList />
            </div>
        </Window>
    )
}
