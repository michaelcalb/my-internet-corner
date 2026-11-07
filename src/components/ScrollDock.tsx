'use client'

import { useEffect } from 'react'

export default function ScrollDock() {
    useEffect(() => {
        const root = document.documentElement
        const update = () =>
            root.toggleAttribute(
                'data-docked',
                window.scrollY + window.innerHeight >= root.scrollHeight - 2
            )

        update()
        window.addEventListener('scroll', update, { passive: true })
        window.addEventListener('resize', update)
        return () => {
            window.removeEventListener('scroll', update)
            window.removeEventListener('resize', update)
            root.removeAttribute('data-docked')
        }
    }, [])

    return null
}
