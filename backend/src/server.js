require("dotenv").config();
const net = require("net");
const app = require("./app");
const connectDB = require("./config/db");

const DEFAULT_PORT = Number(process.env.PORT || 5000);

const findAvailablePort = (port) => {
  return new Promise((resolve) => {
    const tester = net.createServer();

    tester.once("error", () => {
      resolve(findAvailablePort(port + 1));
    });

    tester.once("listening", () => {
      tester.close(() => resolve(port));
    });

    tester.listen(port);
  });
};

const startServer = async () => {
  try {
    await connectDB();

    const selectedPort = await findAvailablePort(DEFAULT_PORT);
    if (selectedPort !== DEFAULT_PORT) {
      console.warn(`Port ${DEFAULT_PORT} is busy, using port ${selectedPort} instead.`);
    }

    app.listen(selectedPort, () => {
      console.log(`Server running on port ${selectedPort}`);
    });
  } catch (error) {
    console.error("Failed to start server", error.message);
    process.exit(1);
  }
};

startServer();
