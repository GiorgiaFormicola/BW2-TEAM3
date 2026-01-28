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
  col.className = "col-6 col-md-4 col-lg-3 col-xl-2";

  col.innerHTML = `
    <div class="bg-dark rounded p-2 h-100">

      
      <a href="./albumpage.html?albumID=${track.album.id}">
        <img
          src="${track.album.cover_medium}"
          class="img-fluid rounded mb-2"
          alt="${track.title}"
        />
      </a>

      
      <div class="fw-semibold small text-truncate">
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
  return col;
}
