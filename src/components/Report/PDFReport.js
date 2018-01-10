import React, { Component } from 'react'
import styled from 'styled-components'
import { Document, Page } from 'react-pdf/build/entry.webpack'

class PDFReport extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages })
  }

  render() {
    const { file } = this.props
    const { pageNumber, numPages } = this.state
    return (
      <Div>
        <a href={file} target="_blank" rel="noopener">
          <Container>
            <Document
              file={file}
              loading="Document is loading. Wait..."
              onLoadSuccess={this.onDocumentLoad}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <HoverLink>
              <HoverSpan>click to view the full PDF</HoverSpan>
            </HoverLink>
          </Container>
        </a>
        {numPages > 1 && (
          <div>
            Previewing: page {pageNumber} of {numPages}&nbsp;&nbsp;{' '}
            {pageNumber > 1 && (
              <span>
                <a
                  onClick={e =>
                    e.preventDefault() ||
                    this.setState.bind(this)({
                      pageNumber: pageNumber - 1,
                    })
                  }
                  href="#"
                >
                  prev
                </a>
                |&nbsp;
              </span>
            )}
            {pageNumber < numPages && (
              <span>
                <a
                  onClick={e =>
                    e.preventDefault() ||
                    this.setState.bind(this)({
                      pageNumber: pageNumber + 1,
                    })
                  }
                  href="#"
                >
                  next
                </a>
              </span>
            )}
          </div>
        )}
      </Div>
    )
  }
}

const Div = styled.div`
  .ReactPDF__Page__canvas {
    margin: 0 auto;
  }
`
const Container = styled.div`
  position: relative;
  min-width: 100%;
`
const HoverLink = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: auto;
  opacity: 0;
  transition: 0.5s ease;
  background-color: RGBA(0, 0, 0, 0.5);
  &:hover {
    opacity: 1;
  }
`
const HoverSpan = styled.span`
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`

export default PDFReport
