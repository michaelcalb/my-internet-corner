'use client'

import styles from './AboutMe.module.css'
import type { TypewriterRule } from '@/types/typewriter'
import useTypewriter from '@/hooks/useTypewriter'
import Window from '../Window/Window'
import { useEffect, useState } from 'react'
import SecretInput from '../SecretInput/SecretInput'
import { useTimezoneDiff } from '@/hooks/useTimezoneDiff'
import { usePresence } from '@/contexts/LanyardContext'
import clsx from 'clsx'
import SpotifyPlayer from '../SpotifyPlayer/SpotifyPlayer'
import { Disc3, Gamepad2, GlobeOff, Monitor, Smartphone } from 'lucide-react'
import { SpotifyStatus } from '@/types/spotifyStatus'

const typewriterRules: TypewriterRule[] = [
	{ write: 'Michas' },
	{ delete: 1 },
	{ write: 'el' },
	{ write: 'calb' },
	{ delete: 6 },
	{ write: 's' },
]

const iconSize = 18

function getAge() {
	let currYear = new Date().getFullYear()
	if (new Date().getMonth() < 9 || (new Date().getMonth() === 9 && new Date().getDate() < 5)) {
		currYear -= 1
	}
	
	return currYear - 2005
}

export default function AboutMe() {
	const name = useTypewriter({ rules: typewriterRules, loopFrom: 1 })
	const [age, setAge] = useState<number | null>(null)
	const timezone = useTimezoneDiff()
	
	const status = usePresence()

	useEffect(() => {
		setAge(getAge())
	}, [])

	const discordStatus = status?.discord_status
	const gameActivity = status?.activities.find(
		(activity) => activity.type === 0
	)
	const spotifyStatus: SpotifyStatus | null = status?.listening_to_spotify ? status?.spotify : null
	
	const currentStatus: string | undefined = discordStatus === 'dnd' ? 'busy' : discordStatus

	const presenceIcon = status?.active_on_discord_desktop ? <Monitor size={iconSize} /> : status?.active_on_discord_mobile ? <Smartphone size={iconSize} /> : <GlobeOff size={iconSize} />

	return (
		<Window title='About Me' >
			<div className={styles.aboutMe}>
				<section className={styles.bio}>
					<h2 className={styles.bioTitle}>
						Hi, I&apos;m {name}
					</h2>
					<div className={styles.bioBox}>
						<p>I'm a {age}-year-old software developer from Brazil, focused on full stack web development and cybersecurity.</p>
						<p>I enjoy math and problem-solving, sometimes I also participate in <SecretInput input='CTF' />s, puzzle hunts, and other events.</p>
						<p className={styles.timezone}>{timezone}</p>
					</div>
				</section>
				<section className={clsx(styles.status, !status && styles.inactive, spotifyStatus && styles.showSpotify)}>
					<div className={styles.statusCardGroup}>
						<span className={clsx(styles.statusCard, styles.presenceCard, styles[currentStatus || ''])}>{presenceIcon}{currentStatus}</span>
						{gameActivity &&
							<span className={clsx(styles.statusCard, styles.activityCard)}><Gamepad2 size={iconSize} className={styles.statusIcon}/><span className={styles.currentActivity}>{gameActivity.name}</span></span>
						}
					</div>
					<div className={clsx(styles.spotifyBox, spotifyStatus && styles.showSpotify)}>
						<span className={clsx(styles.statusCard, styles.boxIndicator)}><Disc3 size={iconSize}/>Listening to</span>
						<SpotifyPlayer spotifyStatus={spotifyStatus} />
					</div>
				</section>
			</div>
		</Window>
	)
}