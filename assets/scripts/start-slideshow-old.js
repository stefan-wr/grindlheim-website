---
---

var img = new Image();
img.onload = function () {
    $(".hero-slideshow li:nth-child(6)").css("animation", "fadeIn 1.45s linear forwards");
}

img.onload = function () {
    for (i = 2; i < 8; i++) {
        var j = i + "";

        if (i == 7) {
            j = 1;
        }
        console.log(j);
        $(".hero-slideshow li:nth-child(" + i + ")").css("background-image", "url({{ site.baseurl }}/assets/img/heros/6/hero" + j + ".jpg)");
    }
}

img.src = "{{ site.baseurl }}/assets/img/heros/6/hero1.jpg";

// Wait for all hero images to load
$(window).on("load", function () { 
    // Wait
    setTimeout(function () {
        // Fade out first hero image
        $(".hero-slideshow li:nth-child(6)").css("animation", "fadeOut 1.45s linear forwards");
        // Wait for fade out animation to finish
        setTimeout(function () {
            // Set CSS animations to start slideshow
            for (i = 1; i < 7; i++) {
                $(".hero-slideshow li:nth-child(" + i + ")").css("animation", "slideshow 36s linear infinite " + ((i - 1) * 6) + "s");
            }
        }, 1450)
    }, 2000);
})
