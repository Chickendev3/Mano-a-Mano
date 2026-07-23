<?php
/**
 * Vista de Perfil de Organización (Logueada - Dashboard Privado)
 * Mano a Mano MVC
 */
/** @var array $causas_organizacion */
/** @var array $causas */
/** @var array $campaniasUsuario */

include '../app/views/componentes/perfil_comun_logueado.php'; 
?>
<main class="profile-view-container org-profile-page">
  
  <!-- PROFILE HEADER -->
  <section class="profile-header-sec">
    <div class="container profile-header-grid">
      <!-- Left: Photo Placeholder (Editable) -->
      <div class="profile-avatar-wrapper">
        <div class="profile-avatar-circle editable" id="profile-avatar-clickable" onclick="document.getElementById('edit-avatar-input').click()">
          <img id="avatar-img-view" src="<?= !empty($usuario['img_perfil']) ? BASE_URL . $usuario['img_perfil'] : '' ?>" alt="Avatar organización" style="<?= !empty($usuario['img_perfil']) ? 'display: block;' : 'display: none;' ?>">
          <i data-lucide="image" class="avatar-placeholder-icon" id="avatar-icon-placeholder" style="<?= !empty($usuario['img_perfil']) ? 'display: none;' : 'display: block;' ?>"></i>
          <div class="avatar-edit-overlay">
            <i data-lucide="camera"></i>
            <span>Cambiar foto</span>
          </div>
        </div>
        <input type="file" id="edit-avatar-input" accept="image/*" style="display: none;">
      </div>
      
      <!-- Right: Name, Description, Causes, Location, Email (Editable) -->
      <div class="profile-info-content">
        
        <!-- ESTADO LECTURA (Visible por defecto) -->
        <div id="profile-view-state">
          <h1 class="profile-name" id="view-profile-name"><?php echo htmlspecialchars($usuario['nombre'] ?? ''); ?></h1>
          
          <p class="profile-desc-text" id="view-profile-desc">
            <?php echo !empty($usuario['descripcion']) ? htmlspecialchars($usuario['descripcion']) : 'Sin biografía cargada...'; ?>
          </p>

          <!-- Causes / Tags Container Box -->
          <div class="profile-badges-container org-causes-container" id="view-skills-row" style="margin-top: 16px; <?= empty($causas_organizacion) ? 'display: none;' : '' ?>">
            <div class="profile-tags" id="view-causes-badges" style="display: flex; gap: 8px; flex-wrap: wrap;">
              <?php foreach ($causas_organizacion as $causa): ?>
                <span class="tag-badge"><?php echo htmlspecialchars($causa); ?></span>
              <?php endforeach; ?>
            </div>
          </div>

          <!-- Ubicación y Correo -->
          <div class="profile-meta-row" style="margin-top: 16px;">
            <div class="profile-meta-item">
              <i data-lucide="map-pin"></i>
              <span id="view-profile-location"><?php echo htmlspecialchars($usuario['ubicacion'] ?? 'No especificada'); ?></span>
            </div>
            <div class="profile-meta-item">
              <i data-lucide="mail"></i>
              <span id="view-profile-email"><?php echo htmlspecialchars($usuario['email'] ?? ''); ?></span>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; width: 100%; flex-wrap: wrap; gap: 12px;">
            <button class="btn btn-ghost" id="edit-profile-btn" style="margin-top: 0;">
              <i data-lucide="edit-3"></i> Editar perfil
            </button>
            <button class="btn btn-danger-outline" id="btn-delete-account">
              <i data-lucide="user-x" style="width: 16px; height: 16px;"></i> Eliminar Cuenta
            </button>
          </div>
        </div>

        <!-- INLINE EDIT STATE (Hidden by default) -->
        <div class="profile-info-edit-form" id="profile-edit-state" style="display: none;">
          
          <div class="form-group-row" style="margin-bottom: 12px;">
            <div class="edit-row">
              <label for="edit-name">Nombre de la Organización</label>
              <input type="text" id="edit-name" class="edit-input">
            </div>
            <div class="edit-row">
              <label for="edit-location">Ubicación</label>
              <input type="text" id="edit-location" class="edit-input" placeholder="Provincia, Localidad, Ciudad">
            </div>
          </div>

          <div class="edit-row" style="margin-bottom: 12px;">
            <label for="edit-desc">Descripción</label>
            <textarea id="edit-desc" class="edit-input" rows="4" placeholder="Describa los propósitos de su Organización."></textarea>
          </div>

          <div class="edit-row" style="margin-bottom: 12px;">
            <label for="edit-email">Email de Contacto</label>
            <input type="email" id="edit-email" class="edit-input">
          </div>

          <div class="edit-row" style="margin-bottom: 16px;">
            <label>Etiquetas de causas (Selección con buscador)</label>
            <div class="edit-tags-container" id="edit-tags-list">
              <!-- Populated dynamically -->
            </div>
            <div class="tag-search-wrapper">
              <input type="text" id="tag-search-input" class="edit-input" placeholder="Buscar causas (ej: Niñez, Educación, Salud, Medio Ambiente...)">
              <ul class="tag-suggestions-list" id="tag-suggestions">
                <!-- Suggestions dropdown populated by JS -->
              </ul>
            </div>
          </div>

          <div class="camp-card-actions" style="margin-top: 16px;">
            <button class="btn btn-primary" id="save-profile-btn">Guardar</button>
            <button class="btn btn-ghost" id="cancel-profile-btn">Cancelar</button>
          </div>
        </div>
        
      </div>
    </div>
  </section>

  <!-- INTERNAL NAVIGATION TABS -->
  <section class="profile-tabs-sec">
    <div class="container">
      <div class="tabs-nav-bar">
        <button class="profile-tab-btn active" id="tab-btn-gestionar" aria-controls="pane-gestionar" aria-selected="true">
          Gestionar campañas
        </button>
        <button class="profile-tab-btn" id="tab-btn-voluntarios" aria-controls="pane-voluntarios" aria-selected="false">
          Gestionar voluntarios fijos
        </button>
        <button class="profile-tab-btn" id="tab-btn-asociaciones" aria-controls="pane-asociaciones" aria-selected="false">
          Asociaciones
        </button>
        <button class="profile-tab-btn" id="tab-btn-invitaciones" aria-controls="pane-invitaciones" aria-selected="false">
          Invitaciones
        </button>
      </div>

      <!-- DYNAMIC PANES CONTAINER -->
      <div class="dynamic-panes-wrapper">
        
        <!-- PANE: GESTIONAR CAMPAÑAS (ABM) -->
        <div class="profile-pane active" id="pane-gestionar" role="tabpanel">
          <div class="pane-header-actions">
            <h2>Campañas creadas</h2>
            <button class="btn btn-primary" id="btn-create-campaign-modal">
              <i data-lucide="plus" style="width: 16px; height: 16px; margin-right: 4px;"></i> Crear campaña
            </button>
          </div>

          <!-- FILTER AND SORT -->
          <div class="tabs-filters-bar">
            <div class="filter-group">
              <select class="filter-select" id="filter-campaigns-select" aria-label="Filtrar por">
                <option value="">Filtrar por (Todas)</option>
                <option value="convocatoria">Campañas Convocatorias</option>
                <option value="informativa">Campañas Informativas</option>
              </select>
              <select class="filter-select" id="sort-campaigns-select" aria-label="Ordenar por">
                <option value="">Ordenar por (Defecto)</option>
                <option value="reciente">Mas recientes</option>
                <option value="antiguas">Mas antiguas</option>
              </select>
            </div>
          </div>

          <!-- Campaigns List Grid (Strictly image on the left, reuse invite-card design) -->
          <div class="invites-list-container alternating-grid" id="my-campaigns-grid">
            <!-- Populated dynamically via JS -->
          </div>

          <!-- PAGINATION CONTROLS -->
          <div class="pagination-container" id="campaigns-pagination">
            <!-- Populated dynamically via JS -->
          </div>
        </div>

        <!-- PANE: GESTIONAR VOLUNTARIOS FIJOS -->
        <div class="profile-pane" id="pane-voluntarios" role="tabpanel">
          <div class="pane-header-actions">
            <h2>Voluntarios fijos</h2>
            <button class="btn btn-primary" id="btn-toggle-volunteer-search">
              <i data-lucide="user-plus" style="width: 16px; height: 16px; margin-right: 4px;"></i> Nuevo voluntario fijo
            </button>
          </div>

          <!-- SEARCH SECTION (Hidden by default) -->
          <div class="volunteer-search-container" id="volunteer-search-container" style="display: none;">
            <h3 class="volunteer-search-title">Buscar voluntario por correo electrónico</h3>
            <div class="volunteer-search-row">
              <input type="email" id="volunteer-search-email" class="edit-input" placeholder="ejemplo@correo.com">
              <button class="btn btn-primary volunteer-search-btn" id="btn-execute-volunteer-search">
                <i data-lucide="search" style="width: 16px; height: 16px; margin-right: 4px;"></i> Buscar
              </button>
            </div>
            
            <!-- SEARCH RESULTS AREA -->
            <div class="volunteer-search-results-area" id="volunteer-search-results">
              <!-- Dynamically populated card or message -->
            </div>
          </div>

          <!-- VOLUNTARIOS FIJOS SECTIONS -->
          <div>
            <h3 class="volunteer-section-title">Listado de voluntarios fijos</h3>
            <div class="invites-list-container" id="fixed-volunteers-list">
              <!-- Populated dynamically via JS -->
            </div>
          </div>

          <div>
            <h3 class="volunteer-section-title discharged">Listado de voluntarios dados de baja</h3>
            <div class="invites-list-container" id="discharged-volunteers-list">
              <!-- Populated dynamically via JS -->
            </div>
          </div>
        </div>

        <!-- PANE: ASOCIACIONES -->
        <div class="profile-pane" id="pane-asociaciones" role="tabpanel">
          <div class="pane-header-actions">
            <h2>Asociaciones</h2>
          </div>

          <!-- FILTERS AND SORT -->
          <div class="tabs-filters-bar">
            <div class="filter-group">
              <select class="filter-select" id="filter-associations-select" aria-label="Filtrar por">
                <option value="">Filtrar por (Todas)</option>
                <option value="activas">Campañas Activas</option>
                <option value="finalizadas">Campañas Finalizadas</option>
              </select>
              <select class="filter-select" id="sort-associations-select" aria-label="Ordenar por">
                <option value="">Ordenar por (Defecto)</option>
                <option value="reciente">Mas recientes (Descendente)</option>
                <option value="antiguas">Mas antiguas (Ascendente)</option>
              </select>
            </div>
          </div>

          <!-- Associations List Grid -->
          <div class="invites-list-container alternating-grid" id="associations-list">
            <!-- Populated dynamically via JS -->
          </div>

          <!-- PAGINATION CONTROLS -->
          <div class="pagination-container" id="associations-pagination">
            <!-- Populated dynamically via JS -->
          </div>
        </div>

        <!-- PANE: INVITACIONES -->
        <?php renderPanelInvitaciones($causas); ?>

      </div>

    </div>
  </section>

</main>

<!-- ==========================================
     MODALS SECTION & DYNAMIC SCRIPTS
     ========================================== -->

<script>
  window.initialUserProfile = {
    name: <?= json_encode($usuario['nombre'] ?? '') ?>,
    desc: <?= json_encode($usuario['descripcion'] ?? '') ?>,
    location: <?= json_encode($usuario['ubicacion'] ?? '') ?>,
    email: <?= json_encode($usuario['email'] ?? '') ?>,
    avatar: <?= json_encode(!empty($usuario['img_perfil']) ? BASE_URL . $usuario['img_perfil'] : '') ?>,
    causes: <?= json_encode($causas_organizacion ?? []) ?>
  };
  window.availableCauses = <?= json_encode($causas ?? []) ?>;
  window.campaigns = <?= json_encode($campaniasUsuario ?? []) ?>;
</script>

<?php 
renderModalDetalleCampania();
renderModalesComunesPerfil($causas, $campaniasUsuario);
?>