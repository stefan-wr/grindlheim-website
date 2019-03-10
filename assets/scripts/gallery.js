class Gallery {
    constructor(id, imgPath, imgType, nImgs, current, imgTxts = []) {
        this.id = id;
        this.imgPath = imgPath;
        this.imgType = imgType;
        this.nImgs = nImgs;
        this.imgTxts = imgTxts
        this.current = current;
        this.txtVisible = true
        this.imgLoaded = true
        bindGalleryId(this)
    }

    getImgUrl(next) {
        if (next > this.nImgs) {
            this.current = 1;
        }
        else if (next < 1) {
            this.current = this.nImgs;
        }
        else {
            this.current = next;
        }
        return this.imgPath + this.current + this.imgType;
    }

    loadImage(url) {
        this.imgLoaded = false
        var img = new Image();
        img.gallery = this

        img.onload = function () {
            this.gallery.imgLoaded = true;
            $(this.gallery.id + ' .gallery-loading').fadeOut();
            $(this.gallery.id + ' .gallery-img').fadeIn();
            if (this.gallery.txtVisible) {
                $(this.gallery.id + ' .gallery-txt').fadeIn().css('display', 'inline-block');;
            }
        };

        setTimeout(function (gallery) {
            if (gallery.imgLoaded != true) {
                $(gallery.id + ' .gallery-loading').fadeIn();
            }
        }, 500, this);

        img.src = url;
    }

    setImage(next) {
        var url = this.getImgUrl(next);
        this.loadImage(url);
        $(this.id + ' .gallery-txt').hide();
        $(this.id + ' .gallery-img').hide();
        $(this.id + ' .gallery-img').css('background-image', 'url(' + url + ')');
        $(this.id + ' .fullscreen').attr('href', url);
        $(this.id + ' .img-number').text(this.current + ' / ' + this.nImgs);
        if (this.imgTxts != []) {
            $(this.id + ' .gallery-txt').text(this.imgTxts[this.current - 1])
        }
    }

    first() {
        this.setImage(this.current);
    }

    next() {
        this.setImage(this.current + 1);
    }

    previous() {
        this.setImage(this.current - 1);
    }

    toggleTxt() {
        if (this.txtVisible) {
            // Hide text
            this.txtVisible = false
            $(this.id + ' .gallery-txt').fadeOut();
            $(this.id + ' .toggle-txt i').addClass('fa-eye');
            $(this.id + ' .toggle-txt i').removeClass('fa-eye-slash');
        } else {
            // Show text
            this.txtVisible = true
            // Only show if image is loaded, otherwise loadImage will show the text.
            if (this.imgLoaded) {
                $(this.id + ' .gallery-txt').fadeIn().css('display', 'inline-block');;
            }
            $(this.id + ' .toggle-txt i').addClass('fa-eye-slash');
            $(this.id + ' .toggle-txt i').removeClass('fa-eye');
        }
    }
}

function bindGalleryId(gallery) {
    $('document').ready(function () {
        gallery.first();
        $(gallery.id + ' .previous').click(function () {
            gallery.previous();
        })
        $(gallery.id + ' .next').click(function () {
            gallery.next();
        })
        $(gallery.id + ' .toggle-txt').click(function () {
            gallery.toggleTxt();
        })
    })
}
