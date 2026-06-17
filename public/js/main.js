// Initialize Lucide Icons & Global Handlers
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  initializeMobileMenu();
  initializeHeaderScroll();
});

// HEADER SCROLL EFFECT
function initializeHeaderScroll() {
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    });
  }
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
