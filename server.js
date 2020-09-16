var path = require('path');
var express = require('express');
var app = express();
var secure = require('express-force-https');
 
app.set('port', (process.env.PORT || 3000));
 
app.use(secure);
app.use(express.static(path.join(__dirname, 'dist')));
 
// redireciona todas as requições para o Angular 2 
app.all('*', function(req, res) {
  res.status(200).sendFile(
  	path.join(__dirname, 'dist', 'index.html'));
});
 
app.listen(app.get('port'), function() {
  console.log('Node executando na porta ', app.get('port'));
});