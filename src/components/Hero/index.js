import React from 'react'
import styled from 'styled-components'
import Typist from 'react-typist'
import 'babel-polyfill'
import TypistCycle from './TypistCycle'
import Hero from './gorgaslibrary01_1920.jpg'

export default () => (
  <Content>
    <TextBackground>
      <TypistCycle
        content={['Good Data', 'Good Decisions']}
        numberOfCycles={-1} // loop indefinitely
        segmentDelay={2} // stop for 0.8s at end line
        cursor={{
          element: '_',
          hideWhenDoneDelay: 3000,
        }}
      />
    </TextBackground>
  </Content>
)

const Content = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-flow: column;
  height: 500px;
  -webkit-overflow-scrolling: touch;
  align-items: center;
  align-content: center;
  justify-content: center;
  background: url(${Hero}) no-repeat;
  background-size: cover;
  background-position: center center;

  h1 {
    font-size: 3vw;
  }
  @media (max-width: 768px) {
    height: 300px;
  }
`

const TextBackground = styled.div`
  margin-top: -5em;
  color: RGBA(0, 0, 0, 0.8);
  border-radius: 5px;
  font-weight: 700;
  padding-left: 5px;
  padding-right: 10px;
  line-height: 1.5em;
  font-size: 3.5em;
  text-align: center;
  background: RGBA(245, 243, 247, 0.6);
  .Typist .Cursor {
    display: inline-block;
  }
  .Typist .Cursor--blinking {
    opacity: 1;
    animation: blink 1s linear infinite;
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    line-height: 3.5rem;
    font-size: 2.5rem;
    margin-top: -3.5em;
  }
`
