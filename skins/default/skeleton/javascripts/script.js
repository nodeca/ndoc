$(function () {
  'use strict';

  var $empty = $(), // empty set used upon activtion
      $window = $(window),
      $items = $('div.menu-item > a'),
      $results = $('#search-results'), // search results
      targets = [], // items and corresponding article offset
      $active = null, // active article
      title = []; // base (general) part of title

  // TODO: this should be specified inline by generator
  //       e.g. `<script>window.NDOC_CONFIG = { baseTitle: 'Foobar' }</script>
  title.push(document.title.split(' | ').shift());

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
    // TODO: articles should have data-title attribute
    document.title = title.concat([ $article.attr('id') ]).join(' | ');

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
    var scrollTop = $window.scrollTop() + 10,
        i = targets.length;
    
    while (i--) {
      $active !== targets[i].article
        && scrollTop >= targets[i].offset
        && (!targets[i + 1].offset || scrollTop <= targets[i + 1].offset)
        && activate(targets[i].article, expandParents);
    }
  }

  // init articles
  $('article.article').each(function () {
    var $article = $(this);

    targets.push({
      article: $article,
      offset: $article.offset().top
    });
  });

  // init menu items
  $items.each(function () {
    var $item = $(this),
        $childs = $item.parent().next(),
        $parent = $item.parents('ul').eq(0).prev().children(),
        $article = $('[id="' + $item.attr('href').slice(1) + '"]');

    // cross-refs
    $item.data('ndoc.parent', $parent);
    $item.data('ndoc.childs', $childs);
    $article.data('ndoc.item', $item);

    // bind activator
    $item.on('click', function () {
      if ($item.hasClass('current') && !$childs.data('ndoc.collapsed')) {
        $childs.data('ndoc.collapsed', true).animate({
          height: 'hide',
          opacity: 'hide'
        });
        return false;
      }

      activate($article);

      $item.data('ndoc.childs').data('ndoc.collapsed', false).animate({
        height: 'show',
        opacity: 'show'
      });
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

  // init scrollspy
  $window.on('scroll', $.throttle(250, processScroll));

  // initial jump (for permalinks)
  processScroll(null, true);

  // init prettyprint
  $('pre > code').addClass('prettyprint');
  prettyPrint();
});
