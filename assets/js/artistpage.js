const windowURL = location.search;
const allTheParameters = new URLSearchParams(windowURL);
const artistID = allTheParameters.get("artistID");

const tracklistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistID + "/top?limit=20";
const artistEndPoint = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistID;

const tracksRowMob = document.getElementById("tracks-row-mob");
const tracksRowDesk = document.getElementById("tracks-row-desk");
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

// function to play TRACK and SAVE on LOCAL STORAGE
const playerTrackCoverMobile = document.getElementById("playing-track-cover-mobile");
const playerTrackCoverDesktop = document.getElementById("playing-track-cover-desktop");
const playerTrackTitleMobile = document.getElementById("playing-track-title-mobile");
const playerTrackTitleDesktop = document.getElementById("playing-track-title-desktop");
const playerTrackArtist = document.getElementById("playing-track-artist");

const playNewTrack = function (element) {
  playerTrackCoverMobile.src = element.album.cover_small;
  playerTrackCoverDesktop.src = element.album.cover_small;
  playerTrackTitleMobile.innerText = `${element.title}`;
  playerTrackTitleDesktop.innerText = `${element.title}`;
  playerTrackArtist.innerText = `${element.artist.name}`;
  localStorage.setItem("savedTrack", JSON.stringify(element));
};

// function to GET TRACK from LOCAL STORAGE and play it
const playTrack = function () {
  const trackOnLocalStorage = JSON.parse(localStorage.getItem("savedTrack"));
  playerTrackCoverMobile.src = trackOnLocalStorage.album.cover_small;
  playerTrackCoverDesktop.src = trackOnLocalStorage.album.cover_small;
  playerTrackTitleMobile.innerText = `${trackOnLocalStorage.title}`;
  playerTrackTitleDesktop.innerText = `${trackOnLocalStorage.title}`;
  playerTrackArtist.innerText = `${trackOnLocalStorage.artist.name}`;
  console.log(trackOnLocalStorage);
};

playTrack();

// function to add event listener ACCORDING TO TRACKS ON PAGE
// const addEventOnTracksOnPageDesk = function () {
//   const allTracksOnPage = document.querySelectorAll(".desk-track");
//   console.log(allTracksOnPage);
//   allTracksOnPage.forEach((track, i) => {
//     track.addEventListener("click", () => console.log("TRACCIA" + (i + 1) + "CLICCATA"));
//   });
// };

// function to create TRACKS
// const createTrackDesk = (track, index) => {
//   return `<div class="desk-track col col-6 d-flex align-items-center justify-content-start ps-4">
//                   <div class="d-flex align-items-center gap-3 ps-1">
//                     <h6 class="fs-6 fw-normal opacity-75 text-end mb-0 me-1" style="width: 1.2em" id="song-num-desk">${index + 1}</h6>
//                     <div class="d-flex align-items-center gap-3">
//                       <a href="./albumpage.html?albumID=${track.album.id}">
//                       <img
//                         src="${track.album.cover_small}"
//                         alt="song-img"
//                         class="object-fit-cover rounded-1"
//                         width="40"
//                         height="40"
//                         id="song-img-desk"
//                       />
//                       </a>
//                       <h4 class="fs-6 mb-0 fw-normal text-light" id="song-name-desk">${track.title_short}</h4>
//                     </div>
//                   </div>
//                 </div>
//                 <div class="col col-4 text-end">
//                   <p class="m-0 opacity-75" id="song-listeners-desk"># ${track.rank}</p>
//                 </div>
//                 <div class="col col-2 text-end">
//                   <p class="m-0 opacity-75" id="song-duration">${displayDurationShortVersion(track.duration)}</p>
//                 </div>`;
// };

// const createTrackMobile = (track, index) => {
//   return `<div class="track col d-flex px-4 align-items-center justify-content-between">
//             <div class="d-flex align-items-center gap-3">
//               <p class="mb-0 fs-5 text-end fw-semibold" style="width: 1.2em" id="song-num-mobile">${index + 1}</p>
//                <a href="./albumpage.html?albumID=${track.album.id}">
//               <img
//                 src="${track.album.cover_small}"
//                 alt="song-img"
//                 class="object-fit-cover rounded-1 ms-3"
//                 width="80"
//                 height="80"
//                 id="song-img-mobile"
//               />
//               </a>
//               <div class="d-flex flex-column">
//                 <h3 class="mb-0 text-light fw-medium fs-4" id="song-name-mobile">${track.title_short}</h3>
//                 <p class="mb-0 text-light opacity-75 fs-5" id="song-listeners-mobile"># ${track.rank}</p>
//               </div>
//             </div>
//             <i class="bi bi-three-dots-vertical fs-1"></i>
//             </div>`;
// };

