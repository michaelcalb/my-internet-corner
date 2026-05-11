'use client'

import { useState } from 'react'

export type Theme = 'light' | 'dark'

const storageKey = 'theme'

function isTheme(value: string | null): value is Theme {
    return value === 'light' || value === 'dark'
}

function getInitialTheme(): Theme {
    if (typeof window === 'undefined') {
        return 'dark'
    }

    const savedTheme = localStorage.getItem(storageKey)

    if (isTheme(savedTheme)) {
        return savedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(getInitialTheme)

    function updateTheme(nextTheme: Theme) {
        document.documentElement.dataset.theme = nextTheme
        document.documentElement.style.colorScheme = nextTheme
        localStorage.setItem(storageKey, nextTheme)
        setTheme(nextTheme)
    }

    return {
        theme,
        setTheme: updateTheme,
    }
}
