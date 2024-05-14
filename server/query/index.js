const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

const port = 5002;

const posts_db = {};

app.use(cors());

app.get("/", (req, res) => {
  res.json(posts_db);
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json(posts_db[id] || {});
});

app.post("/events", (req, res) => {
  console.log(req.body);
  const event = req.body;
  const post = event.content;
  console.log("received event:", req.body);
  if (event.id === "POST_CREATED") {
    posts_db[post.id] = post;
  }

  res.status(200).end();
});

app.listen(port, () => {
  console.log(`Query: listening on ${port}`);
});
