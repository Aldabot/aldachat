import React, { Component } from 'react'
import { Layout, Divider, Row, Col } from 'antd'
import styled from 'styled-components'
import SocialMenu from './socialMenu'

const MyFooter = styled(Layout.Footer)`
  background-color: white !important;
  padding: 0 5vw;
`
class Footer extends Component {
  render() {
    return (
      <MyFooter>
        <Divider />
        <Row type="flex" justify="space-between">
          <Col>
            <p>
              Copyright Alda Financial Technologies, SL. 2018. All rights reserved.
            </p>
          </Col>
          <Col>
            <SocialMenu />
          </Col>
        </Row>
      </MyFooter>
    )
  }
}

export default Footer
