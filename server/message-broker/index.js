const express = require("express");
const cors = require("cors");
const app = express();

const port = 5000;

app.use(cors());
app.use(express.json());

const services = [
  { name: "posts", endpoint: "http://posts-srv:5001/events" },
  { name: "query", endpoint: "http://query-srv:5002/events" },
];

app.post("/events", (req, res) => {
  const event = req.body;

  console.log("event", event);

  services.forEach((service) => {
    return fetch(service.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: event.id, content: event.content }),
    });
  });

  Promise.all(services);

  res.status(200).end();
});

app.listen(port, () => {
  console.log(`MessageBroker: listening on ${port}`);
});
