import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import {
  SecondYearRetentionRates,
  SecondYearRetentionRatesFragment,
  ThirdYearRetentionRates,
  ThirdYearRetentionRatesFragment,
  groupMap,
  labelLookup,
} from './retentionRates.tabulation.js'
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  ReferenceLine,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import compose from 'recompose/compose'
import withState from 'recompose/withState'

import Content from './Content'
import { Tabs, Tab } from './Tabs'

const RetentionRates = props => {
  const secondYearData = props.data.allSecondYearRetentionRatesCsv.edges.map(
    ({ node }) => ({
      ...node,
      Cohort: parseInt(node.Cohort),
      Total: parseInt(node.Total),
      Female: parseInt(node.Female),
      Male: parseInt(node.Male),
      InState: parseInt(node.InState),
      OutOfState: parseInt(node.OutOfState),
    })
  )
  const thirdYearData = props.data.allThirdYearRetentionRatesCsv.edges.map(
    ({ node }) => ({
      ...node,
      Cohort: parseInt(node.Cohort),
      Total: parseInt(node.Total),
      Female: parseInt(node.Female),
      Male: parseInt(node.Male),
      InState: parseInt(node.InState),
      OutOfState: parseInt(node.OutOfState),
    })
  )
  const { tabulations } = props.data.retabulateRoot
  const { showGroup, updateGroup, tab, updateTab } = props

  const Chart = (props, measure) => (
    <div>
      <h3>{props.title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          width={600}
          height={300}
          data={props.dataset}
          margin={{ top: 16, right: 0, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="Cohort" tickLine={false} axisLine={false} />
          <YAxis
            tickSize={10}
            ticks={[60, 70, 80, 90, 100]}
            domain={[60, 100]}
            tickFormatter={n => n + '%'}
          />
          <CartesianGrid strokeDasharray="2 2" vertical={false} />
          <Tooltip formatter={n => n.toLocaleString() + '%'} />
          <Legend />
          {showGroup != 'Total' && (
            <Line
              type="linear"
              key={showGroup}
              name={labelLookup[showGroup]}
              dataKey={showGroup}
              stroke="#900"
            />
          )}}
          <Line type="linear" dataKey={'Total'} name={'Total'} stroke="#000" />
        </ComposedChart>
      </ResponsiveContainer>
      <h3>Detailed Breakdown</h3>
      <WidthManager>
        <props.tabulation
          tabs={tabulations}
          onClickGroup={updateGroup}
          showGroup={showGroup}
        />
      </WidthManager>
    </div>
  )

  return (
    <Styles>
      <h2>Retention Rates</h2>
      <Tabs>
        <Tab
          title="2nd Year Retention Rates"
          render={() => (
            <Chart
              title="2nd Year Retention Rates"
              measure="2015"
              dataset={secondYearData}
              tabulation={SecondYearRetentionRates}
            />
          )}
        />
        <Tab
          title="3rd Year Retention Rates"
          render={() => (
            <Chart
              title="3rd Year Retention Rates"
              measure="2014"
              dataset={thirdYearData}
              tabulation={ThirdYearRetentionRates}
            />
          )}
        />
      </Tabs>
      <div style={{ marginBottom: '3.5rem' }} />
    </Styles>
  )
}

const WidthManager = styled.div`
  max-width: 100%;
  overflow-x: scroll;
`
const Styles = styled.div`
  .table {
    border-collapse: collapse !important;
    font-size: 1em;
  }
  .table td,
  .table th {
  }
  .table-bordered th,
  .table-bordered td {
    border: 1px solid #ddd !important;
  }
  thead th {
    text-align: center;
  }
  .table > tbody > tr > td,
  .table > tbody > tr > th,
  .table > tfoot > tr > td,
  .table > tfoot > tr > th,
  .table > thead > tr > td,
  .table > thead > tr > th {
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: top;
    border-top: 1px solid #ddd;
  }

  .activeHeader {
    background-color: #900 !important;
    color: white;
    cursor: pointer;
  }

  .activeGreyHeader {
    background-color: #eee !important;
    cursor: pointer;
  }

  .inActiveHeader {
    cursor: pointer;
  }

  .activeLabel {
    background-color: #eee;
  }

  .heatCell {
    transition: background-color ease 2s;
  }
  ::selection {
    background: #ccc; /* WebKit/Blink Browsers */
  }
  ::-moz-selection {
    background: #ccc; /* Gecko Browsers */
  }
`

export default compose(
  withState('showGroup', 'updateGroup'),
  withState('tab', 'updateTab', 'second')
)(RetentionRates)
