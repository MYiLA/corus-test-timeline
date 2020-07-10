'use strict';
$(document).ready(function() {

  $('.timeline').on('click', '.timeline__label', function() {
    $(this).parents('.timeline').children('.timeline__item').each(function () {
      $(this).removeClass('timeline__item--active')
      $(this).removeClass('timeline__item--traversed');
    })

    $(this).parents('.timeline__item').addClass('timeline__item--active')

    var isActiveFound = false;
    $(this).parents('.timeline').children('.timeline__item').each(function () {
      if($(this).hasClass('timeline__item--active')) {
        isActiveFound = true;
      } else
      if (!isActiveFound) {
        $(this).addClass('timeline__item--traversed');
      } else {
        $(this).removeClass('timeline__item--traversed');
      }
    })
  })

  $('.js-add').on('click', function() {
    $('.timeline').append('<li class="timeline__item"><div class="timeline__progress"></div><span class="timeline__label" tabindex="0">Step</span></li>');
  })
  
  $('.js-delete').on('click', function() {
    $('.timeline__item:last-child').remove();
  })

  $('.js-left-center').on('click', function() {
    $('.timeline').toggleClass('timeline--label-left')
  })

  $('.js-under-over').on('click', function() {
    $('.timeline').toggleClass('timeline--under-line')
  })
})
