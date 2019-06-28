import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

export default class NavbarHeader extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand id="navbarApp" href="/">Application</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink id="loginLink" href="/login">{localStorage.getItem('user') ? 'Logout' : 'Login'}</NavLink>
              </NavItem>
              {localStorage.getItem('user') ? '' :
                <NavItem>
                  <NavLink id="registerLink" href="/register">Register</NavLink>
                </NavItem>
              }
              {localStorage.getItem('user') ?
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {JSON.parse(localStorage.getItem('user')).role == "ADMIN" ? 'All Pets' : 'My Pets'}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem href="/addpet">
                      Add a Pet
                    </DropdownItem>
                    <DropdownItem href="/listofpets">
                      List of Pets
                    </DropdownItem>
                    <DropdownItem divider />
                    {localStorage.getItem('user') ?
                      <DropdownItem href="/profile">
                        Profile
                    </DropdownItem>
                      :
                    ''
                    }
                  </DropdownMenu>
                </UncontrolledDropdown>
                : ''
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}