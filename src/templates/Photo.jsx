import React from 'react'
import PropTypes from 'prop-types'
import Content, { HTMLContent } from '../components/Content'

export const PhotoTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section">
      <div className="container">
        <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
          {title}
        </h2>
        <PageContent className="content" content={content} />
      </div>
    </section>
  )
}

PhotoTemplate.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

PhotoTemplate.defaultProps = {
  title: null,
  content: null,
  contentComponent: null,
}

const Photo = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <PhotoTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      content={post.html}
    />
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
      }
    }
  }
`
