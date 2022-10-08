const mongoose = require("mongoose");

const url =
  "mongodb+srv://anil:Cjd2YNDMQQvj5vbd@cluster0.bxsur.mongodb.net/ecommerce?retryWrites=true&w=majority";
const connectDatabase = () => {
  mongoose
    .connect(url, {
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
