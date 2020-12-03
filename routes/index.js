'use strict';

let express = require('express');
let router = express.Router();
let path = require('path');
let fs = require('fs');
const whiteList = ['http://localhost:3000', 'https://www.google.com'];

router.use(function (req, res, next) {
  const host = req.headers.host;
  var referer = req.header('Referer') || '';
  //strip out / if in last char
  referer = referer.replace(/(.*)(\/)/,'$1');
  console.log('host log', host);
  console.log('referrer log', referer);
  const whiteListFound = whiteList.indexOf(referer) > -1;
  if (!whiteListFound){
      res.header('X-FRAME-OPTIONS', 'DENY');
  }
  next();


});

//GETS
router.get('/', function(req, res, next) {
    res.render('index');

});

router.get('/partials/:name', function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
});


router.get('/route_templates/:name', function (req, res) {
    var name = req.params.name;
    res.sendFile(path.join(__dirname, '../', 'views', 'route_templates', name));
});














module.exports = router;
