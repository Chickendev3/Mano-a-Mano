// JavaScript for Perfil Voluntario Vista
let currentCampaignId = null;
const appliedProfileCampaigns = new Set();

// Pagination State
const ITEMS_PER_PAGE = 2;
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
  initializeTabs();
  initializeDevStateListeners();
  initializeCloseModalEvents();
  renderPagination();
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

      // Reset pagination page
      currentPage = 1;
      renderPagination();
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

      // Reset pagination page
      currentPage = 1;
      renderPagination();
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
  currentCampaignId = campaignId;
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
  
  // Preset selector choices based on state
  if (IS_LOGGED_IN) {
    if (appliedProfileCampaigns.has(campaignId)) {
      const radio = document.querySelector('input[name="dev-state-choice"][value="registrado-pendiente"]');
      if (radio) radio.checked = true;
    } else {
      const radio = document.querySelector('input[name="dev-state-choice"][value="no-login"]');
      if (radio) radio.checked = true;
    }
  } else {
    const radio = document.querySelector('input[name="dev-state-choice"][value="no-login"]');
    if (radio) radio.checked = true;
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
      if (!IS_LOGGED_IN) {
        if (typeof showToast !== 'undefined') {
          showToast('Inicio de sesión requerido', 'Tenés que iniciar sesión para postularte a las campañas.', false);
        }
        closeModal('modal-profile-camp-detail');
        setTimeout(() => {
          window.location.href = BASE_URL + 'sesion';
        }, 1500);
        return;
      }

      // Logged in postulation logic
      if (currentCampaignId) {
        appliedProfileCampaigns.add(currentCampaignId);
      }

      const radioPending = document.querySelector('input[name="dev-state-choice"][value="registrado-pendiente"]');
      if (radioPending) {
        radioPending.checked = true;
      }
      updateModalStateBasedOnRadio();

      if (typeof showToast !== 'undefined') {
        showToast('Postulación procesada', 'Se ha guardado tu postulación como pendiente.', true);
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
    postulateBtn.textContent = 'Pendiente ✓';
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

// CLIENT-SIDE DYNAMIC PAGINATION
window.renderPagination = function() {
  const activePane = document.querySelector('.profile-pane.active');
  if (!activePane) return;

  const cards = activePane.querySelectorAll('.alt-card');
  const totalItems = cards.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const pagContainer = document.querySelector('.pagination-container');
  if (!pagContainer) return;
  
  if (totalPages <= 1) {
    pagContainer.style.display = 'none';
    cards.forEach(card => card.style.display = 'grid');
    return;
  } else {
    pagContainer.style.display = 'flex';
  }

  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  // Show only current page items
  cards.forEach((card, index) => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    if (index >= start && index < end) {
      card.style.display = 'grid';
    } else {
      card.style.display = 'none';
    }
  });

  // Re-generate pagination buttons
  pagContainer.innerHTML = '';

  // Previous page button
  const prevBtn = document.createElement('button');
  prevBtn.className = 'pag-btn';
  prevBtn.innerHTML = '&lt; Anterior';
  if (currentPage === 1) {
    prevBtn.disabled = true;
    prevBtn.style.opacity = '0.5';
    prevBtn.style.cursor = 'not-allowed';
  }
  prevBtn.addEventListener('click', () => {
    currentPage--;
    renderPagination();
  });
  pagContainer.appendChild(prevBtn);

  // Numeric page buttons
  for (let i = 1; i <= totalPages; i++) {
    const pageNumBtn = document.createElement('button');
    pageNumBtn.className = `pag-num ${i === currentPage ? 'active' : ''}`;
    pageNumBtn.textContent = i;
    pageNumBtn.addEventListener('click', () => {
      currentPage = i;
      renderPagination();
    });
    pagContainer.appendChild(pageNumBtn);
  }

  // Next page button
  const nextBtn = document.createElement('button');
  nextBtn.className = 'pag-btn';
  nextBtn.innerHTML = 'Siguiente &gt;';
  if (currentPage === totalPages) {
    nextBtn.disabled = true;
    nextBtn.style.opacity = '0.5';
    nextBtn.style.cursor = 'not-allowed';
  }
  nextBtn.addEventListener('click', () => {
    currentPage++;
    renderPagination();
  });
  pagContainer.appendChild(nextBtn);
};
