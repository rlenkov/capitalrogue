import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

import styles from './header.module.scss'

export const Header = props => {
    const [navbarDrawn, toggleNavbar] = useState(false)

    useEffect(() => {
        const isClient =
            typeof window === 'object' && typeof document === 'object'
        if (isClient) {
            if (navbarDrawn) {
                document.body.style.overflow = 'hidden'
                document.body.style.height = '100vh'
            } else {
                document.body.style.overflow = 'visible'
                document.body.style.height = 'unset'
            }
        }
    }, [navbarDrawn])

    const toggleClick = () => {
        toggleNavbar(!navbarDrawn)
    }

    const closeNavBar = (targetPath = '/') => {
        if (props.pathname.includes(targetPath)) {
            toggleNavbar(false)
        }
    }

    return (
        <header className={styles.header}>
            <div className={styles.headerBox}>
                <h1
                    className={styles.headline}
                    onClick={() => {
                        closeNavBar('/')
                    }}
                    title='Capital Rogue'
                >
                    <Link to={`/`}>{props.title}</Link>
                </h1>
                <div className={styles.hamburgerLocal}>
                    <button
                        style={{
                            outline: 'none',
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}
                        onClick={toggleClick}
                        className={
                            navbarDrawn
                                ? [
                                      styles.hamburger,
                                      styles.hamburgerCollapseR,
                                      styles.isActive,
                                  ].join(' ')
                                : [
                                      styles.hamburger,
                                      styles.hamburgerCollapseR,
                                  ].join(' ')
                        }
                        type='button'
                    >
                        <span className={styles.hamburgerBox}>
                            <span
                                style={{
                                    backgroundColor: `#ffffff`,
                                }}
                                className={styles.hamburgerInner}
                            ></span>
                        </span>
                    </button>
                </div>
            </div>
            <div
                className={
                    navbarDrawn
                        ? [styles.drawer, styles.open].join(' ')
                        : [styles.drawer, styles.closed].join(' ')
                }
            >
                <nav className={styles.drawerNav}>
                    <Link
                        className={styles.drawerLink}
                        activeClassName={[
                            styles.drawerLink,
                            styles.activeLink,
                        ].join(' ')}
                        onClick={() => {
                            closeNavBar('/')
                        }}
                        to={`/`}
                    >
                        Home
                    </Link>
                    <Link
                        className={styles.drawerLink}
                        activeClassName={[
                            styles.drawerLink,
                            styles.activeLink,
                        ].join(' ')}
                        onClick={() => {
                            closeNavBar('/topics')
                        }}
                        to={`/topics`}
                    >
                        Topics
                    </Link>
                    <div className={styles.drawerNavOther}>
                        <Link
                            className={styles.drawerLinkSmall}
                            activeClassName={[
                                styles.drawerLinkSmall,
                                styles.activeLink,
                            ].join(' ')}
                            onClick={() => {
                                closeNavBar(`/contact`)
                            }}
                            to={`/contact`}
                        >
                            Contact
                        </Link>
                        <Link
                            className={styles.drawerLinkSmall}
                            activeClassName={[
                                styles.drawerLinkSmall,
                                styles.activeLink,
                            ].join(' ')}
                            onClick={() => {
                                closeNavBar(`/privacy`)
                            }}
                            to={`/privacy`}
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            className={styles.drawerLinkSmall}
                            activeClassName={[
                                styles.drawerLinkSmall,
                                styles.activeLink,
                            ].join(' ')}
                            onClick={() => {
                                closeNavBar(`/disclaimer`)
                            }}
                            to={`/disclaimer`}
                        >
                            Disclaimer
                        </Link>
                        <Link
                            className={styles.drawerLinkSmall}
                            activeClassName={[
                                styles.drawerLinkSmall,
                                styles.activeLink,
                            ].join(' ')}
                            onClick={() => {
                                closeNavBar(`/tos`)
                            }}
                            to={`/tos`}
                        >
                            Terms of Use
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

Header.propTypes = {
    title: PropTypes.string,
    pathname: PropTypes.string,
    minimize: PropTypes.bool,
    color: PropTypes.string,
}

Header.defaultProps = {
    minimize: false,
    pathname: '',
    color: null,
}

export default Header
