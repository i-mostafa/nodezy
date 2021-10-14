// error handler for uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(`🎃🎃 UnCaught exceptions thrown${err}`, err);
});

//dependencies
require("dotenv").config();
const http = require("http");
const app = require("./app");

const { connectToDb } = require("./models/mongodb.connect");

// server configurations
const server = http.createServer(app);

// connect to database
connectToDb();

// server listener
server.listen(process.env.PORT, () => {
  console.log("🎉🎉 Server is running on: " + process.env.PORT);
});

// error handler for unHandled rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error(
    `🎃🎃 UnHandledRejection on ${promise} because ${reason}`,
    reason
  );
});
