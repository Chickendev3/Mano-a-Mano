<?php 
/** @var array $usuario */

/* Vista de Perfil de Voluntario (Logueado - Dashboard Privado) */
?>
<main class="profile-view-container">
  
  <!-- PROFILE HEADER -->
  <section class="profile-header-sec">
    <div class="container profile-header-grid">
      <!-- Left: Photo Placeholder (Editable) -->
      <div class="profile-avatar-wrapper">
        <div class="profile-avatar-circle editable" id="profile-avatar-clickable" onclick="document.getElementById('edit-avatar-input').click()">
          <img id="avatar-img-view" src="" alt="Avatar voluntario" style="display: none;">
          <i data-lucide="image" class="avatar-placeholder-icon" id="avatar-icon-placeholder"></i>
          <div class="avatar-edit-overlay">
            <i data-lucide="camera"></i>
            <span>Cambiar foto</span>
          </div>
        </div>
        <input type="file" id="edit-avatar-input" accept="image/*" style="display: none;">
      </div>
      
      <!-- Right: Name, Personal Desc, Statistics/Insignias (Editable) -->
      <div class="profile-info-content">
        
        <!-- READ-ONLY STATE (Visible by default) -->
        <div id="profile-view-state">
          <h1 class="profile-name"> <?php echo $usuario['nombre completo'] ?> </h1>
          
          <p class="profile-desc-text">
            <?php echo $usuario['descripcion'] ?>
          </p>

          <div class="profile-meta-row">
            <div class="profile-meta-item">
              <i data-lucide="map-pin"></i>
              <span><?php echo $usuario['ubicacion'] ?></span>
            </div>
            <?php if (!empty($usuario['disponibilidad_horaria'])): ?>
            <div class="profile-meta-item">
              <i data-lucide="clock"></i>
              <span><?php echo $usuario['disponibilidad_horaria'] ?></span>
            </div>
            <?php endif; ?>
          </div>

          <!-- Private Information Section (Only visible to the volunteer on their private dashboard) -->
          <div class="private-info-section" style="margin-top: 16px; padding: 16px; background: rgba(99, 102, 241, 0.04); border: 1px solid rgba(99, 102, 241, 0.12); border-radius: var(--radius-md);">
            <h4 style="font-size: 13px; font-weight: 700; color: var(--color-primary); margin-bottom: 12px; display: flex; align-items: center; gap: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
              <i data-lucide="lock" style="width: 14px; height: 14px;"></i> Información Privada (Brindada al aceptar postulaciones)
            </h4>
            <div class="profile-meta-row" style="margin-top: 0; gap: 12px 24px;">
              <div class="profile-meta-item">
                <i data-lucide="mail"></i>
                <span> <?php echo $usuario['email'] ?> </span>
              </div>
              <div class="profile-meta-item">
                <i data-lucide="phone"></i>
                <span>Tel. Principal: <strong> <?php echo $usuario['telefono'] ?> </strong></span>
              </div>
              <div class="profile-meta-item">
                <i data-lucide="phone-call"></i>
                <span>Tel. Secundario: 
                  <strong>
                  <?php if (!empty($usuario['telefono_emergencia'])):
                    echo $usuario['telefono_emergencia'];
                  else:
                    echo 'No asignado';
                  endif; ?>
                  </strong>
                </span>
              </div>
            </div>
          </div>

          <!-- Insignias and Statistics (Static - Not editable by user) -->
          <div class="profile-badges-container" style="margin-top: 20px;">
            <div class="badge-row-item">
              <i data-lucide="award" class="badge-icon-gold"></i>
              <span>Insignia de Voluntariado Fijo en organización: Techo Verde</span>
            </div>
            <div class="badge-row-item">
              <i data-lucide="award" class="badge-icon-gold"></i>
              <span>Insignia de Voluntariado Fijo en organización: Mentes Brillantes</span>
            </div>
            <div class="badge-row-item">
              <i data-lucide="check-square" class="badge-icon-blue"></i>
              <span>Asistencia a voluntariado: +7</span>
            </div>
            <div class="badge-row-item skills-list-row">
              <i data-lucide="bookmark" class="badge-icon-tag"></i>
              <div class="skills-badges" id="view-skills-badges">
                <!-- Populated dynamically -->
              </div>
            </div>
          </div>

          <button class="btn btn-ghost" id="edit-profile-btn" style="margin-top: 16px;">
            <i data-lucide="edit-3"></i> Editar perfil
          </button>
        </div>

        <!-- INLINE EDIT STATE (Hidden by default) -->
        <div class="profile-info-edit-form" id="profile-edit-state" style="display: none;">
          <h3 style="font-size: 14px; font-weight: 700; border-bottom: 1px solid var(--color-border); padding-bottom: 6px; margin-bottom: 16px; color: var(--color-text-primary);">Información Pública</h3>
          
          <div class="form-group-row" style="margin-bottom: 12px;">
            <div class="edit-row">
              <label for="edit-name">Nombre y Apellido</label>
              <input type="text" id="edit-name" class="edit-input">
            </div>
            <div class="edit-row">
              <label for="edit-location">Ubicación</label>
              <input type="text" id="edit-location" class="edit-input">
            </div>
          </div>

          <div class="edit-row" style="margin-bottom: 12px;">
            <label for="edit-desc">Descripción</label>
            <textarea id="edit-desc" class="edit-input" rows="3"></textarea>
          </div>

          <div class="edit-row" style="margin-bottom: 12px;">
            <label for="edit-availability">Horario de Disponibilidad</label>
            <input type="text" id="edit-availability" class="edit-input" placeholder="Ej: Lunes a Viernes de 9:00 a 13:00 o Sábados todo el día">
          </div>

          <div class="edit-row" style="margin-bottom: 16px;">
            <label>Etiquetas de oficio</label>
            <div class="edit-tags-container" id="edit-tags-list">
              <!-- Populated dynamically -->
            </div>
            <div class="tag-search-wrapper">
              <input type="text" id="tag-search-input" class="edit-input" placeholder="Buscar oficios (ej: Cocinero, Profesor, Electricista, Plomero...)">
              <ul class="tag-suggestions-list" id="tag-suggestions">
                <!-- Suggestions dropdown populated by JS -->
              </ul>
            </div>
          </div>

          <h3 style="font-size: 14px; font-weight: 700; border-bottom: 1px solid var(--color-border); padding-bottom: 6px; margin-bottom: 16px; color: var(--color-text-primary); margin-top: 20px;">Información Privada (Solo para organizaciones asociadas)</h3>

          <div class="edit-row" style="margin-bottom: 12px;">
            <label for="edit-email">Email (gmail)</label>
            <input type="email" id="edit-email" class="edit-input">
          </div>

          <div class="form-group-row" style="margin-bottom: 16px;">
            <div class="edit-row">
              <label for="edit-phone1">Teléfono Principal</label>
              <input type="text" id="edit-phone1" class="edit-input">
            </div>
            <div class="edit-row">
              <label for="edit-phone2">Teléfono Secundario</label>
              <input type="text" id="edit-phone2" class="edit-input">
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
        <button class="profile-tab-btn" id="tab-btn-postulaciones" aria-controls="pane-postulaciones" aria-selected="false">
          Postulaciones
        </button>
        <button class="profile-tab-btn" id="tab-btn-invitaciones" aria-controls="pane-invitaciones" aria-selected="false">
          Invitaciones
        </button>
        <button class="profile-tab-btn" id="tab-btn-voluntariado" aria-controls="pane-voluntariado" aria-selected="false">
          Voluntariado
        </button>
      </div>

      <!-- DYNAMIC PANES CONTAINER -->
      <div class="dynamic-panes-wrapper">
        
        <!-- PANE: GESTIONAR CAMPAÑAS (ABM) -->
        <div class="profile-pane active" id="pane-gestionar" role="tabpanel">
          <div class="pane-header-actions">
            <h2>Campañas</h2>
            <button class="btn btn-primary" id="btn-create-campaign-modal">
              <i data-lucide="plus" style="width: 16px; height: 16px; margin-right: 4px;"></i> Crear campaña
            </button>
          </div>

          <!-- FILTER AND SORT (Mockup controls) -->
          <div class="tabs-filters-bar">
            <div class="filter-group">
              <select class="filter-select" id="filter-campaigns-select" aria-label="Filtrar por">
                <option value="">Filtrar por (Todas)</option>
                <option value="convocatoria">Campaña con postulaciones (Convocatorias)</option>
                <option value="informativa">Campaña informativa (sin postulaciones)</option>
              </select>
              <select class="filter-select" id="sort-campaigns-select" aria-label="Ordenar por">
                <option value="">Ordenar por (Por defecto)</option>
                <option value="reciente">Más recientes</option>
                <option value="antiguas">Más antiguas</option>
              </select>
            </div>
          </div>

          <!-- Alternating Campaigns List Grid -->
          <div class="alternating-grid" id="my-campaigns-grid">
            <!-- Populated dynamically via JS -->
          </div>

          <!-- PAGINATION CONTROLS -->
          <div class="pagination-container" id="campaigns-pagination">
            <!-- Populated dynamically via JS -->
          </div>
        </div>

        <!-- PANE: POSTULACIONES -->
        <div class="profile-pane" id="pane-postulaciones" role="tabpanel">
          <div class="pane-header-actions">
            <h2>Postulaciones</h2>
          </div>

          <!-- FILTER AND SORT -->
          <div class="tabs-filters-bar">
            <div class="filter-group">
              <select class="filter-select" id="filter-postulations-select" aria-label="Filtrar por">
                <option value="">Filtrar por (Todas)</option>
                <option value="aceptado">Aceptadas</option>
                <option value="pendiente">Pendientes</option>
                <option value="rechazado">Rechazadas</option>
              </select>
              <select class="filter-select" id="sort-postulations-select" aria-label="Ordenar por">
                <option value="">Ordenar por (Por defecto)</option>
                <option value="reciente">Más recientes</option>
                <option value="antiguas">Más antiguas</option>
              </select>
            </div>
          </div>

          <!-- Postulations List Grid -->
          <div class="alternating-grid" id="my-postulations-grid">
            <!-- Populated dynamically via JS -->
          </div>

          <!-- PAGINATION CONTROLS -->
          <div class="pagination-container" id="postulations-pagination">
            <!-- Populated dynamically via JS -->
          </div>
        </div>

        <!-- PANE: INVITACIONES -->
        <div class="profile-pane" id="pane-invitaciones" role="tabpanel">
          
          <!-- SECTION 1: INVITACIONES RECIBIDAS -->
          <div class="invites-section" style="margin-bottom: 40px;">
            <div class="pane-header-actions">
              <h2>Invitaciones Recibidas</h2>
            </div>
            
            <div class="tabs-filters-bar">
              <div class="filter-group">
                <select class="filter-select" id="filter-received-select" aria-label="Filtrar por">
                  <option value="">Filtrar por (Todas)</option>
                  <option value="medio-ambiente">Medio Ambiente</option>
                  <option value="educacion">Educación</option>
                  <option value="accion-social">Acción Social</option>
                  <option value="cultura">Cultura</option>
                </select>
                <select class="filter-select" id="sort-received-select" aria-label="Ordenar por">
                  <option value="">Ordenar por (Por defecto)</option>
                  <option value="reciente">Más recientes</option>
                  <option value="antiguas">Más antiguas</option>
                </select>
              </div>
            </div>

            <div class="invites-list-container alternating-grid" id="received-invitations-list">
              <!-- Populated dynamically via JS -->
            </div>

            <div class="pagination-container" id="received-invitations-pagination">
              <!-- Populated dynamically via JS -->
            </div>
          </div>

          <!-- SECTION 2: TUS INVITACIONES (ENVIADAS) -->
          <div class="invites-section">
            <div class="pane-header-actions">
              <h2>Tus invitaciones</h2>
            </div>

            <div class="tabs-filters-bar">
              <div class="filter-group">
                <select class="filter-select" id="filter-sent-select" aria-label="Filtrar por">
                  <option value="">Filtrar por (Todas)</option>
                  <option value="pendiente">Pendientes</option>
                  <option value="aceptado">Aceptadas</option>
                  <option value="rechazado">Rechazadas</option>
                </select>
                <select class="filter-select" id="sort-sent-select" aria-label="Ordenar por">
                  <option value="">Ordenar por (Por defecto)</option>
                  <option value="reciente">Más recientes</option>
                  <option value="antiguas">Más antiguas</option>
                </select>
              </div>
            </div>

            <div class="invites-list-container alternating-grid" id="sent-invitations-list">
              <!-- Populated dynamically via JS -->
            </div>

            <div class="pagination-container" id="sent-invitations-pagination">
              <!-- Populated dynamically via JS -->
            </div>
          </div>

        </div>

        <!-- PANE: VOLUNTARIADO -->
        <div class="profile-pane" id="pane-voluntariado" role="tabpanel">
          <div class="pane-header-actions">
            <h2>Voluntariados</h2>
          </div>

          <!-- FILTER AND SORT -->
          <div class="tabs-filters-bar">
            <div class="filter-group">
              <select class="filter-select" id="filter-volunteering-select" aria-label="Filtrar por">
                <option value="">Filtrar por (Todas)</option>
                <option value="activa">Activas</option>
                <option value="finalizada">Finalizadas</option>
              </select>
              <select class="filter-select" id="sort-volunteering-select" aria-label="Ordenar por">
                <option value="">Ordenar por (Por defecto)</option>
                <option value="reciente">Más recientes</option>
                <option value="antiguas">Más antiguas</option>
              </select>
            </div>
          </div>

          <!-- Volunteering List Grid -->
          <div class="invites-list-container alternating-grid" id="my-volunteering-grid">
            <!-- Populated dynamically via JS -->
          </div>

          <!-- PAGINATION CONTROLS -->
          <div class="pagination-container" id="volunteering-pagination">
            <!-- Populated dynamically via JS -->
          </div>
        </div>

      </div>

    </div>
  </section>

