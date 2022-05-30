const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const billSchema = new Schema({
  name: String,
  category: String,
  cost: Number
},
{
  collection: "Bills"
});

const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;