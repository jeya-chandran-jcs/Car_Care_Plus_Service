import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Container, Row, Col, Button, Form, Card, Alert } from 'react-bootstrap';

const Booking = () => {
  const location = useLocation();
  const [confirmedBookingId, setConfirmedBookingId] = useState();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  let selectedService;

  if (location.state && location.state.services) {
    selectedService = location.state.services;
  } else {
    selectedService = [];
  }

  const [bookingData, setBookingData] = useState({
    service: selectedService.map((service) => service.id),
    name: '',
    email: '',
    phoneNumber: '',
    district: '',
    date: '',
  });

  const initialSelectedServices = location.state?.services || [];
  const [selectedServices, setSelectedServices] = useState(initialSelectedServices);

  const handleDeleteService = (service) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete the service: ${service.title}?`);

    if (isConfirmed) {
      setSelectedServices((prevSelectedServices) =>
        prevSelectedServices.filter((selected) => selected._id !== service._id)
      );
    }
  };

  const handleAddServiceClick = () => {
    
    navigate('/services', { state: { selectedServices: selectedServices } });
  };

  useEffect(() => {
    if (location.state?.newServices) {
      setSelectedServices((prevSelectedServices) => [
        ...prevSelectedServices,
        ...location.state.newServices,
      ]);
    }
  }, [location.state]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();

    try {
      if (selectedServices.length === 0) {
        console.error('No services selected.');
        return;
      }

      
      if (!isAuthenticated()) {
        alert('Please log in to confirm the booking.');
        navigate('/signin'); 
        return;
      }

      const selectedServiceIds = selectedServices.map((service) => service.id.toString());
      const requestData = {
        service: selectedServiceIds,
        ...bookingData,
      };

      const storedUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
      const token = storedUser ? storedUser.token : null;
  
      if (!token) {
        alert('Authorization token is missing. Please log in again.');
        navigate('/signin');
        return;
      }

      const response = await axios.post(
        'https://car-care-backend.onrender.com/bookings/',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );

      console.log('Response:', response);

  
      if (response.status === 201) {
        const { bookingId } = response.data;
        setConfirmedBookingId(bookingId);
        console.log('BookingId:', bookingId);
        console.log('Booking confirmed:', response.data);
  
        setTimeout(() => {
          navigate(`/confirmation/${bookingId}`);
        }, 4000);
      } else {
        console.error('BookingId is undefined');
      }
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };
return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Confirm Booking</h2>
      {selectedServices.length > 0 ? (
        <div>
          <h5 className="mb-3">Selected Services</h5>
          <Row>
            {selectedServices.map((service) => (
              <Col md={6} key={service._id} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{service.title}</Card.Title>
                    <Button variant="danger" onClick={() => handleDeleteService(service)}>
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <Alert variant="warning">No services selected</Alert>
      )}

      <Button variant="primary" onClick={handleAddServiceClick} className="mb-4">
        Choose New Services
      </Button>

      <Form onSubmit={handleBookingSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={bookingData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={bookingData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                value={bookingData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="district">
              <Form.Label>District</Form.Label>
              <Form.Control
                type="text"
                name="district"
                value={bookingData.district}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={bookingData.date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="success" type="submit" onClick={handleBookingSubmit}>
          Confirm Booking
        </Button>
      </Form>

      {confirmedBookingId && (
        <Alert variant="success" className="mt-4">
          Your Booking ID: {confirmedBookingId}
        </Alert>
      )}
    </Container>
  );
};

export default Booking;
