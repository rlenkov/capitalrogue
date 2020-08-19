import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Topics from '../components/topics'

const TopicsPage = props => {
    return (
        <Layout location={props.location}>
            <SEO
                title='Topics'
                description='Discover our topics at CR! Blog.'
            />
            <Topics
                tags={props.data.site.siteMetadata.tags}
                meta={props.location.state}
            />
        </Layout>
    )
}

export default TopicsPage

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                tags
            }
        }
    }
`
