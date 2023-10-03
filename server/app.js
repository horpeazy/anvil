const express = require('express');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const connectDB = require('./db/connect');
const cors = require('cors');
const dotenv = require('dotenv');
const {
	oAuthRoutes, 
	authRoutes, 
	projectRoutes
} = require('./routes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],  
}));


app.use("/oauth", oAuthRoutes);
app.use("/auth", authRoutes);
app.use("/api/v1", projectRoutes);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

