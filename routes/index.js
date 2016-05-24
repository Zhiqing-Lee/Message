var express = require('express');
var router = express.Router();
var Message = require('../models/message');

checkTextEmpty = (str) => (str == '' || str == null);

/* GET home page. */
router.get('/', function(req, res, next) {
  Message.get(function(err, messages) {
    if(err){
      req.flash('error', err);
    }
    console.log(messages);
    res.render('index', {
      title: 'Message',
      messages: messages
    });
  });
});

router.post('/post', function(req, res, next){
  if(checkTextEmpty(req.body.nickname)){
    req.flash('error', '昵称不能为空！');
    res.redirect('/');
  } else if (checkTextEmpty(req.body.message)){
    req.flash('error', '留言不能为空！');
    res.redirect('/');
  }
  var message = new Message({
    nickname: req.body.nickname,
    email: req.body.email,
    message: req.body.message,
    time: new Date().getTime()
  });
  message.save(function(err){
    if(err){
      req.flash('error', err);
      return res.redirect('/');
    }
    req.flash('success', '留言成功！');
    res.redirect('/');
  });
});


module.exports = router;
