'use client'

import Window from '@/components/Window/Window'
import styles from './page.module.css'
import StackIcon from 'tech-stack-icons'

const stackWebFront = [
	'typescript',
	'js',
	'css3',
	'html5',
	'react',
	'nextjs2',
	'electron',
]
const stackWebBack = ['nodejs', 'expressjs', 'nestjs', 'flask']
const stackDb = ['mongodb', 'mysql', 'postgresql', 'firebase']
const stackOther = ['python', 'c++']

export default function Home() {
	return (
		<Window title='Home'>
			<div className={styles.page}>
				<h2>Welcome</h2>
				<p>
					This is my personal internet corner, or a portfolio, if you
				</p>
				<p>
					I hope you enjoy your stay. <span className='mono'>:)</span>
				</p>
				<h2>My Stacks</h2>
				<p>For web:</p>
				<ul className={styles.stack}>
					{stackWebFront.map((stack) => (
						<li
							key={stack}
							aria-label={stack}
							data-tooltip={stack}
							className={styles.stackItem}
						>
							<StackIcon name={stack} />
						</li>
					))}
				</ul>
				<ul className={styles.stack}>
					{stackWebBack.map((stack) => (
						<li
							key={stack}
							aria-label={stack}
							data-tooltip={stack}
							className={styles.stackItem}
						>
							<StackIcon name={stack} />
						</li>
					))}
				</ul>
				<ul className={styles.stack}>
					{stackDb.map((stack) => (
						<li
							key={stack}
							aria-label={stack}
							data-tooltip={stack}
							className={styles.stackItem}
						>
							<StackIcon name={stack} />
						</li>
					))}
				</ul>

				<p>For other stuff:</p>
				<ul className={styles.stack}>
					{stackOther.map((stack) => (
						<li
							key={stack}
							aria-label={stack}
							data-tooltip={stack}
							className={styles.stackItem}
						>
							<StackIcon name={stack} />
						</li>
					))}
				</ul>

				<h2>I Also Enjoy</h2>
			</div>
		</Window>
	)
}
