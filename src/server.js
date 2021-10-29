import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import { join } from "path";
import mediaRouter from "./services/media/index.js";

const server = express();

server.use(cors());
server.use(express.json());
server.use("/media", mediaRouter)

const port = process.env.PORT;

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log("server on port:", port);
});
