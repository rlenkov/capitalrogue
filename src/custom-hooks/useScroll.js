import { useState, useEffect } from 'react'

function useScroll() {
    const [lastScrollTop, setLastScrollTop] = useState(0)
    const [bodyOffset, setBodyOffset] = useState({
        top: 0,
        left: 0,
    })
    const [scrollY, setScrollY] = useState(bodyOffset.top)
    const [scrollX, setScrollX] = useState(bodyOffset.left)
    const [scrollDirection, setScrollDirection] = useState()

    const listener = e => {
        setBodyOffset(document.body.getBoundingClientRect())
        const {
            top: offsetTop,
            left: offsetLeft,
        } = document.body.getBoundingClientRect()
        setScrollY(-offsetTop)
        setScrollX(offsetLeft)
        setScrollDirection(lastScrollTop > -offsetTop ? 'down' : 'up')
        setLastScrollTop(-offsetTop)
    }

    useEffect(() => {
        window.addEventListener('scroll', listener)
        return () => {
            window.removeEventListener('scroll', listener)
        }
    })

    return {
        scrollY,
        scrollX,
        scrollDirection,
    }
}

export default useScroll
