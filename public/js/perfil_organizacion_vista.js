// JavaScript for Perfil Organización Vista
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
  initializeVolunteersCarousel();
  initializeCloseModalEvents();
  renderPagination();
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

      // Reset pagination page
      currentPage = 1;
      renderPagination();
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

      // Reset pagination page
      currentPage = 1;
      renderPagination();
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
window.campaignsDetailsData = window.campaignsDetailsData || {
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


// OPEN MODAL FOR CAMPAIGNS
window.openCampaignDetailsModal = function(id) {
  currentCampaignId = id;
  
  fetch(`${BASE_URL}obtener-campania-por-id?id=${id}`)
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        const camp = res.data;
        
        const mTitle = document.getElementById('m-camp-title');
        const mDesc = document.getElementById('m-camp-desc');
        const mTags = document.getElementById('m-camp-tags');
        const mBadge = document.getElementById('m-camp-accepted-badge');
        const mPostulateBtn = document.getElementById('m-camp-postulate-btn');
        const mSensitive = document.getElementById('m-camp-sensitive-info');
        
        if (mTitle) mTitle.textContent = camp.title;
        if (mDesc) {
          mDesc.innerHTML = `
            <p style="margin-bottom:12px;"><strong>Descripción:</strong> ${camp.desc}</p>
            <p style="margin-bottom:12px;"><strong>Ubicación:</strong> ${camp.location}</p>
            <p style="margin-bottom:12px;"><strong>Fecha de inicio:</strong> ${camp.startDate}</p>
            <p><strong>Fecha de finalización:</strong> ${camp.endDate}</p>
          `;
        }
        
        if (mTags) {
          mTags.innerHTML = '';
          (camp.causes || []).forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tag-badge';
            span.innerHTML = `<i data-lucide="tag" style="width:12px; height:12px;"></i> ${tag}`;
            mTags.appendChild(span);
          });
          
          const typeSpan = document.createElement('span');
          typeSpan.className = 'tag-badge';
          typeSpan.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
          typeSpan.style.color = 'var(--color-primary)';
          typeSpan.style.fontWeight = '600';
          const typeLabel = camp.type === 'convocatoria' ? 'Convocatoria' : 'Informativa';
          typeSpan.innerHTML = `<i data-lucide="info" style="width:12px; height:12px;"></i> ${typeLabel}`;
          mTags.appendChild(typeSpan);
        }

        const mCreatorLink = document.getElementById("m-camp-creator-link");
        if (mCreatorLink) {
          if (camp.usuario_id) {
            const creatorProfileUrl = camp.usuario_rol === "voluntario" ? "perfil/voluntario" : "perfil/organizacion";
            mCreatorLink.href = `${BASE_URL}${creatorProfileUrl}?id=${camp.usuario_id}`;
            mCreatorLink.style.display = "flex";
            
            const mCreatorName = document.getElementById("m-camp-creator-name");
            if (mCreatorName) mCreatorName.textContent = camp.usuario_nombre || "Creador";
            
            const mCreatorAvatar = document.getElementById("m-camp-creator-avatar");
            if (mCreatorAvatar) {
              mCreatorAvatar.innerHTML = camp.usuario_img_perfil 
                ? `<img src="${BASE_URL + camp.usuario_img_perfil}" alt="Logo creador" class="creator-avatar-img">`
                : `<i data-lucide="user" class="creator-avatar-icon" style="width:20px; height:20px;"></i>`;
            }
          } else {
            mCreatorLink.style.display = "none";
          }
        }

        const gallerySec = document.getElementById("m-camp-gallery-sec");
        const galleryGrid = document.getElementById("m-camp-gallery-grid");
        if (gallerySec && galleryGrid) {
          galleryGrid.innerHTML = "";
          if (camp.images && camp.images.length > 0) {
            camp.images.forEach(imgUrl => {
              const div = document.createElement("div");
              div.className = "gallery-placeholder-img";
              div.innerHTML = `<img src="${BASE_URL + imgUrl}" alt="Foto de campaña" style="width:100%; height:100%; object-fit:cover; border-radius:inherit;">`;
              galleryGrid.appendChild(div);
            });
            gallerySec.style.display = "block";
          } else {
            gallerySec.style.display = "none";
          }
        }

        const assocSec = document.getElementById("m-camp-associations-sec");
        const assocList = document.getElementById("m-camp-associations-list");
        if (assocSec && assocList) {
          assocList.innerHTML = "";
          if (camp.associations && camp.associations.length > 0) {
            camp.associations.forEach(org => {
              const a = document.createElement("a");
              a.href = `${BASE_URL}perfil/organizacion?id=${org.id}`;
              a.className = "association-circle";
              a.title = org.nombre;
              a.innerHTML = org.img_perfil 
                ? `<img src="${BASE_URL + org.img_perfil}" alt="${org.nombre}" class="association-logo-img" style="width:40px; height:40px; border-radius:50%; object-fit:cover;">`
                : `<div class="association-logo-placeholder" style="width:40px; height:40px; border-radius:50%; background-color:var(--color-border); display:flex; align-items:center; justify-content:center; color:var(--color-text-light);"><i data-lucide="building" style="width:16px; height:16px;"></i></div>`;
              assocList.appendChild(a);
            });
            assocSec.style.display = "block";
          } else {
            assocSec.style.display = "none";
          }
        }
        
        if (mBadge) mBadge.style.display = "none";
        
        // Lógica de visualización de información de coordinación (adicional)
        let showAdditionalInfo = false;
        if (typeof SESSION_USER_ID !== 'undefined' && SESSION_USER_ID) {
          const isOwner = camp.usuario_id == SESSION_USER_ID;
          if (isOwner) {
            showAdditionalInfo = true;
          } else if (SESSION_USER_ROL === "voluntario") {
            const app = appliedCampaignsMap.get(id);
            if (app && app.status === "aceptado") {
              showAdditionalInfo = true;
            }
          } else if (SESSION_USER_ROL === "organizacion" && camp.associations) {
            const isAssociated = camp.associations.some(org => org.id == SESSION_USER_ID);
            if (isAssociated) {
              showAdditionalInfo = true;
            }
          }
        }

        if (mSensitive) {
          if (showAdditionalInfo) {
            mSensitive.innerHTML = `
              <h4>Información de coordinación</h4>
              <div class="info-alert-content">
                <p>${camp.info_adicional || "No hay información adicional registrada."}</p>
              </div>
            `;
            mSensitive.style.display = "block";
          } else {
            mSensitive.style.display = "none";
          }
        }

        const isOrg = typeof SESSION_USER_ROL !== 'undefined' && SESSION_USER_ROL === "organizacion";
        const isOwner = camp.usuario_id == (typeof SESSION_USER_ID !== 'undefined' ? SESSION_USER_ID : null);
        
        if (mPostulateBtn) {
          if (isOrg || isOwner) {
            mPostulateBtn.style.display = "none";
          } else {
            mPostulateBtn.style.display = "inline-flex";
            
            const app = appliedCampaignsMap.get(id);
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
      }
    })
    .catch(err => console.error("Error al cargar detalle de campaña:", err));
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
