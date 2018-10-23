
let express = require('express'),
    app = express();

let path = require('path');

let fs = require('fs');

/*let db = {
	node: JSON.parse(fs.readFileSync(__dirname + "/data/json/node.json")),
  NovoEdges: JSON.parse(fs.readFileSync(__dirname + "/data/json/NovoEdges.json")),
  sumAllAlies: JSON.parse(fs.readFileSync(__dirname + "/data/json/sumAllAlies.json")),
  sumAllEnemies: JSON.parse(fs.readFileSync(__dirname + "/data/json/sumAllEnemies.json")),
  sumUniqueAlly: JSON.parse(fs.readFileSync(__dirname + "/data/json/sumUniqueAlly.json")),
  sumUniqueEnemy: JSON.parse(fs.readFileSync(__dirname + "/data/json/sumUniqueEnemy.json"))
};*/

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

app.get('/visualizacao2', function(request, response) {
  response.render('visualizacao2');
});

app.get('/visualizacao3', function(request, response) {
  response.render('visualizacao3');
});

app.get('/visualizacao4', function(request, response) {
  response.render('visualizacao4');
});

module.exports = app;
