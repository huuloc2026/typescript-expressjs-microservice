import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();
console.clear();
const app: Express = express();
const node_env = process.env.nodeENV || "development";

app.use(morgan("dev")); // Logging
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ limit: "50kb", extended: true }));
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Handle 404 Errors
app.use((req, res, next) => {
  const error = new Error("Page not found") as any;
  error.status = 404;
  next(error);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[${new Date().toISOString()}] Error: ${message}`);
  if (node_env === "development") {
    if (err.stack) {
      console.log(err.message);
      console.error(err.stack);
    }
  }

  res.status(status).json({
    success: false,
    status,
    message,
  });
});

export default app;
