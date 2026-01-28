const windowURL = location.search;
const allTheParameters = new URLSearchParams(windowURL);
const artistID = allTheParameters.get("artistID");

const tracksRowMob = document.getElementById("tracks-row-mob");
const tracksRowDesk = document.getElementById("tracks-row-desk");

const artistEndPoint = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const tracklistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistID + "/top?limit=50";
// COMMON ELEMENTS - MAIN PIC - MAIN NAME
const artPic = document.getElementById("artist-pic");
const artName = document.getElementById("artist-name");
// MOBILE ELEMENTS - LIKED TRACKS
const mobLikedName = document.getElementById("liked-artist-name-mobile");
const mobLikedPic = document.getElementById("liked-pic-mobile");
const mobFans = document.getElementById("fans-mob");
// MOBILE SONGS CARD
const mobSongNum = document.getElementById("song-num-mobile");
const mobSongImg = document.getElementById("song-img-mobile");
const mobSongName = document.getElementById("song-name-mobile");
const mobSongListeners = document.getElementById("song-listeners-mobile");
// DESKTOP SONGS CARD
const deskSongNum = document.getElementById("song-num-desk");
const deskSongImg = document.getElementById("song-img-desk");
const deskSongName = document.getElementById("song-name-desk");
const deskSongListeners = document.getElementById("song-listeners-desk");
const deskSongDuration = document.getElementById("song-duration");
// DESKTOP ELEMENTS - LIKED TRACKS
const deskLikedPic = document.getElementById("liked-pic-desk");
const deskLikedName = document.getElementById("liked-artist-name-desk");
const deskFans = document.getElementById("fans-desk");

// DISPLAY DURATION
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

const getArtistInfos = (id) => {
  fetch(artistEndPoint + id)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("TANTISSIMI PROBLEMI");
      }
    })
    .then((artista) => {
      console.log(artista);
      deskLikedPic.src = artista.picture_big;
      mobLikedPic.src = artista.picture_big;
      deskLikedName.innerText = artista.name;
      mobLikedName.innerText = artista.name;
      artName.innerText = artista.name;
      artPic.src = artista.picture_xl;
      mobFans.innerText = artista.nb_fan.toString().slice(-8);
      deskFans.innerText = artista.nb_fan.toString().slice(-8);
      //   NOME ARTISTA
      // NUMERI FAN
      // PIC ARTISTA
    })
    .catch((err) => {
      console.log(err);
    });
};

getArtistInfos(412);
// 99248

const getTrackList = () => {
  fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/412/top?limit=50")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("MADONNA MIAAA");
      }
    })
    .then((tracksArray) => {
      console.log(tracksArray);
      tracksArray.data.forEach((track, i) => {
        tracksRowMob.innerHTML += `<div class="col col-12 d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <p class="mb-0 fs-5 text-end" style="width: 1.2em"" id="song-num-mobile">${i + 1}</p>
                  <img
                    src="${track.album.cover_small}"
                    alt="song-img"
                    class="object-fit-cover rounded-1 ms-4"
                    width="70"
                    height="70"
                    id="song-img-mobile"
                  />
                  <div class="mx-3 d-flex flex-column justify-content-center">
                    <h3 class="mb-0 fw-normal" id="song-name-mobile">${track.title_short}</h3>
                    <p class="mb-0 text-light opacity-75 fs-5" id="song-listeners-mobile"># ${track.rank}</p>
                  </div>
                </div>
                <i class="bi bi-three-dots-vertical fs-4"></i>
              </div>`;

        tracksRowDesk.innerHTML += `<div class="col col-7 d-flex align-items-center justify-content-start">
                  <div class="d-flex align-items-center gap-4">
                    <h6 class="fs-6 opacity-75 text-end mb-0" style="width: 1.2em" id="song-num-desk">${i + 1}</h6>
                    <div class="d-flex align-items-center gap-3">
                      <img
                        src="${track.album.cover_small}"
                        alt="song-img"
                        class="object-fit-cover rounded-1"
                        width="50"
                        height="50"
                        id="song-img-desk"
                      />
                      <h4 class="fs-6 mb-0" id="song-name-desk">${track.title_short}</h4>
                    </div>
                  </div>
                </div>
                <div class="col col-2 text-end">
                  <p class="m-0 opacity-75" id="song-listeners-desk"># ${track.rank}</p>
                </div>
                <div class="col col-2 text-end offset-1">
                  <p class="m-0 opacity-75" id="song-duration">${displayDurationShortVersion(track.duration)}</p>
                </div>`;
      });
    })
    .catch((err) => {
      console.log("test", err);
    });
};

getTrackList();

// FETCH SU TRACKLIST "https://striveschool-api.herokuapp.com/api/deezer/artist/412/top?limit=50"
// TITLE
// DURATION
// PICTURE ALBUM
//
