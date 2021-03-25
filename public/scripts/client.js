/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Function that extracts the date and returns a string with the appropriate
//    - elapsed time in an appropriate time denomination
const getTime = function(date) {
  let time = '';
  const currentDate = new Date();
  const diffTimes = currentDate - date;

  // Convert difference in milliseconds to different time denominations
  const diffSeconds = [Math.round(diffTimes / 1000), 'second'];
  const diffMins = [Math.round(diffSeconds[0] / 60), 'minute'];
  const diffHours = [Math.round(diffMins[0] / 60), 'hour'];
  const diffDays = [Math.round(diffHours[0] / 24), 'day'];
  const diffMonths = [Math.round(diffDays[0] / 30.42), 'month'];
  const diffYears = [Math.round(diffMonths[0] / 12), 'year'];
  console.log(diffSeconds, diffMins, diffHours, diffDays, diffMonths, diffYears);
  const timeDenoms = [diffYears, diffMonths, diffDays, diffHours, diffMins, diffSeconds];

  for (let denom of timeDenoms) {
    if (denom[0]) {
      if (denom[0] === 1) {
        time += `${denom[0]} ${denom[1]} `;
      } else {
        time += `${denom[0]} ${denom[1]}s `;
      }
      break;
    }
  }
  return time.length ? time + 'ago' : '1 second ago';
  return time + 'ago';
};

// Function that appends error element to error container and
//    - hides it initally so the slide animation can be seen.
const renderError = function(errString) {
  $('#new-tweet-error-container').empty();
  $('#new-tweet-error-container').append(`
  <div id="new-tweet-error">
    <img src="./images/icons/warning.png" alt="Warning Image" class="new-tweet-error-warning"/>
    <div id ="new-tweet-error-message">
      ${errString}
    </div>
    <img src="./images/icons/warning.png" alt="Warning Image" class="new-tweet-error-warning"/>
  </div>
  `);
  $('#new-tweet-error-container').hide();
  $('#new-tweet-error-container').slideDown(100);
};

// Function that validates form input
//    - return the data or
//    - calls error funtion to rendor error message
const formValidator = function(data) {
  const tweet = data.slice(5);
  // Check for empty string or null
  if (tweet) {
    if (tweet.length > 140) {
      renderError("Tweet is too long. It's a tweet not an essay");
    // Case for if the tweet is less than 140 characters and not an empty string
    } else {
      // Valid tweet
      return data;
    }
    // Case when the tweet is an empty string or null
  } else {
    renderError('Tweet is empty. Words do not bite!');
  }
};

// Escape function that is used to make sure user is not
//  entering in html code which we will insert and
//  cause problems. Eg: Script tags
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Creating each individual tweet element given a tweet object
const createTweetElement = function(tweet) {
  return `
    <article class="tweet">
      <header>
        <div>
          <img class="tweet-avatar" src=${tweet.user.avatars} />
          <h3 class="tweet-username">${tweet.user.name}</h3>
          <h3 class="tweet-userhandle">${tweet.user.handle}</h3>
        </div>
      </header>
      <h4 class="tweet-content">${escape(tweet.content.text)}</h4>
      <footer>
        <div class="tweet-footer">
          <time class= "footer-elapsed-time">${getTime(tweet.created_at)}</time>
          <div class="tweet-btn-container">
            <img class="tweet-btn tweet-flag" src="./images/icons/flag.png" />
            <img class="tweet-btn tweet-retweet" src="./images/icons/retweet.png" />
            <img class="tweet-btn tweet-like" src="./images/icons/like.png" />
          </div>
        </div>
      </footer>
    </article>
      `;
};


// Renders tweets by looping through array of tweet objects and
//  - appending to #tweet-list element
const renderTweets = function(tweets) {
  const $tweetList = $('#tweet-list');
  const listOfTweets = [];
  for (let oneTweet of tweets) {
    let $tweet = createTweetElement(oneTweet);
    $tweetList.prepend($tweet);
  }
  // $tweetList.append(listOfTweets.join(''));
};

// Ajax function that GET's the tweets as a JSON
const loadTweets = function() {
  $.ajax('/tweets', {
    method: 'GET',
    success: function() {
      console.log("GET was a success");
    },
  }).then(function(res) {
    $('#tweet-list').empty();
    renderTweets(res);
  });
};

// AJAX function POST that sends the form data after validating it
const formSubmit = function(data) {
  $.ajax('/tweets/', {
    method: 'POST',
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    success: function() {
      console.log("POST was a success");
    }
  })
    .then(function() {
      loadTweets();
    });
};

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

// Adds a submit event to the form element that will validate data, and send
//  - escaped form data to the AJAX POST function
const addSubmitListener = function() {
  $('#new-tweet-form').on('submit', function(event) {
    event.preventDefault();
    $('#new-tweet-error-container').slideUp(100);
    const data = $(this).serialize();
    const isValid = formValidator(data);

    // formValidator fn takes care of rendering errors when tweet is invalid
    if (isValid) {
      formSubmit(isValid);
      $('#tweet-text-area').val('');
      $('.counter').text('140');
    }
  });
};



// Document.ready function will load the tweets initially and add the submit
//  - listener to accept any form submits
$(document).ready(function() {
  // loadTweets();
  addSubmitListener();
  renderTweets(data);

});