const { error } = require("console");
const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3999;

app.use(cors());
app.use(express.json());

let notes = [
  {
    id: "1",
    name: "ayush",
    type: "sde",
  },
  {
    id: "2",
    name: "alex",
    type: "sde1",
  },
  {
    id: "3",
    name: "joseph",
    type: "sde2",
  },
  {
    id: "4",
    name: "brian",
    type: "sde3",
  },
];

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  };

  notes = notes.concat(note);

  res.json(note);
});
app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== id);

  res.status(204).end();
});

app.get("/", (req, res) => [res.send("<h1>hellos world</h1>")]);
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
