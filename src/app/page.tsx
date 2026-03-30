import Window from '@/components/Window/Window'
import styles from './page.module.css'

export default function Home() {
    return (
        <Window title="Home">
            <div className={styles.home}>
                <p>text goes here!</p>
            </div>
        </Window>
    )
}
