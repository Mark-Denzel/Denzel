document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const containers = document.querySelectorAll('.project-container');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    let currentIndex = 0;
    const containerWidth = containers[0].clientWidth;
    
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * containerWidth}px)`;
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        containers.forEach((container, index) => {
            if (index === currentIndex) {
                container.classList.add('active');
            } else {
                container.classList.remove('active');
                // Reset zoom when switching projects
                const videoBg = container.querySelector('.video-background');
                if (videoBg) videoBg.classList.remove('zoomed-out');
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
    
    // Video zoom effect
// Modify the click handler in your existing code
containers.forEach(container => {
    container.addEventListener('click', function(e) {
        if (container.classList.contains('active') && 
            !e.target.closest('.nav-arrow') && 
            !e.target.closest('.indicator')) {
            
            const videoBg = container.querySelector('.video-background');
            if (videoBg) {
                // Close any other zoomed videos first
                document.querySelectorAll('.video-background.zoomed-out').forEach(bg => {
                    if (bg !== videoBg) bg.classList.remove('zoomed-out');
                });
                
                // Toggle current video
                videoBg.classList.toggle('zoomed-out');
                
                // Optional: Add overlay when zoomed
                const overlay = document.createElement('div');
                overlay.className = 'video-overlay';
                
                if (videoBg.classList.contains('zoomed-out')) {
                    // Create and append overlay
                    document.body.appendChild(overlay);
                    overlay.addEventListener('click', () => {
                        videoBg.classList.remove('zoomed-out');
                        overlay.remove();
                    });
                    
                    // Play video
                    const video = videoBg.querySelector('video');
                    if (video) video.play();
                } else {
                    // Remove overlay if exists
                    const existingOverlay = document.querySelector('.video-overlay');
                    if (existingOverlay) existingOverlay.remove();
                    
                    // Pause video
                    const video = videoBg.querySelector('video');
                    if (video) video.pause();
                }
            }
        }
    });
});
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const newContainerWidth = containers[0].clientWidth;
        track.style.transform = `translateX(-${currentIndex * newContainerWidth}px)`;
    });
});