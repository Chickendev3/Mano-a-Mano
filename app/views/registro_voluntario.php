<section class="wireframe-section">
  <div class="container">
    <div class="wireframe-grid">
      
      <!-- Column 1: Form -->
      <div class="col-form" style="max-width: 460px; width: 100%;">
        <h1 class="wireframe-title">Registrarse como voluntario</h1>
        
        <form action="<?= BASE_URL ?>registro/voluntario" method="POST" id="reg-vol-form" style="margin-top: 32px;">
          
          <!-- Dynamic Error Alert -->
          <?php if (!empty($error)): ?>
            <div style="background-color: rgba(239, 68, 68, 0.15); color: #EF4444; padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid rgba(239, 68, 68, 0.3); margin-bottom: 20px; font-size: 14px; font-weight: 500;">
              <?= htmlspecialchars($error) ?>
            </div>
          <?php endif; ?>

          <div class="form-row">
            <div class="form-group">
              <label for="reg-name" class="form-label">Nombre/s *</label>
              <input type="text" id="reg-name" name="nombre" class="form-input" placeholder="Placeholder" required>
            </div>
            <div class="form-group">
              <label for="reg-lastname" class="form-label">Apellido/s *</label>
              <input type="text" id="reg-lastname" name="apellido" class="form-input" placeholder="Placeholder" required>
            </div>
          </div>
          
          <div class="form-group">
            <label for="reg-email" class="form-label">Email *</label>
            <input type="email" id="reg-email" name="email" class="form-input" placeholder="voluntario@correo.com" required autocomplete="username">
          </div>
          
          <div class="form-group" style="margin-bottom: 32px;">
            <label for="reg-password" class="form-label">Contraseña *</label>
            <div class="password-input-container">
              <input type="password" id="reg-password" name="clave" class="form-input" placeholder="****************" required autocomplete="new-password">
              <button type="button" class="password-toggle-btn" aria-label="Mostrar u ocultar contraseña">
                <i data-lucide="eye"></i>
              </button>
            </div>
            <span class="form-help-text">Debe contener al menos 8 caracteres para mayor seguridad.</span>
          </div>
          
          <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; font-size: 16px; padding: 14px;">
            Registrarse
          </button>
        </form>
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
