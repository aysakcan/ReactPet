import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class AllPets extends Component {
  constructor() {
    super();
    this.state = {
      allTeams: [],
      isLoaded: false,
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  };

  loadTeamsNames = () => {
    axios.get(`http://localhost:3002/getPet`)
      .then(response => this.setState({
        allTeams: response.data.reverse(),
        isLoaded: true
      }));
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

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }


  componentDidMount() {
    this.loadTeamsNames();
  };

  render() {
    const { allTeams, isLoaded } = this.state;
    if (!isLoaded) return <div>Loading...</div>
    return (
      <Table responsive bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Desc</th>
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
              <td><Button color="success" className="editPet" onClick={this.toggle}>Edit</Button></td>
            </tr>)}
        </tbody>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Edit the pet
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Save</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Table>
    );
  };
};

export default AllPets;