import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Contact from '../components/contact'

const ContactPage = ({ location }) => {
    return (
        <Layout location={location}>
            <SEO
                title='Contact'
                description='Get in touch with the creators of CR! Blog.'
            />
            <Contact />
        </Layout>
    )
}

export default ContactPage
