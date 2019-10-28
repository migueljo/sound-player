import React from 'react'
import styled from 'styled-components'
import Tracks from 'Components/Tracks'
import { GlobalStyle } from './styles'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #0093e9;
  background: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
`

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Tracks />
      </Container>
    </>
  )
}

export default App
