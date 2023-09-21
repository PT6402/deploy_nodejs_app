const mongoose = require("mongoose");
const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => {
      console.log("database connect successfully !");
    })
    .catch((error) => {
      console.log("database connect failed !", error);
    });
};
module.exports = { connect };
