const express = require("express");
const redis = require("redis");
const getProductFromDB = require("./database");

const app = express();
const client = redis.createClient();

client.connect();

app.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  const cacheKey = `product:${id}`;

  const cachedData = await client.get(cacheKey);

  if (cachedData) {
    console.log("⚡ Cache HIT");
    return res.json(JSON.parse(cachedData));
  }

  console.log("🐢 Cache MISS → query DB");

  const product = await getProductFromDB(id);

  await client.setEx(cacheKey, 60, JSON.stringify(product));

  res.json(product);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
