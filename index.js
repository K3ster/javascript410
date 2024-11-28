"use strict";

const express = require("express");
const app = express();

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

//TODO3

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
