const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;
const app = express();
 
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
 
app.listen(process.env.PORT || 3000);