import React from 'react';
import  { Redirect } from 'react-router-dom'
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
    }

    render() {
        return (
            <div className="registerForm">
                <h1 id="introHeader">Register to Application</h1>
                <Form>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={3}>Email</Label>
                        <Col sm={9} className="align-self-center">
                            <Input type="email" name="email" id="exampleEmail" placeholder="example@example.com" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="examplePassword" sm={3}>Password</Label>
                        <Col sm={9} className="align-self-center">
                            <Input type="password" name="password" id="examplePassword" placeholder="Password" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleSelect" sm={3}>Gender</Label>
                        <Col sm={9} className="align-self-center">
                            <Input type="select" name="gender" id="exampleSelect">
                                <option>Female</option>
                                <option>Male</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <FormText className="smallText" color="muted">
                                Register only an email. Thank you for choosing us ...
                        </FormText>
                        <Col sm={{ size: 12, offset: 0 }}>
                            <Button className="buttonSubmit" color="warning" size="lg">Register</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}