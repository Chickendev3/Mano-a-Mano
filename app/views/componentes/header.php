<!-- FIXED HEADER / NAVBAR -->
<header class="header" id="header">
  
  <div class="container nav-container">
    <!-- Wavy Logo Brand Group -->
    <a href="<?= BASE_URL ?>" class="logo-wrapper" id="nav-logo-link">
      <img src="<?= BASE_URL ?>img/Logo_mano_a_mano_sin_fondo.png" alt="Logo Mano a Mano" class="logo-img">
      <div class="logo-text-group">
        <span class="logo-title">Mano a Mano</span>
        <span class="logo-subtitle">Conectamos voluntades, generamos impacto</span>
      </div>
    </a>
    
    <!-- Nav Links with Icons -->
    <nav aria-label="Navegación principal">
      <ul class="nav-links">
        <li>
          <a href="<?= BASE_URL ?>" class="nav-link <?= ($rutaVista === 'inicio') ? 'active' : '' ?>" id="link-inicio">
            <i data-lucide="home"></i> <span>Inicio</span>
          </a>
        </li>
        <li>
          <a href="<?= BASE_URL ?>conectar" class="nav-link <?= ($rutaVista === 'conectar') ? 'active' : '' ?>" id="link-conectar">
            <i data-lucide="users"></i> <span>Conectar</span>
          </a>
        </li>
        <li>
          <a href="<?= BASE_URL ?>contacto" class="nav-link <?= ($rutaVista === 'contacto') ? 'active' : '' ?>" id="link-contacto">
            <i data-lucide="mail"></i> <span>Contacto</span>
          </a>
        </li>
      </ul>
    </nav>
    
    <!-- Actions with Icons & Custom CTAs -->
    <div class="nav-actions">
      <!-- Theme Switcher Toggle -->
      <!--<button id="theme-toggle-btn" class="btn-theme-toggle" aria-label="Cambiar tema de color">
        <i data-lucide="sun" class="theme-icon-light"></i>
        <i data-lucide="moon" class="theme-icon-dark"></i>
      </button>-->
      
      <?php if (isset($_SESSION['usuario_logueado']) && $_SESSION['usuario_logueado'] === true): ?>
        <!-- Logged In: Dropdown menu "Mi cuenta" -->
        <div class="nav-dropdown" id="nav-user-dropdown">
          <button class="nav-dropdown-toggle" aria-haspopup="true" aria-expanded="false" aria-label="Menú de usuario">
            <i data-lucide="user"></i>
            <span>Mi cuenta</span>
            <i data-lucide="chevron-down" style="width: 14px; height: 14px; margin-left: 2px;"></i>
          </button>
          <div class="nav-dropdown-menu" role="menu">
            <?php 
              $perfil_url = (isset($_SESSION['usuario_rol']) && $_SESSION['usuario_rol'] === 'voluntario') ? 'perfil_voluntario_logueado' : 'perfil_organizacion_logueado';
            ?>
            <a href="<?= BASE_URL . $perfil_url ?>" class="nav-dropdown-item" role="menuitem">
              <i data-lucide="user" style="width: 14px; height: 14px; margin-right: 6px;"></i> Mi Perfil
            </a>
            <a href="<?= BASE_URL ?>sesion/salir" class="nav-dropdown-item logout" role="menuitem">
              <i data-lucide="log-out" style="width: 14px; height: 14px; margin-right: 6px;"></i> Cerrar sesión
            </a>
          </div>
        </div>
      <?php else: ?>
        <!-- Not Logged In: Login/Register buttons -->
        <a href="<?= BASE_URL ?>sesion" class="btn btn-ghost nav-login-btn" id="nav-login-btn">
          <i data-lucide="user"></i> <span>Iniciar sesión</span>
        </a>
        <a href="<?= BASE_URL ?>registro" class="btn btn-primary nav-cta-register" id="nav-register-btn">
          <span>Registrarse</span> <i data-lucide="arrow-right" class="nav-cta-arrow"></i>
        </a>
      <?php endif; ?>
      <button class="mobile-menu-btn" id="mobile-menu-toggle" aria-label="Abrir menú" aria-expanded="false">
        <i data-lucide="menu"></i>
      </button>
    </div>
  </div>
</header>
