const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
const url = "";

const connectDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://anil:Cjd2YNDMQQvj5vbd@cluster0.bxsur.mongodb.net/ecommerce?retryWrites=true&w=majority"
    )
    .then((con) => {
      console.log(
        `MongoDB Database connected with HOST: ${con.connection.host}`
      );
    });
};

module.exports = connectDatabase;
