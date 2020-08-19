import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Disclaimer from '../components/disclaimer'

const DisclaimerPage = ({ location }) => {
    return (
        <Layout location={location}>
            <SEO title='Disclaimer' description='Disclaimer' />
            <Disclaimer />
        </Layout>
    )
}

export default DisclaimerPage
