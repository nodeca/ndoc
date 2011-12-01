$(function () {
  'use strict';

  $('div.menu-item > a').each(function () {
    var $item = $(this),
        $child = $item.parent().next();

    $item.click(function () {
      $child.stop().toggle('normal');
    });
  });
});
