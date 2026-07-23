// HOME PAGE SPECIFIC SCRIPT
const appliedCampaigns = new Set(); // Store campaign IDs user has applied to
let currentCampaignContext = null;
let currentViewedCampaignId = null;

document.addEventListener('DOMContentLoaded', () => {
  initializeCounters();
  initializeProcessTabs();
  initializeCampaignForm();
  initializeOrgProfileContactLink();
  initOrgsCarousel();
  initCampsCarousel();
  setupPostulationHandler();
});

// COUNTER COUNTING EFFECT IN HERO
function initializeCounters() {
  animateValue('stat-campaigns', 140, 180, 1500, '+');
  animateValue('stat-orgs', 50, 95, 1500, '');
  animateValue('stat-impact', 5, 12, 1500, 'k+');
}

function animateValue(id, start, end, duration, suffix = '') {
  const obj = document.getElementById(id);
  if (!obj) return;
  
  const range = end - start;
  let current = start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));
  
  const timer = setInterval(() => {
    current += increment;
    obj.textContent = current + suffix;
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}

// PROCESS TABS ("Cómo funciona")
function initializeProcessTabs() {
  const tabBtnVol = document.getElementById('tab-btn-vol');
  const tabBtnOrg = document.getElementById('tab-btn-org');
  const paneVol = document.getElementById('pane-vol');
  const paneOrg = document.getElementById('pane-org');
  
  if (tabBtnVol && tabBtnOrg && paneVol && paneOrg) {
    tabBtnVol.addEventListener('click', () => {
      tabBtnVol.classList.add('active');
      tabBtnVol.setAttribute('aria-selected', 'true');
      tabBtnOrg.classList.remove('active');
      tabBtnOrg.setAttribute('aria-selected', 'false');
      
      paneOrg.style.display = 'none';
      paneOrg.classList.remove('active');
      paneVol.style.display = 'grid';
      setTimeout(() => paneVol.classList.add('active'), 50);
    });
  
    tabBtnOrg.addEventListener('click', () => {
      tabBtnOrg.classList.add('active');
      tabBtnOrg.setAttribute('aria-selected', 'true');
      tabBtnVol.classList.remove('active');
      tabBtnVol.setAttribute('aria-selected', 'false');
      
      paneVol.style.display = 'none';
      paneVol.classList.remove('active');
      paneOrg.style.display = 'grid';
      setTimeout(() => paneOrg.classList.add('active'), 50);
    });
  }
}

// INTERACTIVE CAMPAIGN DETAILS & POPULATING MODAL
window.openCampaignDetails = function(campaignId) {
  currentViewedCampaignId = campaignId;

  const mTitle = document.getElementById("m-camp-title");
  const mDesc = document.getElementById("m-camp-desc");
  const mTags = document.getElementById("m-camp-tags");
  const mBadge = document.getElementById("m-camp-accepted-badge");
  const mPostulateBtn = document.getElementById("m-camp-postulate-btn");
  const mSensitive = document.getElementById("m-camp-sensitive-info");

  fetch(`${BASE_URL}obtener-campania-por-id?id=${campaignId}`)
    .then(res => res.json())
    .then(res => {
      if (!res.success) return;
      const camp = res.data;

      if (mTitle) mTitle.textContent = camp.title;
      
      if (mDesc) {
        mDesc.innerHTML = `
          <div class="modal-info-cards-grid">
            <div class="modal-info-card desc-card">
              <div class="modal-card-icon-wrapper desc-icon">
                <i data-lucide="file-text"></i>
              </div>
              <div class="modal-card-text">
                <span class="modal-card-label">Descripción</span>
                <p class="modal-card-value">${camp.desc}</p>
              </div>
            </div>

            <div class="modal-info-card location-card">
              <div class="modal-card-icon-wrapper location-icon">
                <i data-lucide="map-pin"></i>
              </div>
              <div class="modal-card-text">
                <span class="modal-card-label">Ubicación</span>
                <p class="modal-card-value">${camp.location}</p>
              </div>
            </div>

            <div class="modal-info-card-row">
              <div class="modal-info-card date-card start-date">
                <div class="modal-card-icon-wrapper start-date-icon">
                  <i data-lucide="calendar"></i>
                </div>
                <div class="modal-card-text">
                  <span class="modal-card-label">Fecha de inicio</span>
                  <p class="modal-card-value">${camp.startDate}</p>
                </div>
              </div>

              <div class="modal-info-card date-card end-date">
                <div class="modal-card-icon-wrapper end-date-icon">
                  <i data-lucide="clock"></i>
                </div>
                <div class="modal-card-text">
                  <span class="modal-card-label">Fecha de finalización</span>
                  <p class="modal-card-value">${camp.endDate}</p>
                </div>
              </div>
            </div>
          </div>
        `;
        if (typeof lucide !== "undefined") {
          lucide.createIcons();
        }
      }

      if (mTags) {
        mTags.innerHTML = "";
        const causesList = camp.causes || [];
        causesList.forEach(cause => {
          const span = document.createElement("span");
          span.className = "tag-badge";
          span.innerHTML = `<i data-lucide="tag" style="width:12px; height:12px;"></i> ${cause}`;
          mTags.appendChild(span);
        });

        const typeSpan = document.createElement("span");
        typeSpan.className = "tag-badge";
        typeSpan.style.backgroundColor = "rgba(99, 102, 241, 0.1)";
        typeSpan.style.color = "var(--color-primary)";
        typeSpan.style.fontWeight = "600";
        const typeLabel = camp.type === "convocatoria" ? "Convocatoria" : "Informativa";
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
          if (mCreatorName) {
            mCreatorName.textContent = camp.usuario_nombre || camp.nombre || "Organización";
          }
          
          const mCreatorAvatar = document.getElementById("m-camp-creator-avatar");
          if (mCreatorAvatar) {
            if (camp.usuario_img_perfil) {
              mCreatorAvatar.innerHTML = `<img src="${BASE_URL + camp.usuario_img_perfil}" alt="Logo creador" class="creator-avatar-img">`;
            } else {
              mCreatorAvatar.innerHTML = `<i data-lucide="user" class="creator-avatar-icon" style="width:20px; height:20px;"></i>`;
            }
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
            if (org.img_perfil) {
              a.innerHTML = `<img src="${BASE_URL + org.img_perfil}" alt="${org.nombre}" class="association-logo-img" style="width:40px; height:40px; border-radius:50%; object-fit:cover;">`;
            } else {
              a.innerHTML = `<div class="association-logo-placeholder" style="width:40px; height:40px; border-radius:50%; background-color:var(--color-border); display:flex; align-items:center; justify-content:center; color:var(--color-text-light);"><i data-lucide="building" style="width:16px; height:16px;"></i></div>`;
            }
            assocList.appendChild(a);
          });
          assocSec.style.display = "block";
        } else {
          assocSec.style.display = "none";
        }
      }

      if (mBadge) mBadge.style.display = "none";
      
      let showAdditionalInfo = false;
      if (typeof SESSION_USER_ID !== 'undefined' && SESSION_USER_ID) {
        const isOwner = camp.usuario_id == SESSION_USER_ID;
        if (isOwner) {
          showAdditionalInfo = true;
        } else if (typeof SESSION_USER_ROL !== 'undefined' && SESSION_USER_ROL === "voluntario") {
          if (camp.es_voluntario_aceptado) {
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
        if (showAdditionalInfo && camp.info_adicional && camp.info_adicional.trim() !== "") {
          mSensitive.innerHTML = `
            <h4>Información de coordinación</h4>
            <div class="info-alert-content">
              <p>${camp.info_adicional}</p>
            </div>
          `;
          mSensitive.style.display = "block";
        } else {
          mSensitive.style.display = "none";
        }
      }

      if (mPostulateBtn) {
        const isOwner = typeof SESSION_USER_ID !== 'undefined' && camp.usuario_id == SESSION_USER_ID;
        const isOrg = typeof SESSION_USER_ROL !== 'undefined' && SESSION_USER_ROL === "organizacion";
        
        if (camp.type === "convocatoria" && !isOwner && !isOrg) {
          mPostulateBtn.style.display = "inline-flex";
          
          if (camp.es_voluntario_aceptado) {
            mPostulateBtn.disabled = true;
            mPostulateBtn.textContent = "Postulado";
            mPostulateBtn.style.backgroundColor = "#c0c0c0";
            mPostulateBtn.style.color = "#666666";
            mPostulateBtn.style.cursor = "default";
            
            if (mBadge) {
              mBadge.textContent = "ACEPTADO";
              mBadge.className = `modal-status-badge accepted-pill`;
              mBadge.style.display = "inline-block";
            }
          } else {
            mPostulateBtn.disabled = false;
            mPostulateBtn.className = "btn btn-primary";
            mPostulateBtn.textContent = "Postularme";
            mPostulateBtn.style.backgroundColor = "";
            mPostulateBtn.style.color = "";
            mPostulateBtn.style.cursor = "pointer";
          }
        } else {
          mPostulateBtn.style.display = "none";
        }
      }

      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
      openModal('modal-profile-camp-detail');
    })
    .catch(err => {
      console.error("Error al cargar detalle de campaña:", err);
    });
};

function setupPostulationHandler() {
  const postulateBtn = document.getElementById("m-camp-postulate-btn");
  if (postulateBtn) {
    postulateBtn.addEventListener("click", () => {
      if (!currentViewedCampaignId) return;

      // Si el usuario no está logueado, mostrar toast y redirigir a inicio de sesión
      if (!SESSION_USER_ID) {
        if (typeof showToast !== "undefined") {
          showToast("Inicio de sesión requerido", "Debes iniciar sesión para postularte.", false);
        }
        closeModal("modal-profile-camp-detail");
        setTimeout(() => {
          window.location.href = `${BASE_URL}sesion`;
        }, 1500);
        return;
      }

      postulateBtn.disabled = true;
      const formData = new FormData();
      formData.append("id_campania", currentViewedCampaignId);

      fetch(`${BASE_URL}postular-campania`, {
        method: "POST",
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        postulateBtn.disabled = false;
        if (data.success) {
          if (typeof showToast !== "undefined") {
            showToast("Postulación exitosa", data.message, true);
          }
          closeModal("modal-profile-camp-detail");
        } else {
          if (typeof showToast !== "undefined") {
            showToast("No se pudo postular", data.message, false);
          }
        }
      })
      .catch(err => {
        postulateBtn.disabled = false;
        console.error("Error al postularse:", err);
      });
    });
  }
}

// MOCK CAMPAIGN FORM SUBMIT
function initializeCampaignForm() {
  const createCampaignForm = document.getElementById('create-campaign-form');
  if (createCampaignForm) {
    createCampaignForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const title = document.getElementById('create-title').value;
      const org = document.getElementById('create-org').value;
      const category = document.getElementById('create-category').value;
      const desc = document.getElementById('create-desc').value;
      const location = document.getElementById('create-location').value;
      const volNeeded = parseInt(document.getElementById('create-vol-needed').value);
      const dateInput = document.getElementById('create-date').value;
      const time = document.getElementById('create-time').value;
      
      const dateObj = new Date(dateInput);
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      const formattedDate = dateObj.toLocaleDateString('es-ES', options);
      
      closeModal('modal-create-campaign');
      showToast('Campaña creada con éxito', `"${title}" ya está visible para todos los voluntarios.`, true);
      
      createCampaignForm.reset();
    });
  }
}

