'use client'

import Window from '@/components/Window/Window'
import styles from './page.module.css'
import StackIcon from 'tech-stack-icons'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

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
type StackVariant = 'light' | 'dark'
const subscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

function StackList({ stacks, variant, mounted }: { stacks: string[], variant: StackVariant, mounted: boolean }) {
	return (
		<ul className={styles.stack}>
			{stacks.map((stack) => (
				<li
					key={stack}
					aria-label={stack}
					data-tooltip={stack}
					className={styles.stackItem}
				>
					{mounted && <StackIcon name={stack} variant={variant} />}
				</li>
			))}
		</ul>
	)
}

export default function Home() {
	const { resolvedTheme } = useTheme()
	const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
	const stackVariant = resolvedTheme === 'dark' ? 'dark' : 'light'

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
				<StackList stacks={stackWebFront} variant={stackVariant} mounted={mounted} />
				<StackList stacks={stackWebBack} variant={stackVariant} mounted={mounted} />
				<StackList stacks={stackDb} variant={stackVariant} mounted={mounted} />

				<p>For other stuff:</p>
				<StackList stacks={stackOther} variant={stackVariant} mounted={mounted} />

				<h2>Hobbies</h2>
				<p>In my free time I like to play the piano, watch all sorts of movies (horror mostly), some animes, and play video games.</p>
			</div>
		</Window>
	)
}
