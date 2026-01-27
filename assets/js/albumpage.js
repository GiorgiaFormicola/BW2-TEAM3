console.log("Hello world!");
const URL = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const albumID = "75621062";

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
const albumArtist = document.getElementById("album-artist");
const albumReleaseMobile = document.getElementById("album-release-mobile");
const albumReleaseDesktop = document.getElementById("album-release-desktop");
const albumTracks = document.getElementById("album-tracks");
const albumDuration = document.getElementById("album-duration");

const showAlbumInfos = function (element) {
  albumCover.src = element.cover_xl;
  albumTitle.innerText = element.title;
  albumArtistPicture.src = element.artist.picture_small;
  albumArtist.innerText = element.artist.name;
  albumReleaseMobile.innerText = element.release_date.slice(0, 4);
  albumReleaseDesktop.innerText = element.release_date.slice(0, 4);
  albumTracks.innerText = element.tracks.data.length;
  albumDuration.innerText = displayDurationLongVersion(element.duration);
};

// function to create a TRACK CARD

const tracksContainer = document.getElementById("tracks-container");
const showAlbumTracks = function (element) {
  const albumTracksArray = element.tracks.data;
  albumTracksArray.forEach((track, i) => {
    tracksContainer.innerHTML += `
    <div class="col col-12 col-lg-7 d-flex align-items-center justify-content-between justify-content-lg-start gap-lg-3">
          <div class="d-lg-flex align-items-center gap-lg-3">
            <h6 class="ps-1 my-0 d-none d-lg-block opacity-50 text-end" style="width: 1.2em">${i + 1}</h6>
            <div>
              <h4 class="fw-semibold mb-1">${track.title_short}}</h4>
              <p class="text-muted">${track.artist.name}</p>
            </div>
          </div>
          <i class="bi bi-three-dots-vertical fs-1 opacity-50 d-lg-none"></i>
        </div>
        <div class="col col-2 text-end d-none d-lg-block">
          <p class="my-0 opacity-50">694.578</p>
        </div>
        <div class="col col-2 text-end offset-lg-1 d-none d-lg-block pe-5">
          <p class="my-0 opacity-50">${displayDurationShortVersion(track.duration)}</p>
        </div>
    `;
  });
};

// function to get ALBUM INFOS

const getAlbumInfos = function (albumID) {
  fetch(URL + albumID)
    .then((response) => {
      if (response.ok) {
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

getAlbumInfos("75621062");
