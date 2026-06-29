<?php 
/**
 * Componentes Comunes de Perfil (Campañas e Invitaciones)
 * Mano a Mano MVC
 * 
 * Este archivo contiene los paneles de interfaz y modales compartidos 
 * entre los perfiles de Voluntarios y Organizaciones.
 */

// =========================================================================
// 1. PANEL DE GESTIONAR CAMPAÑAS
// =========================================================================
function renderPanelGestionarCampanias() {
?>
<div class="profile-pane active" id="pane-gestionar" role="tabpanel">
  <div class="pane-header-actions">
    <h2>Campañas</h2>
    <button class="btn btn-primary" id="btn-create-campaign-modal">
      <i data-lucide="plus" style="width: 16px; height: 16px; margin-right: 4px;"></i> Crear campaña
    </button>
  </div>

  <!-- Filtros y Ordenamiento de Campañas -->
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

  <!-- Grilla de Campañas del Usuario -->
  <div class="alternating-grid" id="my-campaigns-grid">
    <!-- Se completa dinámicamente con JS -->
  </div>

  <!-- Controles de Paginación de Campañas -->
  <div class="pagination-container" id="campaigns-pagination">
    <!-- Se completa dinámicamente con JS -->
  </div>
</div>
<?php
}

// =========================================================================
// 2. PANEL DE INVITACIONES
// =========================================================================
function renderPanelInvitaciones($causas = []) {
?>
<div class="profile-pane" id="pane-invitaciones" role="tabpanel">
  
  <!-- SECCIÓN A: INVITACIONES RECIBIDAS -->
  <div class="invites-section" style="margin-bottom: 40px;">
    <div class="pane-header-actions">
      <h2>Invitaciones Recibidas</h2>
    </div>
    
    <div class="tabs-filters-bar">
      <div class="filter-group">
        <!-- Filtro por Estado de Invitación -->
        <select class="filter-select" id="filter-received-select" aria-label="Filtrar por">
          <option value="">Filtrar por (Todas)</option>
          <option value="pendiente">Pendientes</option>
          <option value="aceptado">Aceptadas</option>
          <option value="rechazado">Rechazadas</option>
        </select>
        
        <select class="filter-select" id="sort-received-select" aria-label="Ordenar por">
          <option value="">Ordenar por (Por defecto)</option>
          <option value="reciente">Más recientes</option>
          <option value="antiguas">Más antiguas</option>
        </select>
      </div>
    </div>
    <div class="invites-list-container alternating-grid" id="received-invitations-list">
      <!-- Se completa dinámicamente con JS -->
    </div>
    <div class="pagination-container" id="received-invitations-pagination">
      <!-- Se completa dinámicamente con JS -->
    </div>
  </div>
  <!-- SECCIÓN B: TUS INVITACIONES -->
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
      <!-- Se completa dinámicamente con JS -->
    </div>
    <div class="pagination-container" id="sent-invitations-pagination">
      <!-- Se completa dinámicamente con JS -->
    </div>
  </div>
</div>
<?php
}

