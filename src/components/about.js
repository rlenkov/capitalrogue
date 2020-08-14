import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { PostHero, PostBanner } from './postHero'
import styles from './about.module.scss'

const About = () => {
    const payload = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        featured
                        tags
                    }
                }
                aboutImage: imageSharp(
                    id: { eq: "3f37d004-0b3b-5283-8ed6-d878ce6826e5" }
                ) {
                    fluid(maxWidth: 630, quality: 100) {
                        ...GatsbyImageSharpFluid
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
            <div className={styles.aboutBox}>
                <h1 className={styles.centered}>CR = Capital Rogue</h1>
                <p className={styles.centered}>
                    CR Blog is a <span>haven</span> for the urban survivors of
                    our modern age.
                </p>
                <Img
                    fluid={payload.aboutImage.fluid}
                    objectFit='cover'
                    style={{
                        maxWidth: '600px',
                        cursor: 'pointer',
                    }}
                    className={styles.aboutImage}
                />
                <p>
                    <span>Capitalrogues</span> are not the faint-hearted, coward
                    ones. They are the ones who <span>challenge systems</span>,
                    find new solutions, and leave their stamp of{' '}
                    <span>creativity on the world </span>
                    around them.
                </p>
                <p className={styles.right}>
                    Here we write about money, urban gossips, online{' '}
                    <span>tricksters</span>, modern <span>shenanigans</span>,
                    food and lifestyle. Basically everything to set you up for a{' '}
                    <span>good hunt </span> in the city wherever that city is.
                </p>
                <hr />
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
                        <p className={styles.centered}>
                            If you like our work feel free to{' '}
                            <a href={'mailto:capitalrogue@gmail.com'}>
                                get in touch
                            </a>{' '}
                            or see who's running the "shop"{' '}
                            <Link to={`/contact`}>here</Link>.
                        </p>{' '}
                    </div>
                </div>
                <hr />
            </div>
            <div className={styles.sideBar}>{featuredPostBanners}</div>
        </div>
    )
}

export default About
