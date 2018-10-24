
let express = require('express'),
    app = express();

let path = require('path');

let fs = require('fs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

let server = app.listen(process.env.PORT || 3000, function () {
  console.log('Escutando em: http://localhost:3000');
});

app.get('/', function(request, response) {
  response.render('index');
});

app.get('/visualizacao1', function(request, response) {
  response.render('visualizacao1');
});

module.exports = app;
