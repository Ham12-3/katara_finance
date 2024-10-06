import express from "express";

import bodyParser from "body-parser";

import mongoose from "mongoose";

import cors from "cors";
import dotenv from "dotenv";

import helmet from "helmet";

import morgan from "morgan";

// CONFIGURATIONs

dotenv.config();

const app = express();

app.use(express.json());

app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

// MONGOOSE SETUP

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`server port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
