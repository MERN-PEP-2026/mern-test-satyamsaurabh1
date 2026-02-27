const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

// combined error logic here for now, cleaner
function missingHandler(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
}

function globalErrorHandler(err, _req, res, _next) {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Server error";

  // db specific stuff
  if (err.name === "ValidationError") statusCode = 400;
  if (err.name === "CastError") { statusCode = 400; message = "Invalid resource id"; }
  if (err.code === 11000) { statusCode = 400; message = "Duplicate value error"; }

  res.status(statusCode).json({ message });
}

const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    service: "flextask-core",
    status: "ok",
    version: "1.0.1", // manually bumping this
  });
});

app.use("/v1/auth", authRoutes);
app.use("/v1/tasks", taskRoutes);

// catch-alls
app.use(missingHandler);
app.use(globalErrorHandler);

module.exports = app;
