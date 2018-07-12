import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

const PortfolioPage = ({ data }) => {
  const { edges: photos } = data.allMarkdownRemark

  return (
    <section className="section">
      <div className="container">
        <div className="tile is-ancestor">
          {photos.map(({ node: photo }) => (
            <div className="tile is-parent">
              <div key={photo.id} className="tile is-child card">
                <Link to={photo.fields.slug}>
                  <div className="card-image">
                    <figure className="image">
                      <img src={photo.frontmatter.image} alt={photo.frontmatter.title} />
                    </figure>
                  </div>
                </Link>
                <div className="card-content">
                  <div className="content">
                    <p>{photo.excerpt}</p>
                    <time dateTime={photo.frontmatter.rawDate}>{photo.frontmatter.date}</time>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

PortfolioPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
}

export const portfolioPageQuery = graphql`
  query PortfolioQuery {
    allMarkdownRemark(
      filter: {
        frontmatter: {templateKey: {eq: "Photo"}}
      }
      sort: {order: DESC, fields: [frontmatter___date]}
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 400)
          fields {
            slug
          }
          frontmatter {
            title
            image
            tags
            date(formatString: "DD [de] MMMM YYYY" locale: "es")
            rawDate: date
          }
        }
      }
    }
  }
`

export default PortfolioPage
