const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/socialnw", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;