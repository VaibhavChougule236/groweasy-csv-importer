import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { errorMiddleware } from "./middleware/error.middleware";
import { notFoundMiddleware } from "./middleware/notFound.middleware";
import importRoutes from "./routes/import.routes";

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

app.use("/api/import", importRoutes);
app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;