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

    <!-- Search bar and Filter controls mockup -->
    <div style="background-color: var(--color-surface); padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--color-border); box-shadow: var(--shadow-sm); margin-bottom: 40px; display: flex; flex-direction: column; gap: 20px;">
      <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 16px;" class="form-row">
        <div class="form-group" style="margin-bottom: 0;">
          <label for="search-input" class="form-label" style="display: none;">Buscar</label>
          <input type="text" id="search-input" class="form-input" placeholder="Buscar por palabra clave, ONG o habilidad..." style="background-color: var(--color-background);">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label for="category-select" class="form-label" style="display: none;">Categoría</label>
          <select id="category-select" class="form-input" style="background-color: var(--color-background);">
            <option value="">Todas las categorías</option>
            <option value="medio-ambiente">Medio Ambiente</option>
            <option value="educacion">Educación</option>
            <option value="accion-social">Acción Social</option>
          </select>
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label for="location-select" class="form-label" style="display: none;">Ubicación</label>
          <select id="location-select" class="form-input" style="background-color: var(--color-background);">
            <option value="">Cualquier ubicación</option>
            <option value="buenos-aires">Buenos Aires</option>
            <option value="cordoba">Córdoba</option>
            <option value="rosario">Rosario</option>
          </select>
        </div>
      </div>
      
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button class="filter-btn active">Campañas</button>
          <button class="filter-btn">Organizaciones</button>
          <button class="filter-btn">Voluntarios</button>
        </div>
        <button class="btn btn-primary" style="padding: 10px 24px;">Buscar</button>
      </div>
    </div>

    <!-- Contenedor de Campañas Activas en Grilla -->
    <?php if (empty($campanias)): ?>
      <div style="text-align: center; padding: 40px; background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); color: var(--color-text-secondary); box-shadow: var(--shadow-sm);">
        No se encontraron campañas activas registradas en este momento.
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
              <span class="camp-org"><?= htmlspecialchars($camp['nombre']) ?></span>
              <h3 class="camp-title"><?= htmlspecialchars($camp['titulo']) ?></h3>
              <p class="camp-desc"><?= htmlspecialchars($camp['descripcion']) ?></p>
              
              <button class="btn btn-primary" onclick="openCampaignDetails(<?= $camp['id'] ?>)">Ver campaña</button>
            </div>
          </article>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
  </div>
</section>

<!-- INYECCIÓN DE VARIABLES Y CARGA DEL MODAL DE DETALLE COMPARTIDO -->
<script>
  window.campaigns = <?= json_encode($campanias ?? []); ?>;
</script>

<?php 
include_once '../app/views/componentes/perfil_comun_logueado.php';
renderModalDetalleCampania();
?>
