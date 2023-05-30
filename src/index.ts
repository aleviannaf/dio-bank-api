import express, { Application, Request, Response, json } from "express";
import "reflect-metadata";
import { UserController } from "./controllers/UserController";
import { router } from "./routes";
import { AppDataSource } from "./database";

const userController = new UserController();

const server: Application = express();

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

server.use(json());
server.use(router);

server.get("/", (request: Request, response: Response): Response => {
  return response.status(200).json({ message: "DioBank Api" });
});

server.listen(5000, () => console.log(`Server on in http://localhost:5000`));
