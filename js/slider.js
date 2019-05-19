$(function(){
  // 移動速度などの変数
  let $slider = $('.slider');
  let slideSpeed = 500;
  let slideDelay = 5000;
  let slideEasing = 'linear';
  let openingFade = 1000;

  $slider.each(function() {
    // slider
    let selfSlide = $(this);
    // ul要素
    let slideUnorderList = selfSlide.find('.slider__unorder_list');
    // 全てのli要素
    let slideItem = slideUnorderList.find('.slider__item');
    // li要素の数
    let slideItemCount = slideItem.length;
    // li要素の中のimg要素
    let slideImage = slideItem.find('.slider__image');
    // 自動再生時のタイマー
    let slideTimer;

    console.log(selfSlide);
    console.log(slideUnorderList);
    console.log(slideItem);
    console.log(slideItemCount);
    console.log(slideImage);


    slideItem.each(function(i) {
      $(this).attr('class', 'slider__item_viewlist' + (i + 1));
    });

    // slideItemCountが1よりも大きい時（つまりスライド2枚以上存在する時）
    if(slideItemCount > 1) {
      selfSlide.wrapAll('<div class="slider__cover">');
      slideUnorderList.wrapAll('<div class="slider__wrap">');

      let sliderCover = selfSlide.parent('.slider__cover');
      let sliderWrap = selfSlide.find('slider__wrap');

      console.log(sliderCover);
      console.log(sliderWrap);
      slideUnorderList.clone().prependTo(sliderWrap);
      slideUnorderList.clone().appendTo(sliderWrap);
    }

  })
});
