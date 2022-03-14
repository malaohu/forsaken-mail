'use strict';

let shortid = require('shortid');
let mailin = require('./mailin');
let config = require('../config')
let onlines = new Map();

module.exports = function(io) {
  mailin.on('message', function(connection, data) {
    console.log("*****************************")
    console.log("标题：" + data.subject)
    console.log("HTML：" + data.textAsHtml)
    console.log("文本：" + data.text)
    console.log("时间：" + data.date)
    console.log("发件：" + data.from.text)
    console.log("*****************************")
      
    let to = data.envelopeTo[0].address.toLowerCase();
    let exp = /[\w\._\-\+]+@[\w\._\-\+]+/i;
    if(exp.test(to)) {
      let matches = to.match(exp);
      let shortid = matches[0].substring(0, matches[0].indexOf('@'));
      if(onlines.has(shortid)) {
        let _data = {
            "subject": data.subject,
            "text" : data.text,
            "date" : data.date,
            "from" : data.from.text,
            "texthtml" : data.textAsHtml,
            "html" : data.html
        }
        onlines.get(shortid).emit('mail', _data);
      }
    }
  });
  
  mailin.on('validateSender', function(session, address, callback) {
    let hostname = '';
    if(/@(.*)/.test(address))
        hostname = RegExp.$1.toLocaleLowerCase()

    if (config.ban_send_from_domain.includes(hostname)) { 
        let _err = new Error('this domain has  blocked(你的域名已经被我ban了)'); 
        _err.responseCode = 530; 
        callback(_err);
    } else {
        callback()
    }   
  })

  io.on('connection', socket => {
    socket.on('request shortid', function() {
      onlines.delete(socket.shortid);
      socket.shortid = shortid.generate().toLowerCase(); // generate shortid for a request
      onlines.set(socket.shortid, socket); // add incomming connection to online table
      socket.emit('shortid', socket.shortid);
    });

    socket.on('set shortid', function(id) {
      if(config.pre_blacklist.indexOf(id.toLowerCase())>-1){
        return socket.emit('shortid', shortid.generate().toLowerCase());
      }
      onlines.delete(socket.shortid);
      socket.shortid = id;
      onlines.set(socket.shortid, socket);
      socket.emit('shortid', socket.shortid);
    })
    
    socket.on('disconnect', socket => {
      onlines.delete(socket.shortid);
    });
  });
};
