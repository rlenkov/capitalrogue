import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import About from '../components/about'

const AboutPage = props => {
    return (
        <Layout location={props.location}>
            <SEO
                title='About'
                description='CR Blog is a haven for the urban survivors of our modern age.'
            />
            <About />
        </Layout>
    )
}

export default AboutPage
