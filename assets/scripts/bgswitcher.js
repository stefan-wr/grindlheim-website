$(document).ready(function () {
    var header = $('.hero');

    var backgrounds = new Array(
          'url("/assets/img/hero1.jpg")'
        , 'url("/assets/img/hero2.jpg")'
        , 'url("/assets/img/hero3.jpg")'
    );

    var current = 0;

    function nextBackground() {
        current++;
        current = current % backgrounds.length;
        header.css('background-image', backgrounds[current]);
    }
    setInterval(nextBackground, 3000);

    header.css('background-image', backgrounds[0])
});