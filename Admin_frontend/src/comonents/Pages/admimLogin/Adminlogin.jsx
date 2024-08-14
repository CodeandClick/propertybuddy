import React, { useState } from 'react';
import './Adminlogin.css';
import { useNavigate } from 'react-router-dom';
import Lheader from '../../LHeader/Lheader';
import Swal from 'sweetalert2';
import checkadmin from '../../../services/api';


function Adminlogin() {
    const admin = {
        email: 'admin@gmail.com',
        password: '1234',
      };
    
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const navigate = useNavigate();
    
      // Regular expression for email validation (enhanced)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    
      // Function for combined email validation
      const validateEmail = (email) => {
        if (!emailRegex.test(email)) {
          return 'Invalid email format (e.g., abc@gmail.com)';
        }
        return null; // Email is valid
      };
    
      const handleEmailChange = (e) => setEmail(e.target.value);
      const handlePasswordChange = (e) => setPassword(e.target.value);
    
      const handleSubmit = (e) => {
        checkadmin(email,password)
        e.preventDefault();
    
        const emailValidation = validateEmail(email);
    
        if (emailValidation) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "error",
                title: "Invalid Email Format"
              });
          return;
        }
    
        if (password === admin.password&&email===admin.email) {
            navigate('/admin/home')
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Signed in successfully"
              });
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "error",
                title: "Invalid credentials"
              });
        }
      };
    return (
        <>
        <Lheader/>
        <div className="main-a">
            
            <div className="content-left">
                <h2>Welcome to Admin Portal</h2>
                <p>
                    Manage your application efficiently with our intuitive and user-friendly interface. 
                    Login to access your dashboard and start managing your tasks.
                </p>
            </div>
            <div className="container">
                <h1>Admin Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <input
                            type="email"
                            required
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Email"
                        />
                    </div>
                    <div className="form-control">
                        <input
                            type="password"
                            required
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Password"
                        />
                    </div>
                    <button className="btn">Login</button>
                </form>
            </div>
        </div>
        </>
        
    );
}

export default Adminlogin;