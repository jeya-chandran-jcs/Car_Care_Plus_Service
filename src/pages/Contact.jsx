import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from '../styles/contact.module.css'; // Custom CSS module for additional styling

const Contact = () => {
  return (
    <Container className={`mt-5 mb-5 ${styles.contactContainer}`}>
      <Card className="shadow-sm border border-primary rounded">
        <Card.Body>
          <Card.Title className="text-center mb-4">Contact Us</Card.Title>
          <Card.Text className="text-center">
            If you have any questions or inquiries, feel free to contact us.
          </Card.Text>
          <ul className="list-unstyled text-center">
            <li className="mb-2">
              <strong>Email: </strong><b>Fake</b> info@carcarepluseservices.com
            </li>
            <li>
              <strong>Phone: </strong><b>Fake</b> 9012345678, 9123456789
            </li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Contact;
