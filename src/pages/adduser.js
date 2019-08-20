import React from 'react';
import axios from 'axios';
import '../stylesheets/App.css';
import NavbarHeader from '../Components/NavbarHeader';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {
  Jumbotron,
  Container,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';

export default class AddUser extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      surname: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      role: ''
    };
  }

  inputClear = (e) => {
    this.setState({
      name: '',
      surname: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      role: ''
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    // get our form data out of state
    const { name, surname, email, password, phone, address, role } = this.state;

    var postData = {
      name: name,
      surname: surname,
      email: email,
      password: password,
      phone: phone,
      address: address,
      role: role
    };

    console.log(postData);

    axios.post('http://localhost:3002/insertAnUser', postData)
      .then(window.location.reload()); //this line is horrible
  }

  render() {
    const { name, surname, email, password, phone, address, role } = this.state;
    return (
      <div className="App">
        <header className="App-header homepageText">
          <NavbarHeader />
          <Jumbotron className="petHeader" fluid>
            <Container fluid>
              <h1 className="display-3">Add an User</h1>
              <p className="lead">You can add an user.</p>
            </Container>
          </Jumbotron>
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col">
              <Form className="formText">
                <FormGroup row>
                  <Label for="name" sm={3}>Name</Label>
                  <Col sm={9} className="align-self-center px-4">
                    <Input type="text" name="name" id="name" placeholder="Joe" ref="name" required onChange={this.onChange} value={name} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="surname" sm={3}>Surname</Label>
                  <Col sm={9} className="align-self-center px-4">
                    <Input type="text" name="surname" id="surname" placeholder="Doe" ref="surname" required onChange={this.onChange} value={surname} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="email" sm={3}>Email</Label>
                  <Col sm={9} className="align-self-center px-4">
                    <Input type="email" name="email" id="email" placeholder="test@gmail.com" ref="email" required onChange={this.onChange} value={email} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="password" sm={3}>Password</Label>
                  <Col sm={9} className="align-self-center px-4">
                    <Input type="text" name="password" id="password" placeholder="******" ref="password" required onChange={this.onChange} value={password} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="phone" sm={3}>Phone</Label>
                  <Col sm={9} className="align-self-center px-4">
                    <Input type="number" name="phone" id="phone" placeholder="123456789" ref="phone" required onChange={this.onChange} value={phone} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="address" sm={3}>Address</Label>
                  <Col sm={9} className="align-self-center px-4">
                    <Input type="text" name="address" id="address" placeholder="Turkey" ref="address" required onChange={this.onChange} value={address} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="role" sm={3}>Role</Label>
                  <Col sm={9} className="align-self-center px-4">
                    <Input type="text" name="role" id="role" placeholder="USER / ADMIN" ref="role" required onChange={this.onChange} value={role} />
                  </Col>
                </FormGroup>
                <FormGroup check row>
                  <Col sm={{ size: 12, offset: 0 }} className="d-flex justify-content-end  px-4">
                    <Button className="mr-4 w-25" color="info" onClick={this.inputClear}>Clear</Button>
                    <Button color="success w-25" onClick={this.onSubmit}>Add</Button>
                  </Col>
                </FormGroup>
              </Form>
            </div>
            <div className="col-sm-3"></div>
          </div>

        </header>
      </div>
    )
  }
};