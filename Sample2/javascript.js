/* Sample2 */

jQuery(function($){

  const startNum = 100;       //初期位置
  const safeArea = 20;          //初期位置に戻すための判定の範囲
  let currentNum = startNum;    //前回の位置
  let presentNum = startNum;    //現在の位置
  let localPosition = 0;        //現在のリスト内でのscrollLeftの位置

  //リストを３つ並べる
  const slider = $('.slider');
  const clone = slider.children().clone(true);
  clone.clone(true).appendTo('.slider');
  clone.clone(true).appendTo('.slider');

  //absolute属性をつける前にリストの幅を計算しておく
  const padding = $('.slider .menu:nth-child(1)').position().left;
  const menuWidth = $('.slider .menu:nth-child(2)').position().left - padding;

  //外枠に暫定の高さとrelative属性を付与
  slider.css({'height': '1.5em','position':'relative'});

  //それぞれを初期位置に移動(要素の幅が決まってからscrollLeftを移動)
  $(".slider .menu:nth-child(1)").css({'position':'absolute','left':menuWidth * (startNum - 1)});
  $(".slider .menu:nth-child(2)").css({'position':'absolute','left':menuWidth * startNum});
  $(".slider .menu:nth-child(3)").css({'position':'absolute','left':menuWidth * (startNum + 1)});
  slider.scrollLeft(menuWidth * startNum);

  //スクロールが動いてる時に走る
  slider.scroll(function(){
    console.log('scrollLeft : ' + slider.scrollLeft());
    console.log('presentNum : ' + presentNum);
        
    //各位置更新（
    localPosition = $(this).scrollLeft() % menuWidth;
    presentNum = ($(this).scrollLeft() - localPosition) / menuWidth;
            
    //scrollLeftの乗っているリストが変わったらscrollLeftの乗ってるListが中心になるようにずらす
    if(presentNum != currentNum){
      $(".slider .menu:nth-child(1)").css({'left':menuWidth * (presentNum - 1)});
      $(".slider .menu:nth-child(2)").css({'left':menuWidth * presentNum});
      $(".slider .menu:nth-child(3)").css({'left':menuWidth * (presentNum + 1)});
      currentNum = presentNum;
    }
  });
    
  //タッチ関係が発火したときに範囲外だった場合、初期位置に戻す
  //PCだと発火しないので端末で確認
  slider.on('touchstart touchmove touchend',function(){
    console.log('touch');
             
    if(presentNum < startNum - safeArea || presentNum > startNum + safeArea){
      currentNum = startNum;
      presentNum = startNum;
      $(".slider .menu:nth-child(1)").css({'left':menuWidth * (startNum - 1)});
      $(".slider .menu:nth-child(2)").css({'left':menuWidth * startNum});
      $(".slider .menu:nth-child(3)").css({'left':menuWidth * (startNum + 1)});
      slider.scrollLeft(menuWidth * startNum + localPosition);
      return;
    }
  });
});