</main>

<!-- ==========================================
     SECCIONES DE VISTAS DE MODAL
     ========================================== -->

<!-- 1. CAMPAIGN DETAILS VIEW MODAL (SHARED) -->
<?php include '../app/views/componentes/modal_campana.php'; ?>

<!-- 2. CREATE CAMPAIGN MODAL -->
<div class="modal-overlay" id="modal-create-campaign" role="dialog" aria-modal="true" aria-labelledby="create-camp-title">
  <div class="modal-box modal-box-large">
    <button class="modal-close-btn" aria-label="Cerrar modal" onclick="closeModal('modal-create-campaign')">
      <i data-lucide="x"></i>
    </button>
    
    <h3 class="modal-title" id="create-camp-title" style="margin-bottom: 24px;">Crear nueva campaña</h3>
    
    <script>
      // Forzar variables globales para el frontend desde MariaDB
      window.availableCampaignCauses = <?= json_encode($causas ?? []); ?>;
      window.campaigns = <?= json_encode($campaniasUsuario ?? []); ?>;
    </script>
    <form action="<?= BASE_URL ?>crear-campania" method="POST" enctype="multipart/form-data" class="campaign-modal-form" id="create-camp-form">
      
      <!-- Campaign Type -->
      <div class="edit-row">
        <label>Elija el tipo de campaña:</label>
        <div class="radio-group-type">
          <label class="radio-label">
            <input type="radio" name="tipo_campania" value="convocatoria" checked onchange="toggleCreateAddInfoField()">
            <span>Campaña Convocatoria</span>
          </label>
          <label class="radio-label">
            <input type="radio" name="tipo_campania" value="informativa" onchange="toggleCreateAddInfoField()">
            <span>Campaña Informativa</span>
          </label>
        </div>
      </div>
      <!-- create-camp-type era el anterior a tipo-campania -->

      <!-- Campaign Title -->
      <div class="edit-row">
        <label for="create-title">Titulo de la Campaña</label>
        <input type="text" name="titulo_campania" id="create-title" class="edit-input" placeholder="Ingrese el titulo de la campaña" required>
      </div>

      <!-- Campaign Description -->
      <div class="edit-row">
        <label for="create-desc">Descripción de la Campaña</label>
        <textarea id="create-desc" name="descripcion_campania" class="edit-input" rows="2" placeholder="Describa e ingrese los detalles de la Campaña" required></textarea>
      </div>

      <!-- Causas de la Campaña (Etiquetas con buscador) -->
      <div class="edit-row">
        <label>Causas de la Campaña</label>
        <div class="edit-tags-container" id="create-campaign-causes-list">
          <!-- Se completa dinámicamente con JS -->
        </div>
        <div class="tag-search-wrapper">
          <input type="text" id="campaign-cause-search-input" class="edit-input" placeholder="Buscar causas (ej: Educación, Medio Ambiente, Salud...)">
          <ul class="tag-suggestions-list" id="campaign-cause-suggestions">
            <!-- Sugerencias dinámicas de JS -->    <!-- FALTAN LAS SUGERENCIAS -->
          </ul>
        </div>
      </div>

      <div class="edit-row">
        <label for="create-location">Ubicación</label>
        <input type="text" name="ubicacion" id="create-location" class="edit-input" placeholder="Ej: Rosario, Santa Fe" required>
      </div>

      <!-- Dates -->
      <div class="form-group-row">
        <div class="edit-row">
          <label for="create-start-date">Fecha de inicio</label>
          <input type="date" name="fecha_inicio" id="create-start-date" class="edit-input" required>
        </div>
        <div class="edit-row">
          <label for="create-end-date">Fecha de finalización</label>
          <input type="date" name="fecha_fin" id="create-end-date" class="edit-input" required>
        </div>
      </div>

      <!-- Additional Info (Conditional for Convocatoria) -->
      <div class="edit-row" id="create-additional-info-group">
        <label for="create-additional">Información adicional (Solo visible para postulantes aceptados)</label>
        <textarea id="create-additional" name="info_adicional" class="edit-input" rows="3" placeholder="Ej: Dirección exacta, teléfono del coordinador, herramientas a traer..."></textarea>
      </div>

      <!-- Imágenes de la campaña (Real) -->
      <div class="edit-row">
        <label>Imágenes de la campaña (Máximo 3)</label>
        <!-- Botón visual para hacer clic en el input de archivo oculto -->
        <div class="image-upload-simulation" onclick="document.getElementById('campaign-images-input').click()">
          <div class="image-upload-simulation-content">
            <i data-lucide="image-plus"></i>
            <span>Seleccionar imágenes</span>
          </div>
        </div>

        <!-- Input de archivos oculto -->
        <input type="file" name="imagenes[]" id="campaign-images-input" multiple accept="image/*" style="display: none;" onchange="handleFileSelect(event)">
        
        <!-- Grid para ver las imágenes seleccionadas -->
        <div class="uploaded-images-grid" id="create-images-preview-grid">
          <!-- Se completa dinámicamente con JS -->
        </div>
      </div>

      <div id="create-camp-message-box"></div>  

      <div class="modal-footer-actions" style="margin-top: 16px;">
        <button type="button" class="btn btn-ghost" onclick="closeModal('modal-create-campaign')">Cancelar</button>
        <button type="submit" class="btn btn-primary">Crear campaña</button>
      </div>
      
    </form>
  </div>
