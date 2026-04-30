'use client'

import { useSecret } from "@/contexts/SecretContext"
import useKeyDetector from "@/hooks/useKeyDetector"
import { useEffect, useRef } from "react"
import styles from './SecretInput.module.css'
import clsx from "clsx"

type SecretInputProps = {
    input: string
}

export default function SecretInput({ input }: SecretInputProps) {
    const { isUnlocked, unlock } = useSecret()
    const sequence = input.split('')
    const progress = useKeyDetector(sequence, !isUnlocked)

    const comboAudiosRef = useRef<HTMLAudioElement[]>([])
    const completeAudioRef = useRef<HTMLAudioElement | null>(null)
    const prevProgressRef = useRef<number>(0)

    useEffect(() => {
        comboAudiosRef.current = [
            new Audio('/combo-1.mp3'),
            new Audio('/combo-2.mp3'),
            new Audio('/combo-3.mp3'),
        ]

        comboAudiosRef.current.forEach((audio) => {
            audio.preload = 'auto'
        })

        completeAudioRef.current = new Audio('/combo-complete.mp3')
        completeAudioRef.current.preload = 'auto'
    }, [])

    useEffect(() => {
        if (progress > prevProgressRef.current) {
            const audioIndex = Math.min(progress - 1, comboAudiosRef.current.length - 1)
            const audioToPlay = comboAudiosRef.current[audioIndex]

            audioToPlay.currentTime = 0

            audioToPlay.play().catch((error) => {
                console.error('An audio was supposed to play but failed:', error)
            })
        }

        prevProgressRef.current = progress
    }, [progress, input.length])

    useEffect(() => {
        if (progress >= input.length && !isUnlocked) {

            const delayTimer = setTimeout(() => {
                unlock()

                completeAudioRef.current?.play().catch((error) => {
                    console.error('An audio was supposed to play but failed:', error)
                })
            }, 727)

            return () => clearTimeout(delayTimer)
        }
    }, [progress, input.length, isUnlocked, unlock])

    const completed = isUnlocked || progress >= input.length

    return (
        <span className={completed ? styles.completed : styles.container}>
            {sequence.map((letter, i) => (
                <span
                    key={i}
                    className={clsx(styles.letter, i < progress && styles.active)}
                    style={{ '--i': i } as React.CSSProperties}
                >
                    {letter}
                </span>
            ))}
        </span>
    )
}