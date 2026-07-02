// HOME PAGE SPECIFIC SCRIPT
const campaignsData = [
  {
    id: 1,
    title: 'Reforestación Parque Central',
    org: 'Techo Verde',
    category: 'medio-ambiente',
    desc: 'Sumate a nuestra jornada de plantación de árboles nativos para recuperar el pulmón verde de la ciudad. Apto para toda la familia.',
    skills: 'Empatía, trabajo físico básico, buena predisposición y ganas de trabajar en equipo.',
    location: 'Buenos Aires',
    img: 'img/campaign_park.png'
  },
  {
    id: 2,
    title: 'Clases de Apoyo Digital',
    org: 'Mentes Brillantes',
    category: 'educacion',
    desc: 'Buscamos tutores para enseñar el uso de herramientas de oficina básicas, navegación segura por internet y programación web inicial a jóvenes del barrio de San Martín.',
    skills: 'Paciencia, conocimientos de informática básica, facilidad para explicar temas a jóvenes.',
    location: 'Rosario',
    img: 'img/campaign_tutoring.png'
  },
  {
    id: 3,
    title: 'Colecta de Alimentos',
    org: 'Corazones Abiertos',
    category: 'accion-social',
    desc: 'Ayudanos a clasificar, empaquetar y distribuir las donaciones del banco de alimentos destinadas a 5 comedores comunitarios infantiles.',
    skills: 'Clasificación de stock, organización, trabajo colaborativo dinámico.',
    location: 'Córdoba',
    img: 'img/campaign_food.png'
  },
  {
    id: 4,
    title: 'Limpieza de Río Luján',
    org: 'EcoRed',
    category: 'medio-ambiente',
    desc: 'Limpieza colaborativa de las orillas del Río Luján para remover plásticos y concientizar sobre el cuidado de humedales.',
    skills: 'Trabajo físico moderado, conciencia ambiental, trabajo en equipo.',
    location: 'Tigre',
    img: 'img/campaign_park.png'
  },
  {
    id: 5,
    title: 'Apoyo de Matemática',
    org: 'Huellas del Mañana',
    category: 'educacion',
    desc: 'Clases grupales de refuerzo de matemáticas y álgebra para estudiantes que están rindiendo sus exámenes de ingreso.',
    skills: 'Conocimientos de matemática, didáctica, paciencia.',
    location: 'Tucumán',
    img: 'img/campaign_tutoring.png'
  },
  {
    id: 6,
    title: 'Adopción de Mascotas',
    org: 'Patitas Felices',
    category: 'accion-social',
    desc: 'Jornada dominical para incentivar la adopción responsable de animales rescatados y recaudar alimento balanceado.',
    skills: 'Cuidado animal, empatía, habilidades interpersonales.',
    location: 'Mendoza',
    img: 'img/campaign_food.png'
  },
  {
    id: 7,
    title: 'Taller de Compostaje',
    org: 'Techo Verde',
    category: 'medio-ambiente',
    desc: 'Aprendé las técnicas básicas para compostar residuos orgánicos en casa y reducir tu basura diaria a la mitad.',
    skills: 'Interés ecológico, paciencia, ganas de aprender.',
    location: 'Rosario',
    img: 'img/campaign_park.png'
  },
  {
    id: 8,
    title: 'Robótica Infantil',
    org: 'Mentes Brillantes',
    category: 'educacion',
    desc: 'Introducción a la lógica y la programación utilizando pequeños kits de robótica educativa para niños en edad escolar.',
    skills: 'Lógica básica, paciencia, gusto por la docencia.',
    location: 'Córdoba',
    img: 'img/campaign_tutoring.png'
  },
  {
    id: 9,
    title: 'Colecta de Frazadas',
    org: 'Corazones Abiertos',
    category: 'accion-social',
    desc: 'Recepción, clasificación y armado de kits de abrigo invernal para personas que asisten a refugios temporales en épocas frías.',
    skills: 'Clasificación, empaque, proactividad.',
    location: 'Buenos Aires',
    img: 'img/campaign_food.png'
  },
  {
    id: 10,
    title: 'Huertas Comunitarias',
    org: 'Techo Verde',
    category: 'medio-ambiente',
    desc: 'Colaborá con el mantenimiento y la cosecha de verduras frescas cultivadas en la huerta del centro integrador vecinal.',
    skills: 'Ganas de cultivar, trabajo manual ligero, cooperación.',
    location: 'Buenos Aires',
    img: 'img/campaign_park.png'
  },
  {
    id: 11,
    title: 'Mentoría Académica',
    org: 'Huellas del Mañana',
    category: 'educacion',
    desc: 'Acompañá el tramo final de la escuela secundaria de un estudiante guiándolo en el armado de su CV y búsqueda de carreras.',
    skills: 'Empatía, comunicación, orientación vocacional.',
    location: 'Buenos Aires',
    img: 'img/campaign_tutoring.png'
  },
  {
    id: 12,
    title: 'Comedor Solidario',
    org: 'Corazones Abiertos',
    category: 'accion-social',
    desc: 'Buscamos voluntarios para ayudar a cocinar y servir viandas calientes los viernes por la noche en la estación de trenes.',
    skills: 'Trabajo en cocina, servicio de comida, empatía social.',
    location: 'Rosario',
    img: 'img/campaign_food.png'
  },
  {
    id: 13,
    title: 'Cuidado de Senderos',
    org: 'EcoRed',
    category: 'medio-ambiente',
    desc: 'Ayudanos a restaurar y señalizar los senderos del Parque Reserva Natural para proteger la flora autóctona.',
    skills: 'Buena condición física, amor por la naturaleza, orientación.',
    location: 'Mendoza',
    img: 'img/campaign_park.png'
  },
  {
    id: 14,
    title: 'Comprensión Lectora',
    org: 'Huellas del Mañana',
    category: 'educacion',
    desc: 'Buscamos voluntarios para realizar lecturas compartidas y dinámicas de comprensión de textos con niños de primaria.',
    skills: 'Paciencia, pedagogía básica, lectura expresiva.',
    location: 'Salta',
    img: 'img/campaign_tutoring.png'
  },
  {
    id: 15,
    title: 'Pintura Solidaria',
    org: 'Corazones Abiertos',
    category: 'accion-social',
    desc: 'Sumate a pintar y refaccionar las salas del club deportivo barrial que asiste a más de 200 jóvenes.',
    skills: 'Destrezas de pintura básica, proactividad, trabajo en equipo.',
    location: 'La Plata',
    img: 'img/campaign_food.png'
  },
  {
    id: 16,
    title: 'Alfabetización Adultos',
    org: 'Mentes Brillantes',
    category: 'educacion',
    desc: 'Buscamos tutores para dictar clases básicas de lectura, escritura y cálculo a adultos mayores del centro vecinal.',
    skills: 'Mucha paciencia, calidez humana, facilidad de enseñanza.',
    location: 'Córdoba',
    img: 'img/campaign_tutoring.png'
  },
  {
    id: 17,
    title: 'Refugio de Noche',
    org: 'Corazones Abiertos',
    category: 'accion-social',
    desc: 'Colaborá en la recepción de personas en situación de calle, sirviendo la cena y acondicionando las camas.',
    skills: 'Empatía, escucha activa, vocación de servicio social.',
    location: 'Rosario',
    img: 'img/campaign_food.png'
  }
];

