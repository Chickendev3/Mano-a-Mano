// Contact page behavior (FAQ accordion and AJAX submission)
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
  const contactForm = document.getElementById('contact-form-page');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : '';
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';
    }

    const formData = new FormData(contactForm);
    const messageBox = document.getElementById('contact-message-box');

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error en la red');
      }

      const data = await response.json();
      renderContactMessage(data.message, data.success);

      if (data.success) {
        contactForm.reset();
      }
    } catch (error) {
      renderContactMessage('No se pudo enviar la consulta. Intenta nuevamente.', false);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}

function renderContactMessage(message, success) {
  const messageBox = document.getElementById('contact-message-box');
  if (!messageBox) return;

  messageBox.innerHTML = '';

  const alert = document.createElement('div');
  alert.setAttribute('role', 'alert');
  alert.style.marginBottom = '24px';
  alert.style.padding = '16px';
  alert.style.borderRadius = '12px';
  alert.style.backgroundColor = success ? 'rgba(220, 252, 231, 0.9)' : 'rgba(254, 226, 226, 0.9)';
  alert.style.color = success ? '#166534' : '#b91c1c';
  alert.style.border = success ? '1px solid #86efac' : '1px solid #fca5a5';
  alert.textContent = message;

  messageBox.appendChild(alert);

  window.setTimeout(() => {
    if (messageBox.contains(alert)) {
      messageBox.removeChild(alert);
    }
  }, 10000);
}
