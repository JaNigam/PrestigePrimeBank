import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const LandingPage = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col md={6}>
          <h1>Welcome to Our Banking App</h1>
          <p>Your one-stop solution for all your banking needs.</p>
          <Button variant="primary" href="/login">
            Log In
          </Button>{" "}
          <Button variant="outline-primary" href="/signup">
            Sign Up
          </Button>
        </Col>
        <Col md={6}>{/* Add an image or illustration here */}</Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
