var express = require('express');
var app = express();

app.use(express.static('dist'));
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('start test server');
});