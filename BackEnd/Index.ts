console.clear();
import express, { Application } from "express";
import cors from "cors";
import { mainApp } from "./mainApp";
import { dbConfig } from "./utils/dbConfig";

import env from "dotenv";
env.config();

const port = parseInt(process.env.PORT!);

const app: Application = express();

app.use(cors());
app.use(express.json());

mainApp(app);
const server = app.listen(port, () => {
  console.log("App Listening to port on ", port);
  dbConfig();
});

process.on("uncaughtException", (error: Error) => {
  console.log("uncaughtException: ", error);

  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection: ", reason);

  server.close(() => {
    process.exit(1);
  });
});
