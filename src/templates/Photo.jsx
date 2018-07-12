import { kebabCase } from 'lodash'
import Link from 'gatsby-link'
import React from 'react'
import PropTypes from 'prop-types'
import { HTMLContent } from '../components'

const Photo = ({ data }) => {
  const { markdownRemark: photo } = data

  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-size-1">{photo.frontmatter.title}</h1>
        <h4 className="subtitle is-size-4">{photo.frontmatter.date}</h4>

        {photo.frontmatter.tags && photo.frontmatter.tags.length ? (
          <div className="tags">
            {photo.frontmatter.tags.map(tag => (
              <Link className="tag" to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
            ))}
          </div>
        ) : null}

        <HTMLContent className="content" content={photo.html} />
        <img src={photo.frontmatter.image} alt={photo.frontmatter.title} className="image" />
      </div>
    </section>
  )
}

Photo.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Photo

export const photoQuery = graphql`
  query Photo($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image
        tags
        date(formatString: "DD [de] MMMM YYYY" locale: "es")
      }
    }
  }
`
