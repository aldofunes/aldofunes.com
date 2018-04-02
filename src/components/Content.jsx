import React from 'react'
import PropTypes from 'prop-types'

const HTMLContent = ({ content, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
)

const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
)

Content.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
}

Content.defaultProps = {
  content: null,
  className: null,
}

HTMLContent.propTypes = Content.propTypes

export { HTMLContent }
export default Content
