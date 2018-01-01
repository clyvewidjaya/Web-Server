const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err){
      console.log('Unable to append to server.log')
    }
  });
  next(); //we need next in order to continue the program.
});

//next is quite useful when you have like a maintenance thing.
/*
app.use((req,res,next) => {
  res.render('maintenance.hbs');
});
*/
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//localhost:3000/
app.get('/',(req,res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello Clyve'
  });
});

//localhost:3000/about
app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

//localhost:3000/bad
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port,() => {
  console.log(`Port is up on ${port}`);
});

//get needs 2 param, url, and function to run, what to sent back to the request
//localhost:3000/
/*
app.get('/',(req, res) => {
  //res.send('<h1>hello Clyve</h1>');
  res.send({
    name: 'Clyve',
    likes: [
      'Sleeping', 'Eating'
    ],
    age: '25'
  });
});
*/
