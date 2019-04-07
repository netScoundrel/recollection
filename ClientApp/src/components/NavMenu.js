import React from 'react';
import { Menu, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;

export default class NavMenu extends React.Component {
  state = {
    collapsed: false,
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <div className="navigation" style={{ width: 256 }}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1">
          <Link to="/feed">
            <Icon type="pie-chart" />
            <span>Feed</span>
          </Link>
          </Menu.Item>
          
            <Menu.Item key="2">
              <Link to="/stories">
              <Icon type="desktop" />
                <span>Stories</span>
              </Link>
            </Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Account</span></span>}>
            <Menu.Item key="4">Settings</Menu.Item>
            <Menu.Item key="5">Log Out</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
            <Menu.Item key="6">Option 9</Menu.Item>
            <Menu.Item key="7">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="8">Option 11</Menu.Item>
              <Menu.Item key="9">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
