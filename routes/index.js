'use strict';

let express = require('express');
let router = express.Router();
let path = require('path');
let fs = require('fs');
const whiteList = ['localhost:3000', 'https://www.google.com'];

router.use(function (req, res, next) {
  const host = req.headers.host;
  const whiteListFound = whiteList.indexOf(host) > -1;
  if (whiteListFound){
      res.header('X-FRAME-OPTIONS', 'SAMEORIGIN');
  } else{
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
