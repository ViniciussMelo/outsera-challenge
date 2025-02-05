import * as swaggerUi from "swagger-ui-express";
import * as express from "express";
import * as cors from "cors";
import "express-async-errors";
import "reflect-metadata";


import { AppError } from "./shared/app.error";
import * as swaggerDocs from "./swagger.json";
import { router } from "./routes";

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