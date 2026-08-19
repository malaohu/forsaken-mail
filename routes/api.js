'use strict';


let express = require('express');
let router = express.Router();
let ncache = require('memory-cache')
let shortid = require ('shortid');

router.get('/', function (req, res) {
  res.end();
});

//获取单个邮箱邮件
router.get('/receiv/:email', function (req, res) {
  var key = req.params.email.toLowerCase()

  for (let index = 0; index < ncache.keys.length; index++) {
    let _key = ncache.keys[index];
    
  }

  var html = ncache.get(key)
  if (html) {
    ncache.del(key)
  }
  res.charset = 'utf-8';
  res.send(html || "None");
});


//获取单个邮箱邮件，过滤某个发件域名
router.get('/receiv/:email/:domain', function (req, res) {
  var key = req.params.email.toLowerCase() + "#" + req.params.domain.toLowerCase()
  var html = ncache.get(key)
  if (html) {
    ncache.del(key)
  }
  res.charset = 'utf-8';
  res.send(html || "None");
});

//随机一个邮箱
router.get('/random/:domain', function (req, res) {
  let reslut = ""
  let email = shortid.generate () +"@"+ req.params.domain
  let pwd = ""
  if (req.query["pwd"]){
    pwd = shortid.generate() + "_Tmail" 
    reslut = email + ":" + pwd
  }
  res.send(reslut + "  >>>   <a href='/receiv/"+ email +"/?pwd="+pwd+"'>Recevie Email</a>");
});



module.exports = router;
