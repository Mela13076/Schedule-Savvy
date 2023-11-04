import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SignUp() {


    return (
      <Card className='sign-up-form'>
      <Card.Header as="h5">Sign Up</Card.Header> {/* Sign In header */}
      <Card.Body>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your full name" />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" />
          </Form.Group>

          <Button  className="sign-up-button" variant="primary" type="submit">
            Sign Up
          </Button>

          <div className="mt-3">
            <p>Already have an account?</p>
            <Link to="/sign-in">Sign In</Link>
          </div>
        </Form>
      </Card.Body>
    </Card>
    )
  }
  
  export default SignUp