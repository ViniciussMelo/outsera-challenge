import swaggerUi from "swagger-ui-express";
import "express-async-errors";
import express from "express";
import "reflect-metadata";
import cors from "cors";


import { AppError } from "./shared/errors/app.error";
import swaggerDocs from "./swagger.json";
import { router } from "./shared/routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(
  (err: Error, request: express.Request, response: express.Response, next: express.NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };