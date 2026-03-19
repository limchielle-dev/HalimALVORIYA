document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      // Apply theme colors dynamically when opening menu
      if (navLinks.classList.contains('active')) {
          mobileMenuBtn.style.color = '#38bdf8'; // Light Blue
      } else {
          mobileMenuBtn.style.color = '#ef4444'; // Red
      }
    });
  }

  // Close mobile menu when a link is clicked
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Highlight active nav item based on current page
  const currentPath = window.location.pathname;
  navItems.forEach(item => {
    const itemHref = item.getAttribute('href');
    // Basic match check (handles root / or index.html)
    if (itemHref === 'index.html' && (currentPath.endsWith('index.html') || currentPath === '/')) {
      item.classList.add('active');
    } else if (currentPath.includes(itemHref) && itemHref !== 'index.html') {
      item.classList.add('active');
    } else if (itemHref.startsWith('#')) {
      // In a real app we would use intersection observer for sections
      // but here we'll just handle it basically if needed
    }
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  // Select all elements to animate
  const animatedElements = document.querySelectorAll('.fade-in-up');
  animatedElements.forEach(el => observer.observe(el));
});
