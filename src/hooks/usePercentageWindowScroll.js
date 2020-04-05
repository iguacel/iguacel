import {useState, useEffect, useRef} from 'react'
import {percentage} from '../utils/helpers'

const isClient = typeof window === 'object'

export default function usePercentageWindowScroll() {
    const frame = useRef(0)
    const [coords, setCoords] = useState({
        y: isClient ? window.scrollY : 0,
        p: percentage(
            isClient ? window.scrollY : 0,
            isClient ? document.documentElement.scrollHeight - window.innerHeight : 0
        ),
    })
    useEffect(() => {
        // handler
        const handler = () => {
            cancelAnimationFrame(frame.current)
            frame.current = requestAnimationFrame(() => {
                setCoords({
                    y: window.scrollY,
                    p: percentage(
                        isClient ? window.scrollY : 0,
                        isClient ? document.documentElement.scrollHeight - window.innerHeight : 0
                    ),
                })
            })
        }
        // Add listener
        window.addEventListener('scroll', handler, {
            capture: false,
            passive: true,
        })
        // Cleanup
        return () => {
            cancelAnimationFrame(frame.current)
            window.removeEventListener('scroll', handler)
        }
    }, [])
    // return
    return coords
}
