import React from 'react'
import Link from 'gatsby-link'

const LinkArrows = props => (
  <div className="links">
    {props.prevLink && (
      <Link to={props.prevLink}>
        <i className="fa fa-long-arrow-left" /> Previous Measure
      </Link>
    )}
    {props.nextLink && (
      <Link to={props.nextLink} className="rt">
        Next Measure <i className="fa fa-long-arrow-right" />
      </Link>
    )}
  </div>
)

export default LinkArrows

{
  /* ___Example Usage____
    
    <LinkArrows
        back="" 
        backLink="" 
        forward="" 
        forwardLink=""
    /> 
    _____________________
    prev=""
        prevLink=""
        next=""
        nextLink=""
*/
}
