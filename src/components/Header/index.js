import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Headroom from 'react-headroom'

import LogoImage from './logo.svg'

class Header extends React.Component {
  render() {
    let date = new Date()
    let year = date.getFullYear()
    return (
      <Headroom>
        <PageWidth>
          <ContentWidth>
            <Left>
              <Logo
                to="/"
                title="The Office of Institutional Research and Assessement"
              />
            </Left>
            <Right>
              <StyledLink to="/mission/" title="Mission">
                {'Mission'}
              </StyledLink>
              {' | '}
              <StyledLink to="/reports/" title="Reports">
                {'Reports'}
              </StyledLink>
              {' | '}
              <StyledAnchor
                href="http://oira.ua.edu/factbook"
                target="_blank"
                rel="noopener"
                title="Factbook"
              >
                {'Factbook'}
              </StyledAnchor>
              {' | '}
              <StyledLink to="/requests/" title="Requests">
                {'Requests'}
              </StyledLink>
              {' | '}
              <StyledLink to="/staff/" title="Staff">
                {'Staff'}
              </StyledLink>
              {' | '}
              <StyledLink to="/resources/" title="Resources">
                {'Resources'}
              </StyledLink>
            </Right>
          </ContentWidth>
        </PageWidth>
      </Headroom>
    )
  }
}

export default Header

const PageWidth = styled.header`
  border-bottom: 1px solid hsla(0, 0%, 0%, 0.2);
  background: HSLA(0, 0%, 100%, 0.96);
  color: black;
`
const Logo = styled(Link)`
  display: inline-block;
  width: 328px;
  height: 80px;
  border-bottom: none;
  background-color: blue;
  background: url(${LogoImage});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  text-indent: -9999px;
  z-index: 3;
  @media print {
    * {
      -webkit-print-color-adjust: exact;
    }
  }
`
const ContentWidth = styled.div`
  font-size: 0.88em;
  line-height: 0.88em;
  display: flex;
  color: black;
  flex-flow: row wrap;
  margin: 0 auto;
  width: 100%;
  padding: 0 1.0875rem;
  max-width: 960px;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 810px) {
    flex-flow: column;
  }
  @media print {
    flex-flow: row;
  }
`
const Left = styled.div`
  float: left;
  @media print {
    -webkit-print-color-adjust: exact;
  }
`
const Right = styled.div`
  text-align: right;
  color: hsla(0, 0%, 0%, 0.2);
  cursor: default;
  float: Right;
  // padding-bottom: 1em;
  @media (max-width: 810px) {
    text-align: center;
    margin-bottom: 1em;
  }
  @media print {
    display: none;
  }
`

const Contact = styled.p`
  font-size: 12px;
  line-height: 12px;
  font-family: 'Space Mono', monospace;
`
const StyledLink = styled(Link)`
  color: black;
  font-size: 1.1em;
  text-decoration: none;
  &:hover {
    color: #990000;
  }
  &:active {
    font-weight: bold;
  }
  @media (max-width: 810px) {
    line-height: 1.5em;
  }
`
const StyledAnchor = styled.a`
  color: black;
  font-size: 1.1em;
  text-decoration: none;
  &:hover {
    color: #990000;
  }
  &:active {
    font-weight: bold;
  }
  @media (max-width: 810px) {
    line-height: 1.5em;
  }
`
