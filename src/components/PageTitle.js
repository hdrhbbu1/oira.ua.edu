import React from 'react'
import Helmet from 'react-helmet'

export default props => (
  <Helmet
    title={`${props.name} | OIRA`}
    meta={[
      {
        name: 'description',
        content: `${
          props.name
        } at the Office of Institutional Research and Assessment of The University of Alabama`,
      },
      {
        name: 'keywords',
        content: `${
          props.keywords
        }, OIRA, The University of Alabama, AIR, SAIR, ALAIR`,
      },
    ]}
  />
)

// EXAMPLE:
// <Title name="Contact" keywords="foo, bar, baz" />
