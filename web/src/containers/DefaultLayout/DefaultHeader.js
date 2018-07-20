import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu,FormGroup,Input, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'
import sygnet from '../../assets/img/brand/logo.png'
import './common.css';
import cookie from 'react-cookies';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  logout(){
    cookie.remove('user', { path: '/' })
    cookie.remove('_id',  { path: '/' })
    cookie.remove('name', { path: '/' })
    cookie.remove('token', { path: '/' })    
    window.location = '#/login';
  }
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 80, height: 35, alt: 'Yinn Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'Yinn Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          {/* <NavItem className="px-3">
            <NavLink href="/">Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#">Users</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#">Settings</NavLink>
          </NavItem> */}
          
        </Nav>
        <Nav className="ml-auto" navbar>
        <FormGroup><br/>
          <Input type="select" name="select" id="exampleSelect">
            <option>English</option>
            <option>German</option>
            <option>French</option>
          </Input>
        </FormGroup>
          {/* <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-list"></i></NavLink>
          </NavItem>*/}
          <NavItem className="d-md-down-none">
          </NavItem> 


          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
            {cookie.load('user')} {" "}{cookie.load('name')}
              <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
               <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
             

              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
              <DropdownItem onClick={this.logout.bind(this)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
