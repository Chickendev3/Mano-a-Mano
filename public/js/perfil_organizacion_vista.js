// JavaScript for Perfil Organización Vista
document.addEventListener('DOMContentLoaded', () => {
  initializeTabs();
  initializeVolunteersCarousel();
  initializeDevStateListeners();
  initializeCloseModalEvents();
});

// TAB SYSTEM (Campañas / Asociaciones)
function initializeTabs() {
  const tabCampanas = document.getElementById('tab-btn-campanas');
  const tabAsociaciones = document.getElementById('tab-btn-asociaciones');
  
  const paneCampanas = document.getElementById('pane-campanas');
  const paneAsociaciones = document.getElementById('pane-asociaciones');
  
  if (tabCampanas && tabAsociaciones) {
    tabCampanas.addEventListener('click', () => {
      // Buttons state
      tabCampanas.classList.add('active');
      tabCampanas.setAttribute('aria-selected', 'true');
      tabAsociaciones.classList.remove('active');
      tabAsociaciones.setAttribute('aria-selected', 'false');
      
      // Panes state
      if (paneAsociaciones) {
        paneAsociaciones.classList.remove('active');
        paneAsociaciones.style.display = 'none';
      }
      if (paneCampanas) {
        paneCampanas.classList.add('active');
        paneCampanas.style.display = 'block';
      }
    });
    
    tabAsociaciones.addEventListener('click', () => {
      // Buttons state
      tabAsociaciones.classList.add('active');
      tabAsociaciones.setAttribute('aria-selected', 'true');
      tabCampanas.classList.remove('active');
      tabCampanas.setAttribute('aria-selected', 'false');
      
      // Panes state
      if (paneCampanas) {
        paneCampanas.classList.remove('active');
        paneCampanas.style.display = 'none';
      }
      if (paneAsociaciones) {
        paneAsociaciones.classList.add('active');
        paneAsociaciones.style.display = 'block';
      }
    });
  }
}

// VOLUNTEERS CAROUSEL HORIZONTAL SCROLL NAVIGATION
function initializeVolunteersCarousel() {
  const track = document.getElementById('vol-carousel-track');
  const prevBtn = document.getElementById('vol-carousel-prev');
  const nextBtn = document.getElementById('vol-carousel-next');
  
  if (track) {
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -300, behavior: 'smooth' });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: 300, behavior: 'smooth' });
      });
    }
  }
}

// CAMPAIGN DETAIL DATA
const campaignsDetailsData = {
  101: {
    title: 'Apoyo Escolar Primario',
    desc: 'Brindamos clases de apoyo para niños de educación primaria (6 a 12 años) los sábados por la mañana en el Comedor Soles. Ayudamos a reforzar contenidos escolares clave, realizar tareas y promover el hábito del estudio mediante dinámicas recreativas.',
    tags: ['Niñez', 'Educación', 'Salud']
  },
  102: {
    title: 'Taller de Computación Inicial',
    desc: 'Introducción básica al uso de computadoras, procesadores de texto, navegación web segura y programación en bloques para jóvenes. Buscamos tutores tecnológicos entusiastas.',
    tags: ['Educación', 'Tecnología']
  },
  103: {
    title: 'Colecta de Útiles Escolares',
    desc: 'Campaña finalizada. Juntamos y clasificamos carpetas, mochilas y cuadernos que fueron entregados a más de 120 alumnos al inicio del período lectivo de invierno.',
    tags: ['Niñez', 'Comunidad']
  },
  104: {
    title: 'Talleres de Lectura Comprensiva',
    desc: 'Campaña finalizada. Espacio semanal de lectura de cuentos y expresión teatral para incentivar la alfabetización temprana en barrios populares.',
    tags: ['Niñez', 'Educación']
  },
  1: {
    title: 'Reforestación Parque Central',
    desc: 'Sembrado de especies nativas para oxigenar y reconstruir el ecosistema del parque local.',
    tags: ['Medio Ambiente', 'Comunidad']
  },
  3: {
    title: 'Colecta de Alimentos San Martín',
    desc: 'Clasificación y empaquetado de productos no perecederos para comedores de la zona.',
    tags: ['Acción Social', 'Comunidad']
  },
  301: {
    title: 'Apoyo Pedagógico San Martín',
    desc: 'Clases individuales para alumnos con dificultades de aprendizaje.',
    tags: ['Educación', 'Niñez']
  },
  302: {
    title: 'Taller de Oficios y Costura',
    desc: 'Capacitación en técnicas básicas de costura y confección de indumentaria.',
    tags: ['Comunidad', 'Tecnología']
  },
  303: {
    title: 'Recuperación de Plaza del Barrio',
    desc: 'Pintura de juegos, desmalezado y acondicionamiento de la plaza comunitaria.',
    tags: ['Medio Ambiente', 'Comunidad']
  },
  304: {
    title: 'Merienda Saludable en Comedor',
    desc: 'Servicio y preparación de meriendas nutritivas para niños del barrio.',
    tags: ['Salud', 'Niñez']
  }
};

// ASSOCIATIONS DETAIL DATA
const associationsDetailsData = {
  201: {
    title: 'Asociación Civil Soles',
    desc: 'Institución comunitaria aliada que facilita las instalaciones edilicias de su comedor comunitario. Proveen la base logística y el nexo directo con las familias receptoras del programa de apoyo escolar.'
  },
  202: {
    title: 'Red Alimentaria Solidaria',
    desc: 'Banco de alimentos que provee raciones frescas semanales. Colaboramos compartiendo voluntarios para campañas de recolección y clasificación de mercadería.'
  }
};

