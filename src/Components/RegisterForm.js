import React from 'react';
import axios from 'axios';
import {
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText
} from 'reactstrap';

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        const { email, password } = this.state;

        if (!(email && password)) {
            return;
        }

        var postData = {
            name: 'Test',
            surname: 'Test',
            email: email,
            password: password,
            phone: 'Test',
            address: 'Test',
            role: 'USER'
        };

        console.log(postData);

        axios.post('http://localhost:3002/insertAnUser', postData)
            .then(window.location.reload()); //this line is horrible
    }

    render() {
        const { email, password } = this.state;
        return (
            <div className="registerForm">
                <h1 id="introHeader">Register to Application</h1>
                <Form>
                    <FormGroup row>
                        <Label for="email" sm={3}>Email</Label>
                        <Col sm={9} className="align-self-center">
                        <Input type="email" name="email" id="email" placeholder="example@example.com" ref="email" required onChange={this.onChange} value={email} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password" sm={3}>Password</Label>
                        <Col sm={9} className="align-self-center">
                        <Input type="password" name="password" id="password" placeholder="Password" ref="password" required onChange={this.onChange} value={password} />
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <FormText className="smallText" color="muted">
                            Register only an email. Thank you for choosing us ...
                        </FormText>
                        <Col sm={{ size: 12, offset: 0 }}>
                            <Button className="buttonSubmit" color="warning" size="lg" onClick={this.onSubmit}>Register</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}