const apiURL = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const windowURL = location.search;
const allTheParameters = new URLSearchParams(windowURL);
const albumID = allTheParameters.get("albumID");

// functions to display DURATION
const displayDurationLongVersion = function (duration) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);
  let formattedDuration;
  if ((hours === 0) & (minutes === 0)) {
    formattedDuration = `${seconds} sec`;
  } else if (hours === 0) {
    formattedDuration = `${minutes} min ${seconds} sec`;
  } else {
    formattedDuration = `${hours} h ${minutes} min ${seconds} sec`;
  }
  return formattedDuration;
};

const displayDurationShortVersion = function (duration) {
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);
  let formattedDuration;
  if (seconds.toString().length === 1) {
    formattedDuration = `${minutes}:${seconds}0`;
  } else {
    formattedDuration = `${minutes}:${seconds}`;
  }
  return formattedDuration;
};

//function to show ALBUM INFOS
const albumCover = document.getElementById("album-cover");
const albumTitle = document.getElementById("album-title");
const albumArtistPicture = document.getElementById("album-artist-picture");
const albumArtistLink = document.getElementById("album-artist-link");
const albumReleaseMobile = document.getElementById("album-release-mobile");
const albumReleaseDesktop = document.getElementById("album-release-desktop");
const albumTracks = document.getElementById("album-tracks");
const albumDuration = document.getElementById("album-duration");

const showAlbumInfos = function (element) {
  albumCover.src = element.cover_xl;
  albumTitle.innerText = element.title;
  albumArtistPicture.src = element.artist.picture_small;
  albumArtistLink.innerText = element.artist.name;
  albumArtistLink.href = `./artistpage.html?artistID=${element.artist.id}`;
  albumReleaseMobile.innerText = element.release_date.slice(0, 4);
  albumReleaseDesktop.innerText = element.release_date.slice(0, 4);
  albumTracks.innerText = element.tracks.data.length;
  albumDuration.innerText = displayDurationLongVersion(element.duration);
};

// function to play TRACK
const playerTrackCoverMobile = document.getElementById("playing-track-cover-mobile");
const playerTrackCoverDesktop = document.getElementById("playing-track-cover-desktop");
const playerTrackTitleMobile = document.getElementById("playing-track-title-mobile");
const playerTrackTitleDesktop = document.getElementById("playing-track-title-desktop");
const playerTrackArtist = document.getElementById("playing-track-artist");

const playTrack = function (element) {
  playerTrackCoverMobile.src = element.album.cover_small;
  playerTrackCoverDesktop.src = element.album.cover_small;
  playerTrackTitleMobile.innerText = `${element.title}`;
  playerTrackTitleDesktop.innerText = `${element.title}`;
  playerTrackArtist.innerText = `${element.artist.name}`;
};

// function to show ALBUM TRACKS
const tracksContainer = document.getElementById("tracks-container");
const showAlbumTracks = function (element) {
  const albumTracksArray = element.tracks.data;
  albumTracksArray.forEach((track, i) => {
    tracksContainer.innerHTML += `
    <div id="track${i + 1}" class="track col col-12 col-lg-7 d-flex align-items-center justify-content-between justify-content-lg-start gap-lg-3">
          <div class="d-lg-flex align-items-center gap-lg-3">
            <h6 class="ps-1 my-0 d-none d-lg-block opacity-50 text-end" style="width: 1.2em">${i + 1}</h6>
            <div>
              <h4 class="fw-semibold mb-1">${track.title_short}</h4>
              <a href="./artistpage.html?artistID=${track.artist.id}" class="link-light link-opacity-50 link-underline-opacity-0">${track.artist.name}</a>
            </div>
          </div>
          <i class="bi bi-three-dots-vertical fs-1 opacity-50 d-lg-none"></i>
        </div>
        <div class="col col-2 text-end d-none d-lg-block">
          <p class="my-0 opacity-50"># ${track.rank}</p>
        </div>
        <div class="col col-2 text-end offset-lg-1 d-none d-lg-block pe-5">
          <p class="my-0 opacity-50">${displayDurationShortVersion(track.duration)}</p>
        </div>
    `;
  });

  const allTracksOnPage = document.querySelectorAll(".track");
  allTracksOnPage.forEach((trackOnPage, i) => {
    trackOnPage.addEventListener("click", () => playTrack(albumTracksArray[i]));
  });
};

//function to REMOVE PLACEHOLDERS
const albumArtistName = document.getElementById("album-artist-name");
const albumLabel = document.getElementById("album-label");
const albumInfoLabel = document.getElementById("album-info-label");
const removePlaceholders = function () {
  const allPlaceholders = document.querySelectorAll(".placeholder");
  allPlaceholders.forEach((placeholder) => placeholder.classList.add("d-none"));
  albumCover.classList.remove("d-none");
  albumArtistPicture.classList.remove("d-none");
  albumArtistName.classList.remove("d-none");
  albumLabel.classList.remove("d-none");
  albumInfoLabel.classList.remove("d-none");
};

// function to get ALBUM INFOS
const getAlbumInfos = function (ID) {
  fetch(apiURL + ID)
    .then((response) => {
      if (response.ok) {
        removePlaceholders();
        return response.json();
      } else {
        throw new Error("Error in getting the album infos");
      }
    })
    .then((album) => {
      console.log(album);
      showAlbumInfos(album);
      showAlbumTracks(album);
    })
    .catch((error) => {
      console.log("Error", error);
    });
};

getAlbumInfos(albumID);
