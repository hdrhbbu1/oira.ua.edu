import React from 'react'
import { withContext } from './renameContext'

const prefix = __PREFIX_PATHS__ ? __PATH_PREFIX__ : ''

class CombinedLink extends React.Component {
  constructor(props) {
    super(props)
  }
  goLink(e) {
    if (typeof bowser !== 'undefined' && bowser.msie) return true

    e.preventDefault()

    const { router, oldRouter, hash, to } = this.props

    router.history.push(hash)
    oldRouter.history.push(`${prefix}${to}#/`)
  }
  render() {
    const href = `${prefix}${this.props.to}`

    return (
      <a
        href={href}
        onClick={this.goLink.bind(this)}
        className={this.props.className}
      >
        {this.props.children}
      </a>
    )
  }
}

export default withContext('oldRouter')(withContext('router')(CombinedLink))
