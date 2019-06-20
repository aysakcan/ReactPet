import React from 'react';
import '../stylesheets/App.css';
import NavbarHeader from '../Components/NavbarHeader';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AllPets from '../Components/AllPets';
import { Jumbotron, Container } from 'reactstrap';

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header homepageText">
                <NavbarHeader />
                    <Jumbotron className="petHeader" fluid>
                        <Container fluid>
                            <h1 className="display-3">List of Pets</h1>
                            <p className="lead">You can list, delete and edit pets with just a click!</p>
                        </Container>
                    </Jumbotron>
                    <AllPets />
                </header>
            </div>
        )
    }
};