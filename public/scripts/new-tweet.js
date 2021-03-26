/* eslint-disable no-undef */
// Handles the click and slides the new-tweet area down or up
const newTweetClickHandler = function() {
  $('#nav-new-tweet-container').on('click', function() {
    $('.new-tweet').animate({
      height: "toggle",
    }, 300, function() {
      $('#tweet-text-area').focus();
    });
  });
};


$(document).ready(function() {
  newTweetClickHandler();
});