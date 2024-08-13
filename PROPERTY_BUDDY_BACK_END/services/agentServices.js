import validator from "validator";
import { config } from "dotenv";
config()



export async function agentAddressValidation(details,res){
    const { state, district, pinCode, place, email, phoneNumber, companyName } = details
    
    // Initialize an array to collect validation error messages
    const errors = [];
    
    // 1. Validate Email
    if (!email || !validator.isEmail(email)) {
      errors.push('Invalid or missing email address.');
    }
    
    // 2. Validate Phone Number
    // Specify the locale as per your requirement (e.g., 'en-IN' for India)
    console.log(typeof phoneNumber)
    if (!phoneNumber || !validator.isMobilePhone(phoneNumber, 'any')) {
      errors.push('Invalid or missing phone number.');
    }
    
    // 3. Validate Pin Code
    // Assuming pin codes are 6-digit numbers (common in countries like India)
    if (!pinCode || !validator.isPostalCode(pinCode, 'any')) {
      errors.push('Invalid or missing pin code.');
    }
    
    // 4. Validate State
    if (!state || validator.isEmpty(state.trim())) {
      errors.push('State is required.');
    }
    
    // 5. Validate District
    if (!district || validator.isEmpty(district.trim())) {
      errors.push('District is required.');
    }
    
    // 6. Validate Place
    if (!place || validator.isEmpty(place.trim())) {
      errors.push('Place is required.');
    }
    
    // 7. Validate Company Name
    if (!companyName || validator.isEmpty(companyName.trim())) {
      errors.push('Company name is required.');
    }
    
    // Check if there are any validation errors
    if (errors.length > 0) {
      // Return the errors as a response (adjust the status code and response structure as needed)
      return res.status(400).json({ error:true , message:errors[0]  , errors:errors});
    }
    
    // If all validations pass, proceed with further processing
    // Your logic here...
    
}