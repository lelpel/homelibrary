/* eslint-disable class-methods-use-this */
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

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      name: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      password: this.state.password
    };

    axios
      .post('http://localhost:8080/api/users/register', newUser)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Register</CardTitle>

          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={this.state.name}
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
                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormGroup>

            <Button>Register</Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

// export default class Register extends React.Component {
//   constructor(props) {
//     super(props);

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     // eslint-disable-next-line react/no-unused-state
//     this.setState({ value: event.target.value });
//   }

//   handleSubmit() {
//     fetch('http://localhost:8080/api/users/register', {
//       method: 'post',
//       headers: {
//         Accept: 'application/json, text/plain, */*',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ a: 7, str: 'Some string: &=&' })
//     })
//       .then(res => res.json())
//       .then(res => console.log(res));
//   }

//   render() {
//     return (
//       <Card>
//         <CardBody>
//           <CardTitle>Register</CardTitle>

//           <Form>
//             <FormGroup>
//               <Label for="name">Name</Label>
//               <Input
//                 type="text"
//                 name="name"
//                 id="name"
//                 placeholder="Enter your name"
//               />
//             </FormGroup>

//             <FormGroup>
//               <Label for="password">Password</Label>
//               <Input
//                 type="password"
//                 name="password"
//                 id="password"
//                 placeholder="Enter your password"
//               />
//             </FormGroup>

//             <Button
//               onClick={() => {
//                 this.handleSubmit();
//               }}
//             >
//               Submit
//             </Button>
//           </Form>
//         </CardBody>
//       </Card>
//     );
//   }
// }
