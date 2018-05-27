import React, { Component } from 'react'
import styled from 'styled-components'
import { Menu } from 'antd';
import { Link } from 'react-router-dom'

const MyMenu = styled(Menu)`
  text-align: center;
  font-size: 1rem !important;
  li {
    float: none !important;
    display: inline-block;
    padding: 4vw;
  }
`

class FooterMenu extends Component {
  render() {
    return (
      <MyMenu mode="horizontal">
        <Menu.Item key="faq">
          <Link to="faq">FAQ</Link>
        </Menu.Item>
        <Menu.Item key="privacy">
          <Link to="privacy">Privacidad</Link>
        </Menu.Item>
        <Menu.Item key="security">
          <Link to="security">Seguridad</Link>
        </Menu.Item>
      </MyMenu>
    );
  }
}

export default FooterMenu
