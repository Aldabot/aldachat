import React, { Component } from 'react'
import styled from 'styled-components'
import { animateScroll } from 'react-scroll'
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
  @media (min-width: 768px){
    font-size: 1rem !important;
    li {
      padding: 1vw;
    }
  }
`

class FooterMenu extends Component {
  handleMenuClick() {
    animateScroll.scrollToTop();
  }

  render() {
    const { location } = this.props.router

    const selectedKeys = [];
    switch(location.pathname) {
      case '/faq':
        selectedKeys.push('faq')
        break
      case '/privacy':
        selectedKeys.push('privacy')
        break
      case '/security':
        selectedKeys.push('security')
        break;
      default: break;
    }

    return (
      <MyMenu
        mode="horizontal"
        onClick={this.handleMenuClick}
        defaultSelectedKeys={[]}
        selectedKeys={selectedKeys}
      >
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
