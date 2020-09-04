const path = require(`path`)
const fs = require('fs')
const fb = require('./src/storage/firebase')
const { createFilePath } = require(`gatsby-source-filesystem`)
require('dotenv').config()

exports.onPreBootstrap = async () => {
    // clear blog cache
    const postPath = path.resolve(__dirname, `./content/blog/`)
    await fs.promises.rmdir(postPath, { recursive: true })
    await fs.promises.mkdir(postPath, { recursive: true })
    await fb.getAllFiles('capital-rogue')
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode })
        createNodeField({
            name: `slug`,
            node,
            value,
        })
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const blogPost = path.resolve(`./src/templates/blog-post.js`)
    const result = await graphql(
        `
            {
                allMarkdownRemark(
                    sort: { fields: [frontmatter___date], order: DESC }
                    limit: 1000
                ) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                            frontmatter {
                                title
                                cover_image {
                                    childImageSharp {
                                        fluid(quality: 100, maxWidth: 800) {
                                            base64
                                            aspectRatio
                                            src
                                            srcSet
                                            sizes
                                        }
                                    }
                                }
                                date(formatString: "MMMM DD, YYYY")
                                tags
                                color
                            }
                        }
                    }
                }
            }
        `,
    )

    if (result.errors) {
        throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
        const previous =
            index === posts.length - 1 ? null : posts[index + 1].node
        const next = index === 0 ? null : posts[index - 1].node

        createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
                slug: post.node.fields.slug,
                fbAppId: process.env.FACEBOOK_APP_ID || null,
                previous,
                next,
            },
        })
    })
}
