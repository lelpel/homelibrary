import React from 'react';

import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { Redirect } from 'react-router-dom';
import setAuthToken from '../utils/setAuthToken';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      name: '',
      loggedIn: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { name, password } = this.state;

    axios
      .post('http://localhost:8080/api/users/login', { name, password })
      .then(res => {
        this.setState({ loggedIn: true });
        // Save to localStorage
        const { token } = res.data;
        // Set token to ls
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwtDecode(token);
        // Set current user
        console.log(decoded);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { name, loggedIn, password } = this.state;

    if (loggedIn) return <Redirect to="/allbooks" />;
    return (
      <Card>
        <CardBody>
          <CardTitle>Login</CardTitle>

          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={this.handleChange}
              />
            </FormGroup>

            <Button>Login</Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
