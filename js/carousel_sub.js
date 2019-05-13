/* 仕様 */

/*
1.初期状態で表示されるのは1枚目のページ
2.矢印をクリックすると前後にある画像が表示される
3.インジケーターも連動
4.インジケーターをクリックすればその順番にある画像が表示される
5.レスポンシブ対応（はこれからやる）

*/

$(function() {
  let carouselIndex = 1;
  // この関数で全てカルーセルの動きを制御するという形
  // carouselIndexは表示したいコンテンツの番号（初期値を1として、ページロード時には1番目が表示される）
  showCarouselContents(carouselIndex);

  // 矢印をクリックしたらshowCarouselContentsを呼び出して、carouselIndex = carouselIndex + index_numberとする
  // moveContentsWithArrow(1)かmoveContentsWithArrow(-1)
  function moveContentsWithArrow(index_number) {
    showCarouselContents(carouselIndex += index_number);
  }

  // dotをクリックしたらshowCarouselContentsを呼び出して、carouselIndex = index_numberとする
  // moveContentsWithDot(1)とか(2)とかになる
  function moveContentsWithDot(index_number) {
    showCarouselContents(carouselIndex = index_number)
  }

  function showCarouselContents(index_number) {
    let carouselItems = $('.carousel__item');
    let carouseIndicatorDots = $('.carousel__indicator_dot');
    // index_numberがアイテムの数よりも多い時にはcarouselIndexを1とする（3番目の後に先に進むボタンを押したら前に戻るようにする）
    // index_numberが1以下になったら、逆に一番後ろのコンテンツを表示させるようにcarouselIndexの値を変更する。
    if(index_number > carouselItems.length) {
      carouselIndex = 1;
    } else if (index_number < 1) {
      carouselIndex = carouselItems.length;
    }
    $('.carousel__item').css({
      display: 'none'
    })
    $('.carousel__item').eq(carouselIndex - 1).css({
      display: 'block'
    });

    $('.carousel__indicator_dot').removeClass('carousel__indicator_dot--active');
    $('.carousel__indicator_dot').eq(carouselIndex - 1).addClass('carousel__indicator_dot--active');

  }

  $('.carousel__prev').click(function() {
    moveContentsWithArrow(-1);
  });

  $('.carousel__next').click(function() {
    moveContentsWithArrow(1);
  });
  $('.carousel__indicator_dot').click(function() {
    let index_number = $('.carousel__indicator_dot').index(this);
    moveContentsWithDot(index_number + 1);
  });
});
