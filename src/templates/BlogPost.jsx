import Link from 'gatsby-link'
import { kebabCase } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import { HTMLContent } from '../components/Content'

const BlogPost = ({ data }) => {
  const { post } = data

  const { title, date, tags } = data.post.frontmatter
  return (
    <section className="section">
      <Helmet title={`${title} | Blog`} />

      <div className="container content">
        <h1 className="title is-size-2">{title}</h1>
        <h3 className="subtitle">{date}</h3>

        {tags && tags.length ? (
          <div className="tags">
            {tags.map(tag => (
              <Link className="tag" to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
            ))}
          </div>
        ) : null}

        <HTMLContent content={post.html} />
      </div>
    </section>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    post: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "DD [de] MMMM YYYY" locale: "es")
        title
        tags
      }
    }
  }
`
