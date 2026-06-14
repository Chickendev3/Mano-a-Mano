<?php
/**
 * Vista de Perfil de Voluntario (Público)
 * Mano a Mano MVC
 */
?>
<main class="profile-view-container">
  
  <!-- PROFILE HEADER -->
  <section class="profile-header-sec">
    <div class="container profile-header-grid">
      <!-- Left: Photo Placeholder -->
      <div class="profile-avatar-wrapper">
        <div class="profile-avatar-circle">
          <i data-lucide="image" class="avatar-placeholder-icon"></i>
        </div>
      </div>
      <!-- Right: Name, Personal Desc, Statistics/Insignias -->
      <div class="profile-info-content">
        <h1 class="profile-name">Nombre Voluntario</h1>
        
        <p class="profile-desc-text">
          Descripción voluntario: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dolor ligula, aliquam ut massa ut, tincidunt laoreet risus. Donec eu est leo. Morbi tempus tincidunt est sed tempor. Nam non convallis felis. In placerat nisi quis consectetur interdum. Cras arcu sapien, laoreet vel euismod ac, ultricies at neque.
        </p>

        <!-- Insignias and Statistics -->
        <div class="profile-badges-container">
          <div class="badge-row-item">
            <i data-lucide="award" class="badge-icon-gold"></i>
            <span>Insignia de Voluntariado Fijo en organizacion: Techo Verde</span>
          </div>
          <div class="badge-row-item">
            <i data-lucide="award" class="badge-icon-gold"></i>
            <span>Insignia de Voluntariado Fijo en organizacion: Mentes Brillantes</span>
          </div>
          <div class="badge-row-item">
            <i data-lucide="check-square" class="badge-icon-blue"></i>
            <span>Asistencia a voluntariado: +7</span>
          </div>
          <div class="badge-row-item skills-list-row">
            <i data-lucide="bookmark" class="badge-icon-tag"></i>
            <div class="skills-badges">
              <span class="skill-badge-text">Cocinero</span>
              <span class="skill-badge-text">Profesor</span>
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

      <!-- FILTER AND SORT (Mockup controls) -->
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
            
            <!-- Card 1 (Image Left) -->
            <article class="alt-card">
              <div class="alt-card-img-col">
                <div class="alt-card-img-placeholder">
                  <i data-lucide="image"></i>
                </div>
              </div>
              <div class="alt-card-content-col">
                <h3 class="alt-card-title">Título campaña</h3>
                <p class="alt-card-desc">Breve descripción: Conectamos personas con causas de impacto social en el barrio de San Martín. Apoyamos de forma didáctica semanalmente.</p>
                <button class="btn btn-primary btn-info" onclick="openCampaignDetailsModal(301)">+ Más información</button>
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
                <h3 class="alt-card-title">Título campaña</h3>
                <p class="alt-card-desc">Breve descripción: Rhoncus morbi in augue nec, in nullam acerat dit. Consectetur adipiscing elit. In placerat nisi quis consectetur.</p>
                <button class="btn btn-primary btn-info" onclick="openCampaignDetailsModal(302)">+ Más información</button>
              </div>
            </article>

            <!-- Card 3 (Image Left) -->
            <article class="alt-card">
              <div class="alt-card-img-col">
                <div class="alt-card-img-placeholder">
                  <i data-lucide="image"></i>
                </div>
              </div>
              <div class="alt-card-content-col">
                <h3 class="alt-card-title">Título campaña</h3>
                <p class="alt-card-desc">Breve descripción: Conectamos personas con causas de impacto social en el barrio de San Martín. Apoyamos de forma didáctica semanalmente.</p>
                <button class="btn btn-primary btn-info" onclick="openCampaignDetailsModal(303)">+ Más información</button>
              </div>
            </article>

            <!-- Card 4 (Image Right) -->
            <article class="alt-card alt-card-reverse">
              <div class="alt-card-img-col">
                <div class="alt-card-img-placeholder">
                  <i data-lucide="image"></i>
                </div>
              </div>
              <div class="alt-card-content-col">
                <h3 class="alt-card-title">Título campaña.</h3>
                <p class="alt-card-desc">Breve descripción: Rhoncus morbi in augue nec, in nullam acerat dit. Consectetur adipiscing elit. In placerat nisi quis consectetur.</p>
                <button class="btn btn-primary btn-info" onclick="openCampaignDetailsModal(304)">+ Más información</button>
              </div>
            </article>

          </div>
        </div>

        <!-- PANE: VOLUNTARIADOS (Participated in, Initially Hidden) -->
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
                <h3 class="alt-card-title">Reforestación Parque Central</h3>
                <p class="alt-card-desc">Participé plantando árboles nativos y concientizando a vecinos sobre el cuidado de espacios públicos.</p>
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
                <h3 class="alt-card-title">Colecta de Alimentos San Martín</h3>
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
        <button class="pag-num">4</button>
        <button class="pag-num">5</button>
        <span class="pag-ellipsis">...</span>
        <button class="pag-num">11</button>
        <button class="pag-btn" aria-label="Siguiente">Next &gt;</button>
      </div>

    </div>
  </section>

</main>

<!-- ==========================================
     MODAL OVERLAYS
     ========================================== -->

<!-- CAMPAIGN DETAIL MODAL -->
<div class="modal-overlay" id="modal-profile-camp-detail" role="dialog" aria-modal="true" aria-labelledby="m-camp-title">
  <div class="modal-box modal-box-large">
    <!-- Close button -->
    <button class="modal-close-btn" aria-label="Cerrar modal" onclick="closeProfileModal('modal-profile-camp-detail')">
      <i data-lucide="x"></i>
    </button>
    
    <!-- Header: Name & Accepted Badge -->
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
