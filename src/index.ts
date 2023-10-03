require("dotenv").config();

import exp from "constants";
import express from "express";
import { connect, connection } from "mongoose";
import userRoutes from "./routes/users";
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
app.use('/users', userRoutes)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
