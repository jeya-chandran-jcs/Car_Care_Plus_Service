import instance from '../services/instance';


const signup = async (credentials) => {
  try {
    console.log('Signing up user....');
    const response = await instance.authInstance.post('/users/signup', credentials);
    console.log('Signup successful');
    console.log(response.data.message);
    
  } catch (error) {
    console.error('signup failed', error);
   
  }
};

const signin = async (credentials, options = {}) => {
  try {
    console.log('Signing in user....');
    const response = await instance.authInstance.post('/users/signin', credentials);
    console.log('Signin Successfull');

    sessionStorage.setItem('loggedInUser', JSON.stringify(response.data));
    console.log('Stored user in session storage:', sessionStorage.getItem('loggedInUser'));

    return response.data;
  } catch (error) {
    console.error('signin failed', error);
    return null;
  }
};

const logout = () => {
   console.log('Logging out user....');
  sessionStorage.removeItem('loggedInUser');
  //newly added
};

export default {
  signup,
  signin,
  logout
};