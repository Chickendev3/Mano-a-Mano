<!-- VISTA DE REGISTRO DE UN NUEVO USUARIO -->

<section class="wireframe-section">
  <div class="container">
    <div class="wireframe-grid">
      
      <!-- Column 1: Options -->
      <div class="col-form" style="display: flex; flex-direction: column; justify-content: center; gap: 32px;">
        <h1 class="wireframe-title" style="max-width: 450px; line-height: 1.25;">Por favor, elegí tu tipo de usuario para registrarse</h1>
        
        <div class="role-selection-box" style="max-width: 400px; width: 100%;">
          <a href="<?= BASE_URL ?>registro/organizacion" class="btn btn-primary btn-role" id="role-org-btn" style="text-align: center;">
            Como organización <i data-lucide="building-2" style="margin-left: 8px;"></i>
          </a>
          <a href="<?= BASE_URL ?>registro/voluntario" class="btn btn-primary btn-role" id="role-vol-btn" style="text-align: center;">
            Como Voluntario <i data-lucide="user" style="margin-left: 8px;"></i>
          </a>
          <p style="text-align: left; font-size: 14px; color: var(--color-text-secondary);">
            Ya tenés cuenta? <a href="<?= BASE_URL ?>sesion" style="color: var(--color-primary); font-weight: 600; text-decoration: underline;">Iniciá Sesion</a>
          </p>
        </div>
      </div>
      
      <!-- Column 2: Imagen Decorativa (on Right) -->
      <div class="col-img">
        <img src="<?= BASE_URL ?>../public/img/img-registro.webp" alt="Registro Selección" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-lg);">
      </div>
      
    </div>
  </div>
</section>

