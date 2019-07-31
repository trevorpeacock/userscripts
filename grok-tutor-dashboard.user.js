// ==UserScript==
// @name        NCSS Tutor Dashboard Tools
// @namespace   swalladge.net
// @icon        https://static.groklearning-cdn.com/static/images/favicon.png
// @description tutor dashboard tools enhancements
// @include     https://groklearning.com/tutor-messaging/*
// @version     1.2.0
// @grant       none
// @author      Samuel Walladge <samuel@swalladge.net>
// ==/UserScript==


// this function injected into the page so it runs in the correct context
function main() {
  window.addEventListener('load', () => {

    // add button to turn *off* auto-assign for all
    let btn2 = $('<a class="add-new-preference-btn"><span class="icon icon-bell2"></span></a>');
    $('.component-container.tutor-preferences > h4').append(btn2);
    btn2.click(() => {
      $("a:contains('Disable auto-assign mode')").each(function() { this.click(); });
    });

    // add button to turn on auto-assign for all
    let btn = $('<a class="add-new-preference-btn"><span class="icon icon-bell3"></span></a>');
    $('.component-container.tutor-preferences > h4').append(btn);
    btn.click(() => {
      $("a:contains('Enable auto-assign mode')").each(function() { this.click(); });
    });

    // create a custom box and add custom buttons to that (so that dynamic loading doesn't clobber changes we make)
    let customBox = $('<div class="component-container"><h4>Custom Controls</h4></div>');
    $("div.component-container.tutor-preferences").after(customBox);

    // show/hide passed threads in replied or closed section
    customBox.append($('<h5>My Threads / Replied or closed</h5>'));
    let hidePassedBtn = $('<a class="btn btn-default btn-sm thread-action">Hide passed</a>');
    customBox.append(hidePassedBtn);
    hidePassedBtn.click(() => {
      $(".thread-group > h4:contains('Replied or closed')").parent().find(".passed").parent().parent().hide();
    });
    let showPassedBtn = $('<a class="btn btn-default btn-sm thread-action">Show passed</a>');
    customBox.append(showPassedBtn);
    showPassedBtn.click(() => {
      $(".thread-group > h4:contains('Replied or closed')").parent().find(".passed").parent().parent().show();
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

