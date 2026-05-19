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

function StackList({ stacks }: { stacks: string[] }) {
	return (
		<ul className={styles.stack}>
			{stacks.map((stack) => (
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
	)
}

export default function Home() {
	return (
		<Window title='Home'>
			<div className={styles.page}>
				<h2>Welcome</h2>
				<p>
					This is my personal internet corner, or a portfolio, if you
					will.
				</p>
				<p>
					Feel free to check out my projects, get in touch or just
					explore around, you might find a thing or two.
				</p>
				<p>
					I hope you enjoy your stay. <span className='mono'>:)</span>
				</p>
                
				<h2>My Stacks</h2>
				<p>For web:</p>
				<StackList stacks={stackWebFront} />
				<StackList stacks={stackWebBack} />
				<StackList stacks={stackDb} />

				<p>For other stuff:</p>
				<StackList stacks={stackOther} />

				<h2>I Also Enjoy</h2>
				<p>In my free time, I play the piano</p>
			</div>
		</Window>
	)
}
