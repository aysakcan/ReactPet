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
    
  }

    componentDidMount() {
      this.loadUsers();
    };

    render() {
      const { allTeams, isLoaded } = this.state;
      const { name, age, type, genus, desc, owner } = this.state.edited;
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
                    <td><Button color="success" className="editUser" onClick={() => this.toggle(item)}>Edit</Button></td>
                  </tr>)}
              </tbody>
              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={() => this.toggle(this.state.selected, "USER")}>Edit User {this.state.selected.userid}</ModalHeader>
                <ModalBody>
                  Edit User
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