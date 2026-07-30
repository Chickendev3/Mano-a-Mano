// Initialize Lucide Icons & Global Handlers
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  initializeMobileMenu();
  initializeHeaderScroll();
  setupLightboxGallery();
  initializeThemeToggle();
});

// THEME SWITCHER TOGGLE
function initializeThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      // Usamos el atributo data-theme para dark/light en estilos.css
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    });
  }
}

// HEADER SCROLL EFFECT (Desactivado para mantener la barra y el logo 100% fijos sin achicar ni mover)
function initializeHeaderScroll() {
  // Sin modificaciones de clase al scrollear
}

// MOBILE MENU TOGGLE
function initializeMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  if (mobileMenuToggle && navLinksContainer) {
    mobileMenuToggle.addEventListener('click', () => {
      const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
      mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
      navLinksContainer.classList.toggle('mobile-active');
    });

    // Close mobile menu on nav link click (for anchors)
    const links = navLinksContainer.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinksContainer.classList.remove('mobile-active');
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
}

// MODAL MANAGEMENT UTILITIES (Shared globally)
window.openModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

// Close modal when clicking outside box
document.addEventListener('DOMContentLoaded', () => {
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });
});

// Toast notification function (Shared globally)
window.showToast = function(title, message, isSuccess = true) {
  const toast = document.getElementById('global-toast');
  const toastTitle = document.getElementById('toast-title');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = toast ? toast.querySelector('.toast-icon') : null;
  
  if (!toast || !toastTitle || !toastMessage) return;

  toastTitle.textContent = title;
  toastMessage.textContent = message;
  
  if (isSuccess) {
    toast.style.borderLeftColor = 'var(--color-success)';
    if (toastIcon) {
      toastIcon.style.color = 'var(--color-success)';
      toastIcon.style.backgroundColor = 'var(--color-success-light)';
      toastIcon.innerHTML = '<i data-lucide="check"></i>';
    }
  } else {
    toast.style.borderLeftColor = '#EF4444'; // Red
    if (toastIcon) {
      toastIcon.style.color = '#EF4444';
      toastIcon.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
      toastIcon.innerHTML = '<i data-lucide="alert-circle"></i>';
    }
  }
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  toast.classList.add('active');
  
  setTimeout(() => {
    toast.classList.remove('active');
  }, 4000);
};

// LIGHTBOX / GALLERY ZOOMEABLE CAROUSEL
function setupLightboxGallery() {
  // Inject CSS rules for the zoom hover effects dynamically
  const style = document.createElement('style');
  style.innerHTML = `
    .gallery-placeholder-img img {
      cursor: pointer;
      transition: opacity 0.2s ease, transform 0.2s ease !important;
    }
    .gallery-placeholder-img img:hover {
      opacity: 0.85;
      transform: scale(1.03);
    }
    #lightbox-prev-btn:hover, #lightbox-next-btn:hover {
      background: rgba(255, 255, 255, 0.25) !important;
    }
  `;
  document.head.appendChild(style);

  // Catch clicks on images inside the campaign gallery
  document.addEventListener('click', (e) => {
    const imgElement = e.target.closest('.gallery-placeholder-img img');
    if (!imgElement) return;

    const galleryContainer = imgElement.closest('#m-camp-gallery-grid');
    if (!galleryContainer) return;

    const imgElements = Array.from(galleryContainer.querySelectorAll('.gallery-placeholder-img img'));
    const imgUrls = imgElements.map(img => img.src);
    let currentIndex = imgElements.indexOf(imgElement);

    openLightbox(imgUrls, currentIndex);
  });
}

function openLightbox(imgUrls, startIndex) {
  let lightbox = document.getElementById('global-lightbox-overlay');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'global-lightbox-overlay';
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(15, 23, 42, 0.95);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
      user-select: none;
    `;

    lightbox.innerHTML = `
      <!-- Close button (x) -->
      <button id="lightbox-close-btn" style="
        position: absolute;
        top: 24px;
        right: 24px;
        background: none;
        border: none;
        color: #ffffff;
        font-size: 40px;
        cursor: pointer;
        z-index: 10001;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s ease;
        line-height: 1;
      " aria-label="Cerrar galería">&times;</button>

      <!-- Left Arrow -->
      <button id="lightbox-prev-btn" style="
        position: absolute;
        left: 24px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: #ffffff;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        font-size: 28px;
        cursor: pointer;
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s ease;
      " aria-label="Anterior">&#8249;</button>

      <!-- Image container -->
      <div id="lightbox-img-wrapper" style="
        max-width: 85%;
        max-height: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <img id="lightbox-active-img" style="
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
        " alt="Imagen en grande">
      </div>

      <!-- Right Arrow -->
      <button id="lightbox-next-btn" style="
        position: absolute;
        right: 24px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: #ffffff;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        font-size: 28px;
        cursor: pointer;
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s ease;
      " aria-label="Siguiente">&#8250;</button>

      <!-- Indicator index -->
      <div id="lightbox-index-indicator" style="
        position: absolute;
        bottom: 24px;
        color: #ffffff;
        font-size: 14px;
        font-weight: 600;
        background-color: rgba(255, 255, 255, 0.15);
        padding: 6px 18px;
        border-radius: 20px;
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
      ">1 / 1</div>
    `;

    document.body.appendChild(lightbox);

    const closeBtn = lightbox.querySelector('#lightbox-close-btn');
    closeBtn.addEventListener('click', () => closeLightbox());
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target === document.getElementById('lightbox-img-wrapper')) {
        closeLightbox();
      }
    });

    closeBtn.addEventListener('mouseenter', () => { closeBtn.style.transform = 'scale(1.2)'; });
    closeBtn.addEventListener('mouseleave', () => { closeBtn.style.transform = 'scale(1.0)'; });
  }

  const activeImg = lightbox.querySelector('#lightbox-active-img');
  const indexIndicator = lightbox.querySelector('#lightbox-index-indicator');
  const prevBtn = lightbox.querySelector('#lightbox-prev-btn');
  const nextBtn = lightbox.querySelector('#lightbox-next-btn');

  let currentIndex = startIndex;

  function updateImage() {
    activeImg.src = imgUrls[currentIndex];
    indexIndicator.textContent = `${currentIndex + 1} / ${imgUrls.length}`;
    
    if (imgUrls.length <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
    }
  }

  const navigatePrev = (e) => {
    if (e) e.stopPropagation();
    currentIndex = (currentIndex - 1 + imgUrls.length) % imgUrls.length;
    updateImage();
  };

  const navigateNext = (e) => {
    if (e) e.stopPropagation();
    currentIndex = (currentIndex + 1) % imgUrls.length;
    updateImage();
  };

  prevBtn.onclick = navigatePrev;
  nextBtn.onclick = navigateNext;

  const handleKeydown = (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigatePrev();
    if (e.key === 'ArrowRight') navigateNext();
  };

  window.addEventListener('keydown', handleKeydown);

  window.closeLightbox = function() {
    lightbox.style.opacity = '0';
    lightbox.style.visibility = 'hidden';
    document.body.style.overflow = 'auto';
    window.removeEventListener('keydown', handleKeydown);
  };

  lightbox.style.visibility = 'visible';
  lightbox.style.opacity = '1';
  document.body.style.overflow = 'hidden';

  updateImage();
}
