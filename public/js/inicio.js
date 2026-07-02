// HOME PAGE SPECIFIC SCRIPT
const campaignsData = [
  {
    id: 1,
    title: 'Reforestación Parque Central',
    org: 'Techo Verde',
    category: 'medio-ambiente',
    desc: 'Sumate a nuestra jornada de plantación de árboles nativos para recuperar el pulmón verde de la ciudad. Apto para toda la familia y personas que disfruten del trabajo al aire libre.',
    skills: 'Empatía, trabajo físico básico, buena predisposición y ganas de trabajar en equipo.',
    location: 'Buenos Aires',
    img: 'img/campaign_park.png'
  },
  {
    id: 2,
    title: 'Clases de Apoyo Digital',
    org: 'Mentes Brillantes',
    category: 'educacion',
    desc: 'Buscamos tutores para enseñar el uso de herramientas de oficina básicas, navegación segura por internet y programación web inicial a jóvenes y adolescentes del barrio de San Martín.',
    skills: 'Paciencia, conocimientos de informática básica, facilidad para explicar temas a jóvenes.',
    location: 'Rosario',
    date: '18 Jun, 2026',
    time: '16:00 - 18:00',
    volunteersRequired: 10,
    volunteersRegistered: 4,
    progress: 40,
    img: 'img/campaign_tutoring.png'
  },
  {
    id: 3,
    title: 'Colecta de Alimentos',
    org: 'Corazones Abiertos',
    category: 'accion-social',
    desc: 'Ayudanos a clasificar, empaquetar y distribuir las donaciones del banco de alimentos destinadas a 5 comedores comedores comunitarios infantiles que asisten a familias del sector.',
    skills: 'Clasificación de stock, organización, trabajo colaborativo dinámico.',
    location: 'Córdoba',
    date: '21 Jun, 2026',
    time: '08:30 - 14:00',
    volunteersRequired: 15,
    volunteersRegistered: 13,
    progress: 86,
    img: 'img/campaign_food.png'
  }
];

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
          <p style="margin-bottom:12px;"><strong>Descripción:</strong> ${camp.desc}</p>
          <p style="margin-bottom:12px;"><strong>Ubicación:</strong> ${camp.location}</p>
          <p style="margin-bottom:12px;"><strong>Fecha de inicio:</strong> ${camp.startDate}</p>
          <p><strong>Fecha de finalización:</strong> ${camp.endDate}</p>
        `;
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

function initCampsCarousel() {
  const carousel      = document.getElementById('campaigns-container');
  const prevBtn       = document.getElementById('camps-prev');
  const nextBtn       = document.getElementById('camps-next');
  const dotsContainer = document.getElementById('camps-dots');

  if (!carousel || !prevBtn || !nextBtn) return;

  const AUTOPLAY_INTERVAL = 5000;
  let autoplayTimer = null;
  let currentIndex  = 0;

  function getVisibleCount() {
    const card = carousel.querySelector('.camp-card');
    if (!card) return 1;
    const cardWidth = card.offsetWidth + 24; 
    return Math.max(1, Math.round(carousel.clientWidth / cardWidth));
  }

  function getCards() {
    return Array.from(carousel.querySelectorAll('.camp-card'));
  }

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const total = Math.ceil(getCards().length / getVisibleCount());
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Ir al grupo ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
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

    currentIndex = Math.max(0, Math.min(index, maxIndex));

    const targetCard = cards[currentIndex * visible];
    if (targetCard) {
      carousel.scrollTo({ left: targetCard.offsetLeft - 4, behavior: 'smooth' });
    }

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
    updateDots();
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      const maxIndex = Math.ceil(getCards().length / getVisibleCount()) - 1;
      goTo(currentIndex >= maxIndex ? 0 : currentIndex + 1);
    }, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  prevBtn.addEventListener('click', () => { goTo(currentIndex - 1); stopAutoplay(); startAutoplay(); });
  nextBtn.addEventListener('click', () => { goTo(currentIndex + 1); stopAutoplay(); startAutoplay(); });

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { buildDots(); goTo(currentIndex); }, 200);
  });

  buildDots();
  goTo(0);
  startAutoplay();
}

// ==========================================================================
// CARRUSEL ORGANIZACIONES — flechas + autoplay + dots
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
    const total = Math.ceil(getCards().length / getVisibleCount());
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Ir al grupo ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
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

    currentIndex = Math.max(0, Math.min(index, maxIndex));

    const targetCard = cards[currentIndex * visible];
    if (targetCard) {
      carousel.scrollTo({ left: targetCard.offsetLeft - 4, behavior: 'smooth' });
    }

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
    updateDots();
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      const maxIndex = Math.ceil(getCards().length / getVisibleCount()) - 1;
      goTo(currentIndex >= maxIndex ? 0 : currentIndex + 1);
    }, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  prevBtn.addEventListener('click', () => { goTo(currentIndex - 1); stopAutoplay(); startAutoplay(); });
  nextBtn.addEventListener('click', () => { goTo(currentIndex + 1); stopAutoplay(); startAutoplay(); });

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { buildDots(); goTo(currentIndex); }, 200);
  });

  buildDots();
  goTo(0);
  startAutoplay();
}
