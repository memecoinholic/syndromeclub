/**
 * Audio Control for TARDI Website
 * Handles background music with entry splash screen and UI toggle logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle');
    const entryOverlay = document.getElementById('entry-overlay');
    const enterBtn = document.getElementById('enter-btn');

    let isPlaying = false;

    // Function to play music
    const playMusic = () => {
        if (!audio) return;
        
        audio.play().then(() => {
            isPlaying = true;
            if (musicBtn) musicBtn.classList.add('playing');
            localStorage.setItem('musicEnabled', 'true');
        }).catch(err => {
            console.log('Autoplay blocked or failed:', err);
        });
    };

    // Function to pause music
    const pauseMusic = () => {
        if (!audio) return;

        audio.pause();
        isPlaying = false;
        if (musicBtn) musicBtn.classList.remove('playing');
        localStorage.setItem('musicEnabled', 'false');
    };

    // Entry logic
    if (enterBtn && entryOverlay) {
        enterBtn.addEventListener('click', () => {
            entryOverlay.classList.add('hidden');
            // Delay slightly for smooth transition
            setTimeout(playMusic, 300);
        });
    }

    // Toggle logic (Volume button in corner)
    if (musicBtn) {
        musicBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (isPlaying) {
                pauseMusic();
            } else {
                playMusic();
            }
        });
    }

    // Initial check (if music was enabled but overlay was skipped somehow)
    if (localStorage.getItem('musicEnabled') === 'true') {
        // Most browsers still require interaction, so this might fail
        // but it's worth a try for returning visitors
        playMusic();
    }
});
