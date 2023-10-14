require("dotenv").config();
var cors = require('cors')
const cookieParser = require('cookie-parser')


//Global Dependencies
import "express-async-errors"
import express from "express";

//Project Dependecies
import authRoutes from "./routes/authRoutes";
import emailVerification from "./routes/emailVerification"
import { errorHandler } from "./middleware/errors";

//DB connection
import { connect, connection } from "mongoose";
const mongoString: any = process.env.DATABASE_URL; // fix any

// MongoDb Conecttion
connect(mongoString);
const database = connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database connected");
});

//Express Server Initialization

const app = express();
const port = 5000;

// app use
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // <= Accept credentials (cookies) sent by the client
}))
app.use(cookieParser())
app.use(express.json())
app.use('/users', authRoutes)
app.use('/email', emailVerification)
app.use(errorHandler)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
