<!-- HERO SECTION -->
<section class="hero" id="inicio">
  <!-- Right Side Background Image & Wave Overlay -->
  <div class="hero-bg-container">
    <img src="<?= BASE_URL ?>img/hero_new.png" alt="Voluntarios cooperando para generar impacto social" class="hero-bg-img">
    <svg class="hero-wave-overlay" viewBox="0 0 100 800" preserveAspectRatio="none" aria-hidden="true">
      <path fill="#F5F7F8" d="M0,0 L80,0 C50,150 20,300 30,450 C80,600 50,700 0,800 L0,800 L0,0 Z"></path>
    </svg>
    <div class="hero-quote-card">
      <div class="icon-circle">
        <i data-lucide="leaf"></i>
      </div>
      <p>Pequeñas acciones,<br>grandes cambios.</p>
    </div>
  </div>

  <div class="container hero-grid">
    <div class="hero-content">
      <div class="hero-tag">
        <span class="hero-tag-pulse" aria-hidden="true"></span>
        <i data-lucide="users" class="hero-tag-icon"></i>
        <span>+1,400 Voluntarios activos hoy</span>
      </div>
      <h1 class="hero-title">Conectamos personas con causas que generan impacto</h1>
      <p class="hero-subtitle">Encontrá oportunidades de voluntariado o publicá campañas para sumar personas comprometidas con tu misión.</p>
      <?php if (!isset($_SESSION['usuario_logueado']) || $_SESSION['usuario_logueado'] !== true): ?>
      <div class="hero-buttons">
        <a href="<?= BASE_URL ?>registro/voluntario" class="btn btn-primary btn-lg" id="hero-volunteer-btn">
          Quiero ser voluntario <span class="arrow-circle"><i data-lucide="arrow-right"></i></span>
        </a>
        <a href="<?= BASE_URL ?>registro/organizacion" class="btn btn-outline btn-lg" id="hero-org-btn">
          Soy una organización <i data-lucide="building-2"></i>
        </a>
      </div>
      <?php endif; ?>
      <div class="hero-stats">
        <div class="stat-item">
          <div class="stat-icon-circle stat-icon-green">
            <i data-lucide="megaphone"></i>
          </div>
          <div class="stat-info">
            <h3 id="stat-campaigns">+180</h3>
            <p>Campañas activas</p>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon-circle stat-icon-purple">
            <i data-lucide="building-2"></i>
          </div>
          <div class="stat-info">
            <h3 id="stat-orgs">95</h3>
            <p>ONGs registradas</p>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon-circle stat-icon-orange">
            <i data-lucide="clock"></i>
          </div>
          <div class="stat-info">
            <h3 id="stat-impact">+12k</h3>
            <p>Horas de impacto</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Empty space in grid to leave room for background image on the right -->
    <div class="hero-empty-space"></div>
  </div>
</section>

<!-- QUIÉNES SOMOS -->
<section class="section" id="quienes-somos" style="background-color: var(--color-surface);">
  <div class="container about-grid">
    <div class="about-img-wrapper">
      <img src="<?= BASE_URL ?>img/about.png" alt="Grupo de voluntarios de diversas edades trabajando felices en equipo" class="about-img">
      <div class="about-badge-card">
        <h4>Nuestra Filosofía</h4>
        <p>Creemos en el poder transformador de la acción colectiva. Pequeñas manos hacen grandes puentes.</p>
      </div>
    </div>
    <div class="about-content">
      <span class="section-tag">Nuestra Misión</span>
      <h2>Uniendo voluntades para construir comunidad</h2>
      <p class="about-text">
        <strong>Mano a Mano</strong> nace con el propósito de simplificar el lazo entre las personas con deseos de ayudar y las organizaciones sociales que necesitan ese apoyo para cambiar realidades. 
        <br><br>
        Buscamos derribar barreras burocráticas y crear un ecosistema digital amigable, moderno y confiable donde cada acción, por más chica que parezca, genere un impacto real y medible.
      </p>
      <div class="about-features">
        <div class="about-feat-item">
          <i data-lucide="check-circle-2"></i>
          <span>Plataforma 100% gratuita</span>
        </div>
        <div class="about-feat-item">
          <i data-lucide="check-circle-2"></i>
          <span>Verificación de organizaciones</span>
        </div>
        <div class="about-feat-item">
          <i data-lucide="check-circle-2"></i>
          <span>Seguimiento de impacto</span>
        </div>
        <div class="about-feat-item">
          <i data-lucide="check-circle-2"></i>
          <span>Colaboración entre ONGs</span>
        </div>
      </div>
    </div>
  </div>
</section>



