import React from 'react';
import {
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Alert
} from 'reactstrap';

import { userService } from '../_services';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            submitted: false,
            loading: false,
            error: '',
            alertVisible: true
        };
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ visible: false });
      }

      
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        this.setState({ submitted: true });
        const { email, password, returnUrl } = this.state;

        if (!(email && password)) {
            return;
        }

        this.setState({ loading: true });
        userService.login(email, password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/profile" } };
                    this.props.history.push(from);
                    console.log(user);
                },
                error => this.setState({ error, loading: false })
            );

    }

    render() {
        const { email, password, submitted, loading, error } = this.state;
        return (
            <div className="registerForm">
                <h1 id="introHeader">Login to Application</h1>
                <Form>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={3}>Email</Label>
                        <Col sm={9} className="align-self-center">
                            <Input type="email" name="email" id="email" placeholder="example@example.com" ref="email" required onChange={this.onChange} value={email} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="examplePassword" sm={3}>Password</Label>
                        <Col sm={9} className="align-self-center">
                            <Input type="password" name="password" id="password" placeholder="Password" ref="password" required onChange={this.onChange} value={password} />
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <FormText className="smallText" color="muted">
                            Login and enter our world. Thank you for choosing us ...
                        </FormText>
                        <Col sm={{ size: 12, offset: 0 }}>
                            <Button className="buttonSubmit" color="warning" size="lg" onClick={this.onSubmit}>Login</Button>
                            {error &&
                                <Alert className="mt-5 alertText" color="warning" isOpen={this.state.visible} toggle={this.onDismiss}>
                                {error}
                              </Alert>
  
                            }
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}