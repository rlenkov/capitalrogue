import React from 'react'
import Layout from '../components/layout'
import Home from '../components/home'
import SEO from '../components/seo'

const BlogIndex = ({ location }) => {
    return (
        <Layout location={location}>
            <SEO title='All posts' />
            <Home />
        </Layout>
    )
}

export default BlogIndex
