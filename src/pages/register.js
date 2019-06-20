import React from 'react';
import '../stylesheets/App.css';
import NavbarHeader from '../Components/NavbarHeader';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from '../Components/RegisterForm';


export default class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
      <header className="App-header">
        <NavbarHeader />
        <RegisterForm />
      </header>
    </div>
    )
  }
};