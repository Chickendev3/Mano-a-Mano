// CONECTAR PAGE - Lógica de Búsqueda e Interactividad
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const categorySelect = document.getElementById('category-select');
  const locationSelect = document.getElementById('location-select');
  
  const searchBtn = document.querySelector('.btn.btn-primary');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const q = searchInput ? searchInput.value : '';
      const cat = categorySelect ? categorySelect.value : '';
      const loc = locationSelect ? locationSelect.value : '';
      
      console.log('Filtros seleccionados:', { q, cat, loc });
      if (typeof showToast !== 'undefined') {
        showToast('Buscando...', 'Filtrando base de datos...', true);
      }
    });
  }
});

// MODAL DE DETALLE DE CAMPAÑA DINÁMICO DESDE EL BUSCADOR
window.openCampaignDetails = function(campaignId) {
  // Buscamos la campaña en el listado de la base de datos inyectado por PHP
  const campaignsList = window.campaigns || [];
  const camp = campaignsList.find(c => c.id === campaignId);
  if (!camp) return;

  const mTitle = document.getElementById("m-camp-title");
  const mDesc = document.getElementById("m-camp-desc");
  const mTags = document.getElementById("m-camp-tags");
  const mBadge = document.getElementById("m-camp-accepted-badge");
  const mPostulateBtn = document.getElementById("m-camp-postulate-btn");
  const mSensitive = document.getElementById("m-camp-sensitive-info");

  if (mTitle) mTitle.textContent = camp.titulo;
  
  // Respetamos la distribución original en forma de lista de párrafos simples
  if (mDesc) {
    mDesc.innerHTML = `
      <p style="margin-bottom:12px;"><strong>Descripción:</strong> ${camp.descripcion}</p>
      <p style="margin-bottom:12px;"><strong>Ubicación:</strong> ${camp.ubicacion}</p>
      <p style="margin-bottom:12px;"><strong>Fecha de inicio:</strong> ${camp.fecha_inicio}</p>
      <p><strong>Fecha de finalización:</strong> ${camp.fecha_finalizacion}</p>
    `;
  }

  // Renderizado de causas directamente como etiquetas
  if (mTags) {
    mTags.innerHTML = "";
    const causesList = camp.causes || (camp.category ? [camp.category] : []);
    causesList.forEach(cause => {
      const span = document.createElement("span");
      span.className = "tag-badge";
      span.innerHTML = `<i data-lucide="tag" style="width:12px; height:12px;"></i> ${cause}`;
      mTags.appendChild(span);
    });

  // Lógica de inyección del Creador
  const mCreatorLink = document.getElementById("m-camp-creator-link");
  if (mCreatorLink) {
    if (camp.usuario_id) {
      mCreatorLink.href = `${BASE_URL}perfil.php?id=${camp.usuario_id}`;                 // Esto se cambia después!!!
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

    // Tipo de campaña
    const typeSpan = document.createElement("span");
    typeSpan.className = "tag-badge";
    typeSpan.style.backgroundColor = "rgba(99, 102, 241, 0.1)";
    typeSpan.style.color = "var(--color-primary)";
    typeSpan.style.fontWeight = "600";
    const typeLabel = camp.tipo === "convocatoria" ? "Convocatoria" : "Informativa";
    typeSpan.innerHTML = `<i data-lucide="info" style="width:12px; height:12px;"></i> ${typeLabel}`;
    mTags.appendChild(typeSpan);
  }

  // Carga de la Galería de Fotos reales si la campaña tiene
  const gallerySec = document.getElementById("m-camp-gallery-sec");
  const galleryGrid = document.getElementById("m-camp-gallery-grid");
  if (gallerySec && galleryGrid) {
    galleryGrid.innerHTML = "";
    if (camp.images && camp.images.length > 0) {
      camp.images.forEach(imgUrl => {
        const div = document.createElement("div");
        div.className = "gallery-placeholder-img"; // Usar clase original
        div.innerHTML = `<img src="${BASE_URL + imgUrl}" alt="Foto de campaña" style="width:100%; height:100%; object-fit:cover; border-radius:inherit;">`;
        galleryGrid.appendChild(div);
      });
      gallerySec.style.display = "block";
    } else {
      gallerySec.style.display = "none";
    }
  }

  // Ocultamos las secciones privadas y de organizaciones asociadas en esta vista general
  const assocSec = document.getElementById("m-camp-associations-sec");
  if (assocSec) assocSec.style.display = "none";
  if (mBadge) mBadge.style.display = "none";
  if (mSensitive) mSensitive.style.display = "none";

  const devStateCard = document.querySelector(".dev-state-selector-card");
  if (devStateCard) devStateCard.style.display = "none";

  if (mPostulateBtn) {
    // Si la campaña es convocatoria, mostramos el botón de postulación
    mPostulateBtn.style.display = camp.tipo === "convocatoria" ? "inline-flex" : "none";
  }

  openModal("modal-profile-camp-detail");

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
};


// Lógica de pestañas de conmutación
const filterButtons = document.querySelectorAll('.filter-btn');
const sections = {
  campaigns: document.getElementById('campaigns-section'),
  organizations: document.getElementById('organizations-section'),
  volunteers: document.getElementById('volunteers-section')
};

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remover clase activa
    filterButtons.forEach(b => b.classList.remove('active'));
    // Añadir clase activa al presionado
    btn.classList.add('active');

    const target = btn.getAttribute('data-target');
    
    // Mostrar y ocultar secciones correspondientes
    Object.keys(sections).forEach(key => {
      if (sections[key]) {
        if (key === target) {
          sections[key].style.display = 'block';
        } else {
          sections[key].style.display = 'none';
        }
      }
    });
  });
});


