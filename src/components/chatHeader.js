import React from 'react'
import styled from 'styled-components'
import { Row, Col, Button } from 'antd'
import { Link } from 'react-router-dom'

const Header = styled(Row)`
  position: sticky;
  top: 0;
  background-color: #f8f7f8;
  z-index: 20;
  border-bottom: solid 1px #b3b2b3;
  padding: 0 10px;
  height: 7vh;
  margin: -2vw 0 0 -2vw;
  width: 100vw;
`
const Title = styled.h1`
  margin-bottom: 0;
`

const ChatHeader = (props) => {
  return (
    <Header type="flex" justify="space-between" align="middle">
      <Col>
        <Link to="/">
          <Button type="primary" shape="circle" size="small" icon="step-backward" />
        </Link>
      </Col>
      <Col>
        <Title>Alda</Title>
      </Col>
      <Col>
        <Button type="primary" disabled size="small" icon="setting" />
      </Col>
    </Header>
  )
}

export default ChatHeader
