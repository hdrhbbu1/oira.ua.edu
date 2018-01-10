import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Link from 'gatsby-link'
import { withLoadingWrapper } from './Loading'
import HTMLReport from './HTMLReport'
import PDFReport from './PDFReport'
import op from 'object-path'
import slug from 'slug'
import './loading-animation.css'

const attachmentsPath = '/attachments'
const testPath = (r, at) =>
  `${attachmentsPath}/${slug(r._source.category)}/${slug(
    r._source.iteration
  )}/${at.filename}`
const fullPath = (r, at) => `${r._source.location}/${at.filename}`
// const fullPath = (r, at) => `${attachmentsPath}/${slug(r._source.category)}/${slug(r._source.iteration)}/${at.filename}`

const ReportPage = ({ report, reportId }) => (
  <div className={`report-${report._source.type}-${report._source.extension}`}>
    <Helmet
      title={`${report._source.title} | OIRA`}
      meta={[
        {
          name: 'Office of Institutional Research and Assessment Reports',
          content:
            'Reports from the Office of Institutional Research and Assessment at The University of Alabama',
        },
      ]}
    />
    <GoBack to={`/reports/${window.location.search}`}>{'<< Go Back'}</GoBack>
    <br />
    <ReportTitle>{report._source.title}</ReportTitle>
    <TagsDiv>
      <CategoryTag
        to={`/reports/?Report%20Type[0][0]=${report._source.category}`}
      >
        <CategoryInsideTag>{report._source.category}</CategoryInsideTag>
      </CategoryTag>

      {op.get(report, '_source.tags', []).map((tag, i) => (
        <RoundTag key={i} to={`/reports/?tags[0][0]=${tag}`}>
          <InsideTag>{tag}</InsideTag>
        </RoundTag>
      ))}
    </TagsDiv>
    <p>{report._source.description}</p>
    <ul style={{ listStyleType: 'none' }}>
      {op.get(report, '_source.attachments', []).map((attachment, i) => (
        <li key={i}>
          <a href={`#/${reportId}/${attachment.name}`}>{attachment.name}</a>
        </li>
      ))}
    </ul>
    {op.get(report, '_source.attachments', []).map((attachment, i) => (
      <ReportItem key={i}>
        {attachment.name && (
          <h3 id={`/${reportId}/${attachment.name}`} className="report-entry">
            {attachment.name}
          </h3>
        )}

        {report._source.extension === 'pdf' && (
          <PDFReport file={fullPath(report, attachment)} />
        )}

        {report._source.extension === 'html' && (
          <HTMLReport file={fullPath(report, attachment)} />
        )}

        {(report._source.extension === 'xls' ||
          report._source.extension === 'xlsx') && (
          <p>
            <a href={fullPath(report, attachment)} target="_blank">
              Click here{' '}
            </a>
            to download this report in Excel format.
          </p>
        )}
      </ReportItem>
    ))}
  </div>
)

const LoadedReportPage = withLoadingWrapper(ReportPage)

class ReportPageWrapper extends React.Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = {
      report: null,
    }
    this.fetchReport(props.match.params.reportId)
    this.fetchReport = this.fetchReport.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.fetchReport(nextProps.match.params.reportId)
  }

  fetchReport(reportId) {
    fetch(`http://oiraservices.ua.edu/apis/esreports/report/${reportId}`)
      .then(data => {
        return data.json()
      })
      .then(json => {
        this.setState({ report: json })
      })
  }

  render() {
    const { reportId } = this.props.match.params
    const { report } = this.state
    // location is for type:link
    // const location = op.get(report, '_source.location')

    return (
      <LoadedReportPage loading={!report} report={report} reportId={reportId} />
    )
  }
}

// styled:

const ReportTitle = styled.h1`
  margin-top: 0.5em;
  font-size: 2rem;
`

const TagsDiv = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  margin-bottom: 1em;
  @media print {
    display: none;
  }
`
const GoBack = styled(Link)`
  @media print {
    display: none;
  }
`

const ReportItem = styled.div`
  margin: 3em 0;
  text-align: center;
  page-break-before: always;
`
const InsideTag = styled.div`
  -webkit-box-flex: 1;
  -ms-flex: auto;
  flex: auto;
  color: hsla(0, 0%, 0%, 0.8);
`
const RoundTag = styled(Link)`
  background: #f4f4f4;
  border: none;
  display: -webkit-box;
  display: -ms-flexbox;
  text-decoration: none;
  display: flex;
  padding: 10px 10px 10px 10px;
  font-size: 14px;
  line-height: 20px;
  border-radius: 3px;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  margin: 0 10px 10px 0;
`

const CategoryTag = styled(RoundTag)`
  background: #900;
`

const CategoryInsideTag = styled(InsideTag)`
  color: white !important;
`

export default ReportPageWrapper
