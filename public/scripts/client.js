/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// tweet data object that the function will take will have all the necessary tweet data
// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// };
// //
// const $tweet = $(`<article class="tweet">Hello world</article>`);

// Test / driver code (temporary). Eventually will get this from the server.
// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// };

// const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// // to see what it looks like
// console.log($tweet);
// // to add it to the page so we can make sure it's got all the right elements, classes, etc.
// $('#tweets-container').append($tweet); 


// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const $tweetElement = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('#tweets-container').append($tweetElement);

  }
};

//creating the tweet elements
const createTweetElement = function(tweet) {
  const $tweet = $('<article>').addClass('tweet');

  const $header = $('<header>');
  const $avatar = $('<img>').addClass('avatar').attr('src', tweet.user.avatars);
  const $name = $('<span>').addClass('name').text(tweet.user.name);
  const $handle = $('<span>').addClass('handle').text(tweet.user.handle);
  $header.append($avatar, $name, $handle);

  const $content = $('<div>').addClass('content').text(tweet.content.text);

  const $footer = $('<footer>');
  const $timestamp = $('<span>').addClass('timestamp').text(tweet.created_at);
  const $icons = $('<span>').addClass('icons').html('<i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i>');
  $footer.append($timestamp, $icons);

  $tweet.append($header, $content, $footer);

  return $tweet;
};

renderTweets(data);
