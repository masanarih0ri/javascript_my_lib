$(function() {
  // コンテンツの幅を取得
  let carouselItemWidth = $('.carousel__contents--item').outerWidth();
  // コンテンツの数を取得
  let carouselItemCount = $('.carousel__contents--item').length;
  // コンテンツの数と幅をかけて、全体の幅を算出
  let carouselContentsWidth = carouselItemWidth * carouselItemCount;
  // カルーセルの現在地を設定
  let carouselPositionCount = 0;

  $('.carousel__contents').css('width', carouselContentsWidth);

  // クリックで動かす
  let carouselItemMove = function() {
    if(carouselPositionCount < 0) {
      carouselPositionCount = carouselItemCount - 1;
    }else if (carouselPositionCount >= carouselItemCount) {
      carouselPositionCount = 0;
    }
    $('.carousel__contents').css({
      transform: `translateX(${-carouselItemWidth * carouselPositionCount}px)`,
    });
  }

  $('.carousel__next_button').click(function() {
    carouselPositionCount++;
    carouselItemMove();
  })

  $('.carousel__prev_button').click(function() {
    carouselPositionCount--;
    carouselItemMove();
  })
})