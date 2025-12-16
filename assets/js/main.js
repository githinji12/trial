// assets/js/main.js
// Morel Tech Solution – Lightweight & Fast JavaScript
// Works with Alpine.js (already loaded via CDN)

document.addEventListener('DOMContentLoaded', function () {

  // ========================================
  // 1. Smooth scrolling for anchor links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 100, // offset for fixed navbar
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ========================================
  // 2. Navbar background on scroll (elegant effect)
  // ========================================
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('bg-navy/95', 'backdrop-blur-md');
    } else {
      nav.classList.remove('bg-navy/95', 'backdrop-blur-md');
    }
  });

  // ========================================
  // 3. Lazy load images (improves speed)
  // ========================================
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove('opacity-0');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });

    lazyImages.forEach(img => {
      img.classList.add('opacity-0', 'transition-opacity', 'duration-700');
      observer.observe(img);
    });
  }

  // ========================================
  // 4. WhatsApp floating button (optional – remove if you don’t want it)
  // ========================================
  const whatsappHTML = `
    <a href="https://wa.me/254791864441?text=Hi%20Morel%20Tech%2C%20I%20saw%20your%20website%20and%20would%20like%20a%20quote%20"
       target="_blank"
       class="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition transform hover:scale-110">
      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2.925 5.146.833 1.381.571 1.584.451 2.096.373.512-.079 1.758-.722 2.005-1.418.247-.695.247-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 11 8.374 4.632m6.862-10.82c.229-.598.43-1.225.43-1.882 0-3.866-3.146-7-7-7-3.854 0-7 3.134-7 7 0 .657.101 1.284.285 1.882l-1.285 4.694 4.807-1.26c.58.178 1.188.272 1.813.272 3.854 0 7-3.134 7-7z"/>
      </svg>
      <span class="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded opacity-0 pointer-events-none transition">Chat on WhatsApp</span>
    </a>
  `;

  // Only add WhatsApp button on mobile & desktop (not on contact page if you want)
  if (!window.location.pathname.includes('contact.html')) {
    document.body.insertAdjacentHTML('beforeend', whatsappHTML);

    // Tooltip show on hover (desktop) or tap (mobile)
    const waBtn = document.querySelector('a[href*="wa.me"]');
    const tooltip = waBtn.querySelector('span');

    waBtn.addEventListener('mouseenter', () => tooltip.classList.remove('opacity-0'));
    waBtn.addEventListener('mouseleave', () => tooltip.classList.add('opacity-0'));
    waBtn.addEventListener('touchstart', () => {
      tooltip.classList.toggle('opacity-0');
      setTimeout(() => tooltip.classList.add('opacity-0'), 3000);
    });
  }

  // ========================================
  // 5. Simple form validation (if you add a contact form later)
  // ========================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you! We will contact you soon!');
      this.reset();
    });
  }

});
// assets/js/main.js
// Morel Tech Solution – Lightweight & Fast JavaScript
// Apple / Stripe / Shopify–style UX

document.addEventListener('DOMContentLoaded', function () {

  /* ========================================
     1. Smooth scrolling (anchor links)
  ======================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 90,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ========================================
     2. Header scroll effect
  ======================================== */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* ========================================
     3. Mobile menu toggle
  ======================================== */
  const toggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ========================================
     4. Lazy load images
  ======================================== */
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) img.src = img.dataset.src;
          img.classList.remove('opacity-0');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '120px' });

    lazyImages.forEach(img => {
      img.classList.add('opacity-0');
      observer.observe(img);
    });
  }

  /* ========================================
     5. WhatsApp Floating Button
  ======================================== */
  if (!window.location.pathname.includes('contact')) {
    const whatsappHTML = `
      <a href="https://wa.me/254791864441?text=Hi%20Morel%20Tech%2C%20I%20would%20like%20a%20quote"
         target="_blank"
         aria-label="Chat on WhatsApp"
         class="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition transform hover:scale-105">
        <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 00-8.94 14.53L2 22l5.66-1.49A10 10 0 1012 2z"/>
        </svg>
      </a>
    `;
    document.body.insertAdjacentHTML('beforeend', whatsappHTML);
  }

  /* ========================================
     6. Contact form (optional)
  ======================================== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you! We will contact you shortly.');
      this.reset();
    });
  }

});
// Add specific handler for the "View All Products" button
document.addEventListener('click', (e) => {
  if (e.target.matches('.subcategory-link[data-category="all"]')) {
    // Clear the search input
    searchInput.value = '';
    // Close all accordions
    document.querySelectorAll('.accordion-content').forEach(content => {
      content.style.maxHeight = '0';
      content.setAttribute('aria-hidden', 'true');
    });
    document.querySelectorAll('.accordion-header').forEach(h => {
      h.setAttribute('aria-expanded', 'false');
      h.querySelector('.accordion-arrow')?.classList.remove('rotate-180');
    });
    // Set the active group to 'all-products' and filter
    const header = document.querySelector('[data-group="all-products"]');
    if (header && !header.getAttribute('aria-expanded')) {
      header.click(); // Trigger the accordion open
    }
    filterProducts();
  }
});