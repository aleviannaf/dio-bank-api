import express, {
  Application,
  Request,
  Response,
  json
} from "express";
import { UserController } from "./controllers/UserController";
import { router } from "./routes";



const userController = new UserController();

const server: Application = express();

server.use(json());
server.use(router);

server.get("/", (request: Request, response: Response): Response => {
  return response.status(200).json({ message: "DioBank Api" });
});



server.listen(5000, () => console.log(`Server on in http://localhost:5000`));
