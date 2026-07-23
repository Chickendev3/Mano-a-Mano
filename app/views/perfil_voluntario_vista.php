<?php
/**
 * Vista de Perfil de Voluntario (Público)
 * Mano a Mano MVC
 */
/** @var array $campaniasDetails */
/** @var array $usuario */
/** @var int $cantVolutariados */

if (!function_exists('truncateDescription')) {
    function truncateDescription($text, $limit = 200) {
        if (empty($text)) return "";
        if (mb_strlen($text) > $limit) {
            return mb_substr($text, 0, $limit) . "...";
        }
        return $text;
    }
}
?>
<main class="profile-view-container vol-profile-page">
  
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
                <span>Voluntario en <?= htmlspecialchars($badge['nombre']) ?></span>
              </div>
            <?php endforeach; ?>
          <?php endif; ?>

          <!-- Pendiente de DESARROLLO: Contador de Asistencias -->
          <?php if ((!empty($cantVolutariados)) && ($cantVolutariados > 0)): ?>
          <div class="badge-row-item">
            <i data-lucide="check-square" class="badge-icon-blue"></i>
            <span>Voluntariados asistidos: <?php echo $cantVolutariados ?></span>
          </div>
          <?php endif; ?>

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

        <!-- Ubicación y Disponibilidad Horaria -->
        <div class="profile-meta-row" style="margin-top: 16px;">
          <?php if (!empty($usuario['ubicacion'])): ?>
            <div class="profile-meta-item">
              <i data-lucide="map-pin"></i>
              <span><?= htmlspecialchars($usuario['ubicacion']) ?></span>
            </div>
          <?php endif; ?>
          <?php if (!empty($usuario['disponibilidad_horaria'])): ?>
            <div class="profile-meta-item">
              <i data-lucide="clock"></i>
              <span><?= htmlspecialchars($usuario['disponibilidad_horaria']) ?></span>
            </div>
          <?php endif; ?>
        </div>
        
        <?php if (isset($_SESSION['id_usuario']) && $_SESSION['id_usuario'] != $usuario['id']): ?>
          <button class="btn btn-primary" id="btn-open-invite-modal" style="background-color: #87b189; border-color: #87b189; margin-top: 16px; display: inline-flex; align-items: center; gap: 8px; align-self: flex-end;">
            <i data-lucide="send" style="width: 16px; height: 16px;"></i> Invitar
          </button>
        <?php endif; ?>
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
            <option value="">Filtrar por(Todas) </option>
            <option value="activo">Activas</option>
            <option value="finalizado">Finalizadas</option>
          </select>
          <select class="filter-select" aria-label="Ordenar por">
            <option value="">Ordenar por (Defecto)</option>
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
                $cardClass = 'alt-card';
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

                  <p class="alt-card-desc"><?= htmlspecialchars(truncateDescription($camp['descripcion'] ?? '')) ?></p>
                  
                  <div class="camp-card-actions" style="margin-top: auto; display: flex; justify-content: flex-end; width: 100%;">
                    <?php
                    $statusLabel = 'Activa';
                    $statusPillClass = 'accepted-pill';
                    if ($camp['status'] === 'finalizada') {
                        $statusLabel = 'Finalizada';
                        $statusPillClass = 'rejected-pill';
                    } elseif ($camp['status'] === 'programada') {
                        $statusLabel = 'Programada';
                        $statusPillClass = 'scheduled-pill';
                    }
                    ?>
                    <span class="modal-status-badge <?= $statusPillClass ?>" style="font-size: 12px; padding: 8px 16px; border-radius: var(--radius-sm); font-weight: 600; text-transform: uppercase;">
                      <?= $statusLabel ?>
                    </span>
                  </div>
                </div>
              </article>
              <?php endforeach; ?>
            <?php endif; ?>
          </div>
        </div>

        <!-- PANE: VOLUNTARIADOS -->
        <div class="profile-pane" id="pane-voluntariados" role="tabpanel" style="display: none;">
          <div class="alternating-grid">
            <?php if (empty($voluntariados)): ?>
              <div class="volunteer-empty-state">No ha participado en ningún voluntariado todavía.</div>
            <?php else: ?>
              <?php foreach ($voluntariados as $index => $camp): 
                $cardClass = 'alt-card';
                $imgHTML = '<i data-lucide="image"></i>';
                if (!empty($camp['images'])) {
                    $imgHTML = '<img src="' . BASE_URL . htmlspecialchars($camp['images'][0]) . '" alt="' . htmlspecialchars($camp['title']) . '" style="width:100%; height:100%; object-fit:cover;">';
                }
              ?>
              <article class="<?= $cardClass ?>" onclick="openCampaignDetailsModal(<?= $camp['id'] ?>)" style="cursor: pointer;">
                <div class="alt-card-img-col">
                  <div class="alt-card-img-placeholder">
                    <?= $imgHTML ?>
                  </div>
                </div>
                <div class="alt-card-content-col">
                  <h3 class="alt-card-title"><?= htmlspecialchars($camp['title']) ?></h3>
                  <div class="profile-tags-wrapper" style="margin-top: 4px; margin-bottom: 12px; gap: 8px; flex-wrap: wrap; display: flex;">
                    <span class="tag-badge" style="padding: 4px 12px; font-size: 11px; height: auto;"><i data-lucide="tag" style="width:10px; height:10px;"></i> <?= htmlspecialchars($camp['category'] ?? 'Solidario') ?></span>
                  </div>
                  <p class="alt-card-desc"><?= htmlspecialchars(truncateDescription($camp['desc'] ?? '')) ?></p>
                  
                  <div class="camp-card-actions" style="margin-top: auto; display: flex; justify-content: flex-end; width: 100%;">
                    <?php
                    $statusLabel = 'Activa';
                    $statusPillClass = 'accepted-pill';
                    if ($camp['status'] === 'finalizada') {
                        $statusLabel = 'Finalizada';
                        $statusPillClass = 'rejected-pill';
                    } elseif ($camp['status'] === 'programada') {
                        $statusLabel = 'Programada';
                        $statusPillClass = 'scheduled-pill';
                    }
                    ?>
                    <span class="modal-status-badge <?= $statusPillClass ?>" style="font-size: 12px; padding: 8px 16px; border-radius: var(--radius-sm); font-weight: 600; text-transform: uppercase;">
                      <?= $statusLabel ?>
                    </span>
                  </div>
                </div>
              </article>
              <?php endforeach; ?>
            <?php endif; ?>
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

