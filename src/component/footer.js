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
  @media (min-width: 768px){
    text-align: left;
    margin-top: 1vh;
  }
`


class Footer extends Component {
  render() {
    const { router } = this.props

    return (
      <MyFooter>
        <Divider style={{margin: 0}} />
        <Row type="flex" justify="space-between" align="middle">
          <Col oder={1} span={24} md={{span: 7, order: 2}}>
            <FooterMenu router={router} />
          </Col>
          <Col span={24} order={2} md={{span: 5, order: 3}}>
            <SocialMenu />
          </Col>
          <Col order={3} md={{span: 12, order: 1}}>
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
