document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const playBtn = document.getElementById('play-music');
    const photoItems = document.querySelectorAll('.photo-item');
    const trackTitle = document.getElementById('photo-caption');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeDisplay = document.querySelector('.current-time');
    const durationDisplay = document.querySelector('.duration');
    const volumeSlider = document.querySelector('.volume-slider');
    const progressContainer = progressBar.parentElement;
    
    // State
    let currentIndex = 0;
    let audio = new Audio();
    let isPlaying = false;
    let updateProgressInterval;
    let isChangingTrack = false;

    // Format time (seconds to MM:SS)
    const formatTime = (seconds) => {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Update track info
    const updateTrackInfo = () => {
        trackTitle.textContent = photoItems[currentIndex].querySelector('img').alt;
    };

    // Update play button UI
    const updatePlayButton = () => {
        playBtn.innerHTML = `<i class="fas fa-${isPlaying ? 'pause' : 'play'}"></i>`;
        playBtn.classList.toggle('playing', isPlaying);
    };

    // Update progress bar
    const updateProgress = () => {
        if (!audio || isNaN(audio.duration)) return;
        
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    };

    // Clean up audio resources
    const cleanupAudio = () => {
        if (!audio) return;
        
        audio.pause();
        audio.src = '';
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.removeEventListener('ended', handleTrackEnd);
        clearInterval(updateProgressInterval);
    };

    // Update duration display
    const updateDuration = () => {
        if (audio && !isNaN(audio.duration)) {
            durationDisplay.textContent = formatTime(audio.duration);
        }
    };

    // Handle track end
    const handleTrackEnd = () => {
        isPlaying = false;
        updatePlayButton();
        showPhoto(currentIndex + 1);
    };

    // Show photo at specific index
    const showPhoto = (index) => {
        isChangingTrack = true;
        
        // Pause current audio if playing
        if (isPlaying) {
            pauseAudio();
        }
        
        // Clean up previous audio
        cleanupAudio();
        
        // Update photo display
        photoItems.forEach(item => item.classList.remove('showing'));
        currentIndex = (index + photoItems.length) % photoItems.length;
        photoItems[currentIndex].classList.add('showing');
        updateTrackInfo();
        
        // Set up new audio if play was active
        if (isPlaying) {
            playAudio();
        }
        
        isChangingTrack = false;
    };

    // Play current track
    const playAudio = () => {
        if (isChangingTrack) return;
        
        // Set up new audio
        audio.src = photoItems[currentIndex].dataset.music;
        audio.volume = volumeSlider.value;
        
        // Set up event listeners
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleTrackEnd);
        
        audio.play()
            .then(() => {
                isPlaying = true;
                updatePlayButton();
                updateDuration();
                
                // Start progress updates
                updateProgressInterval = setInterval(updateProgress, 200);
            })
            .catch(error => {
                console.error("Playback failed:", error);
                isPlaying = false;
                updatePlayButton();
            });
    };

    // Pause current track
    const pauseAudio = () => {
        if (!audio || isChangingTrack) return;
        
        audio.pause();
        isPlaying = false;
        updatePlayButton();
    };

    // Seek audio when progress bar is clicked
    progressContainer.addEventListener('click', (e) => {
        if (!audio || isNaN(audio.duration) || isChangingTrack) return;
        
        const clickPosition = e.clientX - progressContainer.getBoundingClientRect().left;
        const progressContainerWidth = progressContainer.clientWidth;
        const seekTime = (clickPosition / progressContainerWidth) * audio.duration;
        
        audio.currentTime = seekTime;
        updateProgress();
    });

    // Event listeners
    nextBtn.addEventListener('click', () => showPhoto(currentIndex + 1));
    prevBtn.addEventListener('click', () => showPhoto(currentIndex - 1));
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    });
    
    volumeSlider.addEventListener('input', () => {
        if (audio) {
            audio.volume = volumeSlider.value;
        }
    });

    // Initialize
    updateTrackInfo();
    photoItems[currentIndex].classList.add('showing');
});