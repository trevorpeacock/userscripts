// ==UserScript==
// @name S to search
// @description Enables pressing 's' to focus the search input on various sites.
// @namespace swalladge.id.au
// @match *://www.wordreference.com/*
// @match *://*.wiktionary.org/*
// @match *://*.auslan.org.au/*
// @grant none
// @version     1.1.0
// @author      Samuel Walladge <samuel@swalladge.id.au> (https://swalladge.id.au)
// ==/UserScript==


document.addEventListener("keydown", evt => {

  if (window.location.hostname === "www.wordreference.com") {

    let s = document.getElementById("si");
    if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
      return; // abort; an input element already focussed
    }
    checkAndFocus(s, evt);

  } else if (/.*\.wiktionary.org/.test(window.location.hostname)) {

    let s = document.getElementById("searchInput");
    if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
      return; // abort; an input element already focussed
    }
    checkAndFocus(s, evt);

  } else if (window.location.hostname === "www.auslan.org.au") {

    let s = document.getElementById("id_menu_query");
    if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
      return; // abort; an input element already focussed
    }
    checkAndFocus(s, evt);

  }

});


let checkAndFocus = (el, evt) => {
    // check if 'el' was pressed and focus
    evt = evt || window.event;
    if (evt.ctrlKey === false && evt.keyCode === 83) {
      el.focus();
      // avoid 's' being then typed into the input
      evt.preventDefault();
    }
}
