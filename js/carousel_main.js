$(function(){
  const $carouselItem = $('.carousel__item');
  const $carouselAllContents = $('.carousel__all_contents');
  const $carouselIndicatorDot = $('.carousel__indicator_dot');
  const userAgentOfBrowser = navigator.userAgent;
  let carouselItemWidth = $carouselItem.outerWidth();
  let carouselItemCount = $carouselItem.length;
  let carouselAllContentsWidth = carouselItemCount * carouselItemWidth;
  let carouselPositionCount = 0;
  let carouselTimer;

  // カルーセルのアイテムを横にスライドする関数
  function showCarouselItem() {
    $carouselAllContents.css('transform', 'translateX(-' + (carouselPositionCount * carouselItemWidth) + 'px)');
    $carouselIndicatorDot.removeClass('carousel__indicator_dot--active');
    $carouselIndicatorDot.eq(carouselPositionCount).addClass('carousel__indicator_dot--active');
  }

  // ページロード時にカルーセルを自動で動かす関数
  function autoMoveCarouselItem() {
    if(!userAgentOfBrowser.match('/(iPhone|iPad|iPod|Android)/i')) {
      carouselTimer = setInterval(function(){
        carouselPositionCount++;
        if(carouselPositionCount > carouselItemCount - 1) {
          carouselPositionCount = 0;
        }
        showCarouselItem();
      }, 4000);
    }
  }

  // カルーセルの全てのコンテンツ幅の合計を設定
  $carouselAllContents.css('width', carouselAllContentsWidth);

  autoMoveCarouselItem();

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

  $carouselIndicatorDot.on('click', function() {
    let indexNumber = $carouselIndicatorDot.index(this);
    carouselPositionCount = indexNumber;
    showCarouselItem();
  });

  $carouselItem.on('mouseenter', function(){
    clearInterval(carouselTimer);
  });

  $carouselItem.on('mouseleave', function(){
    autoMoveCarouselItem();
  });

  // carouselAllContentsWidthをそのまま保持してしまうのでリロードする処理
  $(window).resize(function() {
    let isReloadContents = false;
    let beforeWindowWidth = $(window).width();
    if (isReloadContents !== false) {
      clearTimeout(isReloadContents);
    }
    isReloadContents = setTimeout(function() {
      let afterWindowWidth = $(window).width();
      carouselAllContentsWidth = carouselItemCount * carouselItemWidth;
      if(beforeWindowWidth !== afterWindowWidth){
        location.reload();
      }
      beforeWindowWidth = afterWindowWidth;
    },300);
  });
});
