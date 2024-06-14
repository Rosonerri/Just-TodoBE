import { Application, Response, Request } from "express";
import cors from "cors"
import todo from "./Router/todoRouter"
export const mainApp = (app: Application) => {
  try {
    app.use("/", todo);
    app.get("/", (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          message: "Welcome to Our API",
        });
      } catch (error) {
        return res.status(404).json({
          message: "Error",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
