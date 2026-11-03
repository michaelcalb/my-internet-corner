import { cacheLife } from 'next/cache'
import Window from '@/components/Window/Window'
import styles from './page.module.css'

const FOLDER_ID = '1WO9jXsPzi74CRjtTO4r0o-PKo4S26_5N'

type DriveFile = {
	id: string
	name: string
	imageMediaMetadata?: { width: number; height: number }
}

async function getImages() {
	'use cache'
	cacheLife('hours')

	const images: DriveFile[] = []
	let pageToken = ''

	do {
		const params = new URLSearchParams({
			q: `'${FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`,
			fields: 'nextPageToken, files(id, name, imageMediaMetadata(width, height))',
			orderBy: 'createdTime desc',
			pageSize: '1000',
			pageToken,
			key: process.env.GOOGLE_DRIVE_API_KEY!,
		})
		const res = await fetch(
			`https://www.googleapis.com/drive/v3/files?${params}`,
		)
		if (!res.ok)
			throw new Error(`Drive API ${res.status}: ${await res.text()}`)
		const data: { files: DriveFile[]; nextPageToken?: string } =
			await res.json()

		images.push(...data.files)
		pageToken = data.nextPageToken ?? ''
	} while (pageToken)

	return images
}

export default async function KeepGoing() {
	const images = await getImages()

	return (
		<Window title='Keep Going'>
			<div className={styles.scroll}>
				<ul className={styles.list}>
					{images.map(({ id, name, imageMediaMetadata }) => (
						<li key={id}>
							<img
								src={`https://lh3.googleusercontent.com/d/${id}`}
								alt={name}
								width={imageMediaMetadata?.width}
								height={imageMediaMetadata?.height}
								loading='lazy'
								referrerPolicy='no-referrer'
								className={styles.image}
							/>
						</li>
					))}
				</ul>
			</div>
		</Window>
	)
}
