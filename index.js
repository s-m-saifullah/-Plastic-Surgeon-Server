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
    const serviceCollection = client
      .db("plastic-surgeon-db")
      .collection("services");

    // Add Service
    app.post("/services", async (req, res) => {
      const service = req.body;
      const result = await serviceCollection.insertOne(service);
      res.send(result);
    });

    // Get Services
    app.get("/services", async (req, res) => {
      const noOfService = parseInt(req.query.num);
      const query = {};
      const options = {
        sort: { time: -1 },
      };
      const cursor = serviceCollection.find(query, options);
      const result = await cursor.limit(noOfService).toArray();
      res.send(result);
    });
  } finally {
  }
}

run().catch((err) => console.log(err));

app.listen(port, () =>
  console.log(`Plastic Surgeon Service Website is Running on Port ${port}`)
);
