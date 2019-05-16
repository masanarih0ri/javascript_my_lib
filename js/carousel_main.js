$(function(){
  let carouselItemWidth = $('.carousel__item').outerWidth();
  let carouselItemCount = $('.carousel__item').length;
  let carouselAllContentsWidth = carouselItemCount * carouselItemWidth;
  let carouselPositionCount = 0;

  // 動かすコンテンツ領域をcssで指定
  $('.carousel__all_contents').css('width', carouselAllContentsWidth);

  // ページにアクセスがきたらオートでスライドを動かす
  function autoMoveCarouselItem() {
    timeId = setInterval(function(){
      carouselPositionCount++;
      if(carouselPositionCount > carouselItemCount - 1) {
        carouselPositionCount = 0;
      }
      showCarouselItem();
    }, 4000);
  }

  autoMoveCarouselItem();

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

  // ブラウザをリサイズした時の処理
  $(window).resize(function() {
    let reloadContents = false;
    let beforeWindowWidth = $(window).width();
    if (reloadContents !== false) {
      // 何度も処理を実行しないための対応
      clearTimeout(reloadContents);
    }
    reloadContents = setTimeout(function() {
      let afterWindowWidth = $(window).width();
      if(beforeWindowWidth !== afterWindowWidth){
        location.reload();
      }
      beforeWindowWidth = afterWindowWidth;
    },300);
  });
});
