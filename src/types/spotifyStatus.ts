export type SpotifyStatus = {
    album_art_url: string | null
    artist: string | null
    song: string
    timestamps: {
        start: number
        end: number
    }
}