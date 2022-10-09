const mongoose = require("mongoose");

const url = "";
const connectDatabase = () => {
  mongoose
    .connect("mongodb://0.0.0.0:27017/ecommerse", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(
        `MongoDB Database connected with HOST: ${con.connection.host}`
      );
    });
};

module.exports = connectDatabase;
