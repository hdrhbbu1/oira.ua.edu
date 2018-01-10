module.exports = {
  pathPrefix: '/new',
  siteMetadata: {
    title: 'OIRA',
    subtitle: `The Office of Institutional Research and Assessment`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-retabulate`,
    `gatsby-plugin-accessibilityjs`,
    `gatsby-transformer-json`,
    `gatsby-transformer-csv`,
    // `gatsby-plugin-offline`, requires https
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-102397615-1',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
        name: `data`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 690,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
          },
          `gatsby-plugin-catch-links`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-sharp`,
  ],
}
