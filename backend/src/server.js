require("dotenv").config();
const net = require("net");
const app = require("./app");
const connectDB = require("./config/db");

const BASE_PORT = Number(process.env.PORT || 5000);

const getOpenPort = (port) => {
  return new Promise((resolve) => {
    const probe = net.createServer();

    probe.once("error", () => {
      resolve(getOpenPort(port + 1));
    });

    probe.once("listening", () => {
      probe.close(() => resolve(port));
    });

    probe.listen(port);
  });
};

const start = async () => {
  try {
    await connectDB();

    const port = await getOpenPort(BASE_PORT);
    if (port !== BASE_PORT) {
      console.warn(`Port ${BASE_PORT} is busy. Switched to ${port}.`);
    }

    app.listen(port, () => {
      console.log(`API listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(`Startup failed: ${error.message}`);
    process.exit(1);
  }
};

start();
