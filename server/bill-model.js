const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const billSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: String,
  saying: String
});

const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;