import React from 'react'

import styles from './contact.module.scss'

const About = () => {
    return (
        <div className={styles.container}>
            <h1>About</h1>
            <p>Get in touch!</p>
            <a href={'mailto:capitalrogue@gmail.com'}>capitalrogue@gmail.com</a>
        </div>
    )
}

export default About
