import React from 'react'
import Helmet from 'react-helmet'
import { withPrefix } from 'gatsby-link'
import { HashRouter, Route, withRouter } from 'react-router-dom'
import PageTitle from '../../components/PageTitle'

import {
  ClientSeachKitProvider,
  ClientHits,
} from '../../components/Client/SearchKit'
import ReportPage from '../../components/Report/Report.js'
import renameContext from '../../components/Client/renameContext'

const ProvideOldRouter = renameContext('router', 'oldRouter')

const SearchClient = props => (
  <ClientSeachKitProvider>
    <ClientHits />
  </ClientSeachKitProvider>
)

const Reports = () => (
  <div style={{ minHeight: 300 }}>
    <PageTitle name="Reports" />
    <div>
      <Route
        path={`${__PATH_PREFIX__}/reports/:reportId`}
        component={ReportPage}
      />
      <Route
        exact
        path={`${__PATH_PREFIX__}/reports/`}
        component={SearchClient}
      />
    </div>
  </div>
)

const ReportsWithRoute = withRouter(Reports)

const ReportsWithHashRouting = props =>
  typeof window !== 'undefined' && <ReportsWithRoute />

export default ReportsWithHashRouting