// OPEN MODAL FOR CAMPAIGNS
window.openCampaignDetailsModal = function(id) {
  const camp = campaignsDetailsData[id] || {
    title: 'Campaña Solidaria',
    desc: 'Información de la campaña solidaria.',
    tags: ['Solidaridad']
  };
  
  // Set content
  const mTitle = document.getElementById('m-camp-title');
  const mDesc = document.getElementById('m-camp-desc');
  const mTags = document.getElementById('m-camp-tags');
  
  if (mTitle) mTitle.textContent = camp.title;
  if (mDesc) mDesc.textContent = camp.desc;
  
  if (mTags) {
    mTags.innerHTML = '';
    camp.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tag-badge';
      span.innerHTML = tag === 'Niñez' || tag === 'Comunidad' ? `<i data-lucide="tag"></i> ${tag}` : tag;
      mTags.appendChild(span);
    });
  }
  
  // Re-trigger icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  // Update view based on selected radio button state
  updateModalStateBasedOnRadio();
  
  // Open modal
  openModal('modal-profile-camp-detail');
};

// OPEN MODAL FOR ASSOCIATIONS
window.openAssociationDetailsModal = function(id) {
  const assoc = associationsDetailsData[id] || {
    title: 'Organización Asociada',
    desc: 'Detalles sobre la asociación.'
  };
  
  const mTitle = document.getElementById('m-assoc-title');
  const mDesc = document.getElementById('m-assoc-desc');
  
  if (mTitle) mTitle.textContent = assoc.title;
  if (mDesc) mDesc.textContent = assoc.desc;
  
  openModal('modal-profile-assoc-detail');
};

// CLOSE MODAL UTILITY FOR PROFILE
window.closeProfileModal = function(id) {
  closeModal(id);
};

// CLOSE EVENT LISTENERS (Escape & Click-Outside)
function initializeCloseModalEvents() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal) {
        closeModal(activeModal.id);
      }
    }
  });
}

// DEVELOPER MOCK STATE CONTROLLER FOR REVIEW
function initializeDevStateListeners() {
  const radios = document.querySelectorAll('input[name="dev-state-choice"]');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      updateModalStateBasedOnRadio();
    });
  });

  const postulateBtn = document.getElementById('m-camp-postulate-btn');
  if (postulateBtn) {
    postulateBtn.addEventListener('click', () => {
      const selectedState = document.querySelector('input[name="dev-state-choice"]:checked').value;
      
      if (selectedState === 'no-login') {
        if (typeof showToast !== 'undefined') {
          showToast('Redireccionando...', 'Registrate para poder postularte a las campañas.', false);
        }
        closeModal('modal-profile-camp-detail');
        setTimeout(() => {
          // Redirect to registration page in MVC
          window.location.href = BASE_URL + 'registro';
        }, 1500);
      } else {
        if (typeof showToast !== 'undefined') {
          showToast('Postulación procesada', 'Se ha guardado tu postulación para revisión.', true);
        }
      }
    });
  }
}

function updateModalStateBasedOnRadio() {
  const selectedState = document.querySelector('input[name="dev-state-choice"]:checked')?.value || 'no-login';
  
  const badge = document.getElementById('m-camp-accepted-badge');
  const infoBox = document.getElementById('m-camp-sensitive-info');
  const postulateBtn = document.getElementById('m-camp-postulate-btn');
  
  if (!postulateBtn) return;

  // Reset standard state
  if (badge) {
    badge.style.display = 'none';
    badge.className = 'modal-status-badge';
  }
  if (infoBox) infoBox.style.display = 'none';
  postulateBtn.disabled = false;
  postulateBtn.className = 'btn btn-primary';
  postulateBtn.textContent = 'Postularme';

  if (selectedState === 'no-login') {
    // Normal state
  } else if (selectedState === 'registrado-pendiente') {
    if (badge) {
      badge.textContent = 'PENDIENTE';
      badge.className = 'modal-status-badge';
      badge.style.backgroundColor = 'var(--color-primary-light)';
      badge.style.color = 'var(--color-primary-dark)';
      badge.style.border = '1px solid var(--color-primary)';
      badge.style.display = 'inline-block';
    }
    postulateBtn.disabled = true;
    postulateBtn.className = 'btn btn-ghost';
    postulateBtn.textContent = 'Postulación Pendiente ✓';
  } else if (selectedState === 'registrado-aceptado') {
    if (badge) {
      badge.textContent = 'ACEPTADO';
      badge.className = 'modal-status-badge accepted-pill';
      badge.style.display = 'inline-block';
      badge.style.backgroundColor = '';
      badge.style.color = '';
      badge.style.border = '';
    }
    if (infoBox) infoBox.style.display = 'block';
    postulateBtn.disabled = true;
    postulateBtn.className = 'btn btn-ghost';
    postulateBtn.textContent = 'Postulación Aceptada ✓';
  } else if (selectedState === 'registrado-rechazado') {
    if (badge) {
      badge.textContent = 'RECHAZADO';
      badge.className = 'modal-status-badge';
      badge.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
      badge.style.color = '#EF4444';
      badge.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      badge.style.display = 'inline-block';
    }
    postulateBtn.disabled = true;
    postulateBtn.className = 'btn btn-ghost';
    postulateBtn.textContent = 'Postulación Rechazada';
  }
}
