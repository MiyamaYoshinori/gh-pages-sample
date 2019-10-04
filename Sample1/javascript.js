/* Sample1 */

jQuery(function($){

  const slider = $('.slider');
  const clone = slider.children().clone(true);
  clone.clone(true).appendTo('.slider');
  clone.clone(true).appendTo('.slider');

  const padding = $('.slider .menu:nth-child(1)').position().left;
  const menuWidth = $('.slider .menu:nth-child(2)').position().left - padding;

  slider.scrollLeft(menuWidth);

  slider.scroll(function(){
    console.log('scrollLeft : ' + slider.scrollLeft());

    if(slider.scrollLeft() < menuWidth){
      slider.scrollLeft(slider.scrollLeft() + menuWidth);
      return false;
    }
    if(slider.scrollLeft() > menuWidth * 2){
      slider.scrollLeft(slider.scrollLeft() - menuWidth);
      return false;
    }
  });
});
