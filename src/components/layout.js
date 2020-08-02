import React from 'react'
import CookieConsent from 'react-cookie-consent'
import { useStaticQuery, graphql } from 'gatsby'
import useScroll from '../custom-hooks/useScroll'
import Header from './header'
import Footer from './footer'
import 'normalize.css'

import styles from './layout.module.scss'

const Layout = props => {
    const { scrollY } = useScroll()

    const payload = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `,
    )

    const scrollToTop = () => {
        const isClient =
            typeof window === 'object' && typeof document === 'object'
        if (isClient) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const title = payload.site.siteMetadata.title
    return (
        <React.Fragment>
            <div className={styles.siteBase}>
                <Header
                    title={title}
                    pathname={props.location.pathname}
                    minimize={props.minimize}
                    color={props.color}
                />
                <div
                    className={
                        props.minimize
                            ? styles.siteContainer
                            : [
                                  styles.siteContainer,
                                  styles.adjustPadding,
                              ].join(' ')
                    }
                >
                    <main className={styles.articles}>{props.children}</main>
                </div>
                <Footer />
            </div>
            <div
                className={
                    scrollY > 100 ? styles.backButton : styles.backButtonHidden
                }
            >
                <button
                    className={styles.scrollButton}
                    type='button'
                    onClick={scrollToTop}
                >
                    <i className={styles.arrowUp} />
                </button>
            </div>
            <CookieConsent
                location='bottom'
                buttonText='Accept'
                declineButtonText='Decline'
                cookieName='gatsby-gdpr-google-analytics'
            >
                This website stores cookies on your computer. These cookies are
                used to collect information about how you interact with this
                website and allow us to remember you. We use this information in
                order to improve and customize your browsing experience and for
                analytics and metrics about our visitors on this website. If you
                decline, your information won’t be tracked when you visit this
                website.
            </CookieConsent>
        </React.Fragment>
    )
}

export default Layout
