import React, { Component } from 'react'
import { Menu } from 'antd';
import { Link } from 'react-router-dom'

class FooterMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="faq">
          <Link to="faq">Preguntas Frequentes</Link>
        </Menu.Item>
        <Menu.Item key="privacy">
          <Link to="privacy">Privacidad</Link>
        </Menu.Item>
        <Menu.Item key="security">
          <Link to="security">Seguridad</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default FooterMenu
