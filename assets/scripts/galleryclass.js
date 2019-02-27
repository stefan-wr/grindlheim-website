
class Gallery {
    constructor(id, imgPath, imgType, nImgs, current) {
        this.id = id;
        this.imgPath = imgPath;
        this.imgType = imgType;
        this.nImgs = nImgs;
        this.current = current;
        bindGalleryId(this.id, this)
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
        var complete = false;
        var img = new Image();

        img.onload = function () {
            complete = true;
            $(this.id + ' .gallery-loading').fadeOut();
            $(this.id + ' .gallery-img').fadeIn();
        };

        setTimeout(function (id) {
            if (complete != true) {
                $(id + ' .gallery-loading').fadeIn();
            }
        }, 500, this.id);

        img.src = url;
    }

    setImage(next) {
        var url = this.getImgUrl(next);
        this.loadImage(url);
        $(this.id + ' .gallery-img').hide();
        $(this.id + ' .gallery-img').css('background-image', 'url(' + url + ')');
        $(this.id + ' .fullscreen').attr('href', url);
        $(this.id + ' .img-number').text(this.current + ' / ' + this.nImgs);
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
}

function bindGalleryId(id, gallery) {
    $('document').ready(function () {
        gallery.first();
        $(id + ' .previous').click(function () {
            gallery.previous();
        })
        $(id + ' .next').click(function () {
            gallery.next();
        })
    })
}
