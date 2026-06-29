<?php
/**
 * Componentes Comunes para Vistas Públicas
 * Mano a Mano MVC
 */

function renderModalDetalleCampaniaPublico() {
?>
<div class="modal-overlay" id="modal-profile-camp-detail" role="dialog" aria-modal="true" aria-labelledby="m-camp-title">
  <div class="modal-box modal-box-large">
    <button class="modal-close-btn" aria-label="Cerrar modal" onclick="closeModal('modal-profile-camp-detail')">
      <i data-lucide="x"></i>
    </button>
    
    <div class="modal-header-with-badge">
      <h3 class="modal-title" id="m-camp-title">Nombre campaña</h3>
      <span class="modal-status-badge accepted-pill" id="m-camp-accepted-badge" style="display: none;">ACEPTADO</span>
    </div>
    
    <div class="modal-main-content">
      <a href="#" class="modal-creator-container" id="m-camp-creator-link" style="display: none;">
        <div class="modal-creator-avatar" id="m-camp-creator-avatar"></div>
        <div class="modal-creator-info">
          <span class="modal-creator-label">Publicado por</span>
          <span class="modal-creator-name" id="m-camp-creator-name">Nombre del Creador</span>
        </div>
        <i data-lucide="chevron-right" class="modal-creator-arrow"></i>
      </a>
      
      <div class="modal-desc-para" id="m-camp-desc">
        Descripción de la campaña y sus objetivos solidarios.
      </div>
      
      <div class="modal-tags-row" id="m-camp-tags"></div>
      

      <div class="unlocked-info-box" id="m-camp-sensitive-info" style="display: none;"></div>

      <div class="modal-gallery-sec" id="m-camp-gallery-sec" style="display: none;">
        <h4>Galería de fotos</h4>
        <div class="modal-gallery-grid" id="m-camp-gallery-grid"></div>
      </div>

      <div class="modal-associations-sec" id="m-camp-associations-sec" style="display: none;">
        <h4>Organizaciones en asociación</h4>
        <div class="modal-associations-circles" id="m-camp-associations-list"></div>
      </div>
    </div>
    
    <div class="modal-footer-actions">
      <button class="btn btn-ghost" onclick="closeModal('modal-profile-camp-detail')">Cerrar</button>
      <button class="btn btn-primary" id="m-camp-postulate-btn">Postularme</button>
    </div>
  </div>
</div>
<?php
}
?>