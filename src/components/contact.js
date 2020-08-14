import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { PostHero, PostBanner } from './postHero'

import styles from './contact.module.scss'

const Contact = () => {
    const payload = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        featured
                        tags
                    }
                }
                siteLogo: imageSharp(
                    id: { eq: "30028086-752c-5d0a-8076-1746a2af404f" }
                ) {
                    fluid(maxWidth: 630, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
                allMarkdownRemark(
                    sort: { fields: [frontmatter___date], order: DESC }
                ) {
                    edges {
                        node {
                            excerpt
                            fields {
                                slug
                            }
                            frontmatter {
                                date(formatString: "MMMM DD, YYYY")
                                title
                                description
                                tags
                                cover_image {
                                    childImageSharp {
                                        fluid(maxWidth: 630, quality: 100) {
                                            ...GatsbyImageSharpFluid
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `,
    )

    const getSubsetHeros = (elements, subset) => {
        const banners = []
        elements.forEach(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            if (subset.includes(title) && banners.length < 3) {
                banners.push(
                    <PostHero
                        key={`home-page-banner-${node.fields.slug}`}
                        title={title}
                        slug={node.fields.slug}
                        excerpt={node.excerpt}
                        description={node.frontmatter.description}
                        fluidImgData={
                            node.frontmatter.cover_image.childImageSharp.fluid
                        }
                        tags={node.frontmatter.tags}
                        date={node.frontmatter.date}
                        side
                    />,
                )
            }
        })
        return banners
    }

    const posts = payload.allMarkdownRemark.edges
    const featured = [...payload.site.siteMetadata.featured]
    const featuredPostBanners = getSubsetHeros(posts, featured)

    return (
        <div className={styles.container}>
            <div className={styles.contactBox}>
                <div className={styles.logoBox}>
                    <Img
                        fluid={payload.siteLogo.fluid}
                        objectFit='cover'
                        style={{
                            maxWidth: '200px',
                            cursor: 'pointer',
                            margin: 'auto',
                        }}
                    />
                    <div className={styles.overImageBox}>
                        <h1>Contact</h1>
                    </div>
                </div>
                <p>
                    <span>Hi there!</span>
                </p>
                <p>
                    This page is managed, created, and written by{' '}
                    <a href={'https://www.lenkovits-develops.com/'}>this guy</a>
                    . Feel free to <span>get in touch </span>{' '}
                    <a href={'mailto:richard.lenkovits@gmail.com'}>via mail</a>{' '}or if
                    you're curious what this blog is about have a look{' '}
                    <Link to={`/about`}>here</Link>.
                </p>
                <p>
                    If you have any comments, post related questions or
                    interview questions please don’t hesitate to contact me.
                    I’ll do my best to answer, and your question might just make
                    it onto the blog!
                </p>
                <hr />
            </div>
            <div className={styles.sideBar}>{featuredPostBanners}</div>
        </div>
    )
}

export default Contact