<div class="modal-overlay" id="modal-invite-user" role="dialog" aria-modal="true" aria-labelledby="invite-modal-title">
  <div class="modal-box" style="max-width: 450px;">
    <button class="modal-close-btn" aria-label="Cerrar modal" onclick="closeModal('modal-invite-user')">
      <i data-lucide="x"></i>
    </button>
    <h3 class="modal-title" id="invite-modal-title" style="margin-bottom: 16px;">Invitar a participar</h3>
    
    <div id="invite-modal-content">
      <p style="margin-bottom: 16px; font-size: 14px; color: var(--color-text-secondary);">
        Seleccioná una de tus convocatorias activas para invitar a este usuario:
      </p>
      
      <div class="form-group" style="margin-bottom: 20px;">
        <select id="invite-campaign-select" class="edit-input" style="width: 100%; padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--color-border); background-color: var(--color-surface); color: var(--color-text-primary);">
          <!-- Convocatorias cargadas dinámicamente -->
        </select>
      </div>
      
      <div style="display: flex; gap: 12px; justify-content: flex-end;">
        <button class="btn btn-ghost" onclick="closeModal('modal-invite-user')">Cancelar</button>
        <button class="btn btn-primary" id="btn-confirm-invite" style="background-color: #87b189; border-color: #87b189;">Confirmar invitación</button>
      </div>
    </div>
  </div>
</div>

<script>
  window.IS_LOGGED_IN = <?= isset($_SESSION['id_usuario']) ? 'true' : 'false' ?>;
  window.VISITED_USER_ID = <?= json_encode($usuario['id']) ?>;
  window.campaignsDetailsData = <?= json_encode($campaniasDetails) ?>;
</script>

<?php require_once '../app/views/componentes/perfil.php'; ?>
<?php renderModalDetalleCampaniaPublico(); ?>
