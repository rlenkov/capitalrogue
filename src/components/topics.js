import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import { PostBanner } from './postHero'

import styles from './topics.module.scss'

const Topics = props => {
    const [topicsSelected, setTopics] = useState('All')

    useEffect(() => {
        if (props.meta && props.meta.tag) {
            setTopics(props.meta.tag)
        }
    }, [])

    const payload = useStaticQuery(
        graphql`
            query {
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

    const getArticlesOfTag = (nodes, tag) => {
        const articleList = []
        nodes.forEach(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            if (tag === 'All' || node.frontmatter.tags.includes(tag)) {
                articleList.push(
                    <PostBanner
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
                    />,
                )
            }
        })
        return articleList
    }

    const posts = payload.allMarkdownRemark.edges
    const topicList = ['All', ...props.tags]

    return (
        <div className={styles.container}>
            <h1>{topicsSelected}</h1>
            <div className={styles.selectorBlock}>
                {topicList.map(tag => (
                    <button
                        key={`tag-selector-button-${tag}`}
                        className={
                            topicsSelected === tag
                                ? [styles.selector, styles.focus].join(' ')
                                : styles.selector
                        }
                        type='button'
                        onClick={() => {
                            setTopics(tag)
                        }}
                    >
                        <span>{tag}</span>
                    </button>
                ))}
            </div>
            {getArticlesOfTag(posts, topicsSelected)}
        </div>
    )
}

Topics.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string),
}

Topics.defaultProps = {
    tags: [],
}

export default Topics
