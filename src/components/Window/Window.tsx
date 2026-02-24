import styles from './Window.module.css'

export default function Window({ children, title }: { children: React.ReactNode, title: string }) {
    return (
        <div className={styles.window}>
            <div className={styles.titleBar}>
                <span className={styles.title}>{title}</span>
            </div>
            {children}
        </div>
    )
}