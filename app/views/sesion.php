<!-- VISTA DE FORM DE INICIAR SESIÓN -->

<main>
	<section class="wireframe-section">
    <div class="container">
      <div class="wireframe-grid reverse-layout">
        
        <!-- Column 1: Imagen Decorativa (on Left) -->
        <div class="col-img">
          <img src="<?= BASE_URL ?>../public/img/img-sesion.webp" alt="Imagen Decorativa Iniciar Sesión" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-lg);">
        </div>
        
        <!-- Column 2: Form (on Right) -->
        <div class="col-form" style="max-width: 460px; width: 100%; margin-left: auto;">
          <h1 class="wireframe-title">Iniciar sesión</h1>
          
          <form action="<?= BASE_URL ?>sesion" method="POST" id="login-form-page" style="margin-top: 32px;">
            
            <!-- Dynamic Error Alert -->
            <?php if (!empty($msj)) : ?>
              <div style="background-color: rgba(239, 68, 68, 0.15); color: #EF4444; padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid rgba(239, 68, 68, 0.3); margin-bottom: 20px; font-size: 14px; font-weight: 500;">
                <?= htmlspecialchars($msj) ?>
              </div>
            <?php endif; ?>
            
            <div class="form-group">
              <label for="login-email-page" class="form-label">Correo electrónico</label>
              <input type="email" id="login-email-page" name="email" class="form-input" placeholder="tu@correo.com" required autocomplete="username">
            </div>
            
            <div class="form-group" style="margin-bottom: 20px;">
              <label for="login-password-page" class="form-label">Contraseña</label>
              <div class="password-input-container">
                <input type="password" id="login-password-page" name="password" class="form-input" placeholder="****************" required autocomplete="current-password">
                <button type="button" class="password-toggle-btn" aria-label="Mostrar u ocultar contraseña">
                  <i data-lucide="eye"></i>
                </button>
              </div>
              <!-- <span class="form-help-text">Debe ser una combinación de mínimo 8 letras, números y símbolos.</span> -->
            </div>
            
            
            <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; font-size: 16px; padding: 14px; margin-bottom: 24px;">
              Iniciar Sesión
            </button>
            
            <p style="text-align: left; font-size: 14px; color: var(--color-text-secondary);">
              Todavía no tenés una cuenta? <a href="<?= BASE_URL ?>registro" style="color: var(--color-primary); font-weight: 600; text-decoration: underline;">Registrate</a>
            </p>
          </form>
        </div>
        
      </div>
    </div>
  </section>
</main>