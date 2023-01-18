const express = require("express");
const db = require("./config");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./routes"));

db.once("open", () => app.listen(3001));