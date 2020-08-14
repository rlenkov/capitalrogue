import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql, Link, navigate } from 'gatsby'
import { PostHero, PostBanner } from './postHero'
import Paginator from './paginator'

import styles from './home.module.scss'

const Home = () => {
    const payload = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        featured
                        tags
                    }
                }
                imageSharp(id: { eq: "30028086-752c-5d0a-8076-1746a2af404f" }) {
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

    const getSubsetBanners = (elements, subset) => {
        const banners = []
        elements.forEach(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            if (subset.includes(title)) {
                banners.push(
                    <PostBanner
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
                    />,
                )
            }
        })
        return <Paginator elements={banners} />
    }

    const getSubsetHeros = (elements, subset) => {
        const banners = []
        elements.forEach(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            if (subset.includes(title)) {
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
                    />,
                )
            }
        })
        return <Paginator elements={banners} />
    }

    const getPostHero = (elements, criteria) => {
        let heroPost
        elements.forEach(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            if (title === criteria) {
                heroPost = (
                    <PostHero
                        key={node.fields.slug}
                        title={title}
                        slug={node.fields.slug}
                        excerpt={node.excerpt}
                        description={node.frontmatter.description}
                        fluidImgData={
                            node.frontmatter.cover_image.childImageSharp.fluid
                        }
                        tags={node.frontmatter.tags}
                        date={node.frontmatter.date}
                    />
                )
            }
        })
        return heroPost
    }
    const posts = payload.allMarkdownRemark.edges
    const featured = [...payload.site.siteMetadata.featured]
    const mainPost = featured.shift()
    const nonFeatured = posts
        .filter(
            ({ node }) =>
                !payload.site.siteMetadata.featured.includes(
                    node.frontmatter.title,
                ),
        )
        .map(({ node }) => node.frontmatter.title)

    const postHero = getPostHero(posts, mainPost)
    const featuredPostBanners = getSubsetHeros(posts, featured)
    const nonFeaturedPostBanners = getSubsetBanners(posts, nonFeatured)

    return (
        <React.Fragment>
            <div className={styles.homeContainer}>
                <div className={styles.newsFeed}>
                    {postHero}
                    <div className={styles.nonFeaturedPc}>
                        {nonFeaturedPostBanners}
                    </div>
                </div>
                <div className={styles.sideBar}>
                    {featuredPostBanners}
                    <hr />
                    <div
                        className={styles.welcome}
                        onClick={() => {
                            navigate('/about')
                        }}
                    >
                        <div className={styles.overImageWelcome}>
                            <h3>Welcome to CR blog!</h3>
                            <p>
                                A place where the modern urban survivor can find
                                all the exciting topics, tips and tricks
                                necessary to thrive!
                            </p>
                        </div>
                        <Img
                            fluid={payload.imageSharp.fluid}
                            objectFit='cover'
                            style={{
                                maxWidth: '200px',
                                cursor: 'pointer',
                                margin: 'auto',
                            }}
                        />
                    </div>
                    <hr />
                    <div className={styles.linkBox}>
                        <h2>Topics</h2>
                        <div className={styles.links}>
                            {payload.site.siteMetadata.tags.map(tag => {
                                return (
                                    <Link
                                        key={`topic-selector-link-${tag}`}
                                        className={styles.featuredLinks}
                                        to={'topics'}
                                        state={{ tag }}
                                    >
                                        {tag}
                                    </Link>
                                )
                            })}
                        </div>
                        <hr />
                    </div>
                </div>

                <div className={styles.nonFeaturedMobile}>
                    {nonFeaturedPostBanners}
                </div>
            </div>
        </React.Fragment>
    )
}

// Topics.propTypes = {
//     tags: PropTypes.arrayOf(PropTypes.string),
// }

// Topics.defaultProps = {
//     tags: [],
// }

export default Home
