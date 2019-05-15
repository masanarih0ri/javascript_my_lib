$(function(){
  let carouselItemWidth = $('.carousel__item').outerWidth();
  let carouselItemCount = $('.carousel__item').length;
  let carouselAllContentsWidth = carouselItemCount * carouselItemWidth;
  let carouselPositionCount = 0;

  // 動かすコンテンツ領域をcssで指定
  $('.carousel__all_contents').css('width', carouselAllContentsWidth);

  // ブラウザをリサイズした時の処理
  let timer = false;
  let prewidth = $(window).width();
  $(window).resize(function() {
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      let nowWidth = $(window).width();
      if(prewidth !== nowWidth){
        location.reload();
      }
      prewidth = nowWidth;
    },300);
  });


  function showCarouselItem() {
    $('.carousel__all_contents').css('transform', 'translateX(' + -(carouselPositionCount * carouselItemWidth) + 'px)');
    $('.carousel__indicator_dot').removeClass('carousel__indicator_dot--active');
    $('.carousel__indicator_dot').eq(carouselPositionCount).addClass('carousel__indicator_dot--active');
  }

  $('.carousel__next').on('click', function(){
    carouselPositionCount++;
    if(carouselPositionCount > carouselItemCount - 1) {
      carouselPositionCount = 0
    }
    showCarouselItem();
  });

  $('.carousel__prev').on('click', function(){
    carouselPositionCount--;
    if(carouselPositionCount < 0) {
      carouselPositionCount = carouselItemCount - 1
    }
    showCarouselItem();
  });

  $('.carousel__indicator_dot').on('click', function() {
    let indexNumber = $('.carousel__indicator_dot').index(this);
    carouselPositionCount = indexNumber;
    showCarouselItem();
  });
});

