const express = require("express");
const cookiesParser = require("cookie-parser");
const expresfileupload = require("express-fileupload");
const errorMiddleware = require("./middlewares/errors");
const bodyparser = require("body-parser");

var cors = require("cors");
const app = express();

//app.use(expresfileupload());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use("/images", express.static("images"));
app.use(express.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookiesParser());

app.set("trust proxy", 1);
// import all routes here
const product = require("./routes/product");
const user = require("./routes/auth");
const order = require("./routes/order");
const payment = require("./routes/payment");
app.use("/api/auth", user);
app.use("/api", product);
app.use("/api", order);
app.use("/api", payment);
app.get("/api", (req, res) => {
  res.send("Api is working on Port ");
});
//middleware to handle errors
app.use(errorMiddleware);
module.exports = app;
