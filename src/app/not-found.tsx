import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
    return (
        <main className={styles.notFound}>
            <div className={styles.error}>
                <h1 className={styles.errorCode}>404</h1>
                <h2 className={styles.errorMessage}>Page Not Found</h2>
            </div>
            <figure className={styles.imgContainer}>
                {/*
                    im using a standard img tag to avoid Next.js Image optimization caching a random result, and to prevent hydration mismatches between the server and client.
                */}
                <img src='https://cataas.com/cat' alt='random cat' className={styles.img} />
                <figcaption className={styles.imgCaption}>
                    Image provided by <Link href='https://cataas.com/' target='_blank' rel='noopener noreferrer' className={styles.link}>Cataas</Link>
                </figcaption>
            </figure>
        </main>
    )
}