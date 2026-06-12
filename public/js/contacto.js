// Contact page behavior (FAQ accordion and submission)
document.addEventListener('DOMContentLoaded', () => {
  initializeAccordions();
  initializeContactForm();
});

function initializeAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const currentItem = header.parentElement;
      if (!currentItem) return;

      const isCurrentlyActive = currentItem.classList.contains('active');
      
      // Close all accordion items
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
        const itemBtn = item.querySelector('.accordion-header');
        if (itemBtn) {
          itemBtn.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current item if it wasn't active
      if (!isCurrentlyActive) {
        currentItem.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function initializeContactForm() {
  const contactFormPage = document.getElementById('contact-form-page');
  if (contactFormPage) {
    contactFormPage.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const lastname = document.getElementById('contact-lastname').value;
      if (typeof showToast !== 'undefined') {
        showToast('Consulta enviada', `¡Gracias ${name} ${lastname}! Tu consulta fue recibida con éxito.`, true);
      }
      contactFormPage.reset();
    });
  }
}
