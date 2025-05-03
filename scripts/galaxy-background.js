// Combined Galaxy and Strip Background Animation Script
document.addEventListener('DOMContentLoaded', function() {
    // Create the galaxy background container
    const galaxyBackground = document.createElement('div');
    galaxyBackground.className = 'galaxy-background';
    
    // Create stars layers
    const stars = document.createElement('div');
    stars.className = 'stars';
    
    const starsMedium = document.createElement('div');
    starsMedium.className = 'stars-medium';
    
    const starsLarge = document.createElement('div');
    starsLarge.className = 'stars-large';
    
    const nebula = document.createElement('div');
    nebula.className = 'nebula';

    // Create shooting stars
    for (let i = 0; i < 5; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        galaxyBackground.appendChild(shootingStar);
    }
    
    // Create the decorative strip elements
    const stripDecoration = document.createElement('div');
    stripDecoration.className = 'strip-decoration';
    
    const floatingElements = document.createElement('div');
    floatingElements.className = 'floating-elements';
    
    // Append all elements to the galaxy background
    galaxyBackground.appendChild(stars);
    galaxyBackground.appendChild(starsMedium);
    galaxyBackground.appendChild(starsLarge);
    galaxyBackground.appendChild(nebula);
    galaxyBackground.appendChild(stripDecoration);
    galaxyBackground.appendChild(floatingElements);
    
    // Add the galaxy background to the body as the first child
    document.body.insertBefore(galaxyBackground, document.body.firstChild);

    // Create floating elements
    createFloatingElements();
    
    function createFloatingElements() {
        const count = 12; // Reduced number to avoid clutter with stars
        const container = document.querySelector('.floating-elements');
        
        for (let i = 0; i < count; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            
            // Random size between 10px and 40px (larger than stars)
            const size = Math.random() * 30 + 10;
            
            // Random position
            const left = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = Math.random() * 15 + 15; // Slower animation
            
            // Apply styles
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            element.style.left = `${left}%`;
            element.style.bottom = `-${size}px`;
            element.style.animationDelay = `${delay}s`;
            element.style.animationDuration = `${duration}s`;
            element.style.filter = `blur(${Math.random() * 2 + 1}px)`;
            element.style.opacity = Math.random() * 0.3 + 0.1;
            
            container.appendChild(element);
        }
    }
});