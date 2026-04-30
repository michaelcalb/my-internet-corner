'use client'

import { createContext, useContext } from 'react'
import { useLanyardWS } from 'use-lanyard'
import type { Types } from 'use-lanyard'

const LanyardContext = createContext<Types.Presence | undefined>(undefined)

export function usePresence() {
	return useContext(LanyardContext)
}

export function LanyardProvider({ children }: { children: React.ReactNode }) {
	const status = useLanyardWS('316699326581702657')

	return (
		<LanyardContext.Provider value={status}>
			{children}
		</LanyardContext.Provider>
	)
}
