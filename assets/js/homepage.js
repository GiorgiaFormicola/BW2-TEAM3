const cards = document.querySelector("#cards");

let artist = ["Queen", "coldplay", "geolier", "mariomerola", "tonypitony"];
let random = [];

const randomNumber = () => {
  const number = Math.floor(Math.random() * 5);
  return number;
};

const numbers = () => {
  for (let i = 0; i < 5; i++) {
    let number = randomNumber();
    while (random.includes(number)) {
      number = randomNumber();
    }
    random.push(number);
  }
};
numbers();
const getArtist = () => {
  for (let i = 0; i < 5; i++) {
    console.log(artist[i]);
    getSlides(artist[random[i]]);
    console.log(random);
  }
};
const getSlides = (artist) => {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else throw new Error("errore nel caricamento dati");
    })
    .then((data) => {
      console.log(data.data[0]);
      cards.innerHTML += `
                <div class="col d-flex">
                  <div class="card border-0 bg-body-secondary p-2">
                     <a href="./albumpage.html?albumID=${data.data[randomNumber()].album.id}"><img src="${data.data[randomNumber()].album.cover_medium}" class="card-img-top rounded-2" alt="..." /></a>
  
                   <p class="card-title mb-0 my-2 fw-semibold">${data.data[randomNumber()].title_short}</p>
                    <a href="./artistpage.html?artistID=${data.data[randomNumber()].artist.id}" class="link-light link-opacity-50 link-underline-opacity-0"><p class="card-text pb-1 fs-custom ">${data.data[randomNumber()].artist.name}</p></a>
                  </div>
                </div>  
        `;
    })
    .catch((err) => {
      console.log("errore", err);
    });
};
getArtist();
