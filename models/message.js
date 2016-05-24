var db = require('./db');

db.run('create table if not exists messages(nickname text, email text, message text, time text);');

checkTextEmpty = (str) => (str == '' || str == null);

function Message(message) {
  this.nickname = message.nickname;
  this.email = message.email;
  this.message = message.message;
  this.time = message.time;
};
module.exports = Message;

Message.prototype.save = function save(callback) {
  if(checkTextEmpty(this.nickname)){
    return callback('昵称不能为空！');
  } else if(checkTextEmpty(this.message)){
    return callback('留言不能为空');
  }
  var message = {
    nickname: this.nickname,
    email: this.email,
    message: this.message,
    time: this.time
  };

  db.run('insert into messages values(?, ?, ?, ?);', [message.nickname, message.email, message.message, message.time], function(err) {
    return callback(err);
  });
}

Message.get = function get(callback) {
  var sql = 'select * from messages order by time desc;';
  db.all(sql, function(err, rows){
    if(err){
      return callback(err);
    }
    if(!rows){
      return callback(null, null);
    }
    callback(null, rows);
  });
}
