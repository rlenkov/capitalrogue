import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Contact from '../components/contact'

const ContactPage = ({ location }) => {
    return (
        <Layout location={location}>
            <SEO title='Contact' />
            <Contact />
        </Layout>
    )
}

export default ContactPage
