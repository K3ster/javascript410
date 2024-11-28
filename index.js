"use strict";

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// define endpoint for circle here
app.get("/math/circle/:r", (req, res) => {
  const r = parseFloat(req.params.r);
  if (isNaN(r) || r <= 0) {
    res.status(400).json({ error: "Invalid radius" });
    return;
  }
  const area = Math.PI * r * r;
  const circumference = 2 * Math.PI * r;
  const result = {
    area: area.toFixed(2),
    circumference: circumference.toFixed(2),
  };
  res.json(result);
});

// define endpoint for rectangle here
app.get("/math/rectangle/:width/:height", (req, res) => {
  const width = parseFloat(req.params.width);
  const height = parseFloat(req.params.height);
  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    res.status(400).json({ error: "Invalid dimensions" });
    return;
  }
  const area = width * height;
  const perimeter = 2 * (width + height);
  const result = {
    area: area,
    perimeter: perimeter,
  };
  res.json(result);
});

// define endpoint for power here
app.get("/math/power/:base/:exponent", (req, res) => {
  const base = parseFloat(req.params.base);
  const exponent = parseFloat(req.params.exponent);
  if (isNaN(base) || isNaN(exponent)) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }
  const result = Math.pow(base, exponent);
  const response = { result: result };
  if (req.query.root === "true") {
    response.root = Math.sqrt(base);
  }
  res.json(response);
});

// store jokes data
const categories = ["funnyJoke", "lameJoke"];
const funnyJoke = [
  {
    joke: "Dlaczego komputer poszedł do lekarza?",
    response: "Bo złapał wirusa!",
  },
  {
    joke: "Dlaczego komputer nie może być głodny?",
    response: "Bo ma pełen dysk!",
  },
  {
    joke: "Co mówi jeden bit do drugiego?",
    response: "Trzymaj się, zaraz się przestawiamy!",
  },
];
const lameJoke = [
  {
    joke: "Dlaczego programiści preferują noc?",
    response: "Bo w nocy jest mniej bugów!",
  },
  {
    joke: "Jak nazywa się bardzo szybki programista?",
    response: "Błyskawiczny kompilator!",
  },
];

// define endpoint for joke categories
app.get("/jokebook/categories", (req, res) => {
  res.json({ categories: categories });
});

// define endpoint for random joke from category
app.get("/jokebook/joke/:category", (req, res) => {
  const category = req.params.category;
  if (!categories.includes(category)) {
    res.status(400).json({ error: `no jokes for category ${category}` });
    return;
  }
  let jokeList;
  if (category === "funnyJoke") {
    jokeList = funnyJoke;
  } else if (category === "lameJoke") {
    jokeList = lameJoke;
  }
  const randomJoke = jokeList[Math.floor(Math.random() * jokeList.length)];
  res.json(randomJoke);
});

//TODO3

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
