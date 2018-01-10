import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Accordion, AccordionItem } from 'react-sanfona'
import Obfuscate from 'react-obfuscate'
import PageTitle from '../../components/PageTitle'

const prefix = __PREFIX_PATHS__ ? __PATH_PREFIX__ : ''

const Staff2 = props => {
  const staff = props.data.allStaffJson.edges.map(e => ({
    ...e.node,
  }))

  return (
    <div>
      <Helmet
        title={`Staff | OIRA`}
        meta={[
          {
            name: 'Office of Institutional Research and Assessment Staff',
            content:
              'Staff of the Office of Institutional Research and Assessment at The University of Alabama',
          },
        ]}
      />
      <h1>Staff</h1>
      <hr />
      <Accordion activeItems={0}>
        {staff.map((link, i) => (
          <AccordionUnit
            key={i}
            title={
              <div>
                {link.name} <Title> {link.title} </Title>
              </div>
            }
          >
            <div>
              <Img
                src={`${prefix}/staff-images/${link.image}`}
                alt={`${link.name} staff photo`}
              />
              <Contact>
                <p>
                  Office: {link.office}
                  <br />
                  Phone: <Obfuscate tel={link.phone} />
                  <br />
                  Fax: <Obfuscate tel={link.fax} />
                  <br />
                  Email: <Obfuscate email={link.email} />
                </p>
              </Contact>
              <Education>
                <p>
                  {link.education1}
                  <br />
                  {link.education2}
                  <br />
                  {link.education3}
                  <br />
                  {link.education4}
                  <br />
                  {link.education5}
                  <br />
                  {link.education6}
                </p>
              </Education>
            </div>
          </AccordionUnit>
        ))}
      </Accordion>
    </div>
  )
}

const Img = styled.img`
  float: left;
  width 100px;
  margin: 1em 1em 1em 0em;
`
const Contact = styled.div`
  float: left;
  margin: 1em;
`
const EducationHeader = styled.h4`
  text-align: right;
`
const Education = styled.div`
  text-align: right;
  float: right;
  margin: 1em 0em 1em 1em;
  max-width: 500px;
  @media (max-width: 800px) {
    text-align: left;
    float: left;
  }
`
const Title = styled.span`
  float: right;
  color: #990000;
  @media (max-width: 800px) {
    float: none;
    display: block;
  }
`
const AccordionUnit = styled(AccordionItem)`
  border-bottom: 1px solid hsla(0, 0%, 0%, 0.2);
  padding-bottom: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
`
export const query = graphql`
  query Staff {
    allStaffJson {
      edges {
        node {
          name
          title
          office
          phone
          fax
          email
          education1
          education2
          education3
          education4
          education5
          image
        }
      }
    }
  }
`
export default Staff2
