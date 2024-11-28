"use strict";

const express = require("express");
const app = express();

// define endpoint for exercise 1 here
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

//TODO2

//TODO3

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
