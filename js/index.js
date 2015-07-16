'use strict';

var $ = require('jquery');
var template = require('./template.js');

$(function () {

	var currentUser = {
	  id: 1,
	  img: './images/brad.png',
	  handle: '@bradwestfall',
	  realName: 'Brad Westfall'
	};

	var repliesUrl = "http://localhost:3000/replies/";
    var tweetsUrl = "http://localhost:3000/tweets/";
    var usersUrl = "http://localhost:3000/users/";

    

    $('#main').on('click', 'form', function () {
    	$(this).addClass('expand')
    });

    $('#tweets').on('click', '.thread > .tweet', function() {
    	$(this).parent('.thread').toggleClass('expand');
    });

    $('#main').on('click', '.compose button', function() {
        var $message = $(this).parents('.compose').find('textarea').val();
        var $parent = $(this).parent();
    
        if($(this).parents('header').length) {
            postTweet(currentUser, $message, tweetsUrl);
        } else {
            var tweetId = $(this).parents('.thread').find('.tweet').attr('id');
            postReply(currentUser, $message, repliesUrl, tweetId);
        };

        $message = $parent.siblings('textarea').val('');  
        $(this).parents('.compose').removeClass('expand');               

        return false;

    });

    $('textarea').keypress(function(){

    	if(this.value.length > 140){
        	return false;
   		}
   		
    	$('.count').html(140 - this.value.length)
	});


});
    