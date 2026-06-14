// JavaScript for Perfil Voluntario Vista
document.addEventListener('DOMContentLoaded', () => {
  initializeTabs();
  initializeDevStateListeners();
  initializeCloseModalEvents();
});

// TAB SYSTEM (Campañas / Voluntariados)
function initializeTabs() {
  const tabCampanas = document.getElementById('tab-btn-campanas');
  const tabVoluntariados = document.getElementById('tab-btn-voluntariados');
  
  const paneCampanas = document.getElementById('pane-campanas');
  const paneVoluntariados = document.getElementById('pane-voluntariados');
  
  if (tabCampanas && tabVoluntariados) {
    tabCampanas.addEventListener('click', () => {
      // Buttons state
      tabCampanas.classList.add('active');
      tabCampanas.setAttribute('aria-selected', 'true');
      tabVoluntariados.classList.remove('active');
      tabVoluntariados.setAttribute('aria-selected', 'false');
      
      // Panes state
      if (paneVoluntariados) {
        paneVoluntariados.classList.remove('active');
        paneVoluntariados.style.display = 'none';
      }
      if (paneCampanas) {
        paneCampanas.classList.add('active');
        paneCampanas.style.display = 'block';
      }
    });
    
    tabVoluntariados.addEventListener('click', () => {
      // Buttons state
      tabVoluntariados.classList.add('active');
      tabVoluntariados.setAttribute('aria-selected', 'true');
      tabCampanas.classList.remove('active');
      tabCampanas.setAttribute('aria-selected', 'false');
      
      // Panes state
      if (paneCampanas) {
        paneCampanas.classList.remove('active');
        paneCampanas.style.display = 'none';
      }
      if (paneVoluntariados) {
        paneVoluntariados.classList.add('active');
        paneVoluntariados.style.display = 'block';
      }
    });
  }
}

// CAMPAIGN DETAIL DATA
const campaignsDetailsData = {
  1: {
    title: 'Reforestación Parque Central',
    desc: 'Sembrado de especies nativas para oxigenar y reconstruir el ecosistema del parque local. Los voluntarios plantaron árboles nativos, instalaron tutores y dialogaron con vecinos sobre sustentabilidad.',
    tags: ['Medio Ambiente', 'Comunidad', 'Salud']
  },
  3: {
    title: 'Colecta de Alimentos San Martín',
    desc: 'Clasificación y empaquetado de productos no perecederos para comedores de la zona. Se asistió en la carga de cajas, inventario de depósitos y logística vehicular.',
    tags: ['Acción Social', 'Comunidad']
  },
  301: {
    title: 'Apoyo Pedagógico San Martín',
    desc: 'Clases individuales para alumnos de primaria con dificultades de aprendizaje. Nos reunimos dos veces por semana para repasar conceptos curriculares básicos.',
    tags: ['Educación', 'Niñez', 'Salud']
  },
  302: {
    title: 'Taller de Oficios y Costura',
    desc: 'Capacitación en técnicas básicas de corte y confección para brindar herramientas de salida laboral rápida a familias del barrio.',
    tags: ['Comunidad', 'Tecnología']
  },
  303: {
    title: 'Recuperación de Plaza del Barrio',
    desc: 'Campaña de pintura de juegos, desmalezado y plantación floral para reacondicionar el espacio público de juego de los niños.',
    tags: ['Medio Ambiente', 'Comunidad']
  },
  304: {
    title: 'Merienda Saludable en Comedor',
    desc: 'Preparación y servicio de meriendas nutritivas reforzadas en lácteos y frutas para más de 80 niños asistentes.',
    tags: ['Salud', 'Niñez']
  }
};

// OPEN MODAL FOR CAMPAIGNS
window.openCampaignDetailsModal = function(campaignId) {
  const camp = campaignsDetailsData[campaignId] || {
    title: 'Campaña Solidaria',
    desc: 'Detalles de la campaña de voluntariado.',
    tags: ['Solidario']
  };
  
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
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  updateModalStateBasedOnRadio();
  openModal('modal-profile-camp-detail');
};

// CLOSE MODAL UTILITY
window.closeProfileModal = function(id) {
  closeModal(id);
};

// CLOSE EVENT LISTENERS (Escape key)
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

// DEVELOPER STATE LISTENERS FOR REVIEW
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
    // Normal
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
