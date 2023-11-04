import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SignIn() {


    return (
      <Card className='sign-in-form'>
      <Card.Header as="h5">Sign In</Card.Header> {/* Sign In header */}
      <Card.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button  className="sign-in-button" variant="primary" type="submit">
            Login
          </Button>

          <div className="mt-3">
            <p>Don't have an account?</p>
            <Link to="/sign-up">Sign Up</Link>
          </div>
        </Form>
      </Card.Body>
    </Card>
    )
  }
  
  export default SignIn