const getArtistInfos = () => {
  fetch(artistEndPoint)
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
    })
    .catch((err) => {
      console.log(err);
    });
};

getArtistInfos();
// 99248

const getTrackList = () => {
  fetch(tracklistUrl)
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
        tracksRowMob.innerHTML += `
        <div class="track-mob col d-flex px-4 align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-3">
              <p class="mb-0 fs-5 text-end fw-semibold song-num-mobile" style="width: 1.2em">${i + 1}</p>
              <a href="./albumpage.html?albumID=${track.album.id}">
              <img
                src="${track.album.cover_small}"
                alt="song-img"
                class="object-fit-cover rounded-1 ms-3 song-img-mobile"
                width="80"
                height="80"
              
              />
              </a>
              <div class="d-flex flex-column">
                <h3 class="mb-0 text-light fw-medium fs-4 song-name-mobile">${track.title_short}</h3>
                <p class="mb-0 text-light opacity-75 fs-5 song-listeners-mobile"># ${track.rank}</p>
              </div>
            </div>
            <i class="bi bi-three-dots-vertical fs-1"></i>
        </div>`;

        tracksRowDesk.innerHTML += `
                <div class="track-desk1 col col-10 col-xxl-6 d-flex align-items-center justify-content-start ps-4">
                  <div class="d-flex align-items-center gap-3 ps-1">
                    <h6 class="fs-6 fw-normal opacity-75 text-end mb-0 me-1 song-num-desk" style="width: 1.2em" >${i + 1}</h6>
                    <div class="d-flex align-items-center gap-3">
                     <a href="./albumpage.html?albumID=${track.album.id}">
                      <img
                        src="${track.album.cover_small}"
                        alt="song-img"
                        class="object-fit-cover rounded-1 song-img-desk"
                        width="40"
                        height="40"
                       
                      />
                      </a>
                      <h4 class="fs-6 mb-0 fw-normal text-light song-name-desk">${track.title_short}</h4>
                    </div>
                  </div>
                </div>
                <div class="track-desk2 col col-4 text-end d-none d-xxl-block">
                  <p class="m-0 opacity-75 song-listeners-desk"># ${track.rank}</p>
                </div>
                <div class="track-desk3 col col-1 col-xxl-2 text-end">
                  <p class="m-0 opacity-75 song-duration">${displayDurationShortVersion(track.duration)}</p>
                </div>
            `;
      });

      const mobShowMoreButton = document.getElementById("show-more-mob");
      const allMobTracksTitles = document.querySelectorAll(".song-name-mobile");
      const allMobTracksLoaded = document.querySelectorAll(".track-mob");
      allMobTracksLoaded.forEach((trackLoaded, i) => {
        allMobTracksTitles[i].addEventListener("click", () => playNewTrack(tracksArray.data[i]));
        if (i >= 10) {
          trackLoaded.classList.add("visually-hidden");
        }
      });

      mobShowMoreButton.addEventListener("click", () => {
        allMobTracksLoaded.forEach((trackLoaded, i) => {
          if (i >= 10) {
            trackLoaded.classList.toggle("visually-hidden");
          }
        });
        if (mobShowMoreButton.innerHTML === `<span class="fs-5">VISUALIZZA ALTRO</span>`) {
          mobShowMoreButton.innerHTML = `<span class="fs-5">VISUALIZZA MENO</span>`;
        } else {
          mobShowMoreButton.innerHTML = `<span class="fs-5">VISUALIZZA ALTRO</span>`;
        }
      });

      const deskShowMoreButton = document.getElementById("show-more-desk");
      const allDeskTracksTitles = document.querySelectorAll(".song-name-desk");
      const allDeskTracksLoaded1 = document.querySelectorAll(".track-desk1");
      const allDeskTracksLoaded2 = document.querySelectorAll(".track-desk2");
      const allDeskTracksLoaded3 = document.querySelectorAll(".track-desk3");
      allDeskTracksLoaded1.forEach((trackLoaded1, i) => {
        allDeskTracksTitles[i].addEventListener("click", () => playNewTrack(tracksArray.data[i]));
        if (i >= 10) {
          trackLoaded1.classList.add("visually-hidden");
          allDeskTracksLoaded2[i].classList.add("visually-hidden");
          allDeskTracksLoaded3[i].classList.add("visually-hidden");
        }
      });

      deskShowMoreButton.addEventListener("click", () => {
        allDeskTracksLoaded1.forEach((trackLoaded1, i) => {
          if (i >= 10) {
            trackLoaded1.classList.toggle("visually-hidden");
            allDeskTracksLoaded2[i].classList.toggle("visually-hidden");
            allDeskTracksLoaded3[i].classList.toggle("visually-hidden");
          }
        });
        if (deskShowMoreButton.innerText === "VISUALIZZA ALTRO") {
          deskShowMoreButton.innerText = "VISUALIZZA MENO";
        } else {
          deskShowMoreButton.innerText = "VISUALIZZA ALTRO";
        }
      });
    })
    .catch((err) => {
      console.log("test", err);
    });
};

