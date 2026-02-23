export type TypewriterRule = {
    write: string
} | {
    delete: number
}

export interface Typewriter {
    rules: TypewriterRule[]
    delay?: number
    cooldown?: number
    loopFrom?: number
}