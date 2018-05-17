$(document).ready(function() {

  var myPlaylist = new jPlayerPlaylist({
    jPlayer: "#jquery_jplayer_1",
    cssSelectorAncestor: "#jp_container_1"
  }, [{
    title: "Teenager",
    artist: "Got7",
    mp3: "teenager-got7.mp3",
    oga: "teenager-got7.ogg"
  }], {
    swfPath: "../../dist/jplayer",
    supplied: "oga, mp3",
    wmode: "window",
    useStateClassSkin: true,
    autoBlur: false,
    smoothPlayBar: true,
    keyEnabled: true
  }); // end jplayer initiate

  /* ======== Other Audio Player Functions ======== */

  $("#jquery_jplayer_1").on(
    $.jPlayer.event.ready + ' ' + $.jPlayer.event.play,
    function(event) {

      /* === ENABLE PLAYLIST ==== */

      var current = myPlaylist.current;
      var playlist = myPlaylist.playlist;
      $.each(playlist, function(index, obj) {
        if (index == current) {
          $(".jp-now-playing").html("<div class='jp-track-name'>" + obj.title + "</div> <div class='jp-artist-name'>" + obj.artist + "</div>");

        }
      });

      /* === VOLUME DRAGGING ==== */

      $('.jp-volume-bar').mousedown(function() {
          var parentOffset = $(this).offset(),
            width = $(this).width();
          $(window).mousemove(function(e) {
            var x = e.pageX - parentOffset.left,
              volume = x / width
            if (volume > 1) {
              $("#jquery_jplayer_1").jPlayer("volume", 1);
            } else if (volume <= 0) {
              $("#jquery_jplayer_1").jPlayer("mute");
            } else {
              $("#jquery_jplayer_1").jPlayer("volume", volume);
              $("#jquery_jplayer_1").jPlayer("unmute");
            }
          });
          return false;
        })
        .mouseup(function() {
          $(window).unbind("mousemove");
        });

      /* === ENABLE DRAGGING ==== */

      var timeDrag = false; /* Drag status */
      $('.jp-play-bar').mousedown(function(e) {
        timeDrag = true;
        updatebar(e.pageX);
      });
      $(document).mouseup(function(e) {
        if (timeDrag) {
          timeDrag = false;
          updatebar(e.pageX);
        }
      });
      $(document).mousemove(function(e) {
        if (timeDrag) {
          updatebar(e.pageX);
        }
      });

      //update Progress Bar control
      var updatebar = function(x) {

        var progress = $('.jp-progress');
        //var maxduration = myPlaylist.duration; //audio duration

        var position = x - progress.offset().left; //Click pos
        var percentage = 100 * position / progress.width();

        //Check within range
        if (percentage > 100) {
          percentage = 100;
        }
        if (percentage < 0) {
          percentage = 0;
        }

        $("#jquery_jplayer_1").jPlayer("playHead", percentage);

        //Update progress bar
        $('.jp-play-bar').css('width', percentage + '%');
      };

      /* === Playlist Functions ==== */

      $('#playlist-toggle').on('click', function() {
        $('#playlist-wrap').stop().fadeToggle();
        $(this).toggleClass('playlist-is-visible');
      });

    }); // end jplayer event ready

}); // end document ready
