import { useEffect, useRef, useState } from "react";
import type { Typewriter } from "../types";

export default function useTypewriter({ rules, delay = 100, cooldown = 1000, loopFrom }: Typewriter) {
    const [text, setText] = useState('')
    const textRef = useRef('')
    const ruleIndexRef = useRef(0)
    const charIndexRef = useRef(0)

    useEffect(() => {
        if (!rules.length) return

        let timerId: ReturnType<typeof setTimeout>

        const finishRule = (nextDelay: number) => {
            charIndexRef.current = 0
            const advanced = advanceRule()
            if (advanced) {
                timerId = setTimeout(tick, nextDelay)
            }
        }

        const tick = () => {
            const rule = rules[ruleIndexRef.current]

            if ('write' in rule) {
                if (charIndexRef.current < rule.write.length) {
                    textRef.current += rule.write[charIndexRef.current]
                    setText(textRef.current)
                    charIndexRef.current++
                    timerId = setTimeout(tick, delay)
                } else {
                    finishRule(cooldown)
                }
            } else if ('delete' in rule) {
                if (charIndexRef.current < rule.delete && textRef.current.length > 0) {
                    textRef.current = textRef.current.slice(0, -1)
                    setText(textRef.current)
                    charIndexRef.current++
                    timerId = setTimeout(tick, delay)
                } else {
                    finishRule(delay)
                }
            }
        }

        const advanceRule = (): boolean => {
            if (ruleIndexRef.current + 1 >= rules.length) {
                if (loopFrom !== undefined) {
                    ruleIndexRef.current = loopFrom
                    return true
                }
                return false
            }
            ruleIndexRef.current++
            return true
        }

        timerId = setTimeout(tick, delay)

        return () => clearTimeout(timerId)
    }, [rules, delay, cooldown, loopFrom])

    return text
}