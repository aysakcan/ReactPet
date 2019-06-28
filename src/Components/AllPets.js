import React, { Component } from 'react';
import axios from 'axios';
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

class AllPets extends Component {
  constructor() {
    super();
    this.state = {
      allTeams: [],
      initialTeams: [],
      isLoaded: false,
      modal: false,
      selected: {},
      edited: {
        name: '',
        age: '',
        type: '',
        genus: '',
        desc: '',
        owner: ''
      },
      user : {}
    };

    this.toggle = this.toggle.bind(this);
    this.filterListName = this.filterListName.bind(this);
    this.filterListId = this.filterListId.bind(this);
    this.filterListAge = this.filterListAge.bind(this);
    this.filterListDesc = this.filterListDesc.bind(this);
  };

  loadTeamsNames = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    this.setState({user : user});

    if(localStorage.getItem('user') && user.role == "USER"){
      axios.get(`http://localhost:3002/getPet`)
      .then(response => this.setState({
        initialTeams: response.data.reverse().filter(pet => {
          return pet.user == user.email ;
        }),
        allTeams: response.data.reverse().filter(pet => {
          return pet.user == user.email ;
        }),
        isLoaded: true
      }));
    } else {
      axios.get(`http://localhost:3002/getPet`)
      .then(response => this.setState({
        initialTeams: response.data.reverse(),
        allTeams: response.data.reverse(),
        isLoaded: true
      }));
    }
  };

  deletePet = (id) => {
    if (window.confirm('Are you sure you wish to delete this pet?')) {
      axios.delete(`http://localhost:3002/deleteAPet/${id}`)
        .then(window.location.reload()); //this line is horrible
    } else return;
  };

  modifyPet = (id) => {
    /*const teamNameToModify = this.state.allTeams.filter(item => item.id === id)[0].TeamName;
    const newName = prompt("What the new team name ?", teamNameToModify);
    if (newName)
      axios.put(`http://localhost:3002/modifyAPet/${id}`,{ newName })
      .then(window.location.reload());*/
  };

  toggle = (item) => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      selected: item,
      edited: {
        name: item.isim,
        age: item.yas,
        type: item.tur,
        genus: item.cins,
        desc: item.aciklama,
        owner: item.user
      }
    }));
  }

  filterListId(event) {
    var updatedList = this.state.initialTeams;
    updatedList = updatedList.filter(function (item) {
      if (event.target.value !== '')
        return item.id == event.target.value;
      else {
        return true;
      }
    });
    this.setState({ allTeams: updatedList });
  }

  filterListName(event) {
    var updatedList = this.state.initialTeams;
    updatedList = updatedList.filter(function (item) {
      return item.isim.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({ allTeams: updatedList });
  }

  filterListAge(event) {
    var updatedList = this.state.initialTeams;
    updatedList = updatedList.filter(function (item) {
      if (event.target.value !== '')
        return item.yas == event.target.value;
      else {
        return true;
      }
    });
    this.setState({ allTeams: updatedList });
  }

  filterListDesc(event) {
    var updatedList = this.state.initialTeams;
    updatedList = updatedList.filter(function (item) {
      return item.aciklama.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({ allTeams: updatedList });
  }

  onChange = (e) => {
    var edited = { ...this.state.edited }
    if (e.target.name == 'name')
      edited.name = e.target.value;
    if (e.target.name == 'age')
      edited.age = e.target.value;
    if (e.target.name == 'type')
      edited.type = e.target.value;
    if (e.target.name == 'genus')
      edited.genus = e.target.value;
    if (e.target.name == 'desc')
      edited.desc = e.target.value;
    if (e.target.name == 'owner')
      edited.owner = e.target.value;
    this.setState({ edited })
  }

  onSubmit = (e) => {
    e.preventDefault();
    // get our form data out of state
    const { name, age, type, genus, desc, owner } = this.state.edited;
    const id = this.state.selected.id;

    var postData = {
      id: id,
      name: name,
      age: age,
      type: type,
      genus: genus,
      desc: desc,
      owner: owner
    };

    console.log(postData);

    axios.post('http://localhost:3002/editAPet', postData)
      .then(window.location.reload()); //this line is horrible
  }


  componentDidMount() {
    this.loadTeamsNames();
  };

  render() {
    const { allTeams, isLoaded } = this.state;
    const { name, age, type, genus, desc, owner } = this.state.edited;
    if (!isLoaded) return <div>Loading...</div>
    return (
      <Table responsive bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Desc</th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th><input type="text" className="form-control" placeholder="Search only on ID" onChange={this.filterListId} /></th>
            <th><input type="text" className="form-control" placeholder="Search only on Name" onChange={this.filterListName} /></th>
            <th><input type="text" className="form-control" placeholder="Search only on Age" onChange={this.filterListAge} /></th>
            <th><input type="text" className="form-control" placeholder="Search only on Desc" onChange={this.filterListDesc} /></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allTeams.map((item) =>
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.isim}</td>
              <td>{item.yas}</td>
              <td>{item.aciklama}</td>
              <td><Button color="warning" onClick={() => this.deletePet(item.id)}>Delete</Button></td>
              <td><Button color="success" className="editPet" onClick={() => this.toggle(item)}>Edit</Button></td>
            </tr>)}
        </tbody>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={() => this.toggle(this.state.selected)}>Edit Pet {this.state.selected.id}</ModalHeader>
          <ModalBody>
            <Form className="modalText">
              <FormGroup row>
                <Label for="name" sm={3}>Name</Label>
                <Col sm={9} className="align-self-center px-4">
                  <Input type="text" name="name" id="name" placeholder="Lucy" ref="name" required onChange={this.onChange} value={name} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="age" sm={3}>Age</Label>
                <Col sm={9} className="align-self-center px-4">
                  <Input type="number" name="age" id="age" placeholder="2" min="1" ref="age" required onChange={this.onChange} value={age} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="type" sm={3}>Type</Label>
                <Col sm={9} className="align-self-center px-4">
                  <Input type="text" name="type" id="type" placeholder="Dog" ref="type" required onChange={this.onChange} value={type} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="genus" sm={3}>Genus</Label>
                <Col sm={9} className="align-self-center px-4">
                  <Input type="text" name="genus" id="genus" placeholder="Golden" ref="genus" required onChange={this.onChange} value={genus} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="desc" sm={3}>Explanation</Label>
                <Col sm={9} className="align-self-center px-4">
                  <Input type="text" name="desc" id="desc" placeholder="Female.." ref="desc" required onChange={this.onChange} value={desc} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="owner" sm={3}>Email</Label>
                <Col sm={9} className="align-self-center px-4">
                  <Input type="email" name="owner" id="owner" placeholder="ownerEmail@example.com" ref="owner" readOnly value={owner} />
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onSubmit}>Save</Button>{' '}
            <Button color="secondary" onClick={() => this.toggle(this.state.selected)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Table>
    );
  };
};

export default AllPets;