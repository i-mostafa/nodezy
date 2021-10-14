const express = require("express");
const path = require("path");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const upload = require("express-fileupload");

// routers
const APIRouter = require("./routers/api.router");

// app config
const app = express();

// session store
const STORE = new MongoDBStore({
  uri: process.env.DBURL,
  collection: "sessions",
  mongooseConnection: mongoose.connection,
  expires: process.env.SESSION_EXPIRE_DATE,
});

// static dirs
app.use(express.static(path.join(__dirname, "public")));

// middleware
app.use(express.json({ limit: "10kb" }));
process.env.NODE_ENV === "development" && app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.options("*", cors());

// Set security HTTP headers
app.use(helmet());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// routes
app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.use(upload());

// api routes
app.use("/api", APIRouter);

// export application
module.exports = app;