function initializeOrgProfileContactLink() {
  const directCreateBtn = document.getElementById('direct-create-campaign-btn');
  if (directCreateBtn) {
    directCreateBtn.addEventListener('click', () => openModal('modal-create-campaign'));
  }
}

// ==========================================================================
// CARRUSEL ORGANIZACIONES — flechas + autoplay + dots + bucle infinito
// ==========================================================================
function initOrgsCarousel() {
  const carousel      = document.getElementById('orgs-container');
  const prevBtn       = document.getElementById('orgs-prev');
  const nextBtn       = document.getElementById('orgs-next');
  const dotsContainer = document.getElementById('orgs-dots');

  if (!carousel || !prevBtn || !nextBtn) return;

  const AUTOPLAY_INTERVAL = 4000;
  let autoplayTimer = null;
  let currentIndex  = 0;
  let isScrolling   = false;

  function getVisibleCount() {
    const card = carousel.querySelector('.org-card');
    if (!card) return 1;
    const cardWidth = card.offsetWidth + 24; // 24 = gap
    return Math.max(1, Math.round(carousel.clientWidth / cardWidth));
  }

  function getCards() {
    return Array.from(carousel.querySelectorAll('.org-card'));
  }

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const visible = getVisibleCount();
    const total = Math.ceil(getCards().length / visible);
    
    if (total <= 1) {
      dotsContainer.style.display = 'none';
      return;
    }
    dotsContainer.style.display = 'flex';

    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Ir al grupo ${i + 1}`);
      dot.addEventListener('click', () => {
        stopAutoplay();
        goTo(i);
        startAutoplay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goTo(index) {
    const cards    = getCards();
    const visible  = getVisibleCount();
    const maxIndex = Math.ceil(cards.length / visible) - 1;

    // Lógica de bucle circular
    if (index < 0) {
      currentIndex = Math.max(0, maxIndex);
    } else if (index > maxIndex) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    const targetCard = cards[currentIndex * visible];
    if (targetCard) {
      isScrolling = true;
      const targetOffset = targetCard.offsetLeft - 4;
      
      carousel.style.scrollSnapType = 'none';
      carousel.scrollTo({ left: targetOffset, behavior: 'smooth' });
      
      setTimeout(() => {
        carousel.style.scrollSnapType = 'x mandatory';
        isScrolling = false;
      }, 500);
    }

    updateDots();
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      const visible = getVisibleCount();
      const maxIndex = Math.ceil(getCards().length / visible) - 1;
      if (maxIndex <= 0) return;
      
      goTo(currentIndex >= maxIndex ? 0 : currentIndex + 1);
    }, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  let scrollTimeout;
  carousel.addEventListener('scroll', () => {
    if (isScrolling) return;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollLeft = carousel.scrollLeft;
      const card = carousel.querySelector('.org-card');
      if (!card) return;
      const cardWidth = card.offsetWidth + 24;
      const visible = getVisibleCount();
      
      const newIndex = Math.round(scrollLeft / (cardWidth * visible));
      const maxIndex = Math.ceil(getCards().length / visible) - 1;
      currentIndex = Math.max(0, Math.min(newIndex, maxIndex));
      
      updateDots();
    }, 100);
  });

  prevBtn.addEventListener('click', () => {
    stopAutoplay();
    goTo(currentIndex - 1);
    startAutoplay();
  });

  nextBtn.addEventListener('click', () => {
    stopAutoplay();
    goTo(currentIndex + 1);
    startAutoplay();
  });

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      buildDots();
      goTo(currentIndex);
    }, 200);
  });

  buildDots();
  goTo(0);
  startAutoplay();
}

// ==========================================================================
// CARRUSEL CAMPAÑAS — flechas + autoplay + dots + bucle infinito
// ==========================================================================
function initCampsCarousel() {
  const carousel      = document.getElementById('campaigns-container');
  const prevBtn       = document.getElementById('camps-prev');
  const nextBtn       = document.getElementById('camps-next');
  const dotsContainer = document.getElementById('camps-dots');

  if (!carousel || !prevBtn || !nextBtn) return null;

  const AUTOPLAY_INTERVAL = 6000;
  let autoplayTimer = null;
  let currentIndex  = 0;
  let isScrolling   = false;

  function getCards() {
    return Array.from(carousel.querySelectorAll('.camp-card')).filter(card => card.style.display !== 'none');
  }

  function getVisibleCount() {
    const card = carousel.querySelector('.camp-card');
    if (!card) return 1;
    const cardWidth = card.offsetWidth + 24; 
    return Math.max(1, Math.round(carousel.clientWidth / cardWidth));
  }

  function updateSnapping() {
    const cards = getCards();
    const visible = getVisibleCount();
    Array.from(carousel.querySelectorAll('.camp-card')).forEach(card => {
      card.style.scrollSnapAlign = 'none';
    });
    cards.forEach((card, i) => {
      if (i % visible === 0) {
        card.style.scrollSnapAlign = 'start';
      }
    });
  }

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const visible = getVisibleCount();
    const total = Math.ceil(getCards().length / visible);
    
    if (total <= 1) {
      dotsContainer.style.display = 'none';
      updateSnapping();
      return;
    }
    dotsContainer.style.display = 'flex';

    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Ir al grupo ${i + 1}`);
      dot.addEventListener('click', () => {
        stopAutoplay();
        goTo(i);
        startAutoplay();
      });
      dotsContainer.appendChild(dot);
    }

    updateSnapping();
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goTo(index) {
    const cards    = getCards();
    const visible  = getVisibleCount();
    const maxIndex = Math.ceil(cards.length / visible) - 1;

    if (index < 0) {
      currentIndex = Math.max(0, maxIndex);
    } else if (index > maxIndex) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    const targetCard = cards[currentIndex * visible];
    if (targetCard) {
      isScrolling = true;
      const targetOffset = targetCard.offsetLeft - 4;
      
      carousel.style.scrollSnapType = 'none';
      carousel.scrollTo({ left: targetOffset, behavior: 'smooth' });
      
      setTimeout(() => {
        carousel.style.scrollSnapType = 'x mandatory';
        isScrolling = false;
      }, 500);
    }

    updateDots();
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      const visible = getVisibleCount();
      const maxIndex = Math.ceil(getCards().length / visible) - 1;
      if (maxIndex <= 0) return;
      
      goTo(currentIndex >= maxIndex ? 0 : currentIndex + 1);
    }, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  let scrollTimeout;
  carousel.addEventListener('scroll', () => {
    if (isScrolling) return;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollLeft = carousel.scrollLeft;
      const card = carousel.querySelector('.camp-card');
      if (!card) return;
      const cardWidth = card.offsetWidth + 24;
      const visible = getVisibleCount();
      const cards = getCards();
      
      const newIndex = Math.round(scrollLeft / (cardWidth * visible));
      const maxIndex = Math.ceil(cards.length / visible) - 1;
      currentIndex = Math.max(0, Math.min(newIndex, maxIndex));
      
      updateDots();
    }, 100);
  });

  prevBtn.addEventListener('click', () => {
    stopAutoplay();
    goTo(currentIndex - 1);
    startAutoplay();
  });

  nextBtn.addEventListener('click', () => {
    stopAutoplay();
    goTo(currentIndex + 1);
    startAutoplay();
  });

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      buildDots();
      goTo(currentIndex);
    }, 200);
  });

  function rebuild() {
    buildDots();
    goTo(0);
  }

  buildDots();
  goTo(0);
  startAutoplay();

  return {
    rebuild,
    goTo
  };
}
