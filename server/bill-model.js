const mongoose = require("mongoose");
const uuid = require("uuid");
const Schema = mongoose.Schema;
const billSchema = new Schema({
  id: { type: String, default: uuid.v1(), required: true, unique: true },
  name: String,
  category: String,
  cost: Number
},
{
  collection: "Bills"
});

const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;