'use client'

import { useEffect, useState } from "react"

export function useTimezoneDiff() {
    const [timeMessage, setTimeMessage] = useState<string>('')
    const targetOffsetHours = -3
    
    useEffect(() => {
        const userOffsetMinutes = new Date().getTimezoneOffset()
        const userOffsetHours = -userOffsetMinutes / 60
        const diff = targetOffsetHours - userOffsetHours

        if (diff === 0) {
            setTimeMessage('We are in the same timezone!')
        } else {
            const absoluteDiff = Math.abs(diff)
            let timeString = ''

            if (absoluteDiff < 1) {
                const minutes = Math.round(absoluteDiff * 60)
                timeString = `${minutes} minute${minutes !== 1 ? 's' : ''}`
            } else {
                timeString = `${absoluteDiff} hour${absoluteDiff !== 1 ? 's' : ''}`
            }
            setTimeMessage(`I am ${timeString} ${diff > 0 ? 'ahead of' : 'behind'} you.`)
        }
    }, [targetOffsetHours])

    return timeMessage
}