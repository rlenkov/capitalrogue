module.exports = {
    siteMetadata: {
        title: `CR!`,
        author: {
            name: `Richard Lenkovits`,
        },
        description: `A blog for the capitalist rogue.`,
        siteUrl: `https://capitalrogue.com/`,
        tags: ['Food', 'Money', 'Learning', 'Memes', 'Media'],
        featured: [
            `Make money with these 6 online business platforms`,
            `Why Riot is the new big deal in the video game industry`,
            `8 chill Netflix shows to watch without commitment`,
            'How fake gurus operate under the hood',
        ],
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/blog`,
                name: `blog`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/assets`,
                name: `assets`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 800,
                            showCaptions: true,
                            markdownCaptions: true,
                            wrapperStyle: 'width: 100%; margin-left: 0;',
                        },
                    },
                    {
                        resolve: 'gatsby-remark-embed-youtube',
                        options: {
                            width: 800,
                            height: 400,
                        },
                    },
                    {
                        resolve: `gatsby-remark-responsive-iframe`,
                        options: {
                            wrapperStyle: `margin-bottom: 1.0725rem`,
                        },
                    },
                    `gatsby-remark-autolink-headers`,
                    `gatsby-remark-copy-linked-files`,
                    `gatsby-remark-smartypants`,
                ],
            },
        },
        {
            resolve: `gatsby-plugin-prefetch-google-fonts`,
            options: {
                fonts: [
                    {
                        family: `Roboto`,
                        subsets: [`latin`],
                        variants: [`400`, `600`, `700`],
                    },
                    {
                        family: `Permanent Marker`,
                        variants: [`400`],
                    },
                    {
                        family: `Abril Fatface`,
                        variants: [`400`],
                    },
                    {
                        family: `Open Sans`,
                        subsets: [`latin`],
                        variants: [
                            `300`,
                            `300i`,
                            `400`,
                            `400i`,
                            `600`,
                            `600i`,
                            `700`,
                        ],
                    },
                    {
                        family: `Oswald`,
                        subsets: [`latin`],
                        variants: [`300`, `400`, `600`, `700`],
                    },
                ],
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-plugin-gdpr-cookies`,
            options: {
                googleAnalytics: {
                    trackingId: 'UA-173573167-2',
                    cookieName: 'gatsby-gdpr-google-analytics', // default
                    anonymize: true,
                },

                environments: ['production'],
            },
        },
        `gatsby-plugin-feed`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Capital Rogue`,
                short_name: `CR`,
                start_url: `/`,
                background_color: `#25242b`,
                theme_color: `#25242b`,
                display: `standalone`,
                icon: `content/assets/cr-icon.png`,
            },
        },
        `gatsby-plugin-react-helmet`,
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}
