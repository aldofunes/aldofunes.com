import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <section className="section">
      <div className="container">
        <div className="content">
          <h1 className="has-text-weight-bold is-size-2">Últimas publicaciones</h1>
        </div>
        {posts.map(({ node: post }) => (
          <div className="content box" key={post.id}>
            <h4 className="title is-size-4">
              <Link to={post.fields.slug}>
                {post.frontmatter.title}
              </Link>
            </h4>
            <h6 className="subtitle is-size-6">{post.frontmatter.date}</h6>

            <p>
              {post.excerpt}
              <br />
              <br />
              <Link className="button is-small" to={post.fields.slug}>Seguir leyendo →</Link>
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "BlogPost" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

export default IndexPage
