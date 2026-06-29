<?php 
/** @var array $campanias */
?>

<section class="section" style="padding-top: 140px; min-height: calc(100vh - 90px); display: flex; align-items: center;">
  <div class="container">
    <div class="section-header" style="margin-bottom: 40px;">
      <span class="section-tag">Conectar</span>
      <h1 class="section-title">Buscador de Campañas y Voluntariado</h1>
      <p class="section-subtitle">Explorá las campañas activas, organizaciones sociales registradas o perfiles de voluntarios disponibles en la comunidad.</p>
    </div>

    <!-- BARRAS DE BÚSQUEDA Y FILTROSs -->
    <div style="background-color: var(--color-surface); padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--color-border); box-shadow: var(--shadow-sm); margin-bottom: 40px; display: flex; flex-direction: column; gap: 20px;">
      <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 16px;" class="form-row">
        <div class="form-group" style="margin-bottom: 0;">
          <label for="search-input" class="form-label" style="display: none;">Buscar</label>
          <input type="text" id="keyword-search-input" class="form-input" placeholder="Buscar por palabra clave..." style="background-color: var(--color-background);" value="<?= htmlspecialchars($_GET['q'] ?? '') ?>">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label for="category-select" class="form-label" style="display: none;">Categoría</label>
          <select id="category-select" class="form-input" style="background-color: var(--color-background);">
            <!-- Se completa dinámicamente con js -->
          </select>
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <input type="text" id="location-search-input" class="form-input" placeholder="Buscar por ubicación..." style="background-color: var(--color-background);" value="<?= htmlspecialchars($_GET['location'] ?? '') ?>">
        </div>
      </div>
      
      <!-- Selección de filtro: qué muestra la grilla de búsqueda -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <?php $tabActiva = $_GET['tab'] ?? 'campaigns'; ?>
          <button class="filter-btn <?= $tabActiva === 'campaigns' ? 'active' : '' ?>" data-target="campaigns">Campañas</button>
          <button class="filter-btn <?= $tabActiva === 'organizations' ? 'active' : '' ?>" data-target="organizations">Organizaciones</button>
          <button class="filter-btn <?= $tabActiva === 'volunteers' ? 'active' : '' ?>" data-target="volunteers">Voluntarios</button>
        </div>
        <button class="btn btn-primary" id="search-action-btn" style="padding: 10px 24px;">Buscar</button>
      </div>
    </div>
    

    <!-- Contenedor de Campañas Activas en Grilla -->
    <div id="campaigns-section" class="search-section">
      <?php if (empty($campanias)): ?>
        <div style="text-align: center; padding: 40px; background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); color: var(--color-text-secondary); box-shadow: var(--shadow-sm);">
          No se encontraron campañas activas. Verifique los filtros o si está bien escrito lo que busca.
        </div>
      <?php else: ?>
        <div class="camps-carousel" id="campaigns-container">
          <?php foreach ($campanias as $camp): ?>
            <article class="camp-card">
              <div class="camp-img-wrapper">
                <img src="<?= !empty($camp['imagen']) ? BASE_URL . $camp['imagen'] : BASE_URL . 'img/img_generica.png' ?>" alt="<?= htmlspecialchars($camp['titulo']) ?>" class="camp-img">
                <?php if (!empty($camp['category'])): ?>
                  <span class="camp-cat-badge"><?= htmlspecialchars($camp['category']) ?></span>
                <?php endif; ?>
              </div>
              <div class="camp-content">
                <span class="camp-org"><?= htmlspecialchars($camp['usuario_nombre']) ?></span>
                <h3 class="camp-title"><?= htmlspecialchars($camp['titulo']) ?></h3>
                <p class="camp-desc"><?= htmlspecialchars($camp['descripcion']) ?></p>
                
                <button class="btn btn-primary" onclick="openCampaignDetails(<?= $camp['id'] ?>)">Ver campaña</button>
              </div>
            </article>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </div>

    <!-- Contenedor de Organizaciones (Listado de Filas) -->
    <div id="organizations-section" class="search-section" style="display: none;">
      <?php if (empty($organizaciones)): ?>
        <div class="empty-state">No se encontraron organizaciones. Verifique los filtros o si está bien escrito lo que busca.</div>
      <?php else: ?>
        <div class="users-list" id="organizations-container">
          <?php foreach ($organizaciones as $org): ?>
            <a href="<?= BASE_URL ?>perfil/organizacion?id=<?= $org['id'] ?>" class="user-row-card">                           <!-- Corregir acá el archivo a donde vá el perfil visual -->
              <div class="user-row-avatar">
                <img src="<?= !empty($org['img_perfil']) ? BASE_URL . $org['img_perfil'] : BASE_URL . 'img/img_generica.png' ?>" alt="<?= htmlspecialchars($org['nombre']) ?>" class="avatar-img">
              </div>
              <div class="user-row-info">
                <h4 class="user-row-name"><?= htmlspecialchars($org['nombre']) ?></h4>
                <p class="user-row-subtitle">Organización Solidaria • <?= htmlspecialchars($org['ubicacion'] ?? 'Ubicación no especificada') ?></p>
              </div>
              <i data-lucide="chevron-right" class="user-row-arrow"></i>
            </a>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </div>

    <!-- Contenedor de Voluntarios (Listado de Filas) -->
    <div id="volunteers-section" class="search-section" style="display: none;">
      <?php if (empty($voluntarios)): ?>
        <div class="empty-state">No se encontraron voluntarios. Verifique los filtros o si está bien escrito lo que busca.</div>
      <?php else: ?>
        <div class="users-list" id="volunteers-container">
          <?php foreach ($voluntarios as $vol): ?>
            <a href="<?= BASE_URL ?>perfil/voluntario?id=<?= $vol['id'] ?>" class="user-row-card">                     <!-- Corregir acá el archivo a donde vá el perfil visual -->
              <div class="user-row-avatar">
                <img src="<?= !empty($vol['img_perfil']) ? BASE_URL . $vol['img_perfil'] : BASE_URL . 'img/img_generica.png' ?>" alt="<?= htmlspecialchars($vol['nombre completo']) ?>" class="avatar-img">
              </div>
              <div class="user-row-info">
                <h4 class="user-row-name"><?= htmlspecialchars($vol['nombre completo']) ?></h4>
                <p class="user-row-subtitle">Voluntario • <?= htmlspecialchars($vol['ubicacion'] ?? 'Ubicación no especificada') ?></p>
              </div>
              <i data-lucide="chevron-right" class="user-row-arrow"></i>
            </a>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </div>

  </div>
</section>

<!-- INYECCIÓN DE VARIABLES Y CARGA DEL MODAL DE DETALLE COMPARTIDO -->
<script>
  window.campaigns = <?= json_encode($campanias ?? []); ?>;
  window.causesList = <?= json_encode(array_column($causas ?? [], 'causa')); ?>;
  window.oficiosList = <?= json_encode(array_column($oficios ?? [], 'oficio')); ?>;
  window.currentFilters = {
    tab: <?= json_encode($_GET['tab'] ?? 'campaigns'); ?>,
    category: <?= json_encode($_GET['category'] ?? ''); ?>
  };
</script>

<?php 
include_once '../app/views/componentes/perfil_comun_logueado.php';
renderModalDetalleCampania();
?>
