import React, { Component } from 'react'
import { Layout, Divider, Row, Col } from 'antd'
import styled from 'styled-components'
import SocialMenu from './socialMenu'
import FooterMenu from './footerMenu'

const MyFooter = styled(Layout.Footer)`
  background-color: white !important;
  padding: 0 5vw;
`
const Copyright = styled.p`
  margin-top: 2vh;
  text-align: center;
`


class Footer extends Component {
  render() {
    return (
      <MyFooter>
        <Divider style={{margin: 0}} />
        <Row type="flex" justify="space-between">
          <Col span={24} md={8}>
            <FooterMenu />
          </Col>
          <Col span={24} md={8}>
            <SocialMenu />
          </Col>
          <Col md={8}>
            <Copyright>
              Copyright Alda Financial Technologies, SL. 2018. All rights reserved.
            </Copyright>
          </Col>
        </Row>
      </MyFooter>
    )
  }
}

export default Footer
