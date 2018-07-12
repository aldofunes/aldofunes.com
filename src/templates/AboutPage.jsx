import PropTypes from 'prop-types'
import React from 'react'
import { HTMLContent } from '../components/Content'

const AboutPage = ({ data }) => (
  <section className="section">
    <div className="container is-narrow">
      <h1 className="title is-size-1">{data.post.frontmatter.title}</h1>
      <HTMLContent className="content" content={data.post.html} />
    </div>
  </section>
)

AboutPage.propTypes = {
  data: PropTypes.shape({
    post: PropTypes.shape({
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
