<?php
/**
 * Vista de Perfil de Organización (Público)
 * Mano a Mano MVC
 */
?>
<main class="profile-view-container">
  
  <!-- PROFILE HEADER -->
  <section class="profile-header-sec">
    <div class="container profile-header-grid">
      <!-- Left: Logo/Avatar Placeholder -->
      <div class="profile-avatar-wrapper">
        <div class="profile-avatar-circle">
          <i data-lucide="image" class="avatar-placeholder-icon"></i>
        </div>
      </div>
      <!-- Right: Org Name, Desc, Tags -->
      <div class="profile-info-content">
        <h1 class="profile-name">Fundación Huellas</h1>
        <p class="profile-desc-text">
          Fundación Huellas es una organización civil dedicada a la asistencia comunitaria integral. Trabajamos activamente coordinando talleres educativos, campañas de apoyo escolar y alimentación saludable para niños y adolescentes en situación de vulnerabilidad en distintos comedores del Gran Buenos Aires.
        </p>
        <div class="profile-tags-wrapper">
          <span class="tag-badge"><i data-lucide="tag"></i> Niñez</span>
          <span class="tag-badge">Educación</span>
          <span class="tag-badge">Salud</span>
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

      <!-- FILTER AND SORT (Mockup controls) -->
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
            
            <!-- Card 1 (Image Left) -->
            <article class="alt-card">
              <div class="alt-card-img-col">
                <div class="alt-card-img-placeholder">
                  <i data-lucide="image"></i>
                </div>
              </div>
              <div class="alt-card-content-col">
                <h3 class="alt-card-title">Apoyo Escolar Primario</h3>
                <p class="alt-card-desc">Brindamos clases de matemática, lengua e inglés para niños de 6 a 12 años los sábados por la mañana en el Comedor Soles. Sumate como tutor.</p>
                <button class="btn btn-primary btn-info" onclick="openCampaignDetailsModal(101)">+ Más información</button>
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
                <h3 class="alt-card-title">Taller de Computación Inicial</h3>
                <p class="alt-card-desc">Introducción al uso de herramientas digitales para adolescentes. Buscamos tutores con paciencia y nociones básicas de tecnología.</p>
                <button class="btn btn-primary btn-info" onclick="openCampaignDetailsModal(102)">+ Más información</button>
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
                <h3 class="alt-card-title">Colecta de Útiles Escolares</h3>
                <p class="alt-card-desc">Campaña finalizada. Recolectamos mochilas, carpetas y cartucheras para el inicio del ciclo lectivo. ¡Gracias a todos los que colaboraron!</p>
                <button class="btn btn-primary btn-info" onclick="openCampaignDetailsModal(103)">+ Más información</button>
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
                <h3 class="alt-card-title">Talleres de Lectura Comprensiva</h3>
                <p class="alt-card-desc">Campaña finalizada. Taller interactivo de lectura y juegos dramáticos para fomentar la comprensión de textos literarios en niños.</p>
                <button class="btn btn-primary btn-info" onclick="openCampaignDetailsModal(104)">+ Más información</button>
              </div>
            </article>

          </div>
        </div>

        <!-- PANE: ASOCIACIONES (Initially Hidden) -->
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
                <h3 class="alt-card-title">Asociación Civil Soles</h3>
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
                <h3 class="alt-card-title">Red Alimentaria Solidaria</h3>
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
        <button class="pag-num">4</button>
        <button class="pag-num">5</button>
        <span class="pag-ellipsis">...</span>
        <button class="pag-num">11</button>
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
          
          <a href="<?= BASE_URL ?>perfil_voluntario_vista" class="vol-carousel-card">
            <div class="vol-card-avatar-wrapper">
              <div class="vol-card-avatar">
                <i data-lucide="user"></i>
              </div>
            </div>
            <h4 class="vol-card-name">Brian Clark</h4>
            <span class="vol-card-role">Tutor de Apoyo</span>
          </a>

          <a href="<?= BASE_URL ?>perfil_voluntario_vista" class="vol-carousel-card">
            <div class="vol-card-avatar-wrapper">
              <div class="vol-card-avatar">
                <i data-lucide="user"></i>
              </div>
            </div>
            <h4 class="vol-card-name">Stephanie Powell</h4>
            <span class="vol-card-role">Logística</span>
          </a>

          <a href="<?= BASE_URL ?>perfil_voluntario_vista" class="vol-carousel-card">
            <div class="vol-card-avatar-wrapper">
              <div class="vol-card-avatar">
                <i data-lucide="user"></i>
              </div>
            </div>
            <h4 class="vol-card-name">Christopher White</h4>
            <span class="vol-card-role">Coordinador</span>
          </a>

          <a href="<?= BASE_URL ?>perfil_voluntario_vista" class="vol-carousel-card">
            <div class="vol-card-avatar-wrapper">
              <div class="vol-card-avatar">
                <i data-lucide="user"></i>
              </div>
            </div>
            <h4 class="vol-card-name">Lucas Gómez</h4>
            <span class="vol-card-role">Tallerista</span>
          </a>

          <a href="<?= BASE_URL ?>perfil_voluntario_vista" class="vol-carousel-card">
            <div class="vol-card-avatar-wrapper">
              <div class="vol-card-avatar">
                <i data-lucide="user"></i>
              </div>
            </div>
            <h4 class="vol-card-name">María Inés</h4>
            <span class="vol-card-role">Apoyo Escolar</span>
          </a>

        </div>

        <button class="carousel-nav-btn next-btn" id="vol-carousel-next" aria-label="Deslizar derecha">
          <i data-lucide="chevron-right"></i>
        </button>
      </div>

    </div>
  </section>

</main>

<!-- ==========================================
     MODAL OVERLAYS
     ========================================== -->

<?php include '../app/views/componentes/modal_campana.php'; ?>

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
