import { Minus, Square, X } from 'lucide-react'
import clsx from 'clsx'
import styles from './Window.module.css'

export default function Window({
	children,
	title,
}: {
	children: React.ReactNode
	title: string
}) {
	return (
		<div className={styles.window}>
			<div className={styles.titleBar}>
				<span className={styles.title}>{title}</span>
				<span className={styles.controlBtnGroup}>
					<button className={styles.controlBtn}>
						<Minus size={16} />
					</button>
					<button className={styles.controlBtn}>
						<Square size={14} />
					</button>
					<button
						className={clsx(styles.controlBtn, styles.closeBtn)}
					>
						<X size={18} />
					</button>
				</span>
			</div>
			<div className={styles.content}>{children}</div>
		</div>
	)
}
