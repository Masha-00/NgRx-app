const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MONGO_DB, PORT } = require("./config/config");

const employeeRoute = require("./routes/employee.route");

try {
  mongoose
    .connect(MONGO_DB)
    .then(() => {
      console.log("Database connected");
      app.listen(PORT, () => {
        console.log(`Connected to PORT ${PORT}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
} catch (err) {
  console.log("Database not connected", err);
}

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
app.use("/api", employeeRoute);

app.use((req, res, next) => {
  next(new CustomError().notFound("Page not found"));
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.code).json(err);
});
