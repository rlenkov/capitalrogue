import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Privacy from '../components/privacy'

const PrivacyPage = ({ location }) => {
    return (
        <Layout location={location}>
            <SEO title='Privacy Policy' />
            <Privacy />
        </Layout>
    )
}

export default PrivacyPage
