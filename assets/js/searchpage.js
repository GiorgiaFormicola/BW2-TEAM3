const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const cardsGrid = document.querySelector(".row.g-3");

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

  tracks.slice(0, 12).forEach((track) => {
    fragment.appendChild(createTrackCard(track));
  });

  searchResults.appendChild(fragment);
}
function createTrackCard(track) {
  const col = document.createElement("div");
  col.className = "col-6 col-md-4 col-lg-3 col-xl-2";

  col.innerHTML = `
    <div class="bg-dark rounded p-2 h-100">
      <img src="${track.album.cover_medium}"
           class="img-fluid rounded mb-2"
           alt="${track.title}">
      <div class="fw-semibold small text-truncate">
        ${track.title}
      </div>
      <div class="small opacity-75 text-truncate">
        ${track.artist.name}
      </div>
    </div>
  `;

  return col;
}
