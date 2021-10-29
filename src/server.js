import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import { join } from "path";

const server = express();

server.use(cors());
server.use(express.json());

const port = process.env.PORT;

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log("server on port:", port);
});
