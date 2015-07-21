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

    getInfo();

    $('#main').on('click', 'form', function () {
    	$(this).addClass('expand');
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
        }

        $message = $parent.siblings('textarea').val('');  
        $(this).parents('.compose').removeClass('expand');               

        return false;
    });

    $('textarea').keypress(function (){

    	if(this.value.length > 140){
        	return false;
   		}
   		
    	$('.count').html(140 - this.value.length);
	});

   function renderTweet(user, message, id) {
        var content = template.tweetTmpl({
                        id: id,
                        img: user.img,
                        handle: user.handle,
                        message: message
                    });

        return content;
    }

    function renderCompose() {
        var content = template.composeTmpl();

        return content;
    }


    function renderThread(user, message, id) {
        var content = template.threadTmpl({
                        tweet: renderTweet(user, message, id),
                        compose: renderCompose()                    
                    });

        return content;
    }

    function postReply(user, message, url, tweetId) {
        $.post(repliesUrl, {
            userId: user.id,
            tweetId: tweetId.slice(6),
            message: message
        }).done(function (data) {
            var content = renderTweet(user, data.message, data.id);
            $('#' + tweetId).siblings('.replies').append(content);
        });
    }
 
    function postTweet(user, message, url) {
        $.post(tweetsUrl, {
            userId: user.id,
            message: message
        }).done(function (data) {
            var content = renderThread(user, data.message, data.id);
            $('#tweets').append(content);
        });
    }
  
    function getInfo() {
         $.get(tweetsUrl)
            .done(function (tweets) {
                tweets.forEach(function (tweet) {
                    $.get(usersUrl + tweet.userId, function (tweetUser) {
                            $('#tweets').append(renderThread(tweetUser, tweet.message, tweet.id));                            
                        });
               });
            });

        $.get(usersUrl)
            .done(function (users) {
                users.forEach(function (user) {
                    $.get(usersUrl  +  user.id + '/replies')
                        .done(function (replies) {
                            replies.forEach(function (reply) {
                                var find = '#tweets #tweet-' + reply.tweetId;
                                $(find).siblings('.replies')
                                    .append(renderTweet(user, reply.message, reply.id));
                            });
                        });
                });
            });
    }

});