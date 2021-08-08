// external modules

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

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


//server creation
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});