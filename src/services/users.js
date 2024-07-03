import axios from 'axios';

const getProfile = async (token) => {
  try {
    console.log('Fetching user profile....');
    const config = {
      headers: { authorization: token }
    };
    const response = await axios.get('https://car-care-backend.onrender.com/api/users/get-profile', config);
    console.log('Profile fetch successful', response.data);
    return response.data;
  } catch (error) {
    console.error('Fetching user profile failed', error);
    throw error;
  }
};


export default getProfile; 
