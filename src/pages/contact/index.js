import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Obfuscate from 'react-obfuscate'

import PageTitle from '../../components/PageTitle'
import siteMetadata from '../../../gatsby-config'

export default class Contact extends React.Component {
  render() {
    return (
      <div>
        <PageTitle name="Contact" />
        <h1>Contact</h1>
        <hr />
        <h2>
          For information requests, please see our{' '}
          <Link to="/requests/">Information Requests</Link> form.
        </h2>
        <p>
          The OIRA office location and phone and fax information are listed
          below. For OIRA staff members and graduate students please see the{' '}
          <Link to="/staff/">Staff page</Link>.
        </p>
        <h2>Office of Institutional Research and Assessment</h2>
        <p>
          <a
            href="http://maps.apple.com/?q=33.2084338+-87.5472800"
            target="_blank"
            title="Building Name and Address"
          >
            East Annex
          </a>
          <br />
          The University of Alabama<br />
          Box 870166<br />
          Tuscaloosa, AL 35487-0166
        </p>
        <p>
          Phone: <Obfuscate tel="205-348-7200" />
          <br />
          Fax: <Obfuscate tel="205-348-7208" />
          <br />
          Email:{' '}
          <Obfuscate
            email="oiracontact@ua-net.ua.edu"
            headers={{ subject: 'Question from oira.ua.edu' }}
          />
        </p>
      </div>
    )
  }
}
