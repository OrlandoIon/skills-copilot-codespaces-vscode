// Create web server
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const commentsFilePath = path.join(__dirname, "comments.json");

app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/comments", (req, res) => {
  fs.readFile(commentsFilePath, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post("/comments", (req, res) => {
  fs.readFile(commentsFilePath, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile(commentsFilePath, JSON.stringify(comments), (err) => {
        if (err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});