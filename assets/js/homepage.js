const cards = document.querySelector("#cards");
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

const playTrack = function (element) {
  playerTrackCoverMobile.src = element.album.cover_small;
  playerTrackCoverDesktop.src = element.album.cover_small;
  playerTrackTitleMobile.innerText = ` ${element.title}`;
  playerTrackTitleMobile2.innerText = ` ${element.title}`;
  playerTrackTitleDesktop.innerText = `${element.title}`;
  playerTrackTitleDesktop2.innerText = `${element.title}`;
  playerTrackArtist.innerText = `${element.artist.name}`;
};

let artist = ["Queen", "coldplay", "geolier", "mariomerola", "tonypitony", "radiohead"];
let random = [];
let arrayTracks = [];
let counter = 0;
let audio = null;

const randomNumber = () => {
  const number = Math.floor(Math.random() * 6);
  return number;
};

const numbers = () => {
  for (let i = 0; i < 6; i++) {
    let number = randomNumber();
    while (random.includes(number)) {
      number = randomNumber();
    }
    random.push(number);
  }
};
numbers();
const getArtist = () => {
  for (let i = 0; i < 6; i++) {
    getSlides(artist[random[i]]);
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
      const num = randomNumber();
      console.log(data.data[num]);
      cards.innerHTML += `
                <div class="col-6  col-lg-2 d-flex justify-content-center">
                  <div class="card border-0 bg-body-secondary p-2">
                     <a href="./albumpage.html?albumID=${data.data[num].album.id}"><img src="${data.data[num].album.cover_medium}" class="card-img-top rounded-2" alt="..." /></a>
  
                   <p class="card-title mb-0 my-2 fw-semibold track pointer" data-counter="${counter}">${data.data[num].title_short}</p>
                    <a href="./artistpage.html?artistID=${data.data[num].artist.id}" class="link-light link-opacity-50 link-underline-opacity-0"><p class="card-text pb-1 fs-custom ">${data.data[num].artist.name}</p></a>
                  </div>
                </div>  
        `;
      arrayTracks.push(data.data[num]);
      const allTracksOnPage = document.querySelectorAll(".track");
      allTracksOnPage.forEach((trackOnPage) => {
        trackOnPage.addEventListener("click", () => {
          playTrack(arrayTracks[trackOnPage.dataset.counter]);
          startAudio(arrayTracks[trackOnPage.dataset.counter].preview);
          playerI.classList.add("playerOnOff");
          mobileBtnStart.classList.add("playerOnOff");
        });
      });
      counter++;
    })

    .catch((err) => {
      console.log("errore", err);
    });
};
getArtist();

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
