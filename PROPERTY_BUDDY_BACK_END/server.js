import express from 'express';
import cors from 'cors';
import UserRouter from './routes/UserRouter.js';
import connectDb from './Database/connection.js';
import "dotenv/config"
import session from 'express-session';
import cookieParser from 'cookie-parser';
import tokenRouter from './routes/tokenRouter.js';
import AgentRouter from './routes/AgentRouter.js'
import AdminRouter from './routes/AdminRouter.js'

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(session({
    secret: 'your_secret_key', // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Set to false in development
        sameSite: 'Strict',
    }
}));

// Add the URL-encoded middleware
app.use(express.urlencoded({ extended: true }));

//database connection
connectDb()

const corsOptions = {
  origin: 'http://localhost:4200', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Use the CORS middleware with options
app.use(cors(corsOptions));

// Use the JSON middleware
app.use(express.json());

//user router
app.use('/user', UserRouter);
app.use('/agent',AgentRouter)
app.use('/admin',AdminRouter)
app.use('/', tokenRouter);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
