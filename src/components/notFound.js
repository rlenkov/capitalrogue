import React, { useEffect } from 'react'
import { navigate } from 'gatsby'

import styles from './notFound.module.scss'

const NotFound = () => {
    useEffect(() => {
        navigate('/')
    }, [])

    return (
        <div className={styles.container}>
            <h1> Page not found!</h1>
            <h2>Redirecting...</h2>
        </div>
    )
}

export default NotFound
