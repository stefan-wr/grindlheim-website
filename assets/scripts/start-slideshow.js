---
---

// Preloader for multiple hero images
function preloadimages() {
    var nheros = 5
    var newimages = []
    var loadedimages = 0
    var postaction = function () { }

    function imageloadpost() {
        loadedimages++
        if (loadedimages == nheros) {
            postaction(newimages)
        }
    }

    // Preload hero images 2 to 6.
    for (var i = 2; i < 7; i++) {
        newimages[i - 2] = new Image()
        newimages[i - 2].src = "{{ site.baseurl }}/assets/img/heros/6/hero" + i + ".jpg"
        newimages[i - 2].onload = function () {
            imageloadpost()
        }
        newimages[i - 2].onerror = function () {
            imageloadpost()
        }
    }

    return {
        done: function (f) {
            postaction = f || postaction
        }
    }
}

// Javascript is enabled -> blend out first hero image before it is loaded
$("document").ready( function() {
    $(".hero-slideshow li:nth-child(6)").css("opacity", "0")
})

// Preload first hero image and start fade-in animation when ready
var hero1 = new Image()
hero1.onload = function () {
    $(".hero-slideshow li:nth-child(6)").css("animation", "fadeIn 1.45s linear forwards")
}
hero1.src = "{{ site.baseurl }}/assets/img/heros/6/hero1.jpg"

// Wait for page to be completed before loading the rest of the hero images
$(window).on("load", function () {
    // Fade in loading symbol
    var loaded = false
    setTimeout(function() {
        if (loaded != true) {
            $(".hero-grid .loading").fadeIn()
        }
    }, 750)
    // Preload all remaining hero images
    preloadimages().done(function (images) {
        for (i = 1; i < 6; i++) {
            // Set background-image in CSS
            $(".hero-slideshow li:nth-child(" + i + ")").css("background-image", "url({{ site.baseurl }}/assets/img/heros/6/hero" + (i + 1) + ".jpg)")
        }
        // Fade out loading symbol
        loaded = true
        $(".hero-grid .loading").fadeOut()
        // Wait 2s
        setTimeout(function () {
            // Fade out first hero image
            $(".hero-slideshow li:nth-child(6)").css("animation", "fadeOut 1.45s linear forwards")
            // Wait 1.45s for fade out animation to finish
            setTimeout(function () {
                // Add CSS animations to start the slideshow
                for (i = 1; i < 7; i++) {
                    $(".hero-slideshow li:nth-child(" + i + ")").css("animation", "slideshow 36s linear infinite " + ((i - 1) * 6) + "s")
                }
            }, 1450)
        }, 2000)
    })
})
