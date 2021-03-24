/* eslint-disable no-undef */
//    composer-char-counter.js

// adding a red-text class if the textarea exceeds the character count
$(document).ready(function() {
  
  $('#tweet-text-area').on('keyup', function() {
    let textAreaLength = $(this).val().length;
    let counterEle = $(this).next().children().last();

    let currentLen = 140 - textAreaLength;

    if (currentLen < 0) {
      counterEle.addClass('red-text');
    } else {
      counterEle.removeClass('red-text');
    }

    counterEle.text((140 - textAreaLength).toString());
  });
  
});