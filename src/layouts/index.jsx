import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import { Navbar } from '../components'
import './styles.scss'

const TemplateWrapper = ({ children, data }) => {
  const { title, description, keywords } = data.site.siteMetadata

  return (
    <div>
      <Helmet title={title} />
      <Helmet
        meta={[
          { name: 'description', content: description },
          { name: 'keywords', content: keywords },
        ]}
      />
      <Navbar />
      <div>{children()}</div>
    </div>
  )
}

TemplateWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        tile: PropTypes.string,
        description: PropTypes.string,
        keywords: PropTypes.arrayOf(PropTypes.string.isRequired),
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

export const layoutQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        description
        keywords
      }
    }
  }
`

export default TemplateWrapper
