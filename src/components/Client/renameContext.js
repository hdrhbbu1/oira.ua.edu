import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'

const renameContext = (contextKey, newKey) => {
  const ProvideNewContext = createReactClass({
    childContextTypes: {
      [newKey]: PropTypes.object,
    },

    getChildContext() {
      return {
        [newKey]: this.props[contextKey],
      }
    },

    render() {
      return React.Children.only(this.props.children)
    },
  })

  return createReactClass({
    contextTypes: {
      [contextKey]: PropTypes.object,
    },

    render() {
      const props = {
        ...this.props,
        [contextKey]: this.context[contextKey],
      }
      return <ProvideNewContext {...props} />
    },
  })
}

export default renameContext

export const withContext = contextKey => Component =>
  createReactClass({
    contextTypes: {
      [contextKey]: PropTypes.object,
    },

    render() {
      const props = {
        ...this.props,
        [contextKey]: this.context[contextKey],
      }
      return <Component {...props} />
    },
  })
