import React from 'react';
import '../stylesheets/App.css';
import NavbarHeader from '../Components/NavbarHeader';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HomepageInner from '../Components/HomepageInner';


export default class AddUser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavbarHeader />
          <div className="alertText">Add User</div>
        </header>
      </div>
    )
  }
};