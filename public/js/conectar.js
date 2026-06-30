// CONECTAR PAGE - Lógica de Búsqueda e Interactividad
let currentViewedCampaignId = null;
const appliedCampaignsMap = new Map();

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
      .catch(err => console.error("Error al cargar postulaciones del voluntario:", err));
  }

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

  // Función para poblar dinámicamente el select de causas u oficios
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

  // Inicializar estado según los filtros de la URL al cargar
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
      
      // Actualizar select de categorías en caliente al cambiar de pestaña
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

  // BOTÓN DE POSTULACIÓN
  const postulateBtn = document.getElementById("m-camp-postulate-btn");
  if (postulateBtn) {
    postulateBtn.addEventListener("click", () => {
      if (!currentViewedCampaignId) return;

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
});

// MODAL DE DETALLE DE CAMPAÑA DINÁMICO DESDE EL BUSCADOR
window.openCampaignDetails = function(campaignId) {
  // Buscamos la campaña en el listado de la base de datos inyectado por PHP
  const campaignsList = window.campaigns || [];
  const camp = campaignsList.find(c => c.id === campaignId);
  if (!camp) return;

  currentViewedCampaignId = campaignId;

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

  // Lógica de inyección del Creador
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

  // Carga de la Galería de Fotos reales si la campaña tiene
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
  
    // Lógica de visualización de información de coordinación (adicional)
  let showAdditionalInfo = false;
  if (typeof SESSION_USER_ID !== 'undefined' && SESSION_USER_ID) {
    const isOwner = camp.usuario_id == SESSION_USER_ID;
    if (isOwner) {
      showAdditionalInfo = true;
    } else if (SESSION_USER_ROL === "voluntario") {
      const app = appliedCampaignsMap.get(campaignId);
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

  const devStateCard = document.querySelector(".dev-state-selector-card");
  if (devStateCard) devStateCard.style.display = "none";

  if (mPostulateBtn) {
    const isOwner = camp.usuario_id == SESSION_USER_ID;
    const isOrg = SESSION_USER_ROL === "organizacion";
    
    if (camp.tipo === "convocatoria" && !isOwner && !isOrg) {
      mPostulateBtn.style.display = "inline-flex";
      
      const app = appliedCampaignsMap.get(campaignId);
      if (app) {
        // Ya se postuló
        mPostulateBtn.disabled = true;
        mPostulateBtn.textContent = "Ya postulado";
        
        // Mostrar badge de estado
        if (mBadge) {
          mBadge.textContent = app.status.toUpperCase();
          mBadge.className = `modal-status-badge ${app.status === "aceptado" ? "accepted-pill" : (app.status === "rechazado" ? "rejected-pill" : "pending-pill")}`;
          mBadge.style.display = "inline-block";
        }
        
        // Si fue aceptado, mostrar información de coordinación
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
        // No se ha postulado
        mPostulateBtn.disabled = false;
        mPostulateBtn.textContent = "Postularme";
      }
    } else {
      mPostulateBtn.style.display = "none";
    }
  }

  openModal("modal-profile-camp-detail");

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
};