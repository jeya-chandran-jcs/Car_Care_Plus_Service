import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import motorcycleImage1 from '../assets/photo1.jpeg';
import motorcycleImage2 from '../assets/photo2.jpeg';
import motorcycleImage3 from '../assets/photo3.jpeg';
import '../styles.css';
import { useDispatch, useSelector } from 'react-redux';
import userServices from '../services/users';

const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getProfile = async () => {
    if (userData.user) {
      try {
        const userInfo = await userServices.getProfile(userData.user.token);
        setUser(userInfo);
      } catch (error) {
        console.error('Error getting user profile', error);
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, [userData.user]);

  return (
    <div className="home">
      <div className="container text-center py-5">
        <div>
          <p className="user-info">
            {user?.username && (
              <>
                {user?.username} has logged in!{' '}
                <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </p>
        </div>
        <h1 className="display-4 text-primary mb-4 fw-bold">
          Welcome to Car Care Plus Services
        </h1>
        <p className="fst-italic text-capitalize fs-2 text-secondary">
          We believe in providing exceptional care for your vehicle
        </p>

        {/* Image Row */}
        <div className="row mt-5">
          <div className="col-md-4 mb-4">
            <img src={motorcycleImage1} className="img-fluid rounded img-height-80" alt="Motorcycle 1" />
          </div>
          <div className="col-md-4 mb-4">
            <img src={motorcycleImage2} className="img-fluid rounded" alt="Motorcycle 2" />
          </div>
          <div className="col-md-4 mb-4">
            <img src={motorcycleImage3} className="img-fluid rounded" alt="Motorcycle 3" />
          </div>
        </div>


        <Link to="/services" className="btn btn-primary mt-5 explore-button">
          Explore Services
        </Link>
      </div>

      <div className="about container py-5 service-advantage">
        <h4 className="mb-4 fw-bolder" >Service Advantage</h4>
        <div className="row">
          <div className="col-md-4 text-center">
            <div className="card border-0">
              <div className="card-body">
                <h5 className="card-title">Free Pick Up and Drop</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="card border-0">
              <div className="card-body">
                <h5 className="card-title">Certified Parts Replacement</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="card border-0">
              <div className="card-body">
                <h5 className="card-title">Trained Service Personnel</h5>
              </div>
            </div>
          </div>
        </div>

        <h2 className="mt-5">About Us</h2>
        <p>
          Welcome to Car Care Plus, your trusted partner in vehicle maintenance and repair services. With our commitment to excellence and years of expertise, we ensure your vehicle receives the highest quality care.
        </p>
        <p>
          Our team of skilled technicians and mechanics are dedicated to delivering outstanding service, whether it's routine maintenance or complex repairs. We prioritize using premium parts and cutting-edge technology to maximize your vehicle's performance and longevity.
        </p>
        <p>
          At Car Care Plus, customer satisfaction is paramount. We strive to exceed your expectations with every visit, ensuring your vehicle stays in top condition for your peace of mind.
        </p>
      </div>
    </div>
  );
};

export default Home;