const appliedCampaigns = new Set(); // Store campaign IDs user has applied to
let currentCampaignContext = null;
let campsCarouselInstance = null; // Store camps carousel instance

document.addEventListener('DOMContentLoaded', () => {
  initializeCounters();
  initializeProcessTabs();
  initializeCampaignFilters();
  initializeCampaignForm();
  initializeOrgProfileContactLink();
  initializePostulationBtn();
  initOrgsCarousel();
  campsCarouselInstance = initCampsCarousel(); // Initialize campaigns carousel
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

// CATEGORY FILTERS FOR CAMPAIGNS
function initializeCampaignFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const campaignCards = document.querySelectorAll('.camp-card');
  
  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active class on buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        const container = document.getElementById('campaigns-container');
        
        if (container) {
          container.style.opacity = '0';
          container.style.transform = 'translateY(10px)';
          container.style.transition = 'all 0.2s ease-in-out';
          
          setTimeout(() => {
            campaignCards.forEach(card => {
              const category = card.getAttribute('data-category');
              if (filter === 'all' || category === filter) {
                card.style.display = 'flex';
              } else {
                card.style.display = 'none';
              }
            });
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
            if (campsCarouselInstance) {
              campsCarouselInstance.rebuild();
            }
          }, 200);
        }
      });
    });
  }
}

