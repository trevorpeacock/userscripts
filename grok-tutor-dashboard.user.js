// ==UserScript==
// @name        NCSS Tutor Dashboard Tools
// @namespace   swalladge.id.au
// @icon        https://static.groklearning-cdn.com/static/images/favicon.png
// @description tutor dashboard tools: auto-assign all btn, desktop notifications
// @include     https://groklearning.com/tutor-messaging/*
// @version     1.1.0
// @grant       none
// @author      Samuel Walladge <samuel@swalladge.id.au> (swalladge.id.au)
// ==/UserScript==


// this function injected into the page so it runs in the correct context
function main() {
  window.addEventListener('load', () => {

    // add button to turn on auto-assign for all
    let btn = $('<a class="add-new-preference-btn"><span class="icon icon-bell3"></span></a>');
    $('.component-container.tutor-preferences > h4').append(btn);
    btn.click(() => {
      $("a:contains('Enable auto-assign mode')").each(function() { this.click(); });
    });


    // desktop notifications (based on script by @forkbomb)
    Notification.requestPermission();

    Handlebars.templates['__chatThreadAssignment'] = Handlebars.templates['chat-thread-assignment-notification-popup'];
    Handlebars.templates['chat-thread-assignment-notification-popup'] = function() {
      new Notification(
        "Grok: new chat thread offer!",
        {
          'icon': 'https://static.groklearning-cdn.com/static/images/favicon.png'
        });
      return Handlebars.templates['__chatThreadAssignment'].apply(this, arguments);
    };

    Handlebars.templates['__chatThread'] = Handlebars.templates['chat-thread-notification-popup'];
    Handlebars.templates['chat-thread-notification-popup'] = function() {
      new Notification(
        "Grok: chat thread notification!",
        {
          'icon': 'https://static.groklearning-cdn.com/static/images/favicon.png'
        });
      return Handlebars.templates['__chatThread'].apply(this, arguments);
    };

    Handlebars.templates['__chatThreadState'] = Handlebars.templates['chat-thread-state-change-notification-popup'];
    Handlebars.templates['chat-thread-state-change-notification-popup'] = function() {
      new Notification(
        "Grok: chat thread state change!",
        {
          'icon': 'https://static.groklearning-cdn.com/static/images/favicon.png'
        });
      return Handlebars.templates['__chatThreadState'].apply(this, arguments);
    };

  });
}


var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
