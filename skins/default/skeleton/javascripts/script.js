$(function () {
  'use strict';

  var $window = $(window),
      $items = $('div.menu-item > a'),
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
    eachParent($active, function ($parent) {
      $parent.addClass('current-parent');
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


  $items.each(function () {
    var $item = $(this),
        $childs = $item.parent().next(),
        $parent = $item.parents('ul').eq(0).prev().children();

    // cross-ref tree
    $item.data('ndoc.parent', $parent);
    $item.data('ndoc.childs', $childs);

    // bind activator
    $item.click(function () {
      if ($item.hasClass('current') && !$childs.data('ndoc.collapsed')) {
        $childs.data('ndoc.collapsed', true).animate({
          height: 'hide',
          opacity: 'hide'
        });
        return false;
      }

      activate($item);
      $childs.data('ndoc.collapsed', false).animate({
        height: 'show',
        opacity: 'show'
      });
    });

    // fill-in article offset
    targets.push({
      item: $item,
      offset: $('[id="' + $item.attr('href').slice(1) + '"]').offset().top
    }, 'fast');

    // collapse all 2nd levels
    if (0 != $parent.length) {
      $childs.data('ndoc.collapsed', true).hide();
    }
  });


  // activate scroll spy
  $window.scroll(function () { $.throttle(250, processScroll); });
  processScroll();
});
