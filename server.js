


const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const methodOverride = require('method-override');
const $ = require('jquery');
const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');



app.get('/',function(req,res){
  res.render('index');
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
