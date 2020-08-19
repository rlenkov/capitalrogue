import React from 'react'
import Layout from '../components/layout'
import Home from '../components/home'
import SEO from '../components/seo'

const BlogIndex = ({ location }) => {
    return (
        <Layout location={location}>
            <SEO title='Blog' />
            <Home />
        </Layout>
    )
}

export default BlogIndex
