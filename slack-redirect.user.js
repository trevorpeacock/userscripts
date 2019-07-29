// ==UserScript==
// @name        slack-direct
// @namespace   swalladge.net
// @description Bypass slack-redir
// @include     https://*.slack.com/**
// @version     1.1.0
// @author      Samuel Walladge <samuel@swalladge.net>
// @grant       none
// ==/UserScript==

function removeRedirects() {
    let links = document.querySelectorAll('a[href^="https://slack-redir.net"]');
    for (link of links) {
      link.removeAttribute('onclick');
      link.href = decodeURIComponent(link.href.slice(33)).replace(new RegExp("&v=3$"), "");
      let thing = link.cloneNode();
      while (link.firstChild) {
        thing.appendChild(link.lastChild);
      }
      link.parentNode.replaceChild(thing, link);
    }
}

setInterval(removeRedirects, 500);
