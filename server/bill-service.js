const Bill = require("./bill-model");
const ReadPreference = require("mongodb").ReadPreference;

require("./mongo").connect();

function get(req, res) {
  const docquery = Bill.find({}).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(bills => {
      res.json(bills)
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

module.exports = { get };