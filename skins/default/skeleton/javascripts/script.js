$(function () {
  'use strict';

  var $window = $(window),
      $items = $('div.menu-item > a'),
      targets = [],
      $active = null;

  function toggle($item) {
    $item.data('ndoc.menu-child').stop().toggleClass('collapsed').toggle('slow');
  }

  function deactivate($item) {
    $item.removeClass('active');
  }

  function activate($item) {
    if ($active) {
      deactivate($active);
    }

    $active = $item.addClass('active');
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
        $child = $item.parent().next(),
        $article = $('[id="' + $item.attr('href').slice(1) + '"]');

    // store cross references
    $item.data('ndoc.menu-child', $child);
    $child.data('ndoc.menu-parent', $item);

    // bind activator
    $item.click(function () {
      toggle($item);
      if ($child.hasClass('collapsed')) {
        // prevent from switching to article
        return false;
      }
    });

    // fill-in article offset
    targets.push({
      offset: $article.offset().top,
      item: $item
    });

    // collapse all by default
    toggle($item);
  });


  $window.scroll(processScroll);
});
