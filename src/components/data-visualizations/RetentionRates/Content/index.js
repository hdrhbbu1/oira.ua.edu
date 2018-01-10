import React from 'react'
import Helmet from 'react-helmet'

import LinkArrows from './LinkArrows'

const Content = (props, children) => (
  <article>
    <Helmet>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
    </Helmet>
    <header>
      <h1>
        {props.title} <small>{props.goal}</small>
      </h1>
      <p>{props.description}</p>
    </header>
    <hr />
    {props.children}
    <LinkArrows
      prev={props.prev}
      prevLink={props.prevLink}
      next={props.next}
      nextLink={props.nextLink}
    />
  </article>
)

export default Content

{
  /* 
  <Content
      title=""
      description=""
      prev=""
      prevLink=""
      next=""
      nextLink=""
    >
  
  </Content> 
*/
}
