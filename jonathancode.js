function $createUserLink(username) {
	var $link = $('<a href="#' + username + '" class="tweetUserLink">@' + username + '</a>');

	$link.click(function (e) {
		e.preventDefault();
		showUserTweet(username);
	});
	return $link;
}

function $createTweetMsg(msg) {
	return $('<div class="tweetMsg">&ldquo;' + msg + '&rdquo;</div>');
}

function $createDate(dateObj) {
	var formattedDate = dateObj.getMonth() + '/' + dateObj.getDate() + ', ' + dateObj.getUTCFullYear() + ' ' + dateObj.getHours() + ':' + dateObj.getMinutes();
	return $('<span class="tweetDate">' + formattedDate + '</span>');
}


function $createTweet(tweet) {

	var $tweet = $('<div class="tweet"></div>').append(
		$createUserLink(tweet.user),
		$createDate(tweet.created_at),
		$createTweetMsg(tweet.message),
	);

	return $tweet;
}

function $createFeed(title, tweetsArr) {

	var $tweetsContainer = $('<div class="twitterFeed"></div>');

	for (var i = tweetsArr.length - 1; 0 <= i; i--) {

		var tweet = tweetsArr[i];

		$createTweet(tweet).appendTo($tweetsContainer);
	}

	return $('<div class="feedContainer"></div>')
		.html([
			'<h1>' + title + '</h1>',
			$tweetsContainer,
		]);
}




$(document).ready(function(){

	var $body = $('body');
	var tweetsArr = streams.home;

	let $twitterFeed = $createFeed('Twitter feed', tweetsArr).appendTo($body);
	let $userFeed = $createFeed('No user selected', []).appendTo($body);

	window.showUserTweet = function(user) {

		var userTweets = streams.users[user];

		var $newFeed = $createFeed(user + '\'s tweets', userTweets);

		$userFeed.replaceWith($newFeed);

		$userFeed = $newFeed;

	};

	setInterval(function () {
		var $newFeed = $createFeed('Twitter feed', tweetsArr);
		$twitterFeed.replaceWith($newFeed);
		$twitterFeed = $newFeed;
	}, 10000);



});

