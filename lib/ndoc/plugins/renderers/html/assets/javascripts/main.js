//= require modernizr.custom
//= require jquery
//= require jquery.throttle

$(function () {
  'use strict';

  var $empty = $(), // empty set used upon activtion
      $window = $(window),
      $items = $('.menu-item > a'),
      $breadcrumbs = $('.breadcrumbs a'),
      $results = $('#search-results'), // search results
      targets = [], // items and corresponding article offset
      $active = null, // active article
      baseTitle = document.title; // base (general) part of title

  function getTitle($article) {
    var title = [baseTitle];

    if ($article.data('title')) {
      title.push($article.data('title'));
    }

    return title.join(' | ');
  }

  function eachParent($item, callback) {
    var $parent = $item.data('ndoc.parent');
    if ($parent && $parent.length) {
      eachParent($parent, callback);
      callback($parent);
    }
  }

  // activates item (used upon scrolling)
  function activate($article, expandParents) {
    var $item;

    if ($active) {
      $item = $active.data('ndoc.item') || $empty;
      $item.removeClass('current');
      eachParent($item, function ($parent) {
        $parent.removeClass('current-parent');
      });
    }

    // set new active article
    $active = $article;

    // update title
    document.title = getTitle($article);

    $item = $active.data('ndoc.item') || $empty;
    $item.addClass('current');
    eachParent($item, function ($parent) {
      $parent.addClass('current-parent');
      if (expandParents) {
        $parent.data('ndoc.childs')
          .data('ndoc.collapsed', false)
          .animate({
            height: 'show',
            opacity: 'show'
          });
      }
    });
  }


  function processScroll(evt, expandParents) {
    var scrollTop = $window.scrollTop() + 10, i = targets.length;

    while (i--) {
      if ($active !== targets[i].article && scrollTop >= targets[i].offset
          && (!targets[i + 1] || scrollTop <= targets[i + 1].offset)) {
        activate(targets[i].article, expandParents);
        return;
      }
    }
  }

  // init articles
  $('article.docblock').each(function () {
    var $article = $(this);

    targets.push({
      article: $article,
      offset: $article.offset().top
    });
  });

  // init menu items
  $items.each(function () {
    var $item = $(this),
        $childs = $item.next(),
        $parent = $item.parents('ul').eq(0).prev().children(),
        $article = $('[id="' + $item.attr('href').slice(1) + '"]');

    // cross-refs
    $item.data('ndoc.parent', $parent);
    $item.data('ndoc.childs', $childs);
    $article.data('ndoc.item', $item);

    // bind activator
    $item.on('click', function (event) {
      // collapse item?
      if ($item.hasClass('current') && !$childs.data('ndoc.collapsed')) {
        $childs.data('ndoc.collapsed', true).animate({
          height: 'hide',
          opacity: 'hide'
        });
        return false;
      }

      // activate item
      activate($article);

      // show child items
      $childs.data('ndoc.collapsed', false).animate({
        height: 'show',
        opacity: 'show'
      });

      // smooth scroll docs to current item
      event.preventDefault();
      var hash = this.hash;
      $('html,body').animate({
        scrollTop: $article.offset().top
      }, 300, function () {
        window.location.hash = hash;
      });
    });

    // collapse all 2nd levels
    if (0 != $parent.length) {
      $childs.data('ndoc.collapsed', true).hide();
    }
  });

  // init breadcrumbs
  $breadcrumbs.each(function () {
    var $link = $(this),
        $article = $('[id="' + $link.attr('href').slice(1) + '"]'),
        $item = $('.menu-item > a[href="' + $link.attr('href') + '"]'),
        $childs = $item.next();

    // yes, we need different order here
    $link.on('click', function (event) {
      // smooth scroll docs to this item
      event.preventDefault();
      var hash = this.hash;
      $('html,body').animate({
        scrollTop: $article.offset().top
      }, 300, function () {
        window.location.hash = hash;
      });

      // collapse item?
      if ($item.hasClass('current') && !$childs.data('ndoc.collapsed')) {
        $childs.data('ndoc.collapsed', true).animate({
          height: 'hide',
          opacity: 'hide'
        });
        return false;
      }

      // show child items
      $childs.data('ndoc.collapsed', false).animate({
        height: 'show',
        opacity: 'show'
      });
    });
  });

  function updateSearchResults() {
    $results.empty();

    if ('' == this.value) {
      $results.hide();
      return;
    }

    $results.show();

    $items.filter('[data-id*="' + this.value.toLowerCase() + '"]').each(function () {
      var $item = $(this);
      $('<li class="menu-item">').append(
        $item.clone(false)
          .text($item.text())
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
      // click - cuz i don't know what event fired on input clear in Chrome
      .on('change click', updateSearchResults);

  // init scrollspy
  $window.on('scroll', $.throttle(250, processScroll));

  // initial jump (required for FF only - Chrome don't need it)
  processScroll(null, true);

});
