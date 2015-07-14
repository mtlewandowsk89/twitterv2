'use strict';

var $ = require('jquery');
var template = require('./template.js');

var currentUser = {
  id: 1,
  img: '../images/brad.png',
  handle: '@bradwestfall',
  realName: 'Brad Westfall'
};

$(function () {
	var repliesUrl = "http://localhost:3000/replies/";
    var tweetsUrl = "http://localhost:3000/tweets/";
    var usersUrl = "http://localhost:3000/users/";

   



