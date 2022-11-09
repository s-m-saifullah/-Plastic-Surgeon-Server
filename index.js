const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    const reviewCollection = client
      .db("plastic-surgeon-db")
      .collection("reviews");

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

    // Get Single Service by Id
    app.get("/service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await serviceCollection.findOne(query);
      res.send(result);
    });

    // Add Review
    app.post("/review", async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.send(result);
    });

    // Get Reviews
    app.get("/review/:id", async (req, res) => {
      const id = req.params.id;
      const options = {
        sort: {
          "time.milliseconds": -1,
        },
      };
      const query = { serviceId: id };
      const cursor = reviewCollection.find(query, options);
      const result = await cursor.toArray();
      res.send(result);
    });

    // Get Reviews By User ID
    app.get("/reviewByUid/:id", async (req, res) => {
      const id = req.params.id;
      const query = { uid: id };
      const options = {
        sort: {
          "time.milliseconds": -1,
        },
      };
      const cursor = reviewCollection.find(query, options);
      const result = await cursor.toArray();
      res.send(result);
    });

    // Delete a Review
    app.delete("/review/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}

run().catch((err) => console.log(err));

app.listen(port, () =>
  console.log(`Plastic Surgeon Service Website is Running on Port ${port}`)
);
