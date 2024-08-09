import express from 'express';
import cors from 'cors';
import UserRouter from './routes/UserRouter.js';
import connectDb from './Database/connection.js';
import "dotenv/config"
import session from 'express-session';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 5000;


app.use(cookieParser());
app.use(session({
  secret: 'your_secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true, // use true if using HTTPS
    httpOnly: true,
    sameSite: 'Strict'
  }
}));


//database connection
connectDb()


const corsOptions = {
  origin: 'http://localhost:4200', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Use the CORS middleware with options
app.use(cors(corsOptions));


// Middleware
app.use(express.json());

//user router
app.use('/user',UserRouter)


// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
