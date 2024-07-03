import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Select, Button } from 'antd';

const { Option } = Select;

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  const handleServiceSelection = (service) => {
    if (selectedServices.some((selected) => selected.id === service.id)) {
      setSelectedServices((prevSelectedServices) =>
        prevSelectedServices.filter((selected) => selected.id !== service.id)
      );
    } else {
      setSelectedServices((prevSelectedServices) => [...prevSelectedServices, service]);
    }
  };

  const handleAddServicesClick = () => {
    const currentSelectedServices = location.state?.services || [];
    const updatedServices = [...currentSelectedServices, ...selectedServices];
    navigate('/bookings', {
      state: {
        services: updatedServices,
      },
    });
  };

  const handleBookingClick = () => {
    if (selectedServices.length > 0) {
      navigate('/bookings', { state: { services: selectedServices } });
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get('https://car-care-backend.onrender.com/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const filterServices = () => {
    if (selectedCategory) {
      return services.filter((service) => service.category === selectedCategory);
    }
    return services;
  };

  const sortServices = (servicesToSort) => {
    return servicesToSort.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === 'price') {
        comparison = a.price - b.price;
      }

      // Adjust comparison based on sort order
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ color: '#0066CC' }}>Explore Our Services</h2>
      <div className="row align-items-center justify-content-center mb-3">
        <div className="col-md-3">
          <Select
            className="w-100"
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value)}
            placeholder="Select Category"
          >
            <Option value="">All</Option>
            {[...new Set(services.map((service) => service.category))].map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </div>
        <div className="col-md-3">
          <Select
            className="w-100"
            value={sortBy}
            onChange={(value) => setSortBy(value)}
            placeholder="Sort By"
          >
            <Option value="">None</Option>
            <Option value="title">Title</Option>
            <Option value="price">Price</Option>
          </Select>
        </div>
        <div className="col-md-3">
          <Select
            className="w-100"
            value={sortOrder}
            onChange={(value) => setSortOrder(value)}
            placeholder="Sort Order"
          >
            <Option value="asc">Ascending</Option>
            <Option value="desc">Descending</Option>
          </Select>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {sortServices(filterServices()).map((service) => (
          <div key={service.id} className="col">
            <Card
              className={`service-card ${selectedServices.some((s) => s.id === service.id) ? 'selected' : ''}`}
              hoverable
              onClick={() => handleServiceSelection(service)}
            >
              <div className="service-card-body">
                <h5 className="service-title bg-warning ">{service.title}</h5>
                <p className="service-description">{service.description}</p>
                <p className="service-price">Price: ${service.price.toFixed(2)}</p>
                <p className="service-category">Category: {service.category}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {selectedServices.length > 0 && (
        <div className="mt-4 text-center" style={{ border: '3px solid #000', padding: '20px' }}>
          <h3 style={{ color: '#0066CC', fontSize: '24px', marginBottom: '20px' }}>Selected Services</h3>
          {selectedServices.map((selectedService) => (
            <div key={selectedService.id} className="selected-service">
              <p className='fs-3 fw-bold'>Title: {selectedService.title}</p>
              <p  className='fs-3'>Description: {selectedService.description}</p>
              <p className='fs-3'>Price: ${selectedService.price.toFixed(2)}</p>
            </div>
          ))}
          <Button className="btn-primary mt-3 me-2 bg-success fs-4" style={{  borderColor: '#000', padding: '10px 20px', fontSize: '16px' }} onClick={handleAddServicesClick}>
            Add to Bookings
          </Button>
          <Button className="btn-primary mt-3 bg-success fs-4" style={{ borderColor: '#000', padding: '10px 20px', fontSize: '16px' }} onClick={handleBookingClick}>
            Book Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default Services;
