// Password eye toggle for registration forms
document.addEventListener('DOMContentLoaded', () => {
  initializePasswordToggles();
});

function initializePasswordToggles() {
  const passwordContainers = document.querySelectorAll('.password-input-container');
  passwordContainers.forEach(container => {
    const input = container.querySelector('input');
    const toggleBtn = container.querySelector('.password-toggle-btn');
    if (input && toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const isPassword = input.getAttribute('type') === 'password';
        input.setAttribute('type', isPassword ? 'text' : 'password');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }
        }
      });
    }
  });
}
