import React from 'react';
import { Menu, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';


const SubMenu = Menu.SubMenu;

export default class LeftMenu extends React.Component {
  state = {
    collapsed: false,
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }


  componentDidMount(){
    this.toggleCollapsed();

    const navigation = document.querySelector('.navigation');
    const ul = document.getElementById('menu');
    const menu = document.querySelectorAll('.ant-menu-item, .ant-menu-submenu');
   
    for(let i=0; i<2; i++){
      menu[i].addEventListener('mouseover', () => {
        this.handleMouseOver();
      });
    }
    
    function isDescendant(parent, child) {
      var node = child.parentNode;
      while (node != null) {
          if (node == parent) {
              return true;
          }
          node = node.parentNode;
      }
      return false;
    }
    // Detect all clicks on the document
    
    document.addEventListener('mouseover', (e) => {
      let targetElement = e.target; // clicked element
      
      let timeout;
      
      if( !isDescendant(navigation, targetElement) && this.state.collapsed === false ){
        
        timeout = setTimeout(() => {
          this.setState({
            collapsed: true
          });
        }, 1000);
      } 
    })
  }

  handleMouseOver = () => {
    setTimeout(() => {
      this.setState({
        collapsed: false
      });
    }, 200);
  }

  render() {

    return (
      <div className="navigation" style={{ width: 200 }}>
        {/* <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button> */}
        <Menu
          id="menu"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={[]}
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


          <SubMenu key="sub1" title={<span ><Icon type="mail" /><span>Account</span></span>}>
            <Menu.Item key="4">Settings</Menu.Item>
            <Menu.Item key="5">Log Out</Menu.Item>
          </SubMenu>


          <SubMenu key="sub2" title={<span ><Icon type="appstore" /><span>Navigation Two</span></span>}>
            <Menu.Item key="6">Option 9</Menu.Item>
            <Menu.Item key="7">Option 10</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
