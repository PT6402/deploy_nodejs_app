const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "0.0.0.0";
const routes = require("./routes");
const morgan = require("morgan");

const database = require("./database");
// log console
app.use(morgan("dev"));
//read request format json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//static file
// app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "public")));
//file view
app.set("view engine", "pug");
app.set("views", path.resolve(__dirname, "resources/views"));

//file database
database.connect();

//file routes
routes(app);

app.listen(PORT, HOST, () => {
  console.log(`server running at http://${HOST}:${PORT}`);
});
