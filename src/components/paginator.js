import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import styles from './home.module.scss'

const Paginator = props => {
    const [blockState, setBlockState] = useState({ 'block-paginator-1': true })
    const [observerState, setObserverState] = useState({})

    useEffect(() => {
        const isClient = typeof window === 'object'
        if (isClient) {
            const firstBoxElement = document.getElementById(`block-paginator-1`)
            const dynamicElements = [firstBoxElement]
            if (props.elements.length > 5) {
                const blockCount = Math.ceil(props.elements.length / 5)
                const preBlockState = { ...blockState }
                for (let i = 2; i === blockCount; i++) {
                    preBlockState[`block-paginator-${i}`] = false
                    const boxElement = document.getElementById(
                        `block-paginator-${i}`,
                    )
                    dynamicElements.push(boxElement)
                }
                setBlockState(preBlockState)
            }

            const observer = new IntersectionObserver((entries, observer) => {
                const objectCopy = {}
                entries.forEach(entry => {
                    const elementId = entry.target.getAttribute('id')
                    objectCopy[elementId] = entry.isIntersecting ? true : false
                })
                setObserverState(objectCopy)
            })
            dynamicElements.forEach(elem => {
                observer.observe(elem)
            })
            return () => {
                observer.disconnect()
            }
        }
    }, [])

    useEffect(() => {
        const copyStates = { ...blockState }
        let change = false
        Object.entries(observerState).map(([key, value]) => {
            if (value && copyStates[key] !== value) {
                copyStates[key] = value
                change = true
            }
        })
        if (change) {
            setBlockState(copyStates)
        }
    }, [observerState])

    const revealBlock = blockId => {
        const objectCopy = { ...blockState }
        if (objectCopy[blockId] !== undefined) {
            objectCopy[blockId] = true
            setBlockState(objectCopy)
        }
    }

    const getDynamicBoxes = bannerList => {
        const divisionCount = Math.ceil(props.elements.length / 5)
        const divisionBlocks = []
        for (let k = 1; k <= divisionCount; k++) {
            const revealState = blockState[`block-paginator-${k}`]
            const prevRevealState = blockState[`block-paginator-${k - 1}`]
            const listSlice = bannerList.slice((k - 1) * 5, k * 5 - 1)
            const placeHolder = (
                <div className={styles.placeHolder}>
                    <i
                        className={styles.arrowDown}
                        onClick={() => {
                            revealBlock(`block-paginator-${k}`)
                        }}
                    />
                </div>
            )
            const showPlaceHolder =
                prevRevealState === true && revealState === false
            divisionBlocks.push(
                <React.Fragment key={`block-paginator-${k}`}>
                    <div
                        id={`block-paginator-${k}`}
                        className={
                            revealState ? styles.revealBlock : styles.hideBlock
                        }
                    >
                        {revealState ? listSlice : null}
                    </div>
                    {showPlaceHolder ? placeHolder : null}
                </React.Fragment>,
            )
        }
        return divisionBlocks
    }

    const dividedBanner = getDynamicBoxes(props.elements)
    return <React.Fragment>{dividedBanner}</React.Fragment>
}

Paginator.propTypes = {
    elements: PropTypes.arrayOf(PropTypes.element),
}

Paginator.defaultProps = {
    elements: [],
}

export default Paginator