</div>

<!-- 3. MODIFY CAMPAIGN MODAL -->
<div class="modal-overlay" id="modal-modify-campaign" role="dialog" aria-modal="true" aria-labelledby="modify-camp-title">
  <div class="modal-box modal-box-large">
    <button class="modal-close-btn" aria-label="Cerrar modal" onclick="closeModal('modal-modify-campaign')">
      <i data-lucide="x"></i>
    </button>
    
    <h3 class="modal-title" id="modify-camp-title" style="margin-bottom: 24px;">Modificar campaña</h3>
    
    <form action="<?= BASE_URL ?>modificar-campania" method="POST" enctype="multipart/form-data" class="campaign-modal-form" id="modify-camp-form">  
      
      <input type="hidden" name="id_campania" id="modify-campaign-id-input"> <!-- Envía el ID de la campaña que estamos modificando -->

      <!-- Campaign Type -->
      <div class="edit-row">
        <label>Tipo de Campaña: </label>  
        <div class="radio-group-type">
          <label class="radio-label">
            <input type="radio" name="tipo_campania" value="convocatoria" id="modify-type-convocatoria" disabled>
            <span>Campaña Convocatoria</span>
          </label>
          <label class="radio-label">
            <input type="radio" name="tipo_campania" value="informativa" id="modify-type-informativa" disabled>
            <span>Campaña Informativa</span>
          </label>
        </div>
      </div>

      <!-- Campaign Title -->
      <div class="edit-row">
        <label for="modify-title">Nombre de la campaña</label>
        <input type="text" name="titulo_campania" id="modify-title" class="edit-input" required>
      </div>

      <!-- Campaign Short Description -->
      <div class="edit-row">
        <label for="modify-desc">Descripción</label>
        <textarea name="descripcion_campania" id="modify-desc" class="edit-input" rows="2" required></textarea>
      </div>

      <!-- Causas de la Campaña (Etiquetas con buscador para Modificar) -->
      <div class="edit-row" style="margin-bottom: 16px; width: 100%;">
        <label>Causas de la Campaña (Selección con buscador)</label>
        <div class="edit-tags-container" id="modify-campaign-causes-list">
          <!-- Se completa dinámicamente con JS -->
        </div>
        <div class="tag-search-wrapper">
          <input type="text" id="modify-campaign-cause-search-input" class="edit-input" placeholder="Buscar causas (ej: Educación, Medio Ambiente, Salud...)">
          <ul class="tag-suggestions-list" id="modify-campaign-cause-suggestions">
            <!-- Sugerencias dinámicas de JS -->
          </ul>
        </div>
      </div>

      <div class="edit-row">
        <label for="modify-location">Ubicación</label>
        <input type="text" name="ubicacion" id="modify-location" class="edit-input" required>
      </div>

      <!-- Dates -->
      <div class="form-group-row">
        <div class="edit-row">
          <label for="modify-start-date">Fecha de inicio</label>
          <input type="date" name="fecha_inicio" id="modify-start-date" class="edit-input" required>
        </div>
        <div class="edit-row">
          <label for="modify-end-date">Fecha de finalización</label>
          <input type="date" name="fecha_fin" id="modify-end-date" class="edit-input" required>
        </div>
      </div>

      <!-- MOSTRAR NADA MÁS SI LA CAMPAÑA ES CONVOCATORIA -->
      <div class="edit-row" id="modify-additional-info-group">
        <label for="modify-additional">Información adicional (Solo visible para postulantes aceptados)</label>
        <textarea name="info_adicional" id="modify-additional" class="edit-input" rows="3"></textarea>
      </div>

      <!-- Imágenes de la campaña (Real para Modificar) -->
      <div class="edit-row">
        <label>Imágenes de la campaña (Máximo 3)</label>
        <div class="image-upload-simulation" onclick="document.getElementById('modify-campaign-images-input').click()">
          <div class="image-upload-simulation-content">
            <i data-lucide="image-plus"></i>
            <span>Seleccionar imágenes</span>
          </div>
        </div>
        
        <!-- Input oculto de archivos -->
        <input type="file" name="imagenes[]" id="modify-campaign-images-input" multiple accept="image/*" style="display: none;" onchange="handleModifyFileSelect(event)">
        
        <div class="uploaded-images-grid" id="modify-images-preview-grid">
          <!-- Se completa dinámicamente con JS -->
        </div>
      </div>

      <!-- Caja de mensajes de error/éxito -->
      <div id="modify-camp-message-box"></div>
      
      <div class="modal-footer-actions" style="margin-top: 16px;">
        <button type="submit" class="btn btn-primary">Guardar Cambios</button>
      </div>
      
    </form>
  </div>