// INTERACTIVE CAMPAIGN DETAILS & POPULATING MODAL
window.openCampaignDetails = function(campaignId) {
  const camp = campaignsData.find(c => c.id === campaignId);
  if (!camp) return;
  
  currentCampaignContext = camp;
  
  // Set modal texts
  const detailTitle = document.getElementById('m-camp-title');
  const detailDesc = document.getElementById('m-camp-desc');
  const mTags = document.getElementById('m-camp-tags');

  if (detailTitle) detailTitle.textContent = camp.title;
  if (detailDesc) detailDesc.textContent = camp.desc;
  
  if (mTags) {
    mTags.innerHTML = '';
    const tags = [getCategoryLabel(camp.category), 'Comunidad', 'Voluntariado'];
    tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tag-badge';
      span.innerHTML = tag === 'Comunidad' ? `<i data-lucide="tag"></i> ${tag}` : tag;
      mTags.appendChild(span);
    });
  }

  // Preset selector choices based on state
  if (IS_LOGGED_IN) {
    if (appliedCampaigns.has(campaignId)) {
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
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Update view based on selected radio button state
  updateModalStateBasedOnRadio();

  openModal('modal-profile-camp-detail');
};

function getCategoryLabel(cat) {
  switch (cat) {
    case 'medio-ambiente': return 'Medio Ambiente';
    case 'educacion': return 'Educación';
    case 'accion-social': return 'Acción Social';
    default: return 'Solidario';
  }
}

// DEVELOPER MOCK STATE CONTROLLER FOR REVIEW
function initializePostulationBtn() {
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

      if (currentCampaignContext) {
        const campId = currentCampaignContext.id;
        if (!appliedCampaigns.has(campId)) {
          appliedCampaigns.add(campId);
          currentCampaignContext.volunteersRegistered = (currentCampaignContext.volunteersRegistered || 0) + 1;
          // Increment general impact hours
          const statImpact = document.getElementById('stat-impact');
          if (statImpact) {
            const currentImpactText = statImpact.textContent;
            const currentHoursVal = parseInt(currentImpactText.replace('k+', '')) || 12;
            statImpact.textContent = `${currentHoursVal}.2k+`;
          }
          // Dynamic DOM update of card
          updateCampaignCardInDOM(currentCampaignContext);
        }
      }

      const radioPending = document.querySelector('input[name="dev-state-choice"][value="registrado-pendiente"]');
      if (radioPending) {
        radioPending.checked = true;
      }
      updateModalStateBasedOnRadio();

      if (typeof showToast !== 'undefined') {
        showToast('¡Postulación enviada!', `¡Gracias por comprometerte con "${currentCampaignContext?.title || 'la campaña'}"! Estate atento al estado de tus Postulaciones.`, true);
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

function updateCampaignCardInDOM(camp) {
  const cards = document.querySelectorAll('.camp-card');
  cards.forEach(card => {
    const cardTitle = card.querySelector('.camp-title');
    if (cardTitle && cardTitle.textContent === camp.title) {
      const volMetaItem = card.querySelector('.camp-meta-item span');
      if (volMetaItem) {
        volMetaItem.textContent = `${camp.volunteersRegistered} / ${camp.volunteersRequired} voluntarios`;
      }
      
      const pBar = card.querySelector('.camp-progress-bar');
      const pText = card.querySelector('.camp-pct-text');
      if (pBar && pText) {
        pBar.style.width = `${camp.progress}%`;
        pText.textContent = `${camp.progress}%`;
      }
    }
  });
}

// ORGANIZATION CARD POPULATOR
window.openOrgProfile = function(name, category, desc, location, stats) {
  const oTitle = document.getElementById('org-profile-title');
  const oDesc = document.getElementById('org-profile-desc');
  const oLoc = document.getElementById('org-profile-location');
  const oStats = document.getElementById('org-profile-stats');
  const oTag = document.getElementById('org-profile-tag');
  const oAvatar = document.getElementById('org-profile-avatar');

  if (oTitle) oTitle.textContent = name;
  if (oDesc) oDesc.textContent = desc;
  if (oLoc) oLoc.textContent = location;
  if (oStats) oStats.textContent = stats;
  if (oTag) oTag.textContent = category;
  
  if (oAvatar) {
    const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    oAvatar.textContent = initials;
    oAvatar.className = 'org-logo-avatar';
    if (category === 'Medio Ambiente') oAvatar.classList.add('avatar-1');
    else if (category === 'Acción Social') oAvatar.classList.add('avatar-2');
    else oAvatar.classList.add('avatar-3');
  }
  
  openModal('modal-org-profile');
};

function initializeOrgProfileContactLink() {
  const directCreateBtn = document.getElementById('direct-create-campaign-btn');
  if (directCreateBtn) {
    directCreateBtn.addEventListener('click', () => openModal('modal-create-campaign'));
  }
}

// CREATE CAMPAIGN HANDLER
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
      
      const newCampId = campaignsData.length + 1;
      
      let imgSrc = 'img/campaign_park.png';
      if (category === 'educacion') imgSrc = 'img/campaign_tutoring.png';
      else if (category === 'accion-social') imgSrc = 'img/campaign_food.png';
      
      const newCamp = {
        id: newCampId,
        title: title,
        org: org,
        category: category,
        desc: desc,
        skills: 'Buena comunicación, ganas de aportar y colaborar activamente.',
        location: location,
        date: formattedDate,
        time: time,
        volunteersRequired: volNeeded,
        volunteersRegistered: 0,
        progress: 0,
        img: imgSrc
      };
      
      campaignsData.push(newCamp);
      appendCampaignCardToDOM(newCamp);
      closeModal('modal-create-campaign');
      showToast('Campaña creada con éxito', `"${title}" ya está visible para todos los voluntarios.`, true);
      
      const campCount = document.getElementById('stat-campaigns');
      if (campCount) {
        const currentVal = parseInt(campCount.textContent.replace('+', '')) || 180;
        animateValue('stat-campaigns', currentVal, currentVal + 1, 1000, '+');
      }
      
      createCampaignForm.reset();
    });
  }
}

