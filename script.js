// script.js

document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('mainAudioPlayer');
    audio.volume = 0.4;
    
    if (!audio) return;

    const songItems = Array.from(document.querySelectorAll('.song-item'));
    
    let np = document.querySelector('.now-playing');
    if (!np) {
        const container = document.querySelector('.main-player-container');
        if (container) {
            np = document.createElement('div');
            np.className = 'now-playing';
            np.textContent = 'Now Playing - None';
            container.insertBefore(np, audio);
        }
    }

    function setActive(item) {
        songItems.forEach(function (el) { el.classList.remove('playing'); });
        if (item) {
            item.classList.add('playing');
            const titleEl = item.querySelector('h2');
            if (titleEl && np) {
                np.textContent = 'Now Playing - ' + titleEl.textContent;
            }
        }
    }

    function playItem(item) {
        const src = item && item.dataset.songSrc;
        if (!src) return;
        if (new URL(audio.src, location.href).href !== new URL(src, location.href).href) {
            audio.src = src;
        }
        audio.play().catch(function () {});
        setActive(item);
    }
    
    songItems.forEach(function (item)  {
        item.addEventListener('click', function () {
            const isCurrent = item.classList.contains('playing');
            if (!isCurrent) {
                playItem(item);
            } else {
                if (audio.paused) {
                    audio.play(); 
                } 
                else {
                    audio.pause();

                }
            }
        });
    });


    audio.addEventListener('ended', function () {
        if (!songItems.length) return;
        const index = songItems.findIndex(function (el) { return el.classList.contains('playing'); });
        const next = songItems[index + 1] || songItems[0];
        playItem(next);
        
    });
});
