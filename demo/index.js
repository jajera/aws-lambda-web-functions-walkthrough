const express = require("express");

const app = express();
const [host, port] = (
  process.env.AWS_LAMBDA_HTTP_ENDPOINT || "127.0.0.1:3000"
).split(":");

app.get("/", (_request, response) => {
  response.json({
    message: "Hello from Lambda Web Functions!",
    path: "/",
  });
});

app.get("/health", (_request, response) => {
  response.status(200).json({ status: "healthy" });
});

app.listen(Number(port), host, () => {
  console.log(`Server listening on ${host}:${port}`);
});
