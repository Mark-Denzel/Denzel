// Scroll progress indicator
document.addEventListener('DOMContentLoaded', () => {
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
  
    // Update progress bar width on scroll
    window.addEventListener('scroll', () => {
      const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollProgress = (window.scrollY / scrollTotal) * 100;
      progressBar.style.width = `${scrollProgress}%`;
    });
  
    const cvButton = document.querySelector('.cv-button-container');
    let lastScrollTop = 0;
    let scrollTimeout;
  
    window.addEventListener('scroll', () => {
        // CV button show/hide logic
        clearTimeout(scrollTimeout);
        
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
  
        // Show button when user has scrolled more than 75% of the page
        if (scrollPercent > 75) {
            cvButton.classList.add('show');
        } else {
            cvButton.classList.remove('show');
        }
  
        // Optional: Hide button after 3 seconds of no scrolling
        scrollTimeout = setTimeout(() => {
            if (scrollPercent < 75) {
                cvButton.classList.remove('show');
            }
        }, 3000);
    });
  });