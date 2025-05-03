document.addEventListener('DOMContentLoaded', () => {
    // Apply different animations based on scroll direction
    let lastScrollTop = 0;
    let scrollDirection = 'down';
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Determine scroll direction
      if (scrollTop > lastScrollTop) {
        if (scrollDirection !== 'down') {
          scrollDirection = 'down';
          document.body.setAttribute('data-scroll-direction', 'down');
        }
      } else {
        if (scrollDirection !== 'up') {
          scrollDirection = 'up';
          document.body.setAttribute('data-scroll-direction', 'up');
        }
      }
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Create animated particles on scroll for a more dynamic feel
    const createParticle = (x, y) => {
      const particle = document.createElement('div');
      particle.className = 'scroll-particle';
      
      // Randomize particle properties
      const size = Math.random() * 10 + 5;
      const duration = Math.random() * 1000 + 500;
      const opacity = Math.random() * 0.5 + 0.3;
      
      // Apply styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.opacity = opacity;
      
      // Add to body
      document.body.appendChild(particle);
      
      // Animate and remove
      setTimeout(() => {
        particle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${-100 - Math.random() * 50}px)`;
        particle.style.opacity = '0';
        
        setTimeout(() => {
          document.body.removeChild(particle);
        }, duration);
      }, 10);
    };
    
    // Handle scroll events for particle creation (throttled)
    let lastParticleTime = 0;
    window.addEventListener('scroll', () => {
      const now = Date.now();
      if (now - lastParticleTime > 200) { // Throttle particle creation
        const x = window.innerWidth * Math.random();
        const y = window.innerHeight * 0.8 + Math.random() * 100;
        
        createParticle(x, y);
        lastParticleTime = now;
      }
    });
    
    // Add parallax effect to certain elements
    const parallaxElements = document.querySelectorAll('.certificate-item img, .profile-photo');
    
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      
      parallaxElements.forEach(element => {
        const speed = 0.05;
        const elementTop = element.getBoundingClientRect().top + scrollY;
        const elementCenter = elementTop + element.offsetHeight / 2;
        const distanceFromCenter = scrollY + window.innerHeight / 2 - elementCenter;
        
        // Apply parallax effect
        element.style.transform = `translateY(${distanceFromCenter * speed}px)`;
      });
    });
    
    // Add mouse-following effect for enhanced interactivity
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .flip-card, .project-container');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
      });
    });
  });