import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

import NavbarHeader from '../Components/NavbarHeader';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        };
        
    }
    
    componentDidMount() {
        //$('#loginLink').text('Logout');
        //$('#registerLink').css("display", "none");

        this.setState({
            user: JSON.parse(localStorage.getItem('user'))
        });
        //userService.getAll().then(users => this.setState({ users }));
    }

    render() {
        const { user } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <NavbarHeader />
                    <div className="col-sm-12 col-md-6 offset-md-3 cardText">
                            <Card className="mt-3">
                                <CardImg className="cardImage" src="https://www.w3schools.com/howto/img_avatar2.png" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle> <strong>Hello {user.firstName}!</strong> </CardTitle>
                                    <CardSubtitle><br></br></CardSubtitle>
                                    <CardText>Email : {user.email}</CardText>
                                    <CardText>Name : {user.firstName}</CardText>
                                    <CardText>Surname : {user.lastName}</CardText>
                                    <CardText>Phone : {user.phone}</CardText>
                                    <CardText>Address : {user.address}</CardText>
                                    <CardText>Role : {user.role}</CardText>
                                    <Button href="/login" >Logout</Button>
                                </CardBody>
                            </Card>

                    </div>
                </header>
            </div>
        );
    }
}
