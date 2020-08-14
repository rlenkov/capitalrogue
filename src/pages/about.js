import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import About from '../components/about'

const AboutPage = props => {
    return (
        <Layout location={props.location}>
            <SEO title='About' />
            <About />
        </Layout>
    )
}

export default AboutPage
