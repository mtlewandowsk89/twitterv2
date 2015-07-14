'use strict';

var Handlebars = require('hbsfy/runtime');
var tweetTmpl = require('../templates/tweet.handlebars')
var threadTmpl = require('../templates/thread.handlebars')
var composeTmpl = require('../templates/compose.handlebars')

module.exports = {
	tweetTmpl: tweetTmpl,
	threadTmpl: threadTmpl
	composeTmpl: composeTmpl,
}