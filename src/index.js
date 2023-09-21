const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://phattvts2208049:1YFNq2Ar2kz7fyqB@cluster0.zlw3650.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "localhost";
const routes = require("./routes");
const morgan = require("morgan");
dotenv.config();

const database = require("./database");
// log console
app.use(morgan("dev"));
//read request format json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//static file
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
