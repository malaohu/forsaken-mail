/**
 * Created by Hongcai Deng on 2015/12/28.
 */

'use strict';

let path = require('path');
let mailin = require('mailin');
let config = require(path.join(__dirname, '..', 'config-default.json'));
let logger = require('tracer').console()

mailin.start(config.mailin);

mailin.on('error', function(err) {
  console.error(err.stack);
});
mailin.on('message', function (connection, data, content) {
  logger.info("FROM:" + data.envelopeFrom.address + "  TO:"+ data.envelopeTo[0].address);
});
module.exports = mailin;
