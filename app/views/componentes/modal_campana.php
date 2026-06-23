<!-- VISTA DEL MODAL DE UNA CAMPAÑA (INFORMACIÓN QUE SE COMPARTE) -->
<!-- VISTA INFROMATIVA DE LA INFO DE LA CAMPAÑA -->

<div class="modal-overlay" id="modal-profile-camp-detail" role="dialog" aria-modal="true" aria-labelledby="m-camp-title">
  <div class="modal-box modal-box-large">
    <!-- Close button -->
    <button class="modal-close-btn" aria-label="Cerrar modal" onclick="closeProfileModal('modal-profile-camp-detail')">
      <i data-lucide="x"></i>
    </button>
    
    <!-- Header: Name & Accepted Badge (if applicable) -->
    <div class="modal-header-with-badge">
      <h3 class="modal-title" id="m-camp-title">Nombre campaña</h3>
      <span class="modal-status-badge accepted-pill" id="m-camp-accepted-badge" style="display: none;">ACEPTADO</span>
    </div>
    
    <!-- Description & Tags -->
    <div class="modal-main-content">
      <p class="modal-desc-para" id="m-camp-desc">
        Descripción de la campaña y sus objetivos solidarios.
      </p>
      
      <div class="modal-tags-row" id="m-camp-tags">
        <span class="tag-badge"><i data-lucide="tag"></i> Niñez</span>
        <span class="tag-badge">Educación</span>
        <span class="tag-badge">Salud</span>
      </div>
      
      <!-- DEVELOPER MOCK STATE SELECTOR (Visible for review/testing) -->
      <div class="dev-state-selector-card">
        <span class="dev-label">Simular Estado (Voluntario Logueado):</span>
        <div class="dev-options">
          <label><input type="radio" name="dev-state-choice" value="no-login" checked> No registrado</label>
          <label><input type="radio" name="dev-state-choice" value="registrado-pendiente"> Registrado (Pendiente)</label>
          <label><input type="radio" name="dev-state-choice" value="registrado-aceptado"> Registrado (Aceptado)</label>
          <label><input type="radio" name="dev-state-choice" value="registrado-rechazado"> Registrado (Rechazado)</label>
        </div>
      </div>

      <!-- SENSITIVE/IMPORTANT INFORMATION (Unlocked when Accepted) -->
      <div class="unlocked-info-box" id="m-camp-sensitive-info" style="display: none;">
        <h4>Información importante</h4>
        <div class="info-alert-content">
          <ul>
            <li><strong>Dirección:</strong> Av. Rivadavia 1234, CABA, Planta Alta</li>
            <li><strong>Herramientas necesarias:</strong> Cuaderno, cartuchera y buena disposición didáctica.</li>
            <li><strong>Contacto del coordinador:</strong> Lucas Gómez (+54 11 5555-1234)</li>
          </ul>
          <p>Morbi tempus tincidunt est sed tempor. Donec eu est leo. En caso de no poder asistir, por favor avisar con 24 horas de anticipación.</p>
        </div>
      </div>

      <!-- Photo Gallery -->
      <div class="modal-gallery-sec">
        <h4>Galería de fotos</h4>
        <div class="modal-gallery-grid">
          <div class="gallery-placeholder-img"><i data-lucide="image"></i></div>
          <div class="gallery-placeholder-img"><i data-lucide="image"></i></div>
          <div class="gallery-placeholder-img"><i data-lucide="image"></i></div>
        </div>
      </div>

      <!-- Associated Organizations -->
      <div class="modal-associations-sec">
        <h4>Organizaciones en asociación</h4>
        <div class="modal-associations-circles">
          <div class="assoc-circle-item">
            <div class="assoc-circle"><i data-lucide="image"></i></div>
            <span>Fundación Huellas</span>
          </div>
          <div class="assoc-circle-item">
            <div class="assoc-circle"><i data-lucide="image"></i></div>
            <span>Red Alimentaria</span>
          </div>
          <div class="assoc-circle-item">
            <div class="assoc-circle"><i data-lucide="image"></i></div>
            <span>Asociación Soles</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Modal Footer Actions -->
    <div class="modal-footer-actions">
      <button class="btn btn-ghost" onclick="closeProfileModal('modal-profile-camp-detail')">Cerrar</button>
      <button class="btn btn-primary" id="m-camp-postulate-btn">Postularme</button>
    </div>

  </div>
</div>
