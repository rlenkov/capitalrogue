import React from 'react'
import { Link, graphql } from 'gatsby'
import {
    PinterestShareButton,
    TwitterShareButton,
    PinterestIcon,
    TwitterIcon,
    FacebookShareButton,
    FacebookIcon,
    EmailShareButton,
    EmailIcon,
} from 'react-share'
import { PostBanner, PostHero } from '../components/postHero'
import Paginator from '../components/paginator'

import styles from './blogPost.module.scss'

import Layout from '../components/layout'
import SEO from '../components/seo'

const BlogPostTemplate = ({ data, pageContext, location }) => {
    const post = data.markdownRemark
    const postList = data.allMarkdownRemark.edges
    const featuredList = [...data.site.siteMetadata.featured]
    const { previous, next, fbAppId } = pageContext

    const getFeaturedArticles = (elements, subset, localTitle) => {
        const banners = []
        elements.forEach(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            if (subset.includes(title) && title !== localTitle) {
                banners.push(
                    <PostHero
                        key={`home-page-banner-${node.fields.slug}`}
                        title={title}
                        slug={node.fields.slug}
                        excerpt=''
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

    const getRelatedArticles = (nodes, tags, localTitle) => {
        const banners = []
        nodes.forEach(({ node }) => {
            const postTagList = tags.split(' ')
            const articleTagList = node.frontmatter.tags.split(' ')
            const title = node.frontmatter.title || node.fields.slug
            if (
                articleTagList.some(r => postTagList.includes(r)) &&
                title !== localTitle
            ) {
                banners.push(
                    <li key={`advice-list-${node.fields.slug}`}>
                        <PostBanner
                            key={node.fields.slug}
                            title={title}
                            slug={node.fields.slug}
                            excerpt={node.excerpt}
                            description={node.frontmatter.description}
                            fluidImgData={
                                node.frontmatter.cover_image.childImageSharp
                                    .fluid
                            }
                            tags={node.frontmatter.tags}
                            date={node.frontmatter.date}
                        />
                    </li>,
                )
            }
        })
        if (banners.length !== 0) {
            return <Paginator elements={banners} />
        } else {
            return null
        }
    }

    const backgroundStyle = {
        backgroundImage: `url('${post.frontmatter.cover_image.childImageSharp.fluid.src}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
    }

    return (
        <Layout location={location} minimize color={post.frontmatter.color}>
            <SEO title={post.frontmatter.title} description={post.excerpt} />
            <div className={styles.container}>
                <header className={styles.postHeader} style={backgroundStyle}>
                    <h1
                        style={{
                            marginBottom: 0,
                        }}
                    >
                        {post.frontmatter.title}
                    </h1>
                    <h3 className={styles.tagList}>
                        {post.frontmatter.tags.split(' ').map(tag => (
                            <Link
                                key={`topic-selector-link-small-${tag}`}
                                to={'/topics'}
                                state={{ tag }}
                            >
                                {`#${tag.toLowerCase()}`}
                            </Link>
                        ))}
                    </h3>
                    <p
                        style={{
                            display: `block`,
                        }}
                    >
                        {post.frontmatter.date}
                    </p>
                    <div className={styles.socialHeader}>
                        <FacebookShareButton url={location.href}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <TwitterShareButton
                            url={location.href}
                            title={`CR-Blog - ${post.frontmatter.title}`}
                        >
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <PinterestShareButton
                            url={location.href}
                            description={`CR-Blog - ${post.frontmatter.title}`}
                            media={`${location.origin}/${post.frontmatter.cover_image.childImageSharp.fluid.src}`}
                        >
                            <PinterestIcon size={32} round />
                        </PinterestShareButton>
                        <EmailShareButton
                            url={location.href}
                            subject={`CR-Blog - ${post.frontmatter.title}`}
                        >
                            <EmailIcon size={32} round />
                        </EmailShareButton>
                    </div>
                    <span className={styles.credits}>
                        {post.frontmatter.credits}
                    </span>
                </header>
                <div className={styles.verticalDivider}>
                    <article
                        className={styles.section}
                        dangerouslySetInnerHTML={{ __html: post.html }}
                    />
                    <section className={styles.sideBar}>
                        <h3 className={styles.sideBarHeader}>Must Read:</h3>
                        <hr style={{}} />
                        {getFeaturedArticles(
                            postList,
                            featuredList,
                            post.frontmatter.title,
                        )}
                    </section>
                </div>
                <hr style={{}} />
            </div>
            <div className={styles.recommend}>
                <p>Other Articles:</p>
            </div>

            <nav>
                <ul
                    style={{
                        display: `flex`,
                        flexDirection: 'column',
                        flexWrap: `wrap`,
                        justifyContent: `space-between`,
                        listStyle: `none`,
                        padding: '20px',
                    }}
                >
                    {getRelatedArticles(
                        postList,
                        post.frontmatter.tags,
                        post.frontmatter.title,
                    )}
                </ul>
            </nav>
        </Layout>
    )
}

export default BlogPostTemplate

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                featured
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                credits
                cover_image {
                    childImageSharp {
                        fluid(maxWidth: 800, quality: 100) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                date(formatString: "MMMM DD, YYYY")
                description
                tags
                color
            }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
                                fluid(maxWidth: 830, quality: 100) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`