<!-- CÓMO FUNCIONA -->
<section class="section" id="como-funciona" style="background-color: var(--color-surface);">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">El Proceso</span>
      <h2 class="section-title">Primeros pasos en la comunidad</h2>
      <p class="section-subtitle">Comenzar a generar impacto es muy simple. Seleccioná tu rol y descubrí los pasos para participar.</p>
    </div>
    
    <!-- Tabs Selector -->
    <div class="how-tabs">
      <button class="tab-btn active" id="tab-btn-vol" aria-controls="pane-vol" aria-selected="true">
        Para Voluntarios
      </button>
      <button class="tab-btn tab-btn-org" id="tab-btn-org" aria-controls="pane-org" aria-selected="false">
        Para Organizaciones
      </button>
    </div>
    
    <!-- Vol Pane -->
    <div class="how-pane active" id="pane-vol" role="tabpanel" aria-labelledby="tab-btn-vol">
      <div class="step-card">
        <span class="step-num">01</span>
        <div class="step-icon"><i data-lucide="user-plus"></i></div>
        <h4>Crear Perfil</h4>
        <p>Registrate ingresando tus intereses, habilidades y tu disponibilidad horaria.</p>
      </div>
      <div class="step-card">
        <span class="step-num">02</span>
        <div class="step-icon"><i data-lucide="search"></i></div>
        <h4>Buscar Campañas</h4>
        <p>Explorá el mapa y buscador para hallar causas ambientales, educativas o sociales cerca tuyo.</p>
      </div>
      <div class="step-card">
        <span class="step-num">03</span>
        <div class="step-icon"><i data-lucide="send"></i></div>
        <h4>Postularse</h4>
        <p>Hacé clic en el proyecto que te guste y enviale tu interés a la organización responsable.</p>
      </div>
      <div class="step-card">
        <span class="step-num">04</span>
        <div class="step-icon"><i data-lucide="sparkles"></i></div>
        <h4>Participar</h4>
        <p>Sumate a la actividad, aportá tu tiempo, conocé gente increíble y generá impacto real.</p>
      </div>
    </div>
    
    <!-- Org Pane -->
    <div class="how-pane how-pane-org" id="pane-org" role="tabpanel" aria-labelledby="tab-btn-org">
      <div class="step-card">
        <span class="step-num">01</span>
        <div class="step-icon"><i data-lucide="building-2"></i></div>
        <h4>Crear Perfil</h4>
        <p>Registrá tu ONG con la documentación básica que valida tu rol en la sociedad civil.</p>
      </div>
      <div class="step-card">
        <span class="step-num">02</span>
        <div class="step-icon"><i data-lucide="file-plus-2"></i></div>
        <h4>Publicar Campaña</h4>
        <p>Completá el formulario detallando la causa, cantidad de personas que necesitás y la fecha.</p>
      </div>
      <div class="step-card">
        <span class="step-num">03</span>
        <div class="step-icon"><i data-lucide="users"></i></div>
        <h4>Gestionar Postulaciones</h4>
        <p>Revisá el perfil de los interesados, coordina la inducción y comunícate con ellos de forma directa.</p>
      </div>
      <div class="step-card">
        <span class="step-num">04</span>
        <div class="step-icon"><i data-lucide="heart-handshake"></i></div>
        <h4>Generar Impacto</h4>
        <p>Llevá adelante la jornada solidaria con éxito y comparte los resultados con la comunidad.</p>
      </div>
    </div>
  </div>
</section>

