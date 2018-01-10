import React from 'react'
import PageTitle from '../components/PageTitle'

class mdPostTemplate extends React.Component {
  render() {
    const siteMetadata = this.props.data.site.siteMetadata
    const post = this.props.data.markdownRemark

    return (
      <div>
        <PageTitle name={post.frontmatter.title} />
        <h1>{post.frontmatter.title}</h1>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    )
  }
}

export default mdPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
    site {
      id
      siteMetadata {
        title
        subtitle
      }
    }
  }
`
