var express = require('express');
var port = process.env.PORT || 80;
var app = express();

app.use(express.static('./app'));

app.listen(port);
console.log('Server started on port: ' + port);