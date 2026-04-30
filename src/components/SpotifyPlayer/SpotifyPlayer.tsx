'use client'

import Image from 'next/image'
import styles from './SpotifyPlayer.module.css'
import { SpotifyStatus } from "@/types/spotifyStatus";

export default function SpotifyPlayer({ spotifyStatus }: { spotifyStatus: SpotifyStatus | null }) {
    const start = spotifyStatus?.timestamps?.start
    const end = spotifyStatus?.timestamps?.end
    const duration = start && end ? end - start : 0
    const elapsed = start ? Date.now() - start : 0

    const albumArt = spotifyStatus?.album_art_url || '/song-template.jpg'
    const song = spotifyStatus?.song || 'Unknown Song'
    const artist = spotifyStatus?.artist ? spotifyStatus.artist.split(';').join(', ') : 'Unknown Artist'

    return (
        <div className={styles.spotifyPlayer}>
            <Image 
                src={albumArt}
                alt={`${song} by ${artist}`}
                width={64} 
                height={64}
                className={styles.img}
            />
            <div className={styles.details}>
                <div className={styles.text}>
                    <p className={styles.name} title={song}>{song}</p>
                    <p className={styles.author} title={artist}>{artist}</p>
                </div>
                <progress className={styles.progressBar} max={duration || 0} value={elapsed || 0} />
            </div>
        </div>
    )
}