</div>

<!-- 4. DELETE CONFIRMATION MODAL -->
<div class="modal-overlay" id="modal-delete-confirm" role="dialog" aria-modal="true" aria-labelledby="delete-confirm-title">
  <div class="modal-box modal-box-small" style="max-width: 400px; padding: 24px; text-align: center;">
    <h3 class="modal-title" id="delete-confirm-title" style="color: #EF4444; font-size: 18px; margin-bottom: 12px;">¿Eliminar campaña?</h3>
    <p style="font-size: 14px; color: var(--color-text-secondary); margin-bottom: 24px; line-height: 1.5;">Esta acción no se puede deshacer. La campaña se borrará permanentemente de tu perfil.</p>
    <div style="display: flex; gap: 12px; justify-content: center;">
      <button class="btn btn-ghost" onclick="closeModal('modal-delete-confirm')">Cancelar</button>
      <button class="btn btn-primary" id="confirm-delete-btn" style="background-color: #EF4444; border-color: #EF4444; color: #ffffff;">Eliminar</button>
    </div>
  </div>
</div>

<!-- 5. CANCEL POSTULATION CONFIRMATION MODAL -->
<div class="modal-overlay" id="modal-cancel-postulation-confirm" role="dialog" aria-modal="true" aria-labelledby="cancel-postulation-title">
  <div class="modal-box modal-box-small" style="max-width: 400px; padding: 24px; text-align: center;">
    <h3 class="modal-title" id="cancel-postulation-title" style="color: #EF4444; font-size: 18px; margin-bottom: 12px;">¿Cancelar postulación?</h3>
    <p style="font-size: 14px; color: var(--color-text-secondary); margin-bottom: 24px; line-height: 1.5;">Esta acción retirará tu postulación de la campaña y ya no aparecerá en tu lista.</p>
    <div style="display: flex; gap: 12px; justify-content: center;">
      <button class="btn btn-ghost" onclick="closeModal('modal-cancel-postulation-confirm')">Volver</button>
      <button class="btn btn-primary" id="confirm-cancel-postulation-btn" style="background-color: #EF4444; border-color: #EF4444; color: #ffffff;">Cancelar postulación</button>
    </div>
  </div>
</div>

<!-- 6. CANCEL INVITATION CONFIRMATION MODAL -->
<div class="modal-overlay" id="modal-cancel-invitation-confirm" role="dialog" aria-modal="true" aria-labelledby="cancel-invitation-title">
  <div class="modal-box modal-box-small" style="max-width: 400px; padding: 24px; text-align: center;">
    <h3 class="modal-title" id="cancel-invitation-title" style="color: #EF4444; font-size: 18px; margin-bottom: 12px;">¿Cancelar invitación?</h3>
    <p style="font-size: 14px; color: var(--color-text-secondary); margin-bottom: 24px; line-height: 1.5;">Esta acción retirará la invitación enviada y ya no estará disponible para el destinatario.</p>
    <div style="display: flex; gap: 12px; justify-content: center;">
      <button class="btn btn-ghost" onclick="closeModal('modal-cancel-invitation-confirm')">Volver</button>
      <button class="btn btn-primary" id="confirm-cancel-invitation-btn" style="background-color: #EF4444; border-color: #EF4444; color: #ffffff;">Cancelar invitación</button>
    </div>
  </div>
</div>
