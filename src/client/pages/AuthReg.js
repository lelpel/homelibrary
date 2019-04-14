import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Register from '../components/Register';
import Login from '../components/Login';

export default function AuthReg() {
  return (
    <Container>
      <Row>
        <Col xs="6">
          <Register />
        </Col>
        <Col xs="6">
          <Login />
        </Col>
      </Row>
    </Container>
  );
}
