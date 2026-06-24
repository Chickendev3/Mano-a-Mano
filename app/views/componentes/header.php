<!-- FIXED HEADER / NAVBAR -->
<header class="header" id="header">
  <div class="container nav-container">
    <a href="<?= BASE_URL ?>" class="logo-wrapper" id="nav-logo-link">
      <img src="<?= BASE_URL ?>img/Logo_mano_a_mano_sin_fondo.png" alt="Logo Mano a Mano" class="logo-img">
    </a>
    
    <!-- Nav Links -->
    <nav aria-label="Navegación principal">
      <ul class="nav-links">
        <li><a href="<?= BASE_URL ?>" class="nav-link <?= ($rutaVista === 'inicio') ? 'active' : '' ?>" id="link-inicio"><i data-lucide="home"></i> Inicio</a></li>
        <li><a href="<?= BASE_URL ?>conectar" class="nav-link <?= ($rutaVista === 'conectar') ? 'active' : '' ?>" id="link-conectar"><i data-lucide="users"></i> Conectar</a></li>
        <li><a href="<?= BASE_URL ?>contacto" class="nav-link <?= ($rutaVista === 'contacto') ? 'active' : '' ?>" id="link-contacto"><i data-lucide="mail"></i> Contacto</a></li>
      </ul>
    </nav>
    
    <!-- Actions -->
    <div class="nav-actions">
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
              <i data-lucide="user"></i> Mi Perfil
            </a>
            <a href="<?= BASE_URL . $perfil_url ?>#postulaciones" class="nav-dropdown-item" role="menuitem">
              <i data-lucide="clipboard-list"></i> Mis Inscripciones
            </a>
            <a href="<?= BASE_URL . $perfil_url ?>#configuracion" class="nav-dropdown-item" role="menuitem">
              <i data-lucide="settings"></i> Configuración
            </a>
            <div class="nav-dropdown-divider"></div>
            <a href="<?= BASE_URL ?>sesion/salir" class="nav-dropdown-item logout" role="menuitem">
              <i data-lucide="log-out"></i> Cerrar Sesión
            </a>
          </div>
        </div>
      <?php else: ?>
        <!-- Not Logged In: Login/Register buttons -->
        <a href="<?= BASE_URL ?>sesion" class="btn btn-ghost" id="nav-login-btn"><i data-lucide="user"></i> Iniciar sesión</a>
        <a href="<?= BASE_URL ?>registro" class="btn btn-primary" id="nav-register-btn">Registrarse <span class="arrow-circle"><i data-lucide="arrow-right"></i></span></a>
      <?php endif; ?>
      <button class="mobile-menu-btn" id="mobile-menu-toggle" aria-label="Abrir menú" aria-expanded="false">
        <i data-lucide="menu"></i>
      </button>
    </div>
  </div>
</header>
