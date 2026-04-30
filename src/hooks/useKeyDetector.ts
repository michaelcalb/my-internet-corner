'use client'

import { useEffect, useRef, useState } from "react"

export default function useKeyDetector(sequence: string[], enabled: boolean) {
    const [progress, setProgress] = useState(0)
    const progressRef = useRef(0)

    useEffect(() => {
        if (!enabled) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === sequence[progressRef.current]) {
                progressRef.current += 1
                setProgress(progressRef.current)

                if (progressRef.current >= sequence.length) {
                    document.removeEventListener('keydown', handleKeyDown)
                }
            } else {
                progressRef.current = 0
                setProgress(0)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [sequence, enabled])

    return progress
}