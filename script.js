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

    function playMusic() {
      audioPlayer.play();
      document.getElementById("play-pause").innerHTML =
        "<i class='fas fa-pause'></i>";
    }

    function pauseMusic() {
      audioPlayer.pause();
      document.getElementById("play-pause").innerHTML =
        "<i class='fas fa-play'></i>";
    }

    document.getElementById("play-pause").addEventListener("click", function () {
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
        document.getElementById("song-cover").src = track.getElementsByTagName("images")[0].childNodes[0].nodeValue;
        document.getElementById("song-title").textContent = track.getElementsByTagName("name")[0].childNodes[0].nodeValue;
        document.getElementById("song-artist").textContent = track.getElementsByTagName("artist")[0].childNodes[0].nodeValue;
        audioPlayer.src = track.getElementsByTagName("file")[0].childNodes[0].nodeValue;
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
        document.getElementById("play-pause").innerHTML = "<i class='fas fa-pause'></i>";
      });
      
      document.getElementById("previous").addEventListener("click", function () {
        currentTrackIndex--;
        if (currentTrackIndex < 0) {
          currentTrackIndex = playlistCount - 1;
        }
        audioPlayer.pause();
        audioPlayer = playTrack(currentTrackIndex);
        document.getElementById("play-pause").innerHTML = "<i class='fas fa-pause'></i>";
      });
      
  }
};

xhr.open("GET", "playlist.xml", true);
xhr.send();
