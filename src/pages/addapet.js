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
    constructor(props) {
        super(props);

        this.state = {
            name: 'aaa',
            age: '2',
            type: 'aaa',
            genus: 'aaa',
            desc: 'aaa',
            owner: 'aaa',
            data: []
        };

        this.insertPet = this.insertPet.bind(this);
    }

    clearInputs = () => {
        ReactDOM.findDOMNode(this.refs.petname).value = '';
        ReactDOM.findDOMNode(this.refs.petage).value = '';
        ReactDOM.findDOMNode(this.refs.pettype).value = '';
        ReactDOM.findDOMNode(this.refs.petgenus).value = '';
        ReactDOM.findDOMNode(this.refs.petdesc).value = '';
        ReactDOM.findDOMNode(this.refs.petowner).value = '';
    }

    insertPet = (e) => {
        const  myArr = [{
            name: 'aaa',
            age: '2',
            type: 'aaa',
            genus: 'aaa',
            desc: 'aaa',
            owner: 'aaa'
        }];

        this.setState({data: myArr});

        console.log(this.state.data);
        console.log(myArr);

        axios.post(`http://localhost:3002/insertAPet/${myArr}`)
            //.then(this.setState({ name: '', age: '', type: '', genus: '', desc: '', owner: '' }))
            //.then(window.location.reload()); //this line is horrible

        this.clearInputs();
    };

    render() {
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
                            <Form className="d-flex flex-sm-column justify-content-center formText">
                                <FormGroup row>
                                    <Label for="petname" sm={3}>Name</Label>
                                    <Col sm={9} className="align-self-center">
                                        <Input type="text" name="petname" id="petname" placeholder="Lucy" ref="petname" required />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="petage" sm={3}>Age</Label>
                                    <Col sm={9} className="align-self-center">
                                        <Input type="number" name="petage" id="petage" placeholder="2" min="1" ref="petage" required />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="pettype" sm={3}>Type</Label>
                                    <Col sm={9} className="align-self-center">
                                        <Input type="text" name="pettype" id="pettype" placeholder="Dog" ref="pettype" required />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="petgenus" sm={3}>Genus</Label>
                                    <Col sm={9} className="align-self-center">
                                        <Input type="text" name="petgenus" id="petgenus" placeholder="Golden" ref="petgenus" required />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="petdesc" sm={3}>Explanation</Label>
                                    <Col sm={9} className="align-self-center">
                                        <Input type="text" name="petdesc" id="petdesc" placeholder="Female.." ref="petdesc" required />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="petowner" sm={3}>Email</Label>
                                    <Col sm={9} className="align-self-center">
                                        <Input type="email" name="petowner" id="petowner" placeholder="ownerEmail@example.com" ref="petowner" required />
                                    </Col>
                                </FormGroup>
                                <FormGroup check row>
                                    <Col sm={{ size: 12, offset: 0 }} className="d-flex justify-content-end">
                                        <Button className="mr-4" color="info" onClick={this.clearInputs}>Clear</Button>
                                        <Button color="success" onClick={this.insertPet}>Add</Button>
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