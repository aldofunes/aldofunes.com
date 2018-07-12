import PropTypes from 'prop-types'
import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

const TagsPage = ({
  data: { allMarkdownRemark: { group }, site: { siteMetadata: { title } } },
}) => (
  <section className="section">
    <Helmet title={`Tags | ${title}`} />
    <div className="container content">
      <h1 className="title is-size-2 is-bold-light">Etiquetas</h1>
      <div className="tags">
        {group.map(tag => (
          <Link
            key={tag.fieldValue}
            className="tag is-medium"
            to={`/tags/${kebabCase(tag.fieldValue)}/`}
          >
            {tag.fieldValue} ({tag.totalCount})
          </Link>
        ))}
      </div>
    </div>
  </section>
)

TagsPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default TagsPage

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
