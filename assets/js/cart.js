// cart.js - Morel Tech Solution Cart & WhatsApp Checkout
// Place in: /assets/js/cart.js

// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem('morelCart')) || [];

// Save cart to localStorage and update UI
function saveCart() {
  localStorage.setItem('morelCart', JSON.stringify(cart));
  updateCartBadge();
}

// Add service to cart
function addToCart(id, name, price) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price: parseFloat(price), quantity: 1 });
  }
  saveCart();
  // Optional: Show a subtle toast or alert
  alert(`✅ "${name}" added to your quote!`);
}

// Update cart item count badge
function updateCartBadge() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.textContent = totalItems;
    badge.classList.toggle('hidden', totalItems === 0);
  }
}

// Open lightbox with clicked image
function openLightbox(src) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightbox && lightboxImg) {
    lightboxImg.src = src;
    lightbox.classList.remove('hidden');
  }
}

// Close lightbox when clicking overlay
function closeLightbox(e) {
  if (e.target.id === 'lightbox') {
    e.target.classList.add('hidden');
  }
}

// WhatsApp checkout
function checkoutViaWhatsApp() {
  if (cart.length === 0) {
    alert('📭 Your quote is empty! Please add at least one service.');
    return;
  }

  // Replace with your actual WhatsApp number (Kenyan format: 2547XXXXXXXX)
  const businessNumber = '254791864441';
  
  let message = 'Hi Morel Tech! I\'d like a quote for:\n\n';
  cart.forEach(item => {
    message += `• ${item.name} (KES ${item.price.toLocaleString()}) ×${item.quantity}\n`;
  });

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  message += `\nEstimated Total: KES ${total.toLocaleString()}\n\nSent from your website.`;

  const url = `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// Initialize event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Attach "Add to Quote" button handlers
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function () {
      const card = this.closest('.service-card, [data-id]');
      if (!card) return;
      
      const id = card.dataset.id;
      const name = card.dataset.name;
      const price = card.dataset.price;

      if (id && name && price) {
        addToCart(id, name, price);
      } else {
        console.warn('Missing data attributes on service card:', card);
      }
    });
  });

  // Lightbox click handler (if lightbox exists)
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', closeLightbox);
  }

  // Initialize cart badge
  updateCartBadge();
});