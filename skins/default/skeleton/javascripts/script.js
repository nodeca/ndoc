$(function () {
  'use strict';

  $('div.menu-item > a').each(function () {
    var $item = $(this),
        $child = $item.parent().next();

    $item.click(function () {
      $child.stop().toggleClass('collapsed').toggle('normal');
      if ($child.hasClass('collapsed')) {
        // prevent from switching to article
        return false;
      }
    });

    // collapse all by default
    $child.addClass('collapsed').hide('slow');
  });
});
