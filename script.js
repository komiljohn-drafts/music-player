const music = document.getElementById('music');
const songTitle = document.getElementById('title');
const songArtist = document.getElementById('artist');
const songImg = document.getElementById('song-img');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress__container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

let isPlaying = false;

// Music
const songs = [
    {
        name: 'song-1',
        displayName: 'Faded',
        artist: 'Alan Walker'
    },
    {
        name: 'song-2',
        displayName: 'Photograph',
        artist: 'Ed Sheeran'
    },
    {
        name: 'song-3',
        displayName: 'Love Yourself',
        artist: 'Justin Beiber'
    },
    {
        name: 'song-4',
        displayName: 'It Ain\'t Me',
        artist: 'Selena Gomez'
    }
];

// Play Song
function playSong() {
    isPlaying = true;
    music.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
}

// Pause Song
function pauseSong() {
    isPlaying = false;
    music.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong());

// Current song index
let songIndex = 0;

function loadSong(song) {
    songTitle.textContent = song.displayName;
    songArtist.textContent = song.artist;
    songImg.src = `img/${song.name}-img.jpg`;
    music.src = `music/${song.name}.mp3`;
}

// Previous song
function prevSong() {
    songIndex--;
    if (songIndex < 0) songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    playSong();
}

// Next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) songIndex = 0;
    loadSong(songs[songIndex]);
    playSong();
}

// Dynamically loading the song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { currentTime, duration } = e.srcElement;
        // Updating progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = progressPercent + '%';

        // Calculating display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10)
            durationSeconds = `0${durationSeconds}`;
        // Checking if durationSeconds has value to avoid NaN
        if (durationSeconds)
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        // Calculating display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10)
            currentSeconds = `0${currentSeconds}`;
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }

}

// Setting progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    progress.style.width = (clickX / width) * 100 + '%';
    music.currentTime = (clickX / width) * duration;
    currentTimeEl.textContent = music.currentTime;
}

// Previous and Next Button Event Listener
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);