import React from 'react'
import { withLoadingWrapper } from './Loading'
import './HTMLReport.css'

const processHTML = (path, html) => {
  if (typeof DOMParser === 'undefined') return null

  const Parser = new DOMParser()
  const HTMLDoc = Parser.parseFromString(html, 'text/html')

  const styleTags = HTMLDoc.getElementsByTagName('style')
  const styles = styleTags.length
    ? Array.prototype.slice
        .call(styleTags, 0)
        .map(s => s.innerHTML)
        .join('')
    : ''
  const scoped = styles.replace(/\n([\w\.])/g, '\n.HTML-report $1')

  const tables = HTMLDoc.getElementsByTagName('table')
  const content = Array.prototype.slice
    .call(tables, 0)
    .map(t => t.outerHTML)
    .join('')
  const images = HTMLDoc.getElementsByTagName('img')

  if (images.length) {
    const pathRoot = path
      .split('/')
      .slice(0, -1)
      .join('/')
    const image_content = Array.prototype.slice
      .call(images, 0)
      .map(i => {
        // update src to prepend full location
        i.setAttribute(
          'src',
          `${pathRoot}/${
            i
              .getAttribute('src')
              .split(/(\\|\/)/)
              .splice(-1)[0]
          }`
        )
        return i.outerHTML
      })
      .join('')
    return `<style type="text/css">${scoped}</style>${content}${image_content}`
  }

  return `<style type="text/css">${scoped}</style>${content}`
}

class HTMLReport extends React.Component {
  constructor(props) {
    super(props)
    this.state = { content: null, error: null }
    this.getContent.bind(this)(this.props.file)
  }
  getContent(path) {
    fetch(path)
      .then(data => {
        return data.text()
      })
      .then(html => {
        this.setState({ content: processHTML(path, html) })
      })
      .catch(error => this.setState({ error }))
  }
  render() {
    const { content, error } = this.state

    if (error) {
      console.log(error)
      return <div>Could not fetch data</div>
    }

    return <LoadedReportContent loading={!content} content={content} />
  }
}

const ReportContent = ({ content }) => (
  <div className="HTML-report" dangerouslySetInnerHTML={{ __html: content }} />
)

const LoadedReportContent = withLoadingWrapper(ReportContent)

export default HTMLReport
