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
  });