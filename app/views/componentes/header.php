<?php 
/** @var string $rutaVista */
?>
<!-- HEADER / NAVBAR -->
<header class="header" id="header">
  <div class="container nav-container">
    <a href="<?= BASE_URL ?>" class="logo-wrapper" id="nav-logo-link">
      <img src="<?= BASE_URL ?>img/logo_mano_a_mano-centrado.webp" alt="Logo Mano a Mano" class="logo-img">
    </a>
    
    <!-- Nav Links -->
    <nav aria-label="Navegación principal">
      <ul class="nav-links">
        <li><a href="<?= BASE_URL ?>" class="nav-link <?= ($rutaVista === 'inicio') ? 'active' : '' ?>" id="link-inicio">Inicio</a></li>
        <li><a href="<?= BASE_URL ?>conectar" class="nav-link <?= ($rutaVista === 'conectar') ? 'active' : '' ?>" id="link-conectar">Conectar</a></li>
        <li><a href="<?= BASE_URL ?>contacto" class="nav-link <?= ($rutaVista === 'contacto') ? 'active' : '' ?>" id="link-contacto">Contacto</a></li>
      </ul>
    </nav>
    
    <!-- Actions -->
    <div class="nav-actions">
      <?php if (isset($_SESSION['usuario_logueado']) && $_SESSION['usuario_logueado'] === true): ?>
        <!-- Logged In: Dropdown menu "Mi cuenta" -->
        <div class="nav-dropdown" id="nav-user-dropdown">
          <button class="nav-dropdown-toggle" aria-haspopup="true" aria-expanded="false" aria-label="Menú de usuario">
            <i data-lucide="user"></i>
            <span><?= htmlspecialchars($_SESSION['nombre_usuario'] . ($_SESSION['usuario_rol'] === 'voluntario' && isset($_SESSION['apellido_usuario']) ? ' ' . $_SESSION['apellido_usuario'] : '')) ?></span>
            <i data-lucide="chevron-down" style="width: 14px; height: 14px; margin-left: 2px;"></i>
          </button>
          <div class="nav-dropdown-menu" role="menu">
            <a href="<?= BASE_URL ?>perfil" class="nav-dropdown-item" role="menuitem">Ver perfil</a>
            <a href="<?= BASE_URL ?>cerrar-sesion" class="nav-dropdown-item" role="menuitem">Cerrar sesión</a>
          </div>
        </div>
      <?php else: ?>
        <!-- Not Logged In: Login/Register buttons -->
        <a href="<?= BASE_URL ?>sesion" class="btn btn-ghost" id="nav-login-btn">Iniciar sesión</a>
        <a href="<?= BASE_URL ?>registro" class="btn btn-primary" id="nav-register-btn">Registrarse</a>
      <?php endif; ?>
      <button class="mobile-menu-btn" id="mobile-menu-toggle" aria-label="Abrir menú" aria-expanded="false">
        <i data-lucide="menu"></i>
      </button>
    </div>
  </div>
</header>