// =========================================================================
// 3. MODALES COMUNES (CREACIÓN, EDICIÓN Y ELIMINACIÓN)
// =========================================================================
function renderModalesComunesPerfil( $causas = [], $campaniasUsuario = [] ) {
  //global $causas, $campaniasUsuario;
?>
<!-- MODAL DE CREACIÓN DE CAMPAÑA -->
<div class="modal-overlay" id="modal-create-campaign" role="dialog" aria-modal="true" aria-labelledby="create-camp-title">
  <div class="modal-box modal-box-large">
    <button class="modal-close-btn" aria-label="Cerrar modal" onclick="closeModal('modal-create-campaign')">
      <i data-lucide="x"></i>
    </button>
    
    <h3 class="modal-title" id="create-camp-title" style="margin-bottom: 24px;">Crear nueva campaña</h3>
    
    <script>
      // Inyección segura de variables globales para el frontend desde MariaDB
      window.availableCampaignCauses = <?= json_encode($causas ?? []); ?>;
      window.campaigns = <?= json_encode($campaniasUsuario ?? []); ?>;
    </script>
    
    <form action="<?= BASE_URL ?>crear-campania" method="POST" enctype="multipart/form-data" class="campaign-modal-form" id="create-camp-form">  
      
      <!-- Tipo de Campaña -->
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

      <!-- Título de la Campaña -->
      <div class="edit-row">
        <label for="create-title">Título de la Campaña</label>
        <input type="text" name="titulo_campania" id="create-title" class="edit-input" placeholder="Ingrese el título de la campaña" required>
      </div>

      <!-- Descripción de la Campaña -->
      <div class="edit-row">
        <label for="create-desc">Descripción de la Campaña</label>
        <textarea id="create-desc" name="descripcion_campania" class="edit-input" rows="2" placeholder="Describa e ingrese los detalles de la Campaña" required></textarea>
      </div>

      <!-- Causas de la Campaña (Etiquetas dinámicas con buscador) -->
      <div class="edit-row">
        <label>Causas de la Campaña</label>
        <div class="edit-tags-container" id="create-campaign-causes-list">
          <!-- Se completa dinámicamente con JS -->
        </div>
        <div class="tag-search-wrapper">
          <input type="text" id="campaign-cause-search-input" class="edit-input" placeholder="Buscar causas (ej: Educación, Medio Ambiente, Salud...)">
          <ul class="tag-suggestions-list" id="campaign-cause-suggestions">
            <!-- Sugerencias dinámicas de JS -->
          </ul>
        </div>
      </div>

      <!-- Ubicación -->
      <div class="edit-row">
        <label for="create-location">Ubicación</label>
        <input type="text" name="ubicacion" id="create-location" class="edit-input" placeholder="Ej: Rosario, Santa Fe" required>
      </div>

      <!-- Fechas de Inicio y Finalización -->
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

      <!-- Información Adicional (Condicional para Convocatorias) -->
      <div class="edit-row" id="create-additional-info-group">
        <label for="create-additional">Información adicional (Solo visible para postulantes aceptados)</label>
        <textarea id="create-additional" name="info_adicional" class="edit-input" rows="3" placeholder="Ej: Dirección exacta, teléfono del coordinador, herramientas a traer..."></textarea>
      </div>

      <!-- Imágenes de la Campaña (Máximo 3) -->
      <div class="edit-row">
        <label>Imágenes de la campaña (Máximo 3)</label>
        <div class="image-upload-simulation" onclick="document.getElementById('campaign-images-input').click()">
          <div class="image-upload-simulation-content">
            <i data-lucide="image-plus"></i>
            <span>Seleccionar imágenes</span>
          </div>
        </div>

        <input type="file" name="imagenes[]" id="campaign-images-input" multiple accept="image/*" style="display: none;" onchange="handleFileSelect(event)">
        
        <div class="uploaded-images-grid" id="create-images-preview-grid">
          <!-- Se completa dinámicamente con JS -->
        </div>
      </div>

      <div id="create-camp-message-box"></div>

      <!-- Acciones del Footer del Modal -->
      <div class="modal-footer-actions" style="margin-top: 16px;">
        <button type="button" class="btn btn-ghost" onclick="closeModal('modal-create-campaign')">Cancelar</button>
        <button type="submit" class="btn btn-primary">Crear campaña</button>
      </div>
    </form>
  </div>
</div>

<!-- MODAL DE MODIFICACIÓN DE CAMPAÑA -->
<div class="modal-overlay" id="modal-modify-campaign" role="dialog" aria-modal="true" aria-labelledby="modify-camp-title">
  <div class="modal-box modal-box-large">
    <button class="modal-close-btn" aria-label="Cerrar modal" onclick="closeModal('modal-modify-campaign')">
      <i data-lucide="x"></i>
    </button>
    
    <h3 class="modal-title" id="modify-camp-title" style="margin-bottom: 24px;">Modificar campaña</h3>
    
    <form action="<?= BASE_URL ?>modificar-campania" method="POST" enctype="multipart/form-data" class="campaign-modal-form" id="modify-camp-form">  
      <input type="hidden" name="id_campania" id="modify-campaign-id-input">

      <!-- Tipo de Campaña (Solo Lectura en Modificación) -->
      <div class="edit-row">
        <label>Tipo de Campaña: </label>  
        <div class="radio-group-type">
          <label class="radio-label">
            <input type="radio" name="modify_tipo_campania" value="convocatoria" id="modify-type-convocatoria" disabled>
            <span>Campaña Convocatoria</span>
          </label>
          <label class="radio-label">
            <input type="radio" name="modify_tipo_campania" value="informativa" id="modify-type-informativa" disabled>
            <span>Campaña Informativa</span>
          </label>
        </div>
      </div>

      <!-- Nombre de la Campaña -->
      <div class="edit-row">
        <label for="modify-title">Nombre de la campaña</label>
        <input type="text" name="titulo_campania" id="modify-title" class="edit-input" required>
      </div>

      <!-- Descripción de la Campaña -->
      <div class="edit-row">
        <label for="modify-desc">Descripción</label>
        <textarea name="descripcion_campania" id="modify-desc" class="edit-input" rows="2" required></textarea>
      </div>

      <!-- Causas de la Campaña (Etiquetas dinámicas con buscador para Modificar) -->
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

      <!-- Ubicación -->
      <div class="edit-row">
        <label for="modify-location">Ubicación</label>
        <input type="text" name="ubicacion" id="modify-location" class="edit-input" required>
      </div>

      <!-- Fechas de Inicio y Finalización -->
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

      <!-- Información Adicional (Condicional para Convocatorias) -->
      <div class="edit-row" id="modify-additional-info-group">
        <label for="modify-additional">Información adicional (Solo visible para postulantes aceptados)</label>
        <textarea name="info_adicional" id="modify-additional" class="edit-input" rows="3"></textarea>
      </div>

      <!-- Gestión de Imágenes de la Campaña (Existentes y Nuevas) -->
      <div class="edit-row">
        <label>Imágenes de la campaña (Máximo 3)</label>
        <div class="image-upload-simulation" onclick="document.getElementById('modify-campaign-images-input').click()">
          <div class="image-upload-simulation-content">
            <i data-lucide="image-plus"></i>
            <span>Seleccionar imágenes</span>
          </div>
        </div>
        
        <input type="file" name="imagenes[]" id="modify-campaign-images-input" multiple accept="image/*" style="display: none;" onchange="handleModifyFileSelect(event)">
        
        <div class="uploaded-images-grid" id="modify-images-preview-grid">
          <!-- Se completa dinámicamente con JS -->
        </div>
      </div>

      <!-- Caja de mensajes de error/éxito dentro del modal -->
      <div id="modify-camp-message-box"></div>
      
      <div class="modal-footer-actions" style="margin-top: 16px;">
        <button type="button" class="btn btn-ghost" onclick="closeModal('modal-modify-campaign')">Cancelar</button>
        <button type="submit" class="btn btn-primary">Guardar Cambios</button>
      </div>
    </form>
  </div>
</div>

<!-- MODAL DE CONFIRMACIÓN PARA ELIMINAR CAMPAÑA -->
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

<!-- MODAL DE CONFIRMACIÓN PARA CANCELAR INVITACIÓN ENVIADA -->
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
<?php
}

