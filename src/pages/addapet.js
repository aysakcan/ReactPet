import React from 'react';
import ReactDOM from 'react-dom';
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

export default class Homepage extends React.Component {
    constructor() {
        super();

        this.state = {
            name: '',
            age: '',
            type: '',
            genus: '',
            desc: '',
            owner: ''
        };
    }

    inputClear = (e) => {
        this.setState({
            name: '',
            age: '',
            type: '',
            genus: '',
            desc: '',
            owner: ''
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        const { name, age, type, genus, desc, owner } = this.state;

        var postData = {
            name: name,
            age: age,
            type: type,
            genus: genus,
            desc: desc,
            owner: owner
        };

        console.log(postData);

        axios.post('http://localhost:3002/insertAPet', postData)
            .then(window.location.reload()); //this line is horrible
    }

    render() {
        const { name, age, type, genus, desc, owner } = this.state;
        return (
            <div className="App">
                <header className="App-header homepageText">
                    <NavbarHeader />
                    <Jumbotron className="petHeader" fluid>
                        <Container fluid>
                            <h1 className="display-3">Add a Pet</h1>
                            <p className="lead">You can add a pet to our database to everybody can show your sweety pet.</p>
                        </Container>
                    </Jumbotron>
                    <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col">
                            <Form className="formText">
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
                                        <Input type="email" name="owner" id="owner" placeholder="ownerEmail@example.com" ref="owner" required onChange={this.onChange} value={owner} />
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