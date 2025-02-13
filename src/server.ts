import app from "./app";

const port = process.env.PORT || 3000;
const linkGithub = process.env.linkgithub;

const server = app.listen(port, () => {
  console.log(`[server]: Check source at ${linkGithub}`);
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

process.on("SIGNINT", () => {
  server.close(() => console.log(`Exit Server`));
});
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception: ", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection: ", reason);
});