// =========================================================================
// 4. MODAL DE DETALLE GENERAL DE CAMPAÑA (SHARED)
// =========================================================================
function renderModalDetalleCampania() {
?>
<div class="modal-overlay" id="modal-profile-camp-detail" role="dialog" aria-modal="true" aria-labelledby="m-camp-title">
  <div class="modal-box modal-box-large">
    <!-- Botón de Cierre -->
    <button class="modal-close-btn" aria-label="Cerrar modal" onclick="closeModal('modal-profile-camp-detail')">
      <i data-lucide="x"></i>
    </button>
    
    <!-- Cabecera: Título y Badge de Estado -->
    <div class="modal-header-with-badge">
      <h3 class="modal-title" id="m-camp-title">Nombre campaña</h3>
      <span class="modal-status-badge accepted-pill" id="m-camp-accepted-badge" style="display: none;">ACEPTADO</span>
    </div>
    
    <!-- Contenido Principal -->
    <div class="modal-main-content">
      <!-- Creador de la Campaña -->
      <a href="#" class="modal-creator-container" id="m-camp-creator-link" style="display: none;">
        <div class="modal-creator-avatar" id="m-camp-creator-avatar">
          <!-- Inyectado dinámicamente por JS -->
        </div>
        <div class="modal-creator-info">
          <span class="modal-creator-label">Publicado por</span>
          <span class="modal-creator-name" id="m-camp-creator-name">Nombre del Creador</span>
        </div>
        <i data-lucide="chevron-right" class="modal-creator-arrow"></i>
      </a>
      
      <!-- Párrafo original único para la descripción y los datos estructurados por JS -->
      <div class="modal-desc-para" id="m-camp-desc">
        Descripción de la campaña y sus objetivos solidarios.
      </div>
      
      <div class="modal-tags-row" id="m-camp-tags">
        <!-- Inyectado por JS -->
      </div>
      
      <!-- Selector de simulación de estado (Solo para desarrollo/pruebas) -->
      <div class="dev-state-selector-card">
        <span class="dev-label">Simular Estado (Voluntario Logueado):</span>
        <div class="dev-options">
          <label><input type="radio" name="dev-state-choice" value="no-login" checked> No registrado</label>
          <label><input type="radio" name="dev-state-choice" value="registrado-pendiente"> Registrado (Pendiente)</label>
          <label><input type="radio" name="dev-state-choice" value="registrado-aceptado"> Registrado (Aceptado)</label>
          <label><input type="radio" name="dev-state-choice" value="registrado-rechazado"> Registrado (Rechazado)</label>
        </div>
      </div>

      <!-- Información de Coordinación (Desbloqueada cuando el voluntario es ACEPTADO) -->
      <div class="unlocked-info-box" id="m-camp-sensitive-info" style="display: none;">
        <!-- Se completa dinámicamente con JS -->
      </div>

      <!-- Galería de Fotos -->
      <div class="modal-gallery-sec" id="m-camp-gallery-sec" style="display: none;">
        <h4>Galería de fotos</h4>
        <div class="modal-gallery-grid" id="m-camp-gallery-grid">
          <!-- Imágenes inyectadas por JS -->
        </div>
      </div>

      <!-- Organizaciones Asociadas -->
      <div class="modal-associations-sec" id="m-camp-associations-sec" style="display: none;">
        <h4>Organizaciones en asociación</h4>
        <div class="modal-associations-circles" id="m-camp-associations-list">
          <!-- Organizaciones inyectadas por JS -->
        </div>
      </div>
    </div>

    <!-- Acciones del Footer del Modal -->
    <div class="modal-footer-actions">
      <button class="btn btn-ghost" onclick="closeModal('modal-profile-camp-detail')">Cerrar</button>
      <button class="btn btn-primary" id="m-camp-postulate-btn">Postularme</button>
    </div>

    <!-- Sección de Gestión de Postulaciones (Visible solo para el Creador de la Campaña) -->
    <div class="modal-owner-postulations-sec" id="m-camp-owner-postulations-sec" style="display: none; margin-top: 24px;">
      <h4 style="margin-bottom: 16px; font-weight: 600; color: var(--color-text-dark); border-bottom: 1px solid var(--color-border); padding-bottom: 8px;">
        Gestión de Voluntarios
      </h4>
      
      <!-- Desplegable 1: Postulados (Pendientes) -->
      <details class="postulations-accordion" id="acc-pending">
        <summary style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <span>Voluntarios Postulados</span>
          <span class="count-badge" id="count-pending" style="background-color: var(--color-border); padding: 2px 8px; border-radius: 12px; font-size: 11px;">0</span>
        </summary>
        <div class="accordion-content" id="list-pending" style="padding: 12px 0 0 0; display: flex; flex-direction: column; gap: 8px;">
          <!-- Inyectado por JS -->
        </div>
      </details>

      <!-- Desplegable 2: Aceptados -->
      <details class="postulations-accordion" id="acc-accepted">
        <summary style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <span>Postulantes Aceptados</span>
          <span class="count-badge" id="count-accepted" style="background-color: var(--color-success-light); color: var(--color-success); padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: bold;">0</span>
        </summary>
        <div class="accordion-content" id="list-accepted" style="padding: 12px 0 0 0; display: flex; flex-direction: column; gap: 8px;">
          <!-- Inyectado por JS -->
        </div>
      </details>

      <!-- Desplegable 3: Rechazados -->
      <details class="postulations-accordion" id="acc-rejected">
        <summary style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <span>Postulantes Rechazados</span>
          <span class="count-badge" id="count-rejected" style="background-color: rgba(239,68,68,0.15); color: #EF4444; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: bold;">0</span>
        </summary>
        <div class="accordion-content" id="list-rejected" style="padding: 12px 0 0 0; display: flex; flex-direction: column; gap: 8px;">
          <!-- Inyectado por JS -->
        </div>
      </details>
    </div>
    
  </div>
</div>
<?php
}
?>


