import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SocialMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="facebook">
          <a href="https://www.facebook.com/www.alda.bot/" target="_blanc">
            <Icon type="facebook" />
          </a>
        </Menu.Item>
        <Menu.Item key="instagram">
          <a href="https://www.instagram.com/alda.bot/" target="_blanc">
            <Icon type="instagram" />
          </a>
        </Menu.Item>
        <Menu.Item key="youtube">
          <a href="https://www.youtube.com/channel/UCiOTqfYrJQtENNbjq8Npt5g" target="_blanc">
            <Icon type="youtube" />
          </a>
        </Menu.Item>
        <Menu.Item key="medium">
          <a href="https://medium.com/@alda_es" target="_blanc">
            <Icon type="medium" />
          </a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default SocialMenu
