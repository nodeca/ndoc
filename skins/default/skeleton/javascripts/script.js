'use strict';

//
// setup menu
//
function hashChanged(path) {
  var el = $('div.menu-item a[href="'+path+'"]');
  //console.log(el);
  //console.log('HASH', path, el.data('id'));
  // forget current selection
  $('div.menu-item >a.current').removeClass('current');
  $('div.menu-item >a.current-parent').removeClass('current-parent');
  // collapse menu
  $('div.menu-item +ul').addClass('hidden');
  // expand parents of `el`
  el.parents('ul').removeClass('hidden');
  // expand children of `el`
  el.parents('div.menu-item:eq(0)').next().removeClass('hidden');
  // set current selection
  el.parents('div.menu-item').find('>a').addClass('current-parent');
  el.addClass('current');
  // set window title
  document.title = document.title.substring(0, document.title.lastIndexOf(' | ')) + (el.data('id') ? ' | ' + el.data('id') : '');
  return false;
}

//
// setup search
//
$(document)
// TODO: textchange?
.delegate('#search', 'keyup', function() {
  //console.log('CH', arguments);
  var filter = $(this).val();
  // TODO: glob-style search?
  var re = new RegExp(filter, 'i');
  /*var count = 0;
  $('div.article').addClass('hidden');
  $('div.article').each(function() {
    if ($(this).attr('id').match(re)) {
      $(this).removeClass('hidden');
      ++count;
    }
  });*/
  $('div#home')[filter ? 'addClass' : 'removeClass']('hidden');
  $('div.menu-item').addClass('hidden');
  $('div.menu-item >a').each(function() {
    if ($(this).attr('href').substring(1).match(re)) {
      $(this).parents('div.menu-item').removeClass('hidden');
    }
  });
})

//
// setup smooth scroll for local anchors
//
.delegate('a[href^="#"]', 'click', function(ev) {
  var href = $(this).attr('href');
  var el = $('[id="' + href.substring(1) + '"]');
  if (el.length) {
    $('body').stop().animate({
      scrollTop: el.offset().top
    }, 500, function() {
      location.hash = href;
      hashChanged(href);
    });
  }
  return false;
});

//
// page loaded
//
$(function(){
  // setup code prettifier
  $('pre >code').addClass('prettyprint');
  //$('#home pre >code').removeClass('prettyprint');
  prettyPrint();
  // honor initial hash
  hashChanged(location.href.replace(/(^.*)#/, '#'));
});
