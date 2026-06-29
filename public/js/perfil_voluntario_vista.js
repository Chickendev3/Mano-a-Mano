// JavaScript for Perfil Voluntario Vista
let currentCampaignId = null;
const appliedCampaignsMap = new Map();

// Pagination State
const ITEMS_PER_PAGE = 2;
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
  // Cargar postulaciones del voluntario si está logueado
  if (typeof SESSION_USER_ID !== 'undefined' && SESSION_USER_ID && SESSION_USER_ROL === 'voluntario') {
    fetch(`${BASE_URL}obtener-mis-postulaciones`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          res.data.forEach(post => {
            appliedCampaignsMap.set(post.campaignId, {
              status: post.status,
              additionalInfo: post.additionalInfo
            });
          });
        }
      })
      .catch(err => console.error("Error al cargar postulaciones:", err));
  }

  initializeTabs();
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
window.campaignsDetailsData = window.campaignsDetailsData || {
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
  const mBadge = document.getElementById('m-camp-accepted-badge');
  const mPostulateBtn = document.getElementById('m-camp-postulate-btn');
  const mSensitive = document.getElementById('m-camp-sensitive-info');
  
  if (mTitle) mTitle.textContent = camp.title;
  if (mDesc) mDesc.textContent = camp.desc;
  
  if (mTags) {
    mTags.innerHTML = '';
    camp.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tag-badge';
      span.innerHTML = `<i data-lucide="tag" style="width:12px; height:12px;"></i> ${tag}`;
      mTags.appendChild(span);
    });
  }
  
  if (mBadge) mBadge.style.display = "none";
  if (mSensitive) mSensitive.style.display = "none";

  const isOrg = typeof SESSION_USER_ROL !== 'undefined' && SESSION_USER_ROL === "organizacion";
  
  if (mPostulateBtn) {
    if (isOrg) {
      mPostulateBtn.style.display = "none";
    } else {
      mPostulateBtn.style.display = "inline-flex";
      
      const app = appliedCampaignsMap.get(campaignId);
      if (app) {
        mPostulateBtn.disabled = true;
        mPostulateBtn.textContent = "Ya postulado";
        
        if (mBadge) {
          mBadge.textContent = app.status.toUpperCase();
          mBadge.className = `modal-status-badge ${app.status === "aceptado" ? "accepted-pill" : (app.status === "rechazado" ? "rejected-pill" : "pending-pill")}`;
          mBadge.style.display = "inline-block";
        }
        
        if (app.status === "aceptado" && mSensitive) {
          mSensitive.innerHTML = `
            <h4>Información de coordinación</h4>
            <div class="info-alert-content">
              <p>${camp.info_adicional || "No hay información adicional registrada."}</p>
            </div>
          `;
          mSensitive.style.display = "block";
        }
      } else {
        mPostulateBtn.disabled = false;
        mPostulateBtn.textContent = "Postularme";
      }
    }
  }
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  openModal('modal-profile-camp-detail');
};

// CLOSE MODAL UTILITY
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

// REAL POSTULATION EVENT LISTENER
document.addEventListener('DOMContentLoaded', () => {
  const postulateBtn = document.getElementById('m-camp-postulate-btn');
  if (postulateBtn) {
    postulateBtn.addEventListener('click', () => {
      const isLoggedIn = typeof SESSION_USER_ID !== 'undefined' && SESSION_USER_ID;
      if (!isLoggedIn) {
        if (typeof showToast !== 'undefined') {
          showToast('Inicio de sesión requerido', 'Tenés que iniciar sesión para postularte a las campañas.', false);
        }
        closeModal('modal-profile-camp-detail');
        setTimeout(() => {
          window.location.href = BASE_URL + 'sesion';
        }, 1500);
        return;
      }

      postulateBtn.disabled = true;
      const formData = new FormData();
      formData.append("id_campania", currentCampaignId);

      fetch(`${BASE_URL}postular-campania`, {
        method: "POST",
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        postulateBtn.disabled = false;
        if (data.success) {
          if (typeof showToast !== 'undefined') {
            showToast('Postulación exitosa', data.message, true);
          }
          appliedCampaignsMap.set(currentCampaignId, {
            status: 'pendiente',
            additionalInfo: ''
          });
          closeModal('modal-profile-camp-detail');
        } else {
          if (typeof showToast !== 'undefined') {
            showToast('No se pudo postular', data.message, false);
          }
        }
      })
      .catch(err => {
        postulateBtn.disabled = false;
        console.error("Error al postularse:", err);
      });
    });
  }
});

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

// INVITATION SYSTEM
document.addEventListener('DOMContentLoaded', () => {
  const btnOpenInvite = document.getElementById('btn-open-invite-modal');
  const btnConfirmInvite = document.getElementById('btn-confirm-invite');
  const selectCampaign = document.getElementById('invite-campaign-select');

  if (btnOpenInvite) {
    btnOpenInvite.addEventListener('click', () => {
      fetch(`${BASE_URL}obtener-mis-convocatorias-activas`)
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            selectCampaign.innerHTML = "";
            if (res.data.length === 0) {
              const opt = document.createElement('option');
              opt.value = "";
              opt.textContent = "No tenés convocatorias activas para invitar";
              selectCampaign.appendChild(opt);
              btnConfirmInvite.disabled = true;
              btnConfirmInvite.style.opacity = '0.5';
            } else {
              res.data.forEach(camp => {
                const opt = document.createElement('option');
                opt.value = camp.id;
                opt.textContent = camp.title;
                selectCampaign.appendChild(opt);
              });
              btnConfirmInvite.disabled = false;
              btnConfirmInvite.style.opacity = '1';
            }
            openModal('modal-invite-user');
          } else {
            if (typeof showToast !== 'undefined') {
              showToast('Error', res.message || 'Error al cargar tus campañas.', false);
            }
          }
        })
        .catch(err => console.error("Error al cargar convocatorias activas:", err));
    });
  }

  if (btnConfirmInvite) {
    btnConfirmInvite.addEventListener('click', () => {
      const campaignId = selectCampaign.value;
      if (!campaignId) return;

      btnConfirmInvite.disabled = true;
      const formData = new FormData();
      formData.append("id_campania", campaignId);
      formData.append("destinatario_id", VISITED_USER_ID);

      fetch(`${BASE_URL}crear-invitacion`, {
        method: "POST",
        body: formData
      })
      .then(res => res.json())
      .then(res => {
        btnConfirmInvite.disabled = false;
        if (res.success) {
          if (typeof showToast !== 'undefined') {
            showToast('Invitación enviada', res.message, true);
          }
          closeModal('modal-invite-user');
        } else {
          if (typeof showToast !== 'undefined') {
            showToast('No se pudo enviar', res.message, false);
          }
        }
      })
      .catch(err => {
        btnConfirmInvite.disabled = false;
        console.error("Error al enviar invitación:", err);
      });
    });
  }
});
