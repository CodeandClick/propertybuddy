import axios from 'axios';

const checkadmin = async (email, password) => {
    console.log(email,password);
    
  try {
    const response = await axios.get('', { email, password }); // Replace with your API endpoint
    // Handle successful response
    console.log(response.data);
    return response.data; // Return data if needed
  } catch (error) {
    // Handle errors
    console.error(error);
    return null; // Or throw an error
  }
};

export default checkadmin;