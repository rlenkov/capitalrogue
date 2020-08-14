import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { Link, navigate } from 'gatsby'

import styles from './postHero.module.scss'

export const PostHero = props => {
    return (
        <article className={styles.article}>
            <header className={styles.articleHeader}>
                <h3>
                    <Link to={props.slug}>{props.title}</Link>
                </h3>
                <small className={styles.date}>{props.date}</small>

                <p className={styles.tagLine}>
                    {props.tags.split(' ').map(tag => (
                        <span
                            style={{ marginRight: '5px' }}
                            key={`topic-reference-banner-${tag}`}
                        >{`#${tag.toLowerCase()}`}</span>
                    ))}
                </p>
            </header>
            <div
                onClick={() => {
                    navigate(props.slug)
                }}
            >
                <Img
                    fluid={props.fluidImgData}
                    objectFit='cover'
                    style={{ maxWidth: '630px', cursor: 'pointer' }}
                    className={styles.imageBox}
                />
            </div>
            <section
                onClick={() => {
                    navigate(props.slug)
                }}
                className={styles.excerpt}
            >
                <p
                    dangerouslySetInnerHTML={{
                        __html: props.excerpt,
                    }}
                />
            </section>
        </article>
    )
}

PostHero.propTypes = {
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    description: PropTypes.string,
    fluidImgData: PropTypes.object.isRequired,
}

PostHero.defaultProps = {
    description: null,
}

export const PostBanner = props => {
    return (
        <article
            className={styles.banner}
            onClick={() => {
                navigate(props.slug)
            }}
        >
            <Img
                fluid={props.fluidImgData}
                objectFit='cover'
                imgStyle={{ objectFit: 'cover' }}
                className={styles.bannerImageBox}
            />

            <header className={styles.bannerHeader}>
                <h3>
                    <Link to={props.slug}>{props.title}</Link>
                </h3>
                <small className={styles.date} >{props.date}</small>
                <p className={styles.tagLine}>
                    {props.tags.split(' ').map(tag => (
                        <span
                            style={{
                                marginRight: '5px',
                                display: 'inline-block',
                            }}
                            key={`topic-reference-banner-${tag}`}
                        >{`#${tag.toLowerCase()}`}</span>
                    ))}
                </p>
            </header>
        </article>
    )
}

PostBanner.propTypes = {
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    fluidImgData: PropTypes.object.isRequired,
}

export default PostHero
