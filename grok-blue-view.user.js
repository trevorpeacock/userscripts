// ==UserScript==
// @name        NCSS Tutor Blue View
// @namespace   swalladge.net
// @icon        https://static.groklearning-cdn.com/static/images/favicon.png
// @description blue view enhancements (slides in the course)
// @include     https://groklearning.com/learn/*
// @version     1.0.0
// @grant       none
// @author      Samuel Walladge <samuel@swalladge.net>
// ==/UserScript==

// this function injected into the page so it runs in the correct context
function main() {


  // Adds a button to copy the slide url as a markdown link.
  let copySlide = () => {
    let url = window.location.href;
    let text = '[this slide](' + url + ')';
    navigator.clipboard.writeText(text);
  };
  let copyBtn = $('<a class="action"><span class="icon icon-copy"></span><span class="title">Copy mkd link</span></a>');
  $('#action-bar-menu-left').append(copyBtn);
  copyBtn.click(copySlide);
}


var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
