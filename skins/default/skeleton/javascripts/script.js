$(function () {
  'use strict';

  // extensions for jQuery allowing using data as markers
  $.fn.toggleData = function toggleData(name) {
    return this.data(name, !this.data(name));
  };


  var ACTIVE_CLASS = 'current',
      ACTIVE_PARENT_CLASS = 'current-parent';


  var $window = $(window),
      $items = $('div.menu-item > a'),
      targets = [], // items and corresponding article offset
      $active = null; // active menu item


  // deactivates item (used upon activation)
  function deactivate($item) {
    $item.removeClass(ACTIVE_CLASS);
  }

  // activates item (used upon scrolling)
  function activate($item) {
    if ($active) {
      deactivate($active);
    }

    $active = $item.addClass(ACTIVE_CLASS);
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
        $childs = $item.parent().next();

    // cross-ref tree
    $item.data('ndoc.parent', $item.parents('ul').eq(0).prev().children());
    $item.data('ndoc.childs', $childs);

    // bind activator
    $item.click(function () {
      $childs.stop().toggleData('ndoc.collapsed').animate({
        height: 'toggle',
        opacity: 'toggle'
      });

      if ($childs.data('ndoc.collapsed')) {
        // prevent from switching to article
        return false;
      }
    });

    // fill-in article offset
    targets.push({
      item: $item,
      offset: $('[id="' + $item.attr('href').slice(1) + '"]').offset().top
    });

    // collapse all by default
    $childs.data('ndoc.collapsed', true).hide();
  });


  // activate scroll spy
  $window.scroll(processScroll);
  processScroll();
});
