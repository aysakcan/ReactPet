import React from 'react';
import '../stylesheets/App.css';
import NavbarHeader from '../Components/NavbarHeader';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LoginForm from '../Components/LoginForm';

import { userService } from '../_services';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    userService.logout();
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavbarHeader />
          <LoginForm location={this.props.location} history={this.props.history} />
        </header>
      </div>
    )
  }
};