document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const containers = document.querySelectorAll('.project-container');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    let currentIndex = 0;
    
    function updateCarousel() {
        const containerWidth = containers[0].clientWidth;
        track.style.transform = `translateX(-${currentIndex * containerWidth}px)`;

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });

        containers.forEach((container, index) => {
            if (index === currentIndex) {
                container.classList.add('active');
            } else {
                container.classList.remove('active');
                // Reset zoom and pause when switching projects
                const videoBg = container.querySelector('.video-background');
                if (videoBg) videoBg.classList.remove('zoomed-out', 'is-fullscreen');
                const videoEl = container.querySelector('video');
                if (videoEl) {
                    // If this video is currently fullscreen, exit fullscreen
                    if (document.fullscreenElement === videoEl) {
                        if (document.exitFullscreen) document.exitFullscreen();
                    }
                    if (!videoEl.paused) {
                        videoEl.pause();
                    }
                }
                // Remove any leftover overlay
                const existingOverlay = document.querySelector('.video-overlay');
                if (existingOverlay) existingOverlay.remove();
            }
        });
    }
    
    // Initialize
    updateCarousel();
    
    // Navigation handlers
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % containers.length;
        updateCarousel();
    });
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + containers.length) % containers.length;
        updateCarousel();
    });
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Videos should not toggle/zoom when clicking the project container.
    // Enlarge/zoom behavior is only available via the fullscreen/enlarge buttons.
    
    // Video controls: mute, fullscreen, and progress handling
    containers.forEach(container => {
        const video = container.querySelector('video');
        if (!video) return;

        const videoBg = container.querySelector('.video-background');
        const progressFill = container.querySelector('.progress-fill');
        const progressBar = container.querySelector('.video-status .progress');
        const timeEl = container.querySelector('.video-status .time');
        const muteBtn = container.querySelector('.mute-btn');
        const fullscreenBtn = container.querySelector('.fullscreen-btn');

        const formatTime = (t) => {
            if (!isFinite(t)) return '0:00';
            const m = Math.floor(t / 60);
            const s = Math.floor(t % 60).toString().padStart(2, '0');
            return `${m}:${s}`;
        };

        // Update progress UI as the video plays
        video.addEventListener('timeupdate', () => {
            if (progressFill && video.duration) {
                const pct = (video.currentTime / video.duration) * 100 || 0;
                progressFill.style.width = `${pct}%`;
            }
            if (timeEl && video.duration) {
                timeEl.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
            }
        });

        // When metadata loads, set duration text
        video.addEventListener('loadedmetadata', () => {
            if (timeEl && video.duration) {
                timeEl.textContent = `0:00 / ${formatTime(video.duration)}`;
            }
        });

        // Seek by clicking progress bar
        if (progressBar) {
            progressBar.addEventListener('click', (e) => {
                const rect = progressBar.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const pct = Math.max(0, Math.min(1, x / rect.width));
                if (video.duration) video.currentTime = pct * video.duration;
            });
        }

        // Mute/unmute
        if (muteBtn) {
            muteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                video.muted = !video.muted;
                const icon = muteBtn.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-volume-xmark', video.muted);
                    icon.classList.toggle('fa-volume-high', !video.muted);
                }
            });
        }

        // Fullscreen handler
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const el = video;
                if (el.requestFullscreen) {
                    el.requestFullscreen();
                } else if (el.webkitEnterFullscreen) {
                    // iOS Safari
                    el.webkitEnterFullscreen();
                }
            });

            // Update icon and add 'is-fullscreen' class on the container when fullscreen changes
            document.addEventListener('fullscreenchange', () => {
                const icon = fullscreenBtn.querySelector('i');
                if (!icon) return;
                if (document.fullscreenElement === video) {
                    icon.classList.remove('fa-expand');
                    icon.classList.add('fa-compress');
                    if (videoBg) videoBg.classList.add('is-fullscreen');
                } else {
                    icon.classList.remove('fa-compress');
                    icon.classList.add('fa-expand');
                    if (videoBg) videoBg.classList.remove('is-fullscreen');
                }
            });
        }
    });
    
    // Handle window resize: recompute widths and re-render carousel
    window.addEventListener('resize', function() {
        updateCarousel();
    });

    // Pause all videos when the whole Projects section is out of view,
    // and autoplay/pause individual videos when their container is visible.
    const projectSection = document.getElementById('project');
    if (projectSection) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    // Section left the viewport: pause all videos and remove fullscreen/zoom classes
                    containers.forEach(c => {
                        const v = c.querySelector('video');
                        if (v && !v.paused) v.pause();
                        const vb = c.querySelector('.video-background');
                        if (vb) vb.classList.remove('zoomed-out', 'is-fullscreen');
                    });
                    const existingOverlay = document.querySelector('.video-overlay');
                    if (existingOverlay) existingOverlay.remove();
                }
            });
        }, { threshold: 0.05 });
        sectionObserver.observe(projectSection);
    }

    // Observe each project container for visibility to autoplay/pause its video
    const visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const container = entry.target;
            const video = container.querySelector('video');
            if (!video) return;

            // If container is mostly visible, play; otherwise pause
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                // Play if not already playing
                if (video.paused) {
                    video.play().catch(() => {});
                }
            } else {
                if (!video.paused) {
                    video.pause();
                }
            }
        });
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] });

    containers.forEach(container => visibilityObserver.observe(container));
});