<!-- ORGANIZACIONES DESTACADAS (Carrusel) -->
<section class="section section-bg-alt" id="organizaciones">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Comunidad</span>
      <h2 class="section-title">Organizaciones activas</h2>
      <p class="section-subtitle">Conocé algunas de las ONGs que ya están transformando realidades en la plataforma.</p>
    </div>

    <div class="orgs-carousel-wrapper">
      <button class="carousel-arrow carousel-arrow-prev" id="orgs-prev" aria-label="Anterior">
        <i data-lucide="chevron-left"></i>
      </button>

      <div class="orgs-carousel" id="orgs-container">
        <?php foreach ($organizaciones as $org): ?>
          <div class="org-card">
            <div class="org-card-header">
              <div class="org-img-wrapper" style="width: 56px; height: 56px; overflow: hidden; border-radius: var(--radius-md); flex-shrink: 0; background-color: var(--color-background); border: 1px solid var(--color-border); display: flex; align-items: center; justify-content: center;">
                <?php if (!empty($org['imagen'])): ?>
                  <img src="<?= BASE_URL . $org['imagen'] ?>" alt="Logo de <?= htmlspecialchars($org['nombre']) ?>" style="width: 100%; height: 100%; object-fit: cover;">
                <?php else: ?>
                  <img src="<?= BASE_URL ?>img/org_placeholder.png" alt="Logo de <?= htmlspecialchars($org['nombre']) ?>" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.8;">
                <?php endif; ?>
              </div>
              <div class="org-info">
                <h4><?= htmlspecialchars($org['nombre']) ?></h4>
                <span class="org-tag"><?= htmlspecialchars($org['categoria']) ?></span>
              </div>
            </div>
            <p class="org-desc"><?= htmlspecialchars($org['descripcion']) ?></p>
            <div class="org-meta">
              <span class="org-meta-item"><i data-lucide="calendar"></i> <?= htmlspecialchars($org['campanas_activas']) ?></span>
              <span class="org-meta-item"><i data-lucide="map-pin"></i> <?= htmlspecialchars($org['ubicacion']) ?></span>
            </div>
            <button class="btn btn-outline org-action-btn"
              onclick="openOrgProfile(
                '<?= htmlspecialchars($org['nombre'], ENT_QUOTES) ?>',
                '<?= htmlspecialchars($org['categoria'], ENT_QUOTES) ?>',
                '<?= htmlspecialchars($org['descripcion'], ENT_QUOTES) ?>',
                '<?= htmlspecialchars($org['ubicacion'], ENT_QUOTES) ?>',
                '<?= htmlspecialchars($org['campanas_activas'], ENT_QUOTES) ?>'
              )">Ver perfil</button>
          </div>
        <?php endforeach; ?>
      </div>

      <button class="carousel-arrow carousel-arrow-next" id="orgs-next" aria-label="Siguiente">
        <i data-lucide="chevron-right"></i>
      </button>
    </div>

    <div class="carousel-dots" id="orgs-dots"></div>
  </div>
</section>


<!-- CAMPAÑAS SOLIDARIAS ACTIVAS (Carrusel) -->
<section class="section" id="campanas" style="background-color: var(--color-surface);">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Oportunidades</span>
      <h2 class="section-title">Campañas solidarias activas</h2>
      <p class="section-subtitle">Encontrá el espacio ideal donde tu tiempo e intereses se alineen para generar una gran diferencia.</p>
    </div>
    
    <!-- Category Filter Tabs -->
    <div class="camp-filters">
      <button class="filter-btn active" data-filter="all">Todas</button>
      <button class="filter-btn" data-filter="medio-ambiente">Medio Ambiente</button>
      <button class="filter-btn" data-filter="educacion">Educación</button>
      <button class="filter-btn" data-filter="accion-social">Acción Social</button>
    </div>
    
    <!-- Campaigns Carousel with Scroll Snap -->
    <div class="camps-carousel" id="campaigns-container">
      <?php foreach ($campanas as $camp): ?>
        <article class="camp-card" data-category="<?= htmlspecialchars($camp['categoria']) ?>">
          <div class="camp-img-wrapper">
            <img src="<?= !empty($camp['imagen']) ? BASE_URL . $camp['imagen'] : BASE_URL . 'img/camp_placeholder.png' ?>" alt="<?= htmlspecialchars($camp['titulo']) ?>" class="camp-img">
            <span class="camp-cat-badge <?= $camp['badge_clase'] ?>"><?= htmlspecialchars($camp['categoria_label']) ?></span>
          </div>
          <div class="camp-content">
            <span class="camp-org"><?= htmlspecialchars($camp['org']) ?></span>
            <h3 class="camp-title"><?= htmlspecialchars($camp['titulo']) ?></h3>
            <p class="camp-desc"><?= htmlspecialchars($camp['descripcion']) ?></p>
            
            
            
            <div class="camp-meta-list">
              <div class="camp-meta-item"><i data-lucide="map-pin"></i> <span><?= htmlspecialchars($camp['ubicacion']) ?></span></div>
              <div class="camp-meta-item"><i data-lucide="calendar"></i> <span><?= htmlspecialchars($camp['fecha']) ?></span></div>
            </div>
            
            <button class="btn btn-primary" onclick="openCampaignDetails(<?= $camp['id'] ?>)">Ver campaña</button>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
    
  </div>
</section>

<!-- CTA PRINCIPAL -->
<section class="section cta">
  <div class="cta-blob-1"></div>
  <div class="cta-blob-2"></div>
  <div class="container cta-container">
    <h2>Sumate a una comunidad que genera impacto real</h2>
    <p>Ya somos miles de personas construyendo redes más humanas y solidarias. Tu grano de arena puede cambiar vidas hoy mismo.</p>
    <div class="cta-buttons">
      <a href="<?= BASE_URL ?>registro" class="btn cta-btn-white" id="cta-action-btn">Quiero ser parte</a>
    </div>
  </div>
</section>

<!-- MODAL OVERLAYS (Home-specific triggers) -->

<!-- Campaign Detail Modal -->
<?php include '../app/views/componentes/modal_campana.php'; ?>

<!-- Create Campaign Modal (Organization mock creation) -->
<div class="modal-overlay" id="modal-create-campaign" role="dialog" aria-modal="true" aria-labelledby="create-camp-title">
  <div class="modal-box">
    <button class="modal-close-btn" aria-label="Cerrar modal" onclick="closeModal('modal-create-campaign')">
      <i data-lucide="x"></i>
    </button>
    <h3 class="modal-title" id="create-camp-title">Crear Campaña Solidaria</h3>
    <p class="modal-subtitle">Ingresá los datos para que los voluntarios se postulen.</p>
    
    <form id="create-campaign-form">
      <div class="form-group">
        <label for="create-title" class="form-label">Título de la campaña *</label>
        <input type="text" id="create-title" class="form-input" placeholder="Ej: Limpieza de Playa del Río" required>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="create-org" class="form-label">Nombre de tu Organización *</label>
          <input type="text" id="create-org" class="form-input" placeholder="Ej: Planeta Azul" required>
        </div>
        <div class="form-group">
          <label for="create-category" class="form-label">Categoría *</label>
          <select id="create-category" class="form-input" required>
            <option value="medio-ambiente">Medio Ambiente</option>
            <option value="educacion">Educación</option>
            <option value="accion-social">Acción Social</option>
          </select>
        </div>
      </div>
      
      <div class="form-group">
        <label for="create-desc" class="form-label">Descripción corta *</label>
        <textarea id="create-desc" class="form-input" rows="3" placeholder="Resumen corto para la tarjeta de campaña..." required></textarea>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="create-location" class="form-label">Ubicación / Ciudad *</label>
          <input type="text" id="create-location" class="form-input" placeholder="Ej: Mendoza" required>
        </div>
        <div class="form-group">
          <label for="create-vol-needed" class="form-label">Voluntarios Necesarios *</label>
          <input type="number" id="create-vol-needed" class="form-input" placeholder="Ej: 15" min="1" required>
        </div>
      </div>
      
      <div class="form-row" style="margin-bottom: 20px;">
        <div class="form-group">
          <label for="create-date" class="form-label">Fecha *</label>
          <input type="date" id="create-date" class="form-input" required>
        </div>
        <div class="form-group">
          <label for="create-time" class="form-label">Horario *</label>
          <input type="text" id="create-time" class="form-input" placeholder="Ej: 10:00 - 14:00" required>
        </div>
      </div>
      
      <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">Publicar Campaña <i data-lucide="check"></i></button>
    </form>
  </div>
</div>

<!-- Organization Profile Modal -->
<div class="modal-overlay" id="modal-org-profile" role="dialog" aria-modal="true" aria-labelledby="org-profile-title">
  <div class="modal-box">
    <button class="modal-close-btn" aria-label="Cerrar modal" onclick="closeModal('modal-org-profile')">
      <i data-lucide="x"></i>
    </button>
    
    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
      <div class="org-logo-avatar avatar-1" style="width: 64px; height: 64px; font-size: 24px;" id="org-profile-avatar">TV</div>
      <div>
        <h3 class="modal-title" style="margin-bottom: 4px;" id="org-profile-title">Nombre ONG</h3>
        <span class="org-tag" id="org-profile-tag">Categoría</span>
      </div>
    </div>
    
    <div style="margin-bottom: 24px;">
      <h4 style="font-size: 15px; margin-bottom: 8px; border-bottom: 1px solid var(--color-border); padding-bottom: 6px;">Sobre nosotros</h4>
      <p style="color: var(--color-text-secondary); font-size: 14px;" id="org-profile-desc">Descripción detallada de la organización.</p>
    </div>
    
    <div class="detail-sidebar-card" style="margin-bottom: 24px;">
      <div class="sidebar-info-item">
        <i data-lucide="map-pin"></i>
        <div class="sidebar-info-text">
          <h5>Sede Principal</h5>
          <p id="org-profile-location">Ciudad</p>
        </div>
      </div>
      <div class="sidebar-info-item">
        <i data-lucide="calendar"></i>
        <div class="sidebar-info-text">
          <h5>Actividad en la plataforma</h5>
          <p id="org-profile-stats">4 campañas activas</p>
        </div>
      </div>
    </div>
    
    <div style="display: flex; justify-content: flex-end; gap: 12px;">
      <button class="btn btn-ghost" onclick="closeModal('modal-org-profile')">Cerrar</button>
      <a href="<?= BASE_URL ?>perfil_organizacion_vista" class="btn btn-primary" id="org-profile-full-btn">Ver perfil completo</a>
    </div>
  </div>
</div>