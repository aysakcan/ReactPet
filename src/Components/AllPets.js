import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class AllPets extends Component {
  constructor() {
    super();
    this.state = {
      allTeams: [],
      initialTeams: [],
      isLoaded: false,
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.filterListName = this.filterListName.bind(this);
    this.filterListId = this.filterListId.bind(this);
    this.filterListAge = this.filterListAge.bind(this);
    this.filterListDesc = this.filterListDesc.bind(this);
  };

  loadTeamsNames = () => {
    axios.get(`http://localhost:3002/getPet`)
      .then(response => this.setState({
        initialTeams: response.data.reverse(),
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

  filterListId(event) {
    var updatedList = this.state.initialTeams;
    updatedList = updatedList.filter(function(item){
      if(event.target.value !== '' )
        return item.id == event.target.value;
      else{
        return true;
      }
    });
    this.setState({allTeams: updatedList});
  }

  filterListName(event) {
    var updatedList = this.state.initialTeams;
    updatedList = updatedList.filter(function(item){
      return item.isim.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({allTeams: updatedList});
  }
  
  filterListAge(event) {
    var updatedList = this.state.initialTeams;
    updatedList = updatedList.filter(function(item){
      if(event.target.value !== '' )
        return item.yas == event.target.value;
      else{
        return true;
      }
    });
    this.setState({allTeams: updatedList});
  }

  filterListDesc(event) {
    var updatedList = this.state.initialTeams;
    updatedList = updatedList.filter(function(item){
      return item.aciklama.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({allTeams: updatedList});
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
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Desc</th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th><input type="text" className="form-control" placeholder="Search only on ID" onChange={this.filterListId}/></th>
            <th><input type="text" className="form-control" placeholder="Search only on Name" onChange={this.filterListName}/></th>
            <th><input type="text" className="form-control" placeholder="Search only on Age" onChange={this.filterListAge}/></th>
            <th><input type="text" className="form-control" placeholder="Search only on Desc" onChange={this.filterListDesc}/></th>
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