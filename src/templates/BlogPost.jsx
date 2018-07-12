import Link from 'gatsby-link'
import { kebabCase } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import { HTMLContent } from '../components/Content'

const BlogPost = ({ data }) => {
  const { post } = data

  const { title, date, description, tags } = data.post.frontmatter
  return (
    <section className="section">
      <Helmet title={`${title} | Blog`} />

      <div className="container content">
        <h1 className="title is-size-2">{title}</h1>
        <h3 className="subtitle">{date}</h3>

        <p>{description}</p>

        <HTMLContent content={post.html} />

        {tags && tags.length ? (
          <div style={{ marginTop: '4rem' }}>
            <h4>Tags</h4>
            <ul className="taglist">
              {tags.map(tag => (
                <li key={`${tag}-tag`}>
                  <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
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
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`
