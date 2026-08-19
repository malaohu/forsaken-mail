'use strict';

let path = require('path');
let mailin = require('node-mailin');
let config = require(path.join(__dirname, '..', 'config-default.json'));
let logger = require('tracer').console()
let ncache = require('memory-cache')

mailin.start(config.mailin);

mailin.on('error', function(err) {
  console.error(err.stack);
});

mailin.on('message', function (connection, data, content) {
  let domain = data.envelopeFrom.address.toLowerCase().split("@")[1]
  let to_email = data.envelopeTo[0].address.toLowerCase()
  let key =domain+"#"+ to_email
  ncache.put(key, data.html, 1000 * 60 * 10)
});

module.exports = mailin;
