import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../services/auth';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css'; 

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector((state) => state.user);

  useEffect(() => {
    console.log('From store:', userProfile.user);
  }, [userProfile.user]);

  const handleSignIn = async (event) => {
    event.preventDefault();
    const user = await auth.signin({ email, password });
    if (user) {
      dispatch({
        type: 'SIGNIN_SUCCESS',
        payload: user,
      });
      navigate('/');
    }
  };

  const handleLogout = () => {
    dispatch({ type: 'SIGNOUT' });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">{userProfile.user ? 'Logout' : 'Sign In'}</h2>
          <form onSubmit={userProfile.user ? handleLogout : handleSignIn}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={userProfile.user}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={userProfile.user}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              {userProfile.user ? 'Logout' : 'Sign In'}
            </button>
          </form>
          {!userProfile.user && (
            <div className="text-center mt-3">
              <p className="mb-0">Don't have an account?</p>
              <Link to="/signup" className="btn btn-secondary mt-2">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
