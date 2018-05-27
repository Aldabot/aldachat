import React, { Component } from 'react'
import { Layout, Divider, Row, Col } from 'antd'
import styled from 'styled-components'
import SocialMenu from './socialMenu'
import FooterMenu from './footerMenu'

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
          <Col md={8}>
            <p>
              Copyright Alda Financial Technologies, SL. 2018. All rights reserved.
            </p>
          </Col>
          <Col span="24" md={8}>
            <FooterMenu />
          </Col>
          <Col md={8}>
            <SocialMenu />
          </Col>
        </Row>
      </MyFooter>
    )
  }
}

export default Footer
