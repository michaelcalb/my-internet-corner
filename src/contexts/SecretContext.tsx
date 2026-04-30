'use client'

import React, { createContext, useCallback, useContext, useState, startTransition } from "react"
import { unlockCtf } from "@/app/actions/unlockCtf"

type SecretContextType = {
    isUnlocked: boolean
    unlock: () => void
}

const SecretContext = createContext<SecretContextType>({
    isUnlocked: false,
    unlock: () => {}
})

export function useSecret() {
    return useContext(SecretContext)
}

export function SecretProvider({
    initialUnlocked,
    children
}: {
    initialUnlocked: boolean
    children: React.ReactNode
}) {
    const [isUnlocked, setIsUnlocked] = useState(initialUnlocked)

    const unlock = useCallback(() => {
        if (!isUnlocked) {
            setIsUnlocked(true)
            startTransition(() => {
                unlockCtf()
            })
        }
    }, [isUnlocked])

    return (
        <SecretContext.Provider value={{ isUnlocked, unlock }}>
            {children}
        </SecretContext.Provider>
    )
}