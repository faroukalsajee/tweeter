/* eslint-disable no-undef */


// Initializes the scroll elements that are going to be sliding
const initScrollElements = function() {
  const $scrollDown = $("#scroll-down");
  const $newTweetBtn = $("#nav-new-tweet-container");

  $("#scroll-down").hide(); //hide your div initially

  const topOfOthDiv = $("#main-header").offset().top + 280;
  $(window).scroll(function() {
    if ($(window).scrollTop() > topOfOthDiv) { //scrolled past the other div?
      $scrollDown.show(); //reached the desired point -- show div
      $newTweetBtn.hide();
    } else {
      $scrollDown.hide(); //else above the desired point -- hide div
      $newTweetBtn.show();
    }
  });
};

// Attach listener and perform the sliding
const handleScrollDown = function() {
  $("#scroll-down").on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 400);
    $('.new-tweet').show();
    $('#tweet-text-area').focus();
  });
};

// Document ready function hosts all function calls
$(document).ready(function() {
  initScrollElements();
  handleScrollDown();
});