import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

export default () => (
  <Color>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      <h2>Helpful Links</h2>
      <Triad>
        <Unit
          name="Net Price Calculator"
          link="http://financialaid.ua.edu/net-price-calculator/"
        />
        <Unit
          name="Enrollment at a Glance"
          link="/reports/?Report%20Type[0][0]=Enrollment%20at%20a%20Glance"
        />
        <Unit name="OIRA HEAct Information" link="http://oira.ua.edu/HEA/" />
      </Triad>
      <Triad>
        <Unit name="Online Syllabus Management" link="http://syllabi.ua.edu" />
        <Unit
          name="Accreditation"
          link="http://oiraservices.ua.edu/content/oie/accreditation"
        />
        <Unit
          name="Performance Measures"
          link="http://oira.ua.edu/new/reports/?Report%20Type%5b0%5d%5b0%5d=Strategic%20Plan%20Performance%20Measures#/"
        />
      </Triad>
      <Triad>
        <Unit name="QEP Learning In Action" link="http://qep.ua.edu/" />
        <Unit
          name="Organizational Chart"
          link="http://oira.ua.edu/factbook/reports/general-information/organizational-chart/"
        />
        <Unit name="Other Resources" link="/other-resources/" />
      </Triad>
    </div>
  </Color>
)

const Unit = props => (
  <div>
    <a href={props.link} target="_blank" rel="noopener">
      {props.name}
    </a>
  </div>
)

const Triad = styled.div`
  width: 33%;
  display: inline-block;
  line-height: 2.25rem;
  text-align: center;
  @media (max-width: 777px) {
    width: 100%;
    text-align: center;
  }
  @media (max-width: 500px) {
    width: 100%;
    text-align: center;
  }
`
const Color = styled.div`
  h2 {
    color: white;
    text-align: center;
  }
  padding-top: 2em;
  background: linear-gradient(to top, #990000, #990000);

  a {
    color: white;
    &:hover {
      text-decoration: underline;
      font-weight: bold;
    }
  }
  @media print {
    display: none;
  }
`
