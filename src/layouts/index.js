import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import { Route } from 'react-router-dom'
import fetch from 'whatwg-fetch'

import PageTitle from '../components/PageTitle'
import Hero from '../components/Hero'
import Header from '../components/Header'
import HelpfulLinks from '../components/HelpfulLinks'
import Footer from '../components/Footer'

import './index.css'

if (typeof global.fetch === 'undefined') global.fetch = fetch

const TemplateWrapper = ({ children }) => (
  <div>
    <PageTitle name="The Office of Institutional Research and Assessment" />
    <Header />
    <Route exact path="/" component={Hero} />
    <Route exact path="/new" component={Hero} />
    <div
      style={{
        margin: ` 1em auto 1em auto`,
        maxWidth: 960,
        minHeight: 500,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
    <HelpfulLinks />
    <Footer />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
