import React from 'react'
import { Link } from 'gatsby'
// import PropTypes from 'prop-types'

import styles from './footer.module.scss'

export const Footer = props => {
    return (
        <footer className={styles.footer}>
            <p>© {new Date().getFullYear()}, CapitalRogue</p>
            <nav className={styles.navbar}>
                <Link to={`/contact`}>Contact</Link>
                <Link to={`/privacy`}>Privacy Policy</Link>
                <Link to={`/disclaimer`}>Disclaimer</Link>
                <Link to={`/tos`}>Terms of Use</Link>
            </nav>
        </footer>
    )
}

// Footer.propTypes = {
//     title: PropTypes.string,
// }

export default Footer
