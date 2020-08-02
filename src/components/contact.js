import React from 'react'

import styles from './contact.module.scss'

const Contact = () => {
    return (
        <div className={styles.container}>
            <h1>Contact</h1>
            <p>Get in touch!</p>
            <a href={'mailto:capitalrogue@gmail.com'}>capitalrogue@gmail.com</a>
        </div>
    )
}

export default Contact
