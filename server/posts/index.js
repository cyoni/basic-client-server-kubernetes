const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  console.log("req.body", req.body);
  const { content } = req.body;
  const id = randomBytes(5).toString("hex");
  const event = {
    id: "POST_CREATED",
    content: { id, content, timestamp: Date.now() },
  };

  // emit an event to message broker with id: PostCreated

  await fetch("http://message-broker-srv:5000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  res.status(201).end();
});

app.post("/events", (req, res) => {
  console.log(req.body);
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`Posts: listening on ${port}`);
});
