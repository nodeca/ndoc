$(function () {
  'use strict';

  var $window = $(window),
      $items = $('div.menu-item > a'),
      $results = $('#search-results').hide(), // search results
      targets = [], // items and corresponding article offset
      $active = null; // active menu item

  function eachParent($item, callback) {
    var $parent = $item.data('ndoc.parent');
    if ($parent && $parent.length) {
      eachParent($parent, callback);
      callback($parent);
    }
  }

  // activates item (used upon scrolling)
  function activate($item) {
    if ($active) {
      $active.removeClass('current');
      eachParent($active, function ($parent) {
        $parent.removeClass('current-parent');
      });
    }

    $active = $item.addClass('current');

    $item.data('ndoc.childs').data('ndoc.collapsed', false).animate({
      height: 'show',
      opacity: 'show'
    });

    eachParent($item, function ($parent) {
      $parent.addClass('current-parent');
      $parent.data('ndoc.childs')
        .data('ndoc.collapsed', false)
        .animate({
          height: 'show',
          opacity: 'show'
        });
    });
  }


  function processScroll() {
    var scrollTop = $window.scrollTop() + 10,
        i = targets.length;
    
    while (i--) {
      $active !== targets[i].item
        && scrollTop >= targets[i].offset
        && (!targets[i + 1].offset || scrollTop <= targets[i + 1].offset)
        && activate(targets[i].item);
    }
  }

  // init menu items
  $items.each(function () {
    var $item = $(this),
        $childs = $item.parent().next(),
        $parent = $item.parents('ul').eq(0).prev().children();

    // cross-ref tree
    $item.data('ndoc.parent', $parent);
    $item.data('ndoc.childs', $childs);

    // bind activator
    $item.on('click', function () {
      if ($item.hasClass('current') && !$childs.data('ndoc.collapsed')) {
        $childs.data('ndoc.collapsed', true).animate({
          height: 'hide',
          opacity: 'hide'
        });
        return false;
      }

      activate($item);
    });

    // fill-in article offset
    targets.push({
      item: $item,
      offset: $('[id="' + $item.attr('href').slice(1) + '"]').offset().top
    });

    // collapse all 2nd levels
    if (0 != $parent.length) {
      $childs.data('ndoc.collapsed', true).hide();
    }
  });

  function updateSearchResults() {
    $results.empty();

    if ('' == this.value) {
      $results.hide();
      return;
    }

    $results.show();

    $items.filter('[data-id*="' + this.value + '"]').each(function () {
      var $item = $(this);
      $('<div class="menu-item">').append(
        $item.clone(false)
          .text($item.data('id'))
          .on('click', function () {
            $item.trigger('click');
          })
      ).appendTo($results);
    });
  }

  // init search
  $('#search')
    // prevent from form submit
    .on('submit', function () { return false; })
    .find('input')
      .on('keyup', $.throttle(250, updateSearchResults))
      // click - cuz i don't know what event fied on input clear in Chrome
      .on('change click', updateSearchResults);

  // activate scroll spy
  $window.scroll($.throttle(250, processScroll));
  processScroll();

  // init prettyprint
  $('pre > code').addClass('prettyprint');
  prettyPrint();
});
