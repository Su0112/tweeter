$(document).ready(function() {
  const $form = $("form");
  const $error = $("#error");

  const loadTweets = function() {
    // Make a GET request to the server using Ajax
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
    }).then((res) => {
      console.log("render Tweets: ", res);
      // Call the renderTweets function and pass the response as an argument
      renderTweets(res);
    });
  };

  // Call the loadTweets function to initiate the GET request
  loadTweets();

  // Add the event listener for form submission
  $form.submit((event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Hide the error element
    $error.hide();

    // Serialize the form data into a query string
    const formData = $form.serialize();

    // Perform form validation
    const tweetContent = $form.find("textarea[name='text']").val().trim();
    if (tweetContent === "") {
      showError("Tweet is empty! Please enter a tweet!");
      return;
    }
    if (tweetContent.length > 140) {
      showError("Tweet content is too long! Please respect our arbitrary limit of 140 chars!");
      return;
    }

    // Make a POST request to the server using Ajax
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "POST",
      data: formData,
    }).then(() => {
      loadTweets();
    });
    console.log(event);
    $form[0].reset();
    $(".counter").val(140);
    $(".invalid").slideUp();
  });

  // Function to show the error message
  const showError = function(message) {
    $error.find("#message").text(message);
    $error.slideDown();
  };
});


const renderTweets = function(tweets) {
  // Clear previous tweets
  $('#tweets-container').empty();
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const $tweetElement = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('#tweets-container').prepend($tweetElement);
  };
};

//creating the tweet elements
const createTweetElement = function(tweet) {
  const $tweet = $('<article>').addClass('tweet');

  const $header = $("<div>").addClass("article-header");
  const $avaterContainer = $("<div>");
  const $avatar = $('<img>').addClass('avatar').attr('src', tweet.user.avatars);
  const $name = $('<span>').addClass('name').text(tweet.user.name);
  const $handle = $('<span>').addClass('handle').text(tweet.user.handle);
  $header.append($avatar, $name, $handle);

  const $content = $('<div>').addClass('content').text(tweet.content.text);

  const $footer = $('<footer>');
  const $timestamp = $('<span>').addClass('timestamp').text(tweet.created_at).text(timeago.format(tweet.created_at, "en_US"));
  const $icons = $('<span>').addClass('icons').html('<i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i>');
  $avaterContainer.append($avatar, $name);
  $header.append($avaterContainer, $handle);
  $footer.append($timestamp, $icons);

  $tweet.append($header, $content, $footer);

  return $tweet;
};
