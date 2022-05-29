const express = require("express");
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors");
const http = require('http');

const index = require('./routes/index');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
app.set('port', PORT);

app.use(cors());
app.use('/api', index);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
