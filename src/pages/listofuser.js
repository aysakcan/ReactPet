import React from 'react';
import axios from 'axios';
import '../stylesheets/App.css';
import NavbarHeader from '../Components/NavbarHeader';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {
  Table, Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Jumbotron,
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';

export default class ListUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allTeams: [],
      initialTeams: [],
      allRoles: [],
      isLoaded: false,
      modal: false,
      selected: {},
      edited: {
        name: '',
        surname: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        role: ''
      }
    };

    this.filterListName = this.filterListName.bind(this);
    this.filterListId = this.filterListId.bind(this);
    this.filterListSurname = this.filterListSurname.bind(this);
    this.filterListEmail = this.filterListEmail.bind(this);
  }

  loadUsers = () => {
    axios.get(`http://localhost:3002/getUsers`)
      .then(response => this.setState({
        initialTeams: response.data.reverse(),
        allTeams: response.data.reverse(),
        isLoaded: true
      }));
    axios.get(`http://localhost:3002/getUserRoles`)
      .then(response => this.setState({
        allRoles: response.data.reverse()
      }));
  };

  filterListId(event) {
    var updatedList = this.state.initialTeams;
    updatedList = updatedList.filter(function (item) {
      if (event.target.value !== '')
        return item.userid == event.target.value;
      else {
        return true;
      }
    });
    this.setState({ allTeams: updatedList });
  }

  filterListName(event) {
    var updatedList = this.state.initialTeams;
    updatedList = updatedList.filter(function (item) {
      return item.user_first_name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({ allTeams: updatedList });
  }

  filterListSurname(event) {
    var updatedList = this.state.initialTeams;
    updatedList = updatedList.filter(function (item) {
      return item.user_last_name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({ allTeams: updatedList });
  }

  filterListEmail(event) {
    var updatedList = this.state.initialTeams;
    updatedList = updatedList.filter(function (item) {
      return item.user_email.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({ allTeams: updatedList });
  }

  deleteUser = (id) => {
    if (window.confirm('Are you sure you wish to delete this user?')) {
      axios.delete(`http://localhost:3002/deleteAnUser/${id}`)
        .then(window.location.reload()); //this line is horrible
    } else return;
  }

  toggle = (item, role) => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      selected: item,
      edited: {
        name: item.user_first_name,
        surname: item.user_last_name,
        email: item.user_email,
        password: item.user_password,
        phone: item.user_phone,
        address: item.user_address1,
        role: role
      }
    }));
  }

  getRole = (id) => {
    var updatedList = this.state.allRoles;
    updatedList = updatedList.filter(function (item) {
      if (id !== '')
        return item.user_id == id;
      else {
        return true;
      }
    });
    return updatedList[0].roles;
  }

  onChange = (e) => {
    var edited = { ...this.state.edited }
    if (e.target.name == 'name')
      edited.name = e.target.value;
    if (e.target.name == 'surname')
      edited.surname = e.target.value;
    if (e.target.name == 'email')
      edited.email = e.target.value;
    if (e.target.name == 'password')
      edited.password = e.target.value;
    if (e.target.name == 'phone')
      edited.phone = e.target.value;
    if (e.target.name == 'address')
      edited.address = e.target.value;
    if (e.target.name == 'role')
      edited.role = e.target.value;
    this.setState({ edited })
  }

  onSubmit = (e) => {
    e.preventDefault();
    // get our form data out of state
    const { name, surname, email, password, phone, address, role } = this.state.edited;
    const id = this.state.selected.userid;

    var postData = {
      id: id,
      name: name,
      surname: surname,
      email: email,
      password: password,
      phone: phone,
      address: address,
      role: role
    };

    console.log(postData);

    axios.post('http://localhost:3002/editAnUser', postData)
      .then(window.location.reload()); //this line is horrible
  }

  componentDidMount() {
    this.loadUsers();
  };

  render() {
    const { allTeams, isLoaded } = this.state;
    const { name, surname, email, password, phone, address, role } = this.state.edited;
    if (!isLoaded) return <div>Loading...</div>
    return (
      <div className="App">
        <header className="App-header homepageText">
          <NavbarHeader />
          <Jumbotron className="petHeader" fluid>
            <Container fluid>
              <h1 className="display-3">List of Users</h1>
              <p className="lead">You can list, delete and edit users with just a click!</p>
            </Container>
          </Jumbotron>
          <Table responsive bordered>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th></th>
                <th></th>
              </tr>
              <tr>
                <th><input type="text" className="form-control" placeholder="Search only on ID" onChange={this.filterListId} /></th>
                <th><input type="text" className="form-control" placeholder="Search only on Name" onChange={this.filterListName} /></th>
                <th><input type="text" className="form-control" placeholder="Search only on Surname" onChange={this.filterListSurname} /></th>
                <th><input type="text" className="form-control" placeholder="Search only on Email" onChange={this.filterListEmail} /></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allTeams.map((item) =>
                <tr key={item.userid}>
                  <th scope="row">{item.userid}</th>
                  <td>{item.user_first_name}</td>
                  <td>{item.user_last_name}</td>
                  <td>{item.user_email}</td>
                  <td><Button color="warning" onClick={() => this.deleteUser(item.userid)}>Delete</Button></td>
                  <td><Button color="success" className="editUser" onClick={() => this.toggle(item, this.getRole(item.userid))}>Edit</Button></td>
                </tr>)}
            </tbody>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={() => this.toggle(this.state.selected, this.getRole(this.state.selected.userid))}>Edit User {this.state.selected.userid}</ModalHeader>
              <ModalBody>
                <Form className="modalText">
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
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.onSubmit}>Save</Button>{' '}
                <Button color="secondary" onClick={() => this.toggle(this.state.selected, "USER")}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </Table>
        </header>
      </div>
    )
  }
};