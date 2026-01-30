const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const cardsGrid = document.querySelector(".row.g-3");

const container = document.getElementById("tracks-row");

// function to play TRACK
const playerTrackCoverMobile = document.getElementById("playing-track-cover-mobile");
const playerTrackCoverDesktop = document.getElementById("playing-track-cover-desktop");
const playerTrackTitleMobile = document.querySelector(".playing-track-title-mobile");
const playerTrackTitleMobile2 = document.querySelector(".playing-track-title-mobile2");
const playerTrackTitleDesktop = document.querySelector(".playing-track-title-desktop");
const playerTrackTitleDesktop2 = document.querySelector(".playing-track-title-desktop2");
const playerTrackArtist = document.getElementById("playing-track-artist");
const progressInput = document.getElementById("progressInput");
const volumeInput = document.getElementById("volumeInput");
const mobileBtnStart = document.getElementById("mobile-btn-start");
const playerMusic = document.querySelectorAll(".playerMusic");
const playerI = document.querySelector(".playerI");
const secondiPassati = document.querySelector(".secondiPassati");
let artist = ["Queen", "coldplay", "geolier", "mariomerola", "tonypitony", "radiohead"];
let random = [];
let arrayTracks = [];
let counter = 0;
let audio = null;

const startAudio = (track) => {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  audio = new Audio(track);
  audio.volume = 0.5;

  audio.addEventListener("loadedmetadata", () => {
    progressInput.max = audio.duration;
    secondiPassati.innerText = "0:00";
  });

  audio.addEventListener("timeupdate", () => {
    progressInput.value = audio.currentTime;

    const m = Math.floor(audio.currentTime / 60);
    const s = Math.floor(audio.currentTime % 60);
    secondiPassati.innerText = `${m}:${String(s).padStart(2, "0")}`;
  });

  volumeInput.addEventListener("input", () => {
    audio.volume = volumeInput.value / 100;
  });

  progressInput.addEventListener("input", () => {
    audio.currentTime = progressInput.value;
  });

  audio.play();
};
playerMusic.forEach((e) => {
  e.addEventListener("click", () => {
    console.log("ciao");
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    playerI.classList.toggle("playerOnOff");
    mobileBtnStart.classList.toggle("playerOnOff");
  });
});

const playTrack = function (element) {
  playerTrackCoverMobile.src = element.album.cover_small;
  playerTrackCoverDesktop.src = element.album.cover_small;
  playerTrackTitleMobile.innerText = ` ${element.title}`;
  playerTrackTitleMobile2.innerText = `${element.title}`;
  playerTrackTitleDesktop.innerText = `${element.title}`;
  playerTrackTitleDesktop2.innerText = `${element.title}`;
  playerTrackArtist.innerText = `${element.artist.name}`;
  localStorage.setItem("savedTrack", JSON.stringify(element));
};
// function to GET TRACK from LOCAL STORAGE and play it
const playSavedTrack = function () {
  const trackOnLocalStorage = JSON.parse(localStorage.getItem("savedTrack"));
  playerTrackCoverMobile.src = trackOnLocalStorage.album.cover_small;
  playerTrackCoverDesktop.src = trackOnLocalStorage.album.cover_small;
  playerTrackTitleMobile.innerText = `${trackOnLocalStorage.title}`;
  playerTrackTitleDesktop.innerText = `${trackOnLocalStorage.title}`;
  playerTrackTitleMobile2.innerText = `${trackOnLocalStorage.title}`;
  playerTrackTitleDesktop2.innerText = `${trackOnLocalStorage.title}`;
  playerTrackArtist.innerText = `${trackOnLocalStorage.artist.name}`;
  console.log(trackOnLocalStorage);
  startAudio(trackOnLocalStorage.preview);
};

playSavedTrack();

let timeout = null;
searchInput.addEventListener("keyup", () => {
  clearTimeout(timeout);

  const query = searchInput.value.trim();

  if (query.length < 2) {
    resetView();
    return;
  }

  timeout = setTimeout(() => {
    handleSearch(query);
  }, 500);
});
async function fetchTracks(query) {
  const res = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`);
  const data = await res.json();
  console.log(data);
  return data.data;
}
async function handleSearch(query) {
  try {
    cardsGrid.style.display = "none";
    searchResults.innerHTML = "";

    for (let i = 0; i < 8; i++) {
      searchResults.appendChild(createTrackPlaceholder());
    }

    const tracks = await fetchTracks(query);

    searchResults.innerHTML = "";

    showSearchResults(tracks);
    const allTracksOnPage = document.querySelectorAll(".track");
    allTracksOnPage.forEach((trackOnPage, i) => {
      trackOnPage.addEventListener("click", () => {
        playTrack(tracks[i]);
        startAudio(tracks[i].preview);
        playerI.classList.add("playerOnOff");
        mobileBtnStart.classList.add("playerOnOff");
      });
    });
  } catch (error) {
    console.error("Errore nella ricerca:", error);
  }
}
searchResults.innerHTML = "";
function resetView() {
  searchResults.innerHTML = "";
  cardsGrid.style.display = "flex";
}
function showSearchResults(tracks) {
  cardsGrid.style.display = "none";
  searchResults.innerHTML = "";

  const fragment = document.createDocumentFragment();

  tracks.slice(0, 24).forEach((track) => {
    console.log("ID TRACK:", track.id);
    console.log("ID ARTISTA:", track.artist.id);
    console.log("ID ALBUM:", track.album.id);
    fragment.appendChild(createTrackCard(track));
  });

  searchResults.appendChild(fragment);
}
function createTrackCard(track) {
  const col = document.createElement("div");
  col.className = "col-6 col-md-4 col-lg-3 track";

  col.innerHTML = `
    <div class="bg-dark rounded p-2 h-100">

      
      <a href="./albumpage.html?albumID=${track.album.id}">
        <img
          src="${track.album.cover_medium}"
          class="img-fluid rounded mb-2"
          alt="${track.title}"
        />
      </a>

      
      <div
        class="fw-semibold small text-truncate track-title"
        role="button"
        style="cursor: pointer"
      >
        ${track.title}
      </div>
     
      <a
        href="./artistpage.html?artistID=${track.artist.id}"
        class="small opacity-75 text-decoration-none text-white text-truncate d-block"
      >
        ${track.artist.name}
      </a>

    </div>
  `;
  // col.querySelector(".track-title").addEventListener("click", (e) => {
  //       playTrack(track);
  //       startAudio(track.preview);
  //       playerI.classList.add("playerOnOff");
  //       mobileBtnStart.classList.add("playerOnOff");
  //     });
  // col.querySelector(".track-title").addEventListener("click", (e) => {
  //   e.stopPropagation();
  //   updatePlayer(track);
  // });
  return col;
}

function createTrackPlaceholder() {
  const col = document.createElement("div");
  col.className = "col-6 col-md-4 col-lg-3";

  col.innerHTML = `
    <div class="bg-dark rounded p-2 h-100 placeholder-glow opacity-50">
      <div class="ratio ratio-1x1 mb-2">
        <div class="placeholder col-12"></div>
      </div>

      <span class="placeholder col-10 d-block mb-1"></span>
      <span class="placeholder col-7 d-block"></span>
    </div>
  `;

  return col;
}

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();

  if (query.length < 2) {
    resetView();
    return;
  }

  handleSearch(query);
});

// function updatePlayer(track) {
//   document.getElementById("playing-track-cover-mobile").src = track.album.cover_small;
//   document.getElementById("playing-track-title-mobile").textContent = track.title;

//   document.getElementById("playing-track-cover-desktop").src = track.album.cover_small;
//   document.getElementById("playing-track-title-desktop").textContent = track.title;
//   document.getElementById("playing-track-artist").textContent = track.artist.name;

//   localStorage.setItem(
//     "currentTrack",
//     JSON.stringify({
//       title: track.title,
//       artist: track.artist.name,
//       cover: track.album.cover_small,
//     }),
//   );
// }

// // DA METTERE IN TUTTI I JS INIZIO
// function loadPlayerFromStorage() {
//   const savedTrack = localStorage.getItem("currentTrack");
//   if (!savedTrack) return;

//   const track = JSON.parse(savedTrack);

//   document.getElementById("playing-track-cover-mobile").src = track.cover;
//   document.getElementById("playing-track-title-mobile").textContent = track.title;

//   document.getElementById("playing-track-cover-desktop").src = track.cover;
//   document.getElementById("playing-track-title-desktop").textContent = track.title;
//   document.getElementById("playing-track-artist").textContent = track.artist;
// }
// document.addEventListener("DOMContentLoaded", loadPlayerFromStorage);
// // FINE PARTE IN COMUNE
