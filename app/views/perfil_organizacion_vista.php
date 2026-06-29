<?php
/**
 * Vista de Perfil de Organización (Público)
 * Mano a Mano MVC
 */
/** @var array $campaniasDetails */
?>
<main class="profile-view-container">
  
  <!-- PROFILE HEADER -->
  <section class="profile-header-sec">
    <div class="container profile-header-grid">
      <!-- Left: Logo/Avatar -->
      <div class="profile-avatar-wrapper">
        <div class="profile-avatar-circle">
          <?php if (!empty($usuario['img_perfil'])): ?>
            <img src="<?= BASE_URL . htmlspecialchars($usuario['img_perfil']) ?>" alt="Avatar organización" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
          <?php else: ?>
            <i data-lucide="image" class="avatar-placeholder-icon"></i>
          <?php endif; ?>
        </div>
      </div>
      <!-- Right: Org Name, Desc, Tags -->
      <div class="profile-info-content">
        <h1 class="profile-name"><?= htmlspecialchars($usuario['nombre'] ?? '') ?></h1>
        <p class="profile-desc-text">
          <?= htmlspecialchars($usuario['descripcion'] ?? 'Sin biografía cargada...') ?>
        </p>
        <div class="profile-tags-wrapper">
          <?php if (!empty($causas_organizacion)): ?>
            <?php foreach ($causas_organizacion as $causa): ?>
              <span class="tag-badge"><i data-lucide="tag"></i> <?= htmlspecialchars($causa) ?></span>
            <?php endforeach; ?>
          <?php endif; ?>
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
        <button class="profile-tab-btn" id="tab-btn-asociaciones" aria-controls="pane-asociaciones" aria-selected="false">
          Asociaciones
        </button>
      </div>

      <!-- FILTER AND SORT -->
      <div class="tabs-filters-bar">
        <div class="filter-group">
          <select class="filter-select" aria-label="Filtrar por">
            <option value="">Filtrar por</option>
            <option value="progreso">En progreso</option>
            <option value="terminada">Terminadas</option>
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
        
        <!-- PANE: CAMPAÑAS -->
        <div class="profile-pane active" id="pane-campanas" role="tabpanel">
          <div class="alternating-grid">
            <?php if (empty($campanias)): ?>
              <div class="volunteer-empty-state">No hay campañas publicadas todavía.</div>
            <?php else: ?>
              <?php foreach ($campanias as $index => $camp): 
                $isReverse = ($index % 2 !== 0);
                $cardClass = $isReverse ? 'alt-card alt-card-reverse' : 'alt-card';
                $imgHTML = '<i data-lucide="image"></i>';
                if (!empty($camp['imagenes'])) {
                    $imgHTML = '<img src="' . BASE_URL . htmlspecialchars($camp['imagenes'][0]) . '" alt="' . htmlspecialchars($camp['titulo']) . '" style="width:100%; height:100%; object-fit:cover;">';
                }
              ?>
              <article class="<?= $cardClass ?>">
                <div class="alt-card-img-col">
                  <div class="alt-card-img-placeholder">
                    <?= $imgHTML ?>
                  </div>
                </div>
                <div class="alt-card-content-col">
                  <h3 class="alt-card-title"><?= htmlspecialchars($camp['titulo']) ?></h3>
                  <p class="alt-card-desc"><?= htmlspecialchars($camp['descripcion'] ?? '') ?></p>
                  <button class="btn btn-primary btn-info" onclick="openCampaignDetailsModal(<?= $camp['id'] ?>)">+ Más información</button>
                </div>
              </article>
              <?php endforeach; ?>
            <?php endif; ?>
          </div>
        </div>

        <!-- PANE: ASOCIACIONES (Mockup Mold) -->
        <div class="profile-pane" id="pane-asociaciones" role="tabpanel">
          <div class="alternating-grid">
            
            <!-- Association 1 (Image Left) -->
            <article class="alt-card">
              <div class="alt-card-img-col">
                <div class="alt-card-img-placeholder">
                  <i data-lucide="image"></i>
                </div>
              </div>
              <div class="alt-card-content-col">
                <h3 class="alt-card-title">Asociación Civil Soles (Molde)</h3>
                <p class="alt-card-desc">Soles nos provee el espacio físico en su comedor comunitario los días de semana y coordina el contacto con las familias del barrio.</p>
                <button class="btn btn-primary btn-info" onclick="openAssociationDetailsModal(201)">+ Más información</button>
              </div>
            </article>

            <!-- Association 2 (Image Right) -->
            <article class="alt-card alt-card-reverse">
              <div class="alt-card-img-col">
                <div class="alt-card-img-placeholder">
                  <i data-lucide="image"></i>
                </div>
              </div>
              <div class="alt-card-content-col">
                <h3 class="alt-card-title">Red Alimentaria Solidaria (Molde)</h3>
                <p class="alt-card-desc">Colaboramos en la clasificación y logística de insumos frescos para garantizar la merienda saludable de los chicos en los talleres.</p>
                <button class="btn btn-primary btn-info" onclick="openAssociationDetailsModal(202)">+ Más información</button>
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

  <!-- CAROUSEL: NUESTROS VOLUNTARIOS FIJOS -->
  <section class="volunteers-carousel-sec">
    <div class="container">
      <h2 class="carousel-sec-title">Nuestros voluntarios fijos</h2>
      
      <div class="carousel-container-outer">
        <button class="carousel-nav-btn prev-btn" id="vol-carousel-prev" aria-label="Deslizar izquierda">
          <i data-lucide="chevron-left"></i>
        </button>
        
        <div class="carousel-track-viewport" id="vol-carousel-track">
          <?php if (empty($miembros)): ?>
            <div class="volunteer-empty-state">No hay miembros vinculados todavía.</div>
          <?php else: ?>
            <?php foreach ($miembros as $miembro): 
              $avatarSrc = !empty($miembro['img_perfil']) ? BASE_URL . htmlspecialchars($miembro['img_perfil']) : '';
            ?>
            <a href="<?= BASE_URL ?>perfil/voluntario?id=<?= $miembro['usuario_id'] ?>" class="vol-carousel-card">
              <div class="vol-card-avatar-wrapper">
                <div class="vol-card-avatar">
                  <?php if (!empty($avatarSrc)): ?>
                    <img src="<?= $avatarSrc ?>" alt="Miembro" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">
                  <?php else: ?>
                    <i data-lucide="user"></i>
                  <?php endif; ?>
                </div>
              </div>
              <h4 class="vol-card-name"><?= htmlspecialchars($miembro['nombre']) ?></h4>
              <span class="vol-card-role">Voluntario Fijo</span>
            </a>
            <?php endforeach; ?>
          <?php endif; ?>
        </div>

        <button class="carousel-nav-btn next-btn" id="vol-carousel-next" aria-label="Deslizar derecha">
          <i data-lucide="chevron-right"></i>
        </button>
      </div>

    </div>
  </section>

