$(document).ready(function() {
  const $textarea = $(".new-tweet-text");
  $textarea.on("input", function(e) {
    e.preventDefault;
    const $tweetLength = $(this).val().length;
    const $counter = $(this).next().children(".counter");
    $counter.text(140 - $tweetLength);
    if ($tweetLength > 140) {
      $counter.addClass("invalid");
    } else {
      $counter.removeClass("invalid");
    }
  });
});