// CONECTAR PAGE - Lógica de Búsqueda e Interactividad
document.addEventListener('DOMContentLoaded', () => {
  const keywordInput = document.getElementById('keyword-search-input');
  const locationInput = document.getElementById('location-search-input');
  const categorySelect = document.getElementById('category-select');
  const searchBtn = document.getElementById('search-action-btn');
  const filterButtons = document.querySelectorAll('.filter-btn');

  const sections = {
    campaigns: document.getElementById('campaigns-section'),
    organizations: document.getElementById('organizations-section'),
    volunteers: document.getElementById('volunteers-section')
  };

  // Función para poblar dinámicamente el select
  function updateCategorySelect(tab, selectedValue = '') {
    if (!categorySelect) return;
    categorySelect.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    
    let list = [];
    if (tab === 'volunteers') {
      defaultOption.textContent = 'Todos los oficios';
      list = window.oficiosList || [];
    } else {
      defaultOption.textContent = 'Todas las causas';
      list = window.causesList || [];
    }
    categorySelect.appendChild(defaultOption);

    list.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item;
      opt.textContent = item;
      if (item === selectedValue) {
        opt.selected = true;
      }
      categorySelect.appendChild(opt);
    });
  }

  // Inicializar estado según los filtros actuales de la URL
  const activeTab = window.currentFilters.tab || 'campaigns';
  updateCategorySelect(activeTab, window.currentFilters.category);

  // Mostrar la sección correcta al cargar
  Object.keys(sections).forEach(key => {
    if (sections[key]) {
      sections[key].style.display = (key === activeTab) ? 'block' : 'none';
    }
  });

  // Manejo de botones de filtro (Tabs)
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-target');
      
      // Actualizar select de categorías en caliente al cambiar de tab
      updateCategorySelect(target);

      Object.keys(sections).forEach(key => {
        if (sections[key]) {
          sections[key].style.display = (key === target) ? 'block' : 'none';
        }
      });
    });
  });

  // Redirección de búsqueda al presionar "Buscar"
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const currentTab = document.querySelector('.filter-btn.active')?.getAttribute('data-target') || 'campaigns';
      const q = keywordInput ? keywordInput.value.trim() : '';
      const location = locationInput ? locationInput.value.trim() : '';
      const category = categorySelect ? categorySelect.value : '';

      const params = new URLSearchParams();
      params.set('tab', currentTab);
      if (q) params.set('q', q);
      if (location) params.set('location', location);
      if (category) params.set('category', category);

      window.location.href = `${BASE_URL}conectar?${params.toString()}`;
    });
  }
});