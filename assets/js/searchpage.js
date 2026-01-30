const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const cardsGrid = document.querySelector(".row.g-3");
let audioPlayer = new Audio();
let isPlaying = false;

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
    const tracks = await fetchTracks(query);
    showSearchResults(tracks);
  } catch (error) {
    console.error("Errore nella ricerca:", error);
  }
}
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
  col.className = "col-6 col-md-4 col-lg-3 ";

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
  col.querySelector(".track-title").addEventListener("click", (e) => {
    e.stopPropagation();
    updatePlayer(track);
  });
  return col;
}
function updatePlayer(track) {
  document.getElementById("playing-track-cover-mobile").src = track.album.cover_small;
  document.getElementById("playing-track-title-mobile").textContent = track.title;

  document.getElementById("playing-track-cover-desktop").src = track.album.cover_small;
  document.getElementById("playing-track-title-desktop").textContent = track.title;
  document.getElementById("playing-track-artist").textContent = track.artist.name;

  localStorage.setItem(
    "currentTrack",
    JSON.stringify({
      title: track.title,
      artist: track.artist.name,
      cover: track.album.cover_small,
    }),
  );
  // PER IL PLAY
  audioPlayer.src = track.preview;
  audioPlayer.play();
  isPlaying = true;
  updatePlayIcons(true);
}

// DA METTERE IN TUTTI I JS INIZIO
function loadPlayerFromStorage() {
  const savedTrack = localStorage.getItem("currentTrack");
  if (!savedTrack) return;

  const track = JSON.parse(savedTrack);

  document.getElementById("playing-track-cover-mobile").src = track.cover;
  document.getElementById("playing-track-title-mobile").textContent = track.title;

  document.getElementById("playing-track-cover-desktop").src = track.cover;
  document.getElementById("playing-track-title-desktop").textContent = track.title;
  document.getElementById("playing-track-artist").textContent = track.artist;
}
document.addEventListener("DOMContentLoaded", loadPlayerFromStorage);
// FINE PARTE IN COMUNE

// PER FAR FUNZIONARE IL PLAY
function togglePlay() {
  if (!audioPlayer.src) return;

  if (isPlaying) {
    audioPlayer.pause();
    isPlaying = false;
    updatePlayIcons(false);
  } else {
    audioPlayer.play();
    isPlaying = true;
    updatePlayIcons(true);
  }
}

function updatePlayIcons(playing) {
  const mobile = document.getElementById("play-btn-mobile");
  const desktop = document.getElementById("play-btn-desktop");

  if (!mobile || !desktop) return;

  if (playing) {
    mobile.className = "bi bi-pause-fill";
    desktop.className = "bi bi-pause-circle-fill fs-2 text-white mx-1";
  } else {
    mobile.className = "bi bi-play-fill";
    desktop.className = "bi bi-play-circle-fill fs-2 text-white mx-1";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("play-btn-mobile")?.addEventListener("click", togglePlay);

  document.getElementById("play-btn-desktop")?.addEventListener("click", togglePlay);
});

// FINE FUNZIONE PLAYER