</main>

<!-- ASSOCIATION DETAIL MODAL (Reuses same structure) -->
<div class="modal-overlay" id="modal-profile-assoc-detail" role="dialog" aria-modal="true" aria-labelledby="m-assoc-title">
  <div class="modal-box modal-box-large">
    <button class="modal-close-btn" aria-label="Cerrar modal" onclick="closeProfileModal('modal-profile-assoc-detail')">
      <i data-lucide="x"></i>
    </button>
    
    <div class="modal-header-with-badge">
      <h3 class="modal-title" id="m-assoc-title">Nombre de la organización asociada</h3>
    </div>
    
    <div class="modal-main-content">
      <p class="modal-desc-para" id="m-assoc-desc">
        Descripción corta de la asociación y los lazos colaborativos con la organización actual.
      </p>
      
      <div class="modal-tags-row">
        <span class="tag-badge"><i data-lucide="tag"></i> Comunidad</span>
        <span class="tag-badge">Logística</span>
      </div>

      <div class="modal-gallery-sec">
        <h4>Trabajo colaborativo realizado</h4>
        <div class="modal-gallery-grid">
          <div class="gallery-placeholder-img"><i data-lucide="image"></i></div>
          <div class="gallery-placeholder-img"><i data-lucide="image"></i></div>
          <div class="gallery-placeholder-img"><i data-lucide="image"></i></div>
        </div>
      </div>
      
      <div class="modal-associations-sec">
        <h4>Otras ONGs vinculadas</h4>
        <div class="modal-associations-circles">
          <div class="assoc-circle-item">
            <div class="assoc-circle"><i data-lucide="image"></i></div>
            <span>Fundación Huellas</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="modal-footer-actions">
      <button class="btn btn-ghost" onclick="closeProfileModal('modal-profile-assoc-detail')">Cerrar</button>
    </div>
  </div>
</div>

<script>
  window.campaignsDetailsData = <?= json_encode($campaniasDetails) ?>;
</script>

<?php require_once '../app/views/componentes/perfil.php'; ?>
<?php renderModalDetalleCampaniaPublico(); ?>
