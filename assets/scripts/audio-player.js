function playAudio() {
	if (audio.paused || audio.ended ) {
        audio.play()
	} else {
		audio.pause()
    }
    $('#audio-toggle i').toggleClass("fa-volume-off fa-volume-up")
}

$(document).ready( function() {
    var audio = $('#audio').get(0)

    // Loop audio after 500 ms
    audio.onended = function() {
        $('#audio-toggle i').toggleClass("fa-volume-off fa-volume-up")
        setTimeout( function() {
            playAudio()
        }, 500)
    }
})
