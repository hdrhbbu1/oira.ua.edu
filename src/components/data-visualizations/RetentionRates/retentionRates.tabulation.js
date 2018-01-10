import React from 'react'
import FA from 'react-fontawesome'

import makeHeatScale from './heatScale'

import {
  Tabulation,
  Axis,
  Expand,
  Header,
  Transpose,
  All,
  Variable,
  Statistic,
} from 'retabulate-react/lib/graphqlFragments'

const RetentionVariables = ['Total', 'Female', 'Male', 'InState', 'OutOfState']

export const groupMap = {
  Sex: {
    Female: 'Female',
    Male: 'Male',
  },
  Residency: {
    InState: 'In-State',
    OutOfState: 'Out-of-State',
  },
}

// export const labelLookup = Object.assign({}, ...Object.values(groupMap))
// Get array of keys with Object.keys() and then use map() to get values, for IE Support
export const labelLookup = Object.keys(groupMap).map(e => groupMap[e])
const preYears = ['2011', '2012', '2013', '2014', '2015']
const postYears = ['2016']

export const SecondYearRetentionRates = pageProps => (
  <Tabulation
    name="SecondYearRetentionRates"
    dataset="SecondYearRetentionRatesCsv"
    tabs={pageProps.tabs}
    watchedProps={{ showGroup: pageProps.showGroup }}
    className="table table-bordered"
  >
    <Axis position="left">
      {Object.keys(groupMap).map(groupKey => (
        <Header
          key={groupKey}
          label={groupKey}
          labelStyles={{ cursor: 'pointer' }}
        >
          <Transpose
            columns={Object.keys(groupMap[groupKey])}
            as="grouping"
            labelRenderer={GroupLabel(groupKey, pageProps)}
          />
        </Header>
      ))}
      <Header label="Total" labelRenderer={NoCell}>
        <Transpose
          columns={['Total']}
          as="grouping"
          labelRenderer={GroupLabel('Total', pageProps, 2)}
        />
      </Header>
    </Axis>
    <Axis position="top">
      <Header label="Cohort">
        <Expand column="Cohort" orderBy="Cohort">
          <Variable column="grouping">
            <Statistic
              method="mean"
              diff={{ key: 'grouping', values: ['Total'] }}
              cellRenderer={HeatDiffCell}
            />
          </Variable>
        </Expand>
      </Header>
    </Axis>
  </Tabulation>
)

export const ThirdYearRetentionRates = pageProps => (
  <Tabulation
    name="ThirdYearRetentionRates"
    dataset="ThirdYearRetentionRatesCsv"
    tabs={pageProps.tabs}
    watchedProps={{ showGroup: pageProps.showGroup }}
    className="table table-bordered"
  >
    <Axis position="left">
      {Object.keys(groupMap).map(groupKey => (
        <Header
          key={groupKey}
          label={groupKey}
          labelStyles={{ cursor: 'pointer' }}
        >
          <Transpose
            columns={Object.keys(groupMap[groupKey])}
            as="grouping"
            labelRenderer={GroupLabel(groupKey, pageProps)}
          />
        </Header>
      ))}
      <Header label="Total" labelRenderer={NoCell}>
        <Transpose
          columns={['Total']}
          as="grouping"
          labelRenderer={GroupLabel('Total', pageProps, 2)}
        />
      </Header>
    </Axis>
    <Axis position="top">
      <Header label="Cohort">
        <Expand column="Cohort" orderBy="Cohort">
          <Variable column="grouping">
            <Statistic
              method="mean"
              diff={{ key: 'grouping', values: ['Total'] }}
              cellRenderer={HeatDiffCell}
            />
          </Variable>
        </Expand>
      </Header>
    </Axis>
  </Tabulation>
)

const slug = label => label.replace(/[\s-]/g, '_')

const NoCell = () => null

const GroupLabel = (grouping, pageProps, span) => ({ cellProps, data }) => (
  <th
    {...cellProps}
    className={pageProps.showGroup === data.label ? 'activeHeader' : null}
    onClick={() =>
      pageProps.onClickGroup ? pageProps.onClickGroup(data.label) : null
    }
    colSpan={span ? span : 1}
  >
    {grouping && grouping !== 'Total'
      ? groupMap[grouping][data.label]
      : data.label}
    <div style={{ float: 'right' }}>
      <FA name="line-chart" />
    </div>
  </th>
)

const GroupHeader = (grouping, pageProps) => ({ cellProps, data }) => (
  <th
    {...cellProps}
    className={pageProps.showGroup === grouping ? 'activeHeader' : null}
    onClick={() =>
      pageProps.onClickGroup ? pageProps.onClickGroup(grouping) : null
    }
  >
    {data.label}
  </th>
)

// show just year, instead of repeating Fall
const YearLabel = ({ cellProps, data }) => (
  <th {...cellProps}>{data.label.split(' ')[1]}</th>
)

// components

const heatScale = makeHeatScale([-20, 10])

// shaded by comparison against group
const HeatDiffCell = ({
  cellProps,
  cell: { queries, value: { group, diff } },
}) => {
  const diff_n = group - diff
  const style = {
    ...cellProps.style,
    textAlign: 'center',
    color: group == '' ? 'white' : 'inherit',
    backgroundColor: heatScale(diff_n),
  }

  return (
    <td {...cellProps} className="heatCell" style={style}>
      {group == null ? 'N/A' : group + '%'}
      {diff_n != 0 ||
        (null && (
          <div style={{ textIndent: '-0.5em' }}>
            <b>{diff_n.toFixed(2)}</b>
          </div>
        ))}
    </td>
  )
}

const MyLabel = ({ props: { cellProps, data }, pageProps }) =>
  data.label == ' ' ? (
    <th {...cellProps} />
  ) : (
    <th
      {...cellProps}
      className={
        pageProps.showGroup === data.label
          ? 'activeHeader gradLeft'
          : 'gradLeft'
      }
      onClick={() => (pageProps.onGroup ? pageProps.onGroup(data.label) : null)}
    >
      {data.label == 'Total' ? data.label : groups[data.label]}
      <div style={{ float: 'right' }}>
        <FA name="line-chart" />
      </div>
    </th>
  )
