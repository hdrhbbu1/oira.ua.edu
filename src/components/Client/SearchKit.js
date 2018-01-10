import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Icon from 'react-geomicons'
import { withLoadingWrapper } from '../Report/Loading'
import 'searchkit/release/theme.css'

import {
  SearchkitManager,
  SearchkitProvider,
  SearchBox,
  Pagination,
  Hits,
  Layout,
  LayoutBody,
  LayoutResults,
  ActionBar,
  SideBar,
  SortingSelector,
  Toggle,
  ImmutableQuery,
  SelectedFilters,
  SearchkitComponent,
  HierarchicalMenuFilter,
} from 'searchkit'

const es_endpoint = 'http://oiraservices.ua.edu/apis/esreports'

const SelectedFilter = props => (
  <div
    className={props.bemBlocks
      .option()
      .mix(props.bemBlocks.container('item'))
      .mix(`selected-filter--${props.filterId}`)}
  >
    <div className={props.bemBlocks.option('name')}>
      {props.labelKey}: {props.labelValue}
    </div>
    <div
      className={props.bemBlocks.option('remove-action')}
      onClick={props.removeFilter}
    >
      x
    </div>
  </div>
)

const ReportHit = ({ result }) => (
  <div>
    {result._source.type === 'attachment' && (
      <h3 style={{ marginBottom: '.5em' }}>
        <Link to={`/reports/${result._id}${window.location.search}`}>
          {result._source.title}
        </Link>
      </h3>
    )}
    {result._source.type === 'external' && (
      <div>
        <H3Alt>
          <a href={result._source.location} target="_blank" rel="noopener">
            {result._source.title}&nbsp;
          </a>
        </H3Alt>
        <h4 style={{ marginBottom: '.5em' }}>
          <Icon name="external" /> {result._source.category}
        </h4>
      </div>
    )}
    <p>{result._source.description}</p>
  </div>
)

const ClientOnly = ({ children, subChildren }) =>
  typeof window !== 'undefined' ? (
    <div>{children}</div>
  ) : (
    <div children={subChildren} />
  )

const ClientHitsInner = () => (
  <ClientOnly>
    <h1>Reports</h1> <hr /> <br />
    <ReportsRestyle>
      <Layout>
        <Search>
          <SearchBox
            searchOnChange
            placeholder="Search for anything"
            prefixQueryFields={['title^2', 'tags^2', 'description^2']}
            searchThrottleTime={500}
          />
        </Search>
        <br />
        <SelectedFilters itemComponent={SelectedFilter} />
        <LayoutBody>
          <SideBar>
            <HierarchicalMenuFilter
              fields={['category.keyword']}
              title="Report Type"
              id="Report Type"
              size="12"
            />
            <HierarchicalMenuFilter
              fields={['tags.keyword']}
              title="Tags"
              size="10"
              id="tags"
            />
            <HierarchicalMenuFilter
              fields={['timeframe.keyword']}
              title="Timeframe"
              orderKey="_term"
              orderDirection="desc"
              size="14"
              id="Year"
            />
            <SortingSelector
              options={[
                {
                  label: 'Sort',
                  fields: [
                    {
                      field: 'iterationSort.keyword',
                      options: { order: 'desc' },
                    },
                    { field: '_score', options: { order: 'desc' } },
                  ],
                  defaultOption: true,
                },
                {
                  label: 'Latest-Earliest',
                  field: 'iterationSort.keyword',
                  order: 'desc',
                },
                {
                  label: 'Earliest-Latest',
                  field: 'iterationSort.keyword',
                  order: 'asc',
                  key: 'earliest',
                },
                {
                  label: 'Title A-Z',
                  field: 'title.keyword',
                  order: 'asc',
                },
                {
                  label: 'Title Z-A',
                  field: 'title.keyword',
                  order: 'desc',
                },
              ]}
            />
          </SideBar>
          <LayoutResults>
            <Hits hitsPerPage={10} itemComponent={ReportHit} />
            <hr />
            <Pagination showNumbers />
          </LayoutResults>
        </LayoutBody>
      </Layout>
    </ReportsRestyle>
  </ClientOnly>
)

export const ClientHits = withLoadingWrapper(ClientHitsInner)

export class ClientSeachKitProvider extends React.Component {
  constructor(props) {
    super(props)

    let searchkit
    if (typeof window !== 'undefined') {
      searchkit = new SearchkitManager(es_endpoint)

      searchkit.addDefaultQuery(query => {
        return new ImmutableQuery()
          .setSort([
            {
              'iterationSort.keyword': {
                order: 'desc',
              },
            },
          ])
          .setSize(10)
      })
    }

    this.state = { searchkit }
  }
  render() {
    const { searchkit } = this.state
    const { children } = this.props

    if (!searchkit) return <div />
    return (
      <ClientOnly>
        <SearchkitProvider searchkit={searchkit}>{children}</SearchkitProvider>
      </ClientOnly>
    )
  }
}

const H3Alt = styled.h3`
  margin-bottom: 0.5rem;
`

const ReportsRestyle = styled.div`
  .sk-layout {
    background: #fff;
    max-width: 100%;
  }
  .sk-layout__body {
    margin: 0;
    max-width: 100%;
    min-width: 300px;
  }
  .sk-layout__filters {
    margin: 17px 15px 15px 0px;
    box-shadow: none;
    @media (max-width: 750px) {
      display: none;
    }
  }
  .sk-layout__results {
    max-width: 300px;
    margin: 0;
    box-shadow: none;
    padding-left: 0;
  }
  .sk-results-list {
    max-width: 100%;
    min-width: 300px;
  }
  .sk-toggle-option.is-active {
    background-color: #990000;
    border-color: #990000;
  }
  .sk-hits {
    max-width: 100%;
  }
  .sk-selected-filters-option__name,
  .sk-selected-filters-option__remove-action {
    color: hsla(0, 0%, 0%, 0.8);
  }

  .sk-pagination-navigation {
    max-width: 100%;
    width: 100%;
  }
  .sk-toggle {
    max-width: 100%;
  }
  .sk-toggle-option {
    @media (max-width: 750px) {
    }
  }
  .sk-toggle-option.is-disabled {
    display: none;
  }
`

const SearchWrapper = styled.div`
border: 1px solid black;
}
`

const SearchMenu = styled.div`
  width: 100%;
  .sk-hierarchical-menu-option__text {
    color: black;
  }
  .sk-select {
    border: black;
  }
`

const Search = styled.div`
  border-bottom: 1px solid lightgrey;
  max-width: 100%;
  margin-top: -1em;
  margin-bottom: 0em;
  .sk-search-box input.sk-search-box__text {
    color: #666;
  }
  .sk-search-box__icon {
    color: black;
  }
`
