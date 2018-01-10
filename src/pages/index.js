import React from 'react'
import Helmet from 'react-helmet'

import PageTitle from '../components/PageTitle'
import {
  SecondYearRetentionRatesFragment,
  ThirdYearRetentionRatesFragment,
} from '../components/data-visualizations/RetentionRates/retentionRates.tabulation.js'
import RetentionRates from '../components/data-visualizations/RetentionRates/retentionRates.js'
import SoiHighlight from '../components/SoiHighlight'

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <PageTitle name="Home" />
        <div>
          <h1>News and Featured Data</h1>
          <hr />
          <RetentionRates data={this.props.data} />
          <SoiHighlight />
        </div>
      </div>
    )
  }
}

export const query = graphql`
  query RetentionRates {
    allSecondYearRetentionRatesCsv {
      edges {
        node {
          Cohort
          Total
          Female
          Male
          InState
          OutOfState
        }
      }
    }
    allThirdYearRetentionRatesCsv {
      edges {
        node {
          Cohort
          Total
          Female
          Male
          InState
          OutOfState
        }
      }
    }
    retabulateRoot {
      tabulations {
        ...SecondYearRetentionRatesFragment
        ...ThirdYearRetentionRatesFragment
      }
    }
  }
`
