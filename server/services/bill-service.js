const uuid = require("uuid");
const Bill = require("../models/bill.model");
const ReadPreference = require("mongodb").ReadPreference;

require("../mongo").connect();

function getBills(req, res) {
  const docquery = Bill.find({}).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(bills => {
      res.json(bills);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

async function postBill(req, res) {
  const bill = new Bill({
    id: uuid.v1(),
    name: req.body.name,
    category: req.body.category,
    cost: req.body.cost
  })
  bill.save(error => {
    if (checkServerError(res, error)) return;
    res.status(201).json(bill);
  })
}

function checkServerError(res, error) {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

module.exports = { getBills, postBill };