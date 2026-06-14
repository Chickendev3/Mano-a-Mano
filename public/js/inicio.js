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

document.addEventListener('DOMContentLoaded', () => {
  initializeCounters();
  initializeProcessTabs();
  initializeCampaignFilters();
  initializeCampaignForm();
  initializeOrgProfileContactLink();
  initializePostulationBtn();
  initOrgsCarousel(); // 👈 agregá esta línea
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
  const detailTitle = document.getElementById('camp-detail-title');
  const detailOrg = document.getElementById('detail-org-name');
  const detailDesc = document.getElementById('detail-desc-text');
  const detailSkills = document.getElementById('detail-skills-text');
  const detailLocation = document.getElementById('detail-location');
  const detailDate = document.getElementById('detail-date');
  const detailTime = document.getElementById('detail-time');
  const detailVolunteers = document.getElementById('detail-volunteers-stat');

  if (detailTitle) detailTitle.textContent = camp.title;
  if (detailOrg) detailOrg.textContent = `Publicado por ${camp.org}`;
  if (detailDesc) detailDesc.textContent = camp.desc;
  if (detailSkills) detailSkills.textContent = camp.skills;
  if (detailLocation) detailLocation.textContent = camp.location;
  if (detailDate) detailDate.textContent = camp.date;
  if (detailTime) detailTime.textContent = camp.time;
  if (detailVolunteers) detailVolunteers.textContent = `${camp.volunteersRegistered} de ${camp.volunteersRequired} inscriptos`;
  
  // Category badge color
  const catBadge = document.getElementById('detail-cat-badge');
  if (catBadge) {
    catBadge.textContent = getCategoryLabel(camp.category);
    catBadge.className = 'camp-detail-cat';
    if (camp.category === 'medio-ambiente') catBadge.classList.add('badge-env');
    else if (camp.category === 'educacion') catBadge.classList.add('badge-edu');
    else catBadge.classList.add('badge-soc');
  }
  
  // Adjust application button state if already applied
  const applyBtn = document.getElementById('apply-campaign-btn');
  if (applyBtn) {
    if (appliedCampaigns.has(campaignId)) {
      applyBtn.className = 'btn btn-ghost';
      applyBtn.disabled = true;
      applyBtn.innerHTML = 'Pendiente ✓';
    } else {
      applyBtn.className = 'btn btn-success';
      applyBtn.disabled = false;
      applyBtn.innerHTML = 'Postularme como voluntario <i data-lucide="heart"></i>';
    }
  }
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  openModal('modal-camp-detail');
};

function getCategoryLabel(cat) {
  switch (cat) {
    case 'medio-ambiente': return 'Medio Ambiente';
    case 'educacion': return 'Educación';
    case 'accion-social': return 'Acción Social';
    default: return 'Solidario';
  }
}

// POSTULATE ACTION
function initializePostulationBtn() {
  const applyCampaignBtn = document.getElementById('apply-campaign-btn');
  if (applyCampaignBtn) {
    applyCampaignBtn.addEventListener('click', () => {
      if (!currentCampaignContext) return;
      
      // Verification Rule: Must be logged in to postulate!
      if (!IS_LOGGED_IN) {
        // Show error warning toast
        showToast('Inicio de sesión requerido', 'Tenés que iniciar sesión para postularte a esta campaña.', false);
        // Close modal
        closeModal('modal-camp-detail');
        // Redirect to login after a brief delay
        setTimeout(() => {
          window.location.href = BASE_URL + 'sesion';
        }, 1800);
        return;
      }
      
      const campId = currentCampaignContext.id;
      if (appliedCampaigns.has(campId)) return;
      
      // Mock application update
      appliedCampaigns.add(campId);
      currentCampaignContext.volunteersRegistered++;
      const newProgress = Math.round((currentCampaignContext.volunteersRegistered / currentCampaignContext.volunteersRequired) * 100);
      currentCampaignContext.progress = newProgress;
      
      // Update detail modal
      const detailVolunteers = document.getElementById('detail-volunteers-stat');
      if (detailVolunteers) {
        detailVolunteers.textContent = `${currentCampaignContext.volunteersRegistered} de ${currentCampaignContext.volunteersRequired} inscriptos`;
      }
      
      applyCampaignBtn.className = 'btn btn-ghost';
      applyCampaignBtn.disabled = true;
      applyCampaignBtn.innerHTML = 'Pendiente ✓';
      
      // Dynamic DOM update of card
      updateCampaignCardInDOM(currentCampaignContext);
      
      // Celebrate!
      showToast('¡Postulación enviada!', `¡Gracias por comprometerte con "${currentCampaignContext.title}"! Estate atento al estado de tus Postulaciones.`, true);
      
      // Increment general impact hours
      const statImpact = document.getElementById('stat-impact');
      if (statImpact) {
        const currentImpactText = statImpact.textContent;
        const currentHoursVal = parseInt(currentImpactText.replace('k+', '')) || 12;
        statImpact.textContent = `${currentHoursVal}.2k+`;
      }
    });
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
