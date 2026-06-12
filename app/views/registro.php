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
        </div>
      </div>
      
      <!-- Column 2: Placeholder Box -->
      <div class="col-img">
        <div class="wireframe-placeholder" aria-hidden="true">
          <div class="wireframe-placeholder-inner">
            <i data-lucide="image"></i>
            <span>Imagen Decorativa</span>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>