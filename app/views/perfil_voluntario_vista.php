<?php
/**
 * Vista de Perfil de Voluntario (Público)
 * Mano a Mano MVC
 */
/** @var array $campaniasDetails */
?>
<main class="profile-view-container">
  
  <!-- PROFILE HEADER -->
  <section class="profile-header-sec">
    <div class="container profile-header-grid">
      <!-- Left: Photo/Avatar -->
      <div class="profile-avatar-wrapper">
        <div class="profile-avatar-circle">
          <?php if (!empty($usuario['img_perfil'])): ?>
            <img src="<?= BASE_URL . htmlspecialchars($usuario['img_perfil']) ?>" alt="Avatar voluntario" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">
          <?php else: ?>
            <i data-lucide="image" class="avatar-placeholder-icon"></i>
          <?php endif; ?>
        </div>
      </div>
      <!-- Right: Name, Personal Desc, Statistics/Insignias -->
      <div class="profile-info-content">
        <h1 class="profile-name"><?= htmlspecialchars($usuario['nombre completo'] ?? '') ?></h1>
        
        <p class="profile-desc-text">
          <?= htmlspecialchars($usuario['descripcion'] ?? 'Sin biografía cargada...') ?>
        </p>

        <!-- Insignias and Statistics -->
        <div class="profile-badges-container">
          <?php if (!empty($insignias)): ?>
            <?php foreach ($insignias as $badge): ?>
              <div class="badge-row-item">
                <i data-lucide="award" class="badge-icon-gold"></i>
                <span>Insignia de Voluntariado Fijo en: <?= htmlspecialchars($badge['nombre']) ?></span>
              </div>
            <?php endforeach; ?>
          <?php endif; ?>

          <!-- Pendiente de DESARROLLO: Contador de Asistencias -->
          <div class="badge-row-item">
            <i data-lucide="check-square" class="badge-icon-blue"></i>
            <span>Asistencia a voluntariado: +7</span>
          </div>

          <!-- Oficios (Skills) -->
          <div class="badge-row-item skills-list-row">
            <i data-lucide="bookmark" class="badge-icon-tag"></i>
            <div class="skills-badges">
              <?php if (empty($oficios)): ?>
                <span class="skill-badge-text" style="opacity: 0.5;">Sin oficios registrados</span>
              <?php else: ?>
                <?php foreach ($oficios as $oficio): ?>
                  <span class="skill-badge-text"><?= htmlspecialchars($oficio['oficio']) ?></span>
                <?php endforeach; ?>
              <?php endif; ?>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </section>

  <!-- INTERNAL NAVIGATION TABS -->
  <section class="profile-tabs-sec">
    <div class="container">
      <div class="tabs-nav-bar">
        <button class="profile-tab-btn active" id="tab-btn-campanas" aria-controls="pane-campanas" aria-selected="true">
          Campañas
        </button>
        <button class="profile-tab-btn" id="tab-btn-voluntariados" aria-controls="pane-voluntariados" aria-selected="false">
          Voluntariados
        </button>
      </div>

      <!-- FILTER AND SORT -->
      <div class="tabs-filters-bar">
        <div class="filter-group">
          <select class="filter-select" aria-label="Filtrar por">
            <option value="">Filtrar por</option>
            <option value="activo">Activas</option>
            <option value="finalizado">Finalizadas</option>
          </select>
          <select class="filter-select" aria-label="Ordenar por">
            <option value="">Ordenar por</option>
            <option value="reciente">Más recientes</option>
            <option value="antiguas">Más antiguas</option>
          </select>
        </div>
      </div>

      <!-- DYNAMIC PANES CONTAINER -->
      <div class="dynamic-panes-wrapper">
        
        <!-- PANE: CAMPAÑAS (Created by volunteer) -->
        <div class="profile-pane active" id="pane-campanas" role="tabpanel">
          <div class="alternating-grid">
            <?php if (empty($campanias)): ?>
              <div class="volunteer-empty-state">No hay campañas creadas todavía.</div>
            <?php else: ?>
              <?php foreach ($campanias as $index => $camp): 
                $isReverse = ($index % 2 !== 0);
                $cardClass = $isReverse ? 'alt-card alt-card-reverse' : 'alt-card';
                $imgHTML = '<i data-lucide="image"></i>';
                if (!empty($camp['imagenes'])) {
                    $imgHTML = '<img src="' . BASE_URL . htmlspecialchars($camp['imagenes'][0]) . '" alt="' . htmlspecialchars($camp['titulo']) . '" style="width:100%; height:100%; object-fit:cover;">';
                }
              ?>
              <article class="<?= $cardClass ?>" onclick="openCampaignDetailsModal(<?= $camp['id'] ?>)">
                <div class="alt-card-img-col">
                  <div class="alt-card-img-placeholder">
                    <?= $imgHTML ?>
                  </div>
                </div>
                <div class="alt-card-content-col">
                  <h3 class="alt-card-title"><?= htmlspecialchars($camp['titulo']) ?></h3>
                  
                  <!-- Tags below the title -->
                  <div class="profile-tags-wrapper" style="margin-top: 4px; margin-bottom: 12px; gap: 8px; flex-wrap: wrap; display: flex;">
                    <?php if (!empty($camp['tags'])): ?>
                      <?php foreach ($camp['tags'] as $tag): ?>
                        <span class="tag-badge" style="padding: 4px 12px; font-size: 11px; height: auto;"><i data-lucide="tag" style="width:10px; height:10px;"></i> <?= htmlspecialchars($tag) ?></span>
                      <?php endforeach; ?>
                    <?php endif; ?>
                  </div>

                  <p class="alt-card-desc"><?= htmlspecialchars($camp['descripcion'] ?? '') ?></p>
                </div>
              </article>
              <?php endforeach; ?>
            <?php endif; ?>
          </div>
        </div>

        <!-- PANE: VOLUNTARIADOS (Mockup Mold) -->
        <div class="profile-pane" id="pane-voluntariados" role="tabpanel">
          <div class="alternating-grid">
            
            <!-- Card 1 (Image Left) -->
            <article class="alt-card">
              <div class="alt-card-img-col">
                <div class="alt-card-img-placeholder">
                  <i data-lucide="image"></i>
                </div>
              </div>
              <div class="alt-card-content-col">
                <h3 class="alt-card-title">Reforestación Parque Central (Molde)</h3>
                <p class="alt-card-desc">Ejemplo de voluntariado realizado. En el futuro, aquí se listarán de forma dinámica las asistencias computadas.</p>
                <button class="btn btn-primary btn-info" onclick="openCampaignDetailsModal(1)">+ Más información</button>
              </div>
            </article>

            <!-- Card 2 (Image Right) -->
            <article class="alt-card alt-card-reverse">
              <div class="alt-card-img-col">
                <div class="alt-card-img-placeholder">
                  <i data-lucide="image"></i>
                </div>
              </div>
              <div class="alt-card-content-col">
                <h3 class="alt-card-title">Colecta de Alimentos San Martín (Molde)</h3>
                <p class="alt-card-desc">Colaboré en la distribución, clasificación de stock y logística de donaciones destinadas a comedores.</p>
                <button class="btn btn-primary btn-info" onclick="openCampaignDetailsModal(3)">+ Más información</button>
              </div>
            </article>

          </div>
        </div>

      </div>

      <!-- PAGINATION CONTROLS -->
      <div class="pagination-container">
        <button class="pag-btn" aria-label="Anterior">&lt; Previous</button>
        <button class="pag-num">1</button>
        <button class="pag-num active">2</button>
        <button class="pag-num">3</button>
        <span class="pag-ellipsis">...</span>
        <button class="pag-btn" aria-label="Siguiente">Next &gt;</button>
      </div>

    </div>
  </section>

</main>

<script>
  window.IS_LOGGED_IN = <?= isset($_SESSION['id_usuario']) ? 'true' : 'false' ?>;
  window.campaignsDetailsData = <?= json_encode($campaniasDetails) ?>;
</script>

<?php require_once '../app/views/componentes/perfil.php'; ?>
<?php renderModalDetalleCampaniaPublico(); ?>