// let allTracks = [];

// const getTrackList = () => {
//   fetch(tracklistUrl)
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       } else {
//         throw new Error("GIGA PROBLEMI");
//       }
//     })
//     .then((tracksArray) => {
//       console.log(tracksArray);
//       allTracks = tracksArray.data;
//       tracksArray.data.slice(0, 10).forEach((track, index) => {
//         tracksRowMob.innerHTML += createTrackMobile(track, index);
//         tracksRowDesk.innerHTML += createTrackDesk(track, index);
//       });
//       addEventOnTracksOnPageDesk();
//     })
//     .catch((err) => {
//       console.log("UN MACELLO", err);
//     });
// };

getTrackList();

// //SHOW MORE BUTTONS
// const allMobTracksLoaded = document.querySelectorAll(".track-mob");
// const allDeskTracksLoaded = document.querySelectorAll(".track-desk");

// mobShowMoreButton.addEventListener("click", () => {
//   allMobTracksLoaded.forEach((trackLoaded, i) => {
//     if (i >= 0) {
//       trackLoaded.classList.toggle("d-none");
//     }
//   });
// });

// let showAll = false;
// mobShowMoreButton.addEventListener("click", () => {
//   if (!showAll) {
//     let allTheHtmlMob = "";
//     // se non le vedo tutte - MOSTRA TUTTO
//     allTracks.forEach((track, i) => {
//       allTheHtmlMob += createTrackMobile(track, i);
//     });
//     tracksRowMob.innerHTML = allTheHtmlMob;
//     mobShowMoreButton.textContent = "VISUALIZZA MENO";
//     showAll = true;
//   } else {
//     let allTheHtmlMob = "";
//     // se le vedo tutte - MOSTRA MENO
//     // FACCIO LO SLICE
//     allTracks.slice(0, 10).forEach((track, i) => {
//       allTheHtmlMob += createTrackMobile(track, i);
//     });
//     tracksRowMob.innerHTML = allTheHtmlMob;
//     mobShowMoreButton.textContent = "VISUALIZZA ALTRO";
//     showAll = false;
//   }
// });

// deskShowMoreButton.addEventListener("click", () => {
//   if (!showAll) {
//     let allTheHtmlDesk = "";

//     // se non le vedo tutte - MOSTRA TUTTO

//     allTracks.forEach((track, i) => {
//       allTheHtmlDesk += createTrackDesk(track, i);
//     });
//     tracksRowDesk.innerHTML = allTheHtmlDesk;

//     deskShowMoreButton.textContent = "VISUALIZZA MENO";
//     showAll = true;
//   } else {
//     let allTheHtmlDesk = "";

//     // se le vedo tutte - MOSTRA MENO
//     // FACCIO LO SLICE

//     allTracks.slice(0, 10).forEach((track, i) => {
//       allTheHtmlDesk += createTrackDesk(track, i);
//     });
//     tracksRowDesk.innerHTML = allTheHtmlDesk;

//     deskShowMoreButton.textContent = "VISUALIZZA ALTRO";
//     showAll = false;
//   }
// });
