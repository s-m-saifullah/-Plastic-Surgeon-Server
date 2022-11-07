const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

// Middle wares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Plastic Surgeon Service Website is Running.");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.f1cm5cm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
  } finally {
  }
}

run().catch((err) => console.log(err));

app.listen(port, () =>
  console.log(`Plastic Surgeon Service Website is Running on Port ${port}`)
);
