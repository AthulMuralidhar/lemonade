// external modules

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import {router} from "./timers/timer.router";
import morgan from "morgan";

dotenv.config();

// app setup
if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string);
const app = express();

// app config

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'))
app.use("/", router);


//server creation
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});