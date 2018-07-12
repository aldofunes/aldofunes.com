import Link from 'gatsby-link'
import React from 'react'
import Helmet from 'react-helmet'

const TagRoute = ({
  pathContext: { tag },
  data: {
    site: { siteMetadata: { title } },
    allMarkdownRemark: { edges: posts, totalCount },
  },
}) => {
  const postLinks = posts.map(post => (
    <div className="box" key={post.node.fields.slug}>
      <h4 className="title is-size-4">
        <Link to={post.node.fields.slug}>
          {post.node.frontmatter.title}
        </Link>
      </h4>
      <h6 className="subtitle is-size-6">{post.node.frontmatter.date}</h6>
      <p>
        {post.node.excerpt}
        <br />
        <br />
        <Link className="button is-small" to={post.node.fields.slug}>Seguir leyendo →</Link>
      </p>
    </div>
  ))

  const tagHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} etiquetado${totalCount === 1
    ? ''
    : 's'} con “${tag}”`

  return (
    <section className="section">
      <Helmet title={`${tag} | ${title}`} />
      <div className="container content">
        <h2 className="title is-size-2 is-bold-light">{tagHeader}</h2>
        {postLinks}
        <p>
          <Link to="/tags/">Todas las etiquetas</Link>
        </p>
      </div>
    </section>
  )
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 400)
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
