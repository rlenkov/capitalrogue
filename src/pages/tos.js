import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Tos from '../components/tos'

const TosPage = ({ location }) => {
    return (
        <Layout location={location}>
            <SEO title='Terms of Service' />
            <Tos />
        </Layout>
    )
}

export default TosPage
