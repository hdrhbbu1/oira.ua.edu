import React from 'react'
import Link from 'gatsby-link'
import Obfuscate from 'react-obfuscate'
import md from 'react-markings'
import PageTitle from '../../components/PageTitle'

const Content = () =>
  md`
    # Policy on Data/Information Requests

    In effecting its mission, OIRA recognizes its service-orientation and strives to be as responsive as possible. In order to achieve the highest level of responsiveness, the Office looks for the most efficient and effective ways to perform its responsibilities.

    OIRA at The University of Alabama prepares various tabulations, spreadsheets, charts, and figures on the University's students, faculty, facilities, and finances. These data are published in an annual factbook, periodical FYI’s, ad hoc reports, state and federal required reports, data exchange reports, and surveys for various national media. In most cases, the data are of a numerical nature; individual names are not given (i.e., OIRA provides aggregate data, not individual data). Published data are readily available and shared.

    In order to be responsive to the constituencies of the University community, OIRA has implemented a web-based information request system. Please click on the link below to find the request form. Upon receipt of your request, OIRA will determine if the information requested is already available on our website or in some other published form. If the requested information is not readily available and will require additional time and effort to assimilate, for example writing a new computer program, the request will be evaluated and assigned. Although OIRA will strive to complete your request within ten working days, some information requests may require additional time. We thank you for your patience.
  `

export default () => (
  <div>
    <PageTitle name="Requests" />
    <Content />
    <p>
      <Link to="/requests/form">Click Here to Fill Out OIRA Request Form</Link>
    </p>
    <p>
      Lorne Kuffel<br />
      Executive Director - Office of Institutional Research and Assessment<br />
      The University of Alabama<br />
      Phone: <Obfuscate tel="205-348-7200" />
      <br />
      Fax: <Obfuscate tel="205-348-7208" />
      <br />
      Email:{' '}
      <Obfuscate
        email="lkuffel@ua.edu"
        headers={{ subject: 'Question from oira.ua.edu' }}
      />
    </p>
  </div>
)