function appendCampaignCardToDOM(camp) {
  const container = document.getElementById('campaigns-container');
  if (!container) return;
  
  const card = document.createElement('article');
  card.className = 'camp-card';
  card.setAttribute('data-category', camp.category);
  
  let badgeClass = 'badge-soc';
  if (camp.category === 'medio-ambiente') badgeClass = 'badge-env';
  else if (camp.category === 'educacion') badgeClass = 'badge-edu';
  
  card.innerHTML = `
    <div class="camp-img-wrapper">
      <img src="${BASE_URL + camp.img}" alt="${camp.title}" class="camp-img">
      <span class="camp-cat-badge ${badgeClass}">${getCategoryLabel(camp.category)}</span>
    </div>
    <div class="camp-content">
      <span class="camp-org">${camp.org}</span>
      <h3 class="camp-title">${camp.title}</h3>
      <p class="camp-desc">${camp.desc}</p>
      
      <div class="camp-meta-list">
        <div class="camp-meta-item"><i data-lucide="map-pin"></i> <span>${camp.location}</span></div>
        <div class="camp-meta-item"><i data-lucide="calendar"></i> <span>${camp.date}</span></div>
      </div>
      
      <button class="btn btn-primary" onclick="openCampaignDetails(${camp.id})">Ver campaña</button>
    </div>
  `;
  
  container.appendChild(card);
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
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

  const AUTOPLAY_INTERVAL = 5000;
  let autoplayTimer = null;
  let currentIndex  = 0;
  let isScrolling   = false;

  function getCards() {
    return Array.from(carousel.querySelectorAll('.org-card'));
  }

  function getVisibleCount() {
    const card = carousel.querySelector('.org-card');
    if (!card) return 1;
    const cardWidth = card.offsetWidth + 24; // card width + gap (24px)
    return Math.max(1, Math.round(carousel.clientWidth / cardWidth));
  }

  function updateSnapping() {
    const cards = getCards();
    const visible = getVisibleCount();
    cards.forEach((card, i) => {
      if (i % visible === 0) {
        card.style.scrollSnapAlign = 'start';
      } else {
        card.style.scrollSnapAlign = 'none';
      }
    });
  }

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const visible = getVisibleCount();
    const total = Math.ceil(getCards().length / visible);
    
    // Si solo hay una página, ocultamos los puntitos
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

    currentIndex = Math.max(0, Math.min(index, maxIndex));

    const targetCard = cards[currentIndex * visible];
    if (targetCard) {
      isScrolling = true;
      const targetOffset = targetCard.offsetLeft - 4;
      
      // Desactivamos temporalmente el snap para hacer el desplazamiento suave
      carousel.style.scrollSnapType = 'none';
      
      carousel.scrollTo({ left: targetOffset, behavior: 'smooth' });
      
      // Reactivamos el scroll snap tras completarse la animación
      setTimeout(() => {
        carousel.style.scrollSnapType = 'x mandatory';
        isScrolling = false;
      }, 500);
    }

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
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

  // Escuchar scroll manual (swipe/touch en móviles)
  let scrollTimeout;
  carousel.addEventListener('scroll', () => {
    if (isScrolling) return; // Ignorar si el scroll fue programático
    
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
      
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex;
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

  // Pausar autoplay en hover del cursor
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  // Manejo de redimensión de ventana
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      buildDots();
      goTo(currentIndex);
    }, 200);
  });

  // Inicializar
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

  // Solo contamos las tarjetas que están visibles (no ocultas por los filtros)
  function getCards() {
    return Array.from(carousel.querySelectorAll('.camp-card')).filter(card => card.style.display !== 'none');
  }

  function getVisibleCount() {
    const card = carousel.querySelector('.camp-card');
    if (!card) return 1;
    const cardWidth = card.offsetWidth + 24; // card width + gap (24px)
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
    
    // Si solo hay una página, ocultamos los puntitos
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

    // Lógica de bucle infinito/circular:
    // Si index < 0, va a la última página; si index > maxIndex, vuelve al principio.
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

  // Escuchar scroll manual (swipe/touch en móviles)
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

  // Manejo de redimensión
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      buildDots();
      goTo(currentIndex);
    }, 200);
  });

  // Re-build API expuesta para los filtros
  function rebuild() {
    buildDots();
    goTo(0);
  }

  // Inicializar
  buildDots();
  goTo(0);
  startAutoplay();

  return {
    rebuild,
    goTo
  };
}
