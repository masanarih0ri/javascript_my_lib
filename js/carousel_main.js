$(function(){
  const $carouselSection = $('.carousel__wrapper');
  const $carouselItem = $('.carousel__item');
  const $carouselAllContents = $('.carousel__all_contents');
  const $carouselIndicatorDot = $('.carousel__indicator_dot');
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
    carouselTimer = setInterval(function(){
      carouselPositionCount++;
      if(carouselPositionCount > carouselItemCount - 1) {
        carouselPositionCount = 0;
      }
      showCarouselItem();
    }, 4000);
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

  $carouselSection.on('mouseenter', function(){
    clearInterval(carouselTimer);
  });

  $carouselSection.on('mouseleave', function(){
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
    }, 300);
  });

  // スワイプの処理
  // どこの要素についてやるか？carousel__all_contentsでまずはやる
  // 指をタッチした時
  let position;
  let direction;
  function onTouchStart(event) {
    position = getPosition(event);
    direction = '';

    console.log(position);
    console.log(direction);

  }
  // 指を動かした時
  function onTouchMove(event) {
    // スタートしたボジションと動いた先の座標の差を取得し、X座標が左側に行っていればその処理をする
    if (position - getPosition(event) > 70) {
      direction = 'left'; //左と検知
    } else if (position - getPosition(event) > -70) {
      direction = 'right'; //右と検知
    }
  }

  // 指を離した時
  function onTouchEnd() {
    if (direction === 'left') {
      carouselPositionCount++;
      if(carouselPositionCount > carouselItemCount - 1) {
        carouselPositionCount = 0
      }
      showCarouselItem();
    } else if (direction === 'right') {
      carouselPositionCount--;
      if(carouselPositionCount < 0) {
        carouselPositionCount = carouselItemCount - 1
      }
      showCarouselItem();
    }
  }

  function getPosition(event) {
    return event.originalEvent.touches[0].pageX;
  }

  $carouselAllContents.on('touchstart', onTouchStart); //指が触れたか検知
  $carouselAllContents.on('touchmove', onTouchMove); //指が動いたか検知
  $carouselAllContents.on('touchend', onTouchEnd); //指が離れたか検知
});
