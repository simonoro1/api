require("dotenv").config();

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
const port = 3000;

// app use
app.use(express.json())
app.use('/users', authRoutes)
app.use('/email-verification', emailVerification)
app.use(errorHandler)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
