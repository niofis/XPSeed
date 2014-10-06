
/**
 * Module dependencies.
 */

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var Bliss = require('bliss');
var bliss = new Bliss();

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', function(path,options,fn){
    fn(null,bliss.render(path, options));
});
app.use(favicon(__dirname + '/public/favicon.png'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

routes.configure(app);

// development only
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
