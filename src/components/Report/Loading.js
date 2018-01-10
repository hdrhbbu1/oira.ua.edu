import React from 'react'
import Transition from 'react-transition-group/Transition'

const Loading = props => (
  <span className="loading-dots">
    <span className="l-1" />
    <span className="l-2" />
    <span className="l-3" />
    <span className="l-4" />
    <span className="l-5" />
    <span className="l-6" />
  </span>
)

export default Loading

/**
 * Alternative: wrapper that waits for falsy Loading prop
 */
export const withLoadingWrapper = Component => props => {
  if (props.loading) return <Loading />
  return (
    <Transition
      classNames="after-loading"
      appear
      timeout={500}
      enter={false}
      exit={false}
    >
      <Component {...props} />
    </Transition>
  )
}

/**
 *  Useful for delaying load of only part of a component tree
 *  args:
 *      loading - boolean
 *      render - function for rendering once loading is false
 *      silent - do not show spinner, just wait
 */
export const AfterLoading = ({ loading, silent, render }) => {
  if (loading) return silent ? null : <Loading />

  return (
    <Transition
      transitionName="after-loading"
      transitionAppear
      timeout={500}
      transitionEnter={false}
      transitionLeave={false}
    >
      {render()}
    </Transition>
  )
}
