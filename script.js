const xhr = new XMLHttpRequest();
var audioPlayer = new Audio();
var currentTrackIndex = 0;
xhr.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    const xmlDoc = this.responseXML;
    const playlist = xmlDoc.getElementsByTagName("track");
    const playlistCount = playlist.length;
    document.getElementById(
      "playlist-count"
    ).innerHTML = `${playlistCount} songs`;
    const playlistElement = document.getElementById("playlist");
    for (let i = 0; i < playlistCount; i++) {
      const track = playlist[i];
      const li = document.createElement("li");
      li.className = "playlist-item";
      const img = document.createElement("img");
      img.src = track.getElementsByTagName("images")[0].childNodes[0].nodeValue;
      img.alt = "Song Cover";
      const div = document.createElement("div");
      div.className = "playlist-item-details";
      const h2 = document.createElement("h2");
      h2.className = "playlist-item-title";
      h2.textContent =
        track.getElementsByTagName("name")[0].childNodes[0].nodeValue;
      const p = document.createElement("p");
      p.className = "playlist-item-artist";
      p.textContent =
        track.getElementsByTagName("artist")[0].childNodes[0].nodeValue;
      div.appendChild(h2);
      div.appendChild(p);
      li.appendChild(img);
      li.appendChild(div);
      playlistElement.appendChild(li);

      li.addEventListener("click", function () {
        document.getElementById("song-cover").src =
          track.getElementsByTagName("images")[0].childNodes[0].nodeValue;
        document.getElementById("song-title").textContent =
          track.getElementsByTagName("name")[0].childNodes[0].nodeValue;
        document.getElementById("song-artist").textContent =
          track.getElementsByTagName("artist")[0].childNodes[0].nodeValue;
        audioPlayer.src =
          track.getElementsByTagName("file")[0].childNodes[0].nodeValue;
        playMusic();
      });
    }

    // Set the song cover to the image of the first track on the playlist
    document.getElementById("song-cover").src =
      playlist[0].getElementsByTagName("images")[0].childNodes[0].nodeValue;

    // Set the song title and artist to the details of the first track on the playlist
    document.getElementById("song-title").textContent =
      playlist[0].getElementsByTagName("name")[0].childNodes[0].nodeValue;
    document.getElementById("song-artist").textContent =
      playlist[0].getElementsByTagName("artist")[0].childNodes[0].nodeValue;

    // Set the source of the audio player to the first track on the playlist
    audioPlayer.src =
      playlist[0].getElementsByTagName("file")[0].childNodes[0].nodeValue;

    //set duration
    function updateProgress() {
      const currentTime = document.getElementById("song-current-time");
      const totalTime = document.getElementById("song-total-time");
      const duration = audioPlayer.duration;
      const currentTimeFormatted = formatTime(audioPlayer.currentTime);
      const totalTimeFormatted = formatTime(duration);
      currentTime.textContent = currentTimeFormatted;
      totalTime.textContent = totalTimeFormatted;
    }

    function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    function playMusic() {
      audioPlayer.play();
      document.getElementById("play-pause").innerHTML =
        "<i class='fas fa-pause'></i>";
      setInterval(updateProgress, 1000);
    }

    function pauseMusic() {
      audioPlayer.pause();
      document.getElementById("play-pause").innerHTML =
        "<i class='fas fa-play'></i>";
    }

    document
      .getElementById("play-pause")
      .addEventListener("click", function () {
        if (audioPlayer.paused) {
          playMusic();
          document.getElementById("play-pause").innerHTML =
            "<i class='fas fa-pause'></i>";
        } else {
          pauseMusic();
          document.getElementById("play-pause").innerHTML =
            "<i class='fas fa-play'></i>";
        }
      });

    function playTrack(trackIndex) {
      const playlist = xmlDoc.getElementsByTagName("track");
      const track = playlist[trackIndex];
      const audioPlayer = new Audio();
      document.getElementById("song-cover").src =
        track.getElementsByTagName("images")[0].childNodes[0].nodeValue;
      document.getElementById("song-title").textContent =
        track.getElementsByTagName("name")[0].childNodes[0].nodeValue;
      document.getElementById("song-artist").textContent =
        track.getElementsByTagName("artist")[0].childNodes[0].nodeValue;
      audioPlayer.src =
        track.getElementsByTagName("file")[0].childNodes[0].nodeValue;
      audioPlayer.play();
      return audioPlayer;
    }

    document.getElementById("next").addEventListener("click", function () {
      currentTrackIndex++;
      if (currentTrackIndex >= playlistCount) {
        currentTrackIndex = 0;
      }
      audioPlayer.pause();
      audioPlayer = playTrack(currentTrackIndex);
      document.getElementById("play-pause").innerHTML =
        "<i class='fas fa-pause'></i>";
    });

    document.getElementById("previous").addEventListener("click", function () {
      currentTrackIndex--;
      if (currentTrackIndex < 0) {
        currentTrackIndex = playlistCount - 1;
      }
      audioPlayer.pause();
      audioPlayer = playTrack(currentTrackIndex);
      document.getElementById("play-pause").innerHTML =
        "<i class='fas fa-pause'></i>";
    });
  }
};

xhr.open("GET", "playlist.xml", true);
xhr.send();
