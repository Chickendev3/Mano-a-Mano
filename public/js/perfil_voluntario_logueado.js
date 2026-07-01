/**
 * Perfil Voluntario Logueado - Lógica Interactiva Específica
 * Mano a Mano MVC
 * 
 * Este archivo contiene la lógica y variables de estado exclusivas del perfil
 * de Voluntario (datos de perfil personal, insignias, oficios, postulaciones
 * a otras campañas e historial de voluntariado).
 */

// Ubicación: public/js/perfil_voluntario_logueado.js (Líneas 13-23)
let userProfile = {
  nombre: (window.initialUserProfile && window.initialUserProfile.nombre) || "",
  apellido: (window.initialUserProfile && window.initialUserProfile.apellido) || "",
  name: (window.initialUserProfile && window.initialUserProfile.name) || "",
  desc: (window.initialUserProfile && window.initialUserProfile.desc !== null && window.initialUserProfile.desc !== undefined) ? window.initialUserProfile.desc : "",
  location: (window.initialUserProfile && window.initialUserProfile.location !== null && window.initialUserProfile.location !== undefined) ? window.initialUserProfile.location : "",
  availability: (window.initialUserProfile && window.initialUserProfile.availability !== null && window.initialUserProfile.availability !== undefined) ? window.initialUserProfile.availability : "",
  email: (window.initialUserProfile && window.initialUserProfile.email) || "",
  phone1: (window.initialUserProfile && window.initialUserProfile.phone1 !== null && window.initialUserProfile.phone1 !== undefined) ? window.initialUserProfile.phone1 : "",
  phone2: (window.initialUserProfile && window.initialUserProfile.phone2 !== null && window.initialUserProfile.phone2 !== undefined) ? window.initialUserProfile.phone2 : "",
  avatar: (window.initialUserProfile && window.initialUserProfile.avatar !== null && window.initialUserProfile.avatar !== undefined) ? window.initialUserProfile.avatar : "", 
  skills: (window.initialUserProfile && window.initialUserProfile.skills) || [],
};
const availableSkills = window.availableSkills || [];


let tempSkills = [];                     // Oficios temporales en edición de perfil
let currentPostulationsPage = 1;
let currentCancelPostulationId = null;
let currentVolunteeringPage = 1;

let postulations = [];
let volunteering = [];

// =========================================================================
// INICIALIZACIÓN ESPECÍFICA DEL VOLUNTARIO
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
  setupProfileEditEvents();
  setupTabs();
  setupPostulationsGrid();
  setupVolunteeringGrid();
});

// =========================================================================
// 1. RENDERIZADO DE DATOS DEL PERFIL DEL VOLUNTARIO
// =========================================================================
function renderProfileData() {
  const avatarView = document.getElementById("avatar-img-view");
  const avatarPlaceholder = document.getElementById("avatar-icon-placeholder");
  const viewName = document.getElementById("view-profile-name");
  const viewDesc = document.getElementById("view-profile-desc");
  const viewLocation = document.getElementById("view-profile-location");
  const viewAvailability = document.getElementById("view-profile-availability");
  const viewEmail = document.getElementById("view-profile-email");
  const viewPhone1 = document.getElementById("view-profile-phone1");
  const viewPhone2 = document.getElementById("view-profile-phone2");

  if (userProfile.avatar) {
    if (avatarView) {
      avatarView.src = userProfile.avatar;
      avatarView.style.display = "block";
    }
    if (avatarPlaceholder) avatarPlaceholder.style.display = "none";
  } else {
    if (avatarView) avatarView.style.display = "none";
    if (avatarPlaceholder) avatarPlaceholder.style.display = "block";
  }

  if (viewName) viewName.textContent = userProfile.name;
  if (viewDesc) viewDesc.textContent = userProfile.desc || "Sin biografía cargada...";
  if (viewLocation) viewLocation.textContent = userProfile.location || "No especificada";
  if (viewAvailability) viewAvailability.textContent = userProfile.availability || "No especificada";
  if (viewEmail) viewEmail.textContent = userProfile.email || "";
  if (viewPhone1) viewPhone1.textContent = userProfile.phone1 || "";
  if (viewPhone2) viewPhone2.textContent = userProfile.phone2 || "No asignado";

  // Buscar el contenedor del renglón completo de oficios y el div de las insignias
  const viewSkillsRow = document.getElementById("view-skills-row");
  const viewSkills = document.getElementById("view-skills-badges");

  if (viewSkills) {
    viewSkills.innerHTML = "";
    // Validar si el voluntario tiene oficios cargados
    if (userProfile.skills && userProfile.skills.length > 0) {
      userProfile.skills.forEach(skill => {
        const span = document.createElement("span");
        span.className = "skill-badge-text";
        span.textContent = skill;
        viewSkills.appendChild(span);
      });
      // Si tiene oficios, mostramos el renglón con el icono lucide bookmark
      if (viewSkillsRow) viewSkillsRow.style.display = "flex";
    } else {
      // Si no tiene oficios, ocultamos todo el renglón
      if (viewSkillsRow) viewSkillsRow.style.display = "none";
    }
  }

  const navDropdownSpan = document.querySelector(".nav-dropdown-toggle span");
  if (navDropdownSpan) {
    navDropdownSpan.textContent = userProfile.name;
  }
}

// =========================================================================
// 2. GESTIÓN DE EDICIÓN DEL PERFIL DE VOLUNTARIO
// =========================================================================
// Listener para el input deL archivo de la imagen de Perfil
const avatarInput = document.getElementById('edit-avatar-input');
if (avatarInput) {
  avatarInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
      const file = this.files[0];
      
      // Se empaque el archivo en un FormData
      const formData = new FormData();
      formData.append('foto_perfil', file);

      // Se envia el archivo de forma asíncrona al controlador
      fetch(`${BASE_URL}perfil-actualizar-img`, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Si el servidor guardó la imagen con éxito, se actualiza la vista
          const imgView = document.getElementById('avatar-img-view');
          const placeholder = document.getElementById('avatar-icon-placeholder');
          
          if (imgView) {
            imgView.src = BASE_URL + data.ruta;
            imgView.style.display = 'block';
          }
          if (placeholder) {
            placeholder.style.display = 'none';
          }
          
          // Se actualiza la variable de estado local del perfil
          userProfile.avatar = data.ruta;
        } else {
          alert('Error al subir la imagen: ' + data.message);
        }
      })
      .catch(err => console.error('Error en la petición:', err));
    }
  });
}

function setupProfileEditEvents() {
  const editBtn = document.getElementById("edit-profile-btn");
  const cancelBtn = document.getElementById("cancel-profile-btn");
  const saveBtn = document.getElementById("save-profile-btn");
  const editState = document.getElementById("profile-edit-state");
  const viewState = document.getElementById("profile-view-state");

  const editName = document.getElementById("edit-name");
  const editLastName = document.getElementById("edit-lastname"); // Nuevo selector
  const editDesc = document.getElementById("edit-desc");
  const editLocation = document.getElementById("edit-location");
  const editAvailability = document.getElementById("edit-availability");
  const editEmail = document.getElementById("edit-email");
  const editPhone1 = document.getElementById("edit-phone1");
  const editPhone2 = document.getElementById("edit-phone2");
  const avatarInput = document.getElementById("edit-avatar-input");

  if (editBtn) {
    editBtn.addEventListener("click", () => {
      editName.value = userProfile.nombre;
      editLastName.value = userProfile.apellido;
      editDesc.value = userProfile.desc;
      editLocation.value = userProfile.location;
      editAvailability.value = userProfile.availability;
      editEmail.value = userProfile.email;
      editPhone1.value = userProfile.phone1 || "";
      editPhone2.value = userProfile.phone2 || "";
      
      tempSkills = [...userProfile.skills];
      renderEditableSkills();

      viewState.style.display = "none";
      editState.style.display = "block";
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      viewState.style.display = "block";
      editState.style.display = "none";
      document.getElementById("tag-suggestions")?.classList.remove("active");
    });
  }

  if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    // Actualizar estado local
    userProfile.nombre = editName.value.trim();
    userProfile.apellido = editLastName.value.trim();
    userProfile.name = `${userProfile.nombre} ${userProfile.apellido}`.trim();
    userProfile.desc = editDesc.value.trim();
    userProfile.location = editLocation.value.trim();
    userProfile.availability = editAvailability.value.trim();
    userProfile.email = editEmail.value.trim();
    userProfile.phone1 = editPhone1.value.trim();
    userProfile.phone2 = editPhone2.value.trim();
    userProfile.skills = [...tempSkills];

    const formElement = document.getElementById("profile-edit-state");
    const formData = new FormData(formElement); // ¡Recoge todos los campos con "name" automáticamente!
    
    userProfile.skills.forEach(skill => {
      formData.append("oficios[]", skill);
    });

    // Petición AJAX al servidor
    fetch(`${BASE_URL}editar-perfil-voluntario`, {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        renderProfileData();
        viewState.style.display = "block";
        editState.style.display = "none";
        if (typeof showToast !== "undefined") {
          showToast("Perfil actualizado", "Los cambios se guardaron correctamente.", true);
        }
      } else {
        if (typeof showToast !== "undefined") {
          showToast("Error", data.message || "No se pudieron guardar los cambios.", false);
        }
      }
    })
    .catch(error => {
      console.error("Error al guardar:", error);
      if (typeof showToast !== "undefined") {
        showToast("Error de conexión", "No se pudo comunicar con el servidor.", false);
      }
    });
  });
}

  if (avatarInput) {
    avatarInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const avatarView = document.getElementById("avatar-img-view");
          const avatarPlaceholder = document.getElementById("avatar-icon-placeholder");
          if (avatarView) {
            avatarView.src = event.target.result;
            avatarView.style.display = "block";
          }
          if (avatarPlaceholder) avatarPlaceholder.style.display = "none";
          
          userProfile.avatar = event.target.result;
          if (typeof showToast !== "undefined") {
            showToast("Imagen de perfil", "Foto de perfil actualizada con éxito.", true);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Buscador de oficios
  const tagInput = document.getElementById("tag-search-input");
  const tagSuggestions = document.getElementById("tag-suggestions");

  if (tagInput) {
    tagInput.addEventListener("focus", () => showSuggestions(tagInput.value));
    tagInput.addEventListener("input", () => showSuggestions(tagInput.value));
    
    document.addEventListener("click", (e) => {
      if (tagInput && tagSuggestions && !tagInput.contains(e.target) && !tagSuggestions.contains(e.target)) {
        tagSuggestions.classList.remove("active");
      }
    });
  }
}

function renderEditableSkills() {
  const container = document.getElementById("edit-tags-list");
  if (!container) return;

  container.innerHTML = "";
  tempSkills.forEach((skill, index) => {
    const div = document.createElement("div");
    div.className = "edit-tag-item";
    div.innerHTML = `
      <span>${skill}</span>
      <button type="button" class="edit-tag-remove-btn" onclick="removeTempSkill(${index})">×</button>
    `;
    container.appendChild(div);
  });
}

window.removeTempSkill = function(index) {
  tempSkills.splice(index, 1);
  renderEditableSkills();
  const tagInput = document.getElementById("tag-search-input");
  if (tagInput) showSuggestions(tagInput.value);
};

function showSuggestions(filterText) {
  const listElement = document.getElementById("tag-suggestions");
  if (!listElement) return;

  const searchVal = filterText.toLowerCase().trim();
  const filtered = availableSkills.filter(skill => {
    const isAlreadySelected = tempSkills.includes(skill);
    const matchesSearch = skill.toLowerCase().includes(searchVal);
    return !isAlreadySelected && matchesSearch;
  });

  if (filtered.length > 0) {
    listElement.innerHTML = "";
    filtered.forEach(skill => {
      const li = document.createElement("li");
      li.className = "tag-suggestion-item";
      li.textContent = skill;
      li.addEventListener("click", () => {
        tempSkills.push(skill);
        renderEditableSkills();
        const tagInput = document.getElementById("tag-search-input");
        if (tagInput) {
          tagInput.value = "";
          tagInput.focus();
        }
        listElement.classList.remove("active");
      });
      listElement.appendChild(li);
    });
    listElement.classList.add("active");
  } else {
    listElement.classList.remove("active");
  }
}

// =========================================================================
// 3. CONTROLADOR DE PESTAÑAS (TABS EXCLUSIVO VOLUNTARIO)
// =========================================================================
function setupTabs() {
  const tabBtns = document.querySelectorAll(".profile-tab-btn");
  const panes = document.querySelectorAll(".profile-pane");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("aria-controls");

      tabBtns.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      panes.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add("active");

      // Recarga de grillas según pestaña activa
      if (targetId === "pane-gestionar" && typeof renderCampaigns !== "undefined") {
        currentPage = 1;
        renderCampaigns();
      }
      if (targetId === "pane-postulaciones") {
        currentPostulationsPage = 1;
        renderPostulations();
      }
      if (targetId === "pane-invitaciones" && typeof renderReceivedInvitations !== "undefined") {
        currentReceivedPage = 1;
        currentSentPage = 1;
        renderReceivedInvitations();
        renderSentInvitations();
      }
      if (targetId === "pane-voluntariado") {
        currentVolunteeringPage = 1;
        renderVolunteering();
      }

      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    });
  });
}

// =========================================================================
// 4. SECCIÓN DE POSTULACIONES (EXCLUSIVO VOLUNTARIO)
// =========================================================================
function setupPostulationsGrid() {
  const filterSelect = document.getElementById("filter-postulations-select");
  const sortSelect = document.getElementById("sort-postulations-select");

  if (filterSelect) {
    filterSelect.addEventListener("change", () => {
      currentPostulationsPage = 1;
      renderPostulations();
    });
  }
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      currentPostulationsPage = 1;
      renderPostulations();
    });
  }

  const confirmCancelBtn = document.getElementById("confirm-cancel-postulation-btn");
  if (confirmCancelBtn) {
    confirmCancelBtn.addEventListener("click", () => {
      if (currentCancelPostulationId) {
        const formData = new FormData();
        formData.append("id_postulacion", currentCancelPostulationId);

        fetch(`${BASE_URL}eliminar-postulacion`, {
          method: "POST",
          body: formData
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            closeModal("modal-cancel-postulation-confirm");
            currentCancelPostulationId = null;
            currentPostulationsPage = 1;
            if (typeof showToast !== "undefined") {
              showToast("Postulación cancelada", "Tu postulación ha sido cancelada y retirada de la lista.", true);
            }
            loadVolunteerPostulations();
          } else {
            if (typeof showToast !== "undefined") {
              showToast("Error", data.message, false);
            }
          }
        })
        .catch(err => {
          console.error("Error al cancelar postulación:", err);
        });
      }
    });
  }

  loadVolunteerPostulations();
}

function renderPostulations() {
  const grid = document.getElementById("my-postulations-grid");
  if (!grid) return;

  const filterVal = document.getElementById("filter-postulations-select")?.value || "";
  const sortVal = document.getElementById("sort-postulations-select")?.value || "";

  let filtered = [...postulations];
  if (filterVal) {
    filtered = filtered.filter(p => p.status === filterVal);
  }

  if (sortVal === "reciente") {
    filtered.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  } else if (sortVal === "antiguas") {
    filtered.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  }

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (currentPostulationsPage > totalPages && totalPages > 0) {
    currentPostulationsPage = totalPages;
  }

  const startIndex = (currentPostulationsPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = filtered.slice(startIndex, endIndex);

  grid.innerHTML = "";
  if (paginated.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--color-text-secondary);">
        No tenés postulaciones registradas en este momento.
      </div>
    `;
    renderPostulationsPagination(0);
    return;
  }

  paginated.forEach((post, index) => {
    const cardClass = "alt-card";
    const imgUrl = post.images && post.images.length > 0 ? post.images[0] : "";
    const imgHTML = imgUrl 
      ? `<img src="${BASE_URL + imgUrl}" alt="${post.title}" style="width:100%; height:100%; object-fit:cover;">` 
      : `<i data-lucide="image"></i>`;

    const statusLabels = {
      pendiente: "Pendiente",
      aceptado: "Aceptado",
      rechazado: "Rechazado"
    };

    let statusPillClass = "pending-pill";
    if (post.status === "aceptado") statusPillClass = "accepted-pill";
    else if (post.status === "rechazado") statusPillClass = "rejected-pill";

    const article = document.createElement("article");
    article.className = cardClass;
    article.addEventListener("click", () => openPostulationDetailsView(post.id));

        article.innerHTML = `
      <div class="alt-card-img-col">
        <div class="alt-card-img-placeholder">
          ${imgHTML}
        </div>
      </div>
      <div class="alt-card-content-col" style="position: relative;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; width: 100%;">
          <h3 class="alt-card-title">${post.title}</h3>
          
          <span class="tag-badge" style="background-color: var(--color-surface); font-size:11px;">
            ${post.category || "Solidario"}
          </span>
        </div>
        <p class="alt-card-desc">${post.desc}</p>
        
        <div class="camp-card-actions" style="margin-top: auto; display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <button class="post-cancel-btn-inline" onclick="event.stopPropagation(); window.openCancelPostulationConfirmModal(${post.id});">
            Cancelar postulación
          </button>
          
          <span class="modal-status-badge ${statusPillClass}" style="font-size: 12px; padding: 8px 16px; border-radius: var(--radius-sm); font-weight: 600; text-transform: uppercase;">
            ${statusLabels[post.status] || "Pendiente"}
          </span>
        </div>
      </div>
    `;
    grid.appendChild(article);
  });

  renderPostulationsPagination(totalPages);

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

function renderPostulationsPagination(totalPages) {
  const container = document.getElementById("postulations-pagination");
  if (!container) return;

  container.innerHTML = "";
  if (totalPages <= 1) return;

  const prevBtn = document.createElement("button");
  prevBtn.className = "pag-btn";
  prevBtn.innerHTML = "&lt; Previous";
  prevBtn.disabled = currentPostulationsPage === 1;
  prevBtn.addEventListener("click", () => {
    if (currentPostulationsPage > 1) {
      currentPostulationsPage--;
      renderPostulations();
      scrollToCampaigns();
    }
  });
  container.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const numBtn = document.createElement("button");
    numBtn.className = i === currentPostulationsPage ? "pag-num active" : "pag-num";
    numBtn.textContent = i;
    numBtn.addEventListener("click", () => {
      currentPostulationsPage = i;
      renderPostulations();
      scrollToCampaigns();
    });
    container.appendChild(numBtn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.className = "pag-btn";
  nextBtn.innerHTML = "Next &gt;";
  nextBtn.disabled = currentPostulationsPage === totalPages;
  nextBtn.addEventListener("click", () => {
    if (currentPostulationsPage < totalPages) {
      currentPostulationsPage++;
      renderPostulations();
      scrollToCampaigns();
    }
  });
  container.appendChild(nextBtn);
}

window.openCancelPostulationConfirmModal = function(id) {
  currentCancelPostulationId = id;
  openModal("modal-cancel-postulation-confirm");
};

function openPostulationDetailsView(postulationId) {
  const post = postulations.find(p => p.id === postulationId);
  if (!post) return;

  /* const mTitle = document.getElementById("m-camp-title");
  const mDesc = document.getElementById("m-camp-desc");
  const mLocation = document.getElementById("m-camp-location");
  const mStartDate = document.getElementById("m-camp-start-date");
  const mEndDate = document.getElementById("m-camp-end-date");
  const mTags = document.getElementById("m-camp-tags");
  const mBadge = document.getElementById("m-camp-accepted-badge");
  const mPostulateBtn = document.getElementById("m-camp-postulate-btn");
  const mSensitive = document.getElementById("m-camp-sensitive-info");

  const mCreatorLink = document.getElementById("m-camp-creator-link");
  if (mCreatorLink) {
    if (post.creatorId) {
      const creatorProfileUrl = post.creatorRole === "voluntario" ? "perfil/voluntario" : "perfil/organizacion";
      mCreatorLink.href = `${BASE_URL}${creatorProfileUrl}?id=${post.creatorId}`;
      mCreatorLink.style.display = "flex";
      
      const mCreatorName = document.getElementById("m-camp-creator-name");
      if (mCreatorName) {
        mCreatorName.textContent = post.creatorName || "Creador";
      }
      
      const mCreatorAvatar = document.getElementById("m-camp-creator-avatar");
      if (mCreatorAvatar) {
        if (post.creatorImg) {
          mCreatorAvatar.innerHTML = `<img src="${BASE_URL + post.creatorImg}" alt="Logo creador" class="creator-avatar-img">`;
        } else {
          mCreatorAvatar.innerHTML = `<i data-lucide="user" class="creator-avatar-icon" style="width:20px; height:20px;"></i>`;
        }
      }
    } else {
      mCreatorLink.style.display = "none";
    }
  }

  const ownerSection = document.getElementById("m-camp-owner-postulations-sec");
  if (ownerSection) ownerSection.style.display = "none";

  if (mTitle) mTitle.textContent = post.title;
  if (mDesc) mDesc.textContent = post.desc;
  
  if (mLocation) {
    mLocation.innerHTML = `<i data-lucide="map-pin" style="width:16px; height:16px; color: var(--color-primary);"></i> <span>${post.location}</span>`;
  }
  if (mStartDate) {
    mStartDate.innerHTML = `<i data-lucide="calendar" style="width:16px; height:16px; color: var(--color-primary);"></i> <span>${post.startDate}</span>`;
  }
  if (mEndDate) {
    mEndDate.innerHTML = `<i data-lucide="calendar-check" style="width:16px; height:16px; color: var(--color-primary);"></i> <span>${post.endDate}</span>`;
  }

  if (mTags) {
    mTags.innerHTML = "";
    const span = document.createElement("span");
    span.className = "tag-badge";
    span.innerHTML = `<i data-lucide="tag" style="width:12px; height:12px;"></i> ${post.category || "Solidario"}`;
    mTags.appendChild(span);
    const typeSpan = document.createElement("span");
    typeSpan.className = "tag-badge";
    typeSpan.style.backgroundColor = "rgba(99, 102, 241, 0.1)";
    typeSpan.style.color = "var(--color-primary)";
    typeSpan.style.fontWeight = "600";
    typeSpan.innerHTML = `<i data-lucide="info" style="width:12px; height:12px;"></i> Convocatoria`;
    mTags.appendChild(typeSpan);
  }

  if (mBadge) {
    const statusLabels = {
      pendiente: "PENDIENTE",
      aceptado: "ACEPTADO",
      rechazado: "RECHAZADO"
    };
    mBadge.textContent = statusLabels[post.status] || "PENDIENTE";
    mBadge.className = `modal-status-badge ${post.status === "aceptado" ? "accepted-pill" : (post.status === "rechazado" ? "rejected-pill" : "pending-pill")}`;
    mBadge.style.display = "inline-block";
  }

  if (mSensitive) {
    if (post.status === "aceptado" && post.additionalInfo && post.additionalInfo.trim() !== "") {
      mSensitive.innerHTML = `
        <h4>Información de coordinación</h4>
        <div class="info-alert-content">
          <p>${post.additionalInfo}</p>
        </div>
      `;
      mSensitive.style.display = "block";
    } else {
      mSensitive.style.display = "none";
    }
  }

  const devStateCard = document.querySelector(".dev-state-selector-card");
  if (devStateCard) devStateCard.style.display = "none";
  
  if (mPostulateBtn) mPostulateBtn.style.display = "none";
  
  const gallerySec = document.getElementById("m-camp-gallery-sec");
  const galleryGrid = document.getElementById("m-camp-gallery-grid");
  if (gallerySec && galleryGrid) {
    galleryGrid.innerHTML = "";
    if (post.images && post.images.length > 0) {
      post.images.forEach(imgUrl => {
        const div = document.createElement("div");
        div.className = "gallery-img-wrapper";
        div.style.borderRadius = "var(--radius-md)";
        div.style.overflow = "hidden";
        div.style.aspectRatio = "1 / 1";
        div.style.backgroundColor = "var(--color-surface-hover)";
        div.style.border = "1px solid var(--color-border)";
        div.innerHTML = `<img src="${BASE_URL + imgUrl}" alt="Foto" style="width:100%; height:100%; object-fit:cover;">`;
        galleryGrid.appendChild(div);
      });
      gallerySec.style.display = "block";
    } else {
      gallerySec.style.display = "none";
    }
  }

  const assocSec = document.getElementById("m-camp-associations-sec");
  if (assocSec) assocSec.style.display = "none";

  openModal("modal-profile-camp-detail");

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  } */

  if (typeof openCampaignDetailsView === 'function') {
    openCampaignDetailsView(post.campaignId, { hidePostulateBtn: true });
  }
}

// =========================================================================
// 5. SECCIÓN DE HISTORIAL DE VOLUNTARIADO (EXCLUSIVO VOLUNTARIO)
// =========================================================================
function setupVolunteeringGrid() {
  const filterSelect = document.getElementById("filter-volunteering-select");
  const sortSelect = document.getElementById("sort-volunteering-select");

  if (filterSelect) {
    filterSelect.addEventListener("change", () => {
      currentVolunteeringPage = 1;
      renderVolunteering();
    });
  }
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      currentVolunteeringPage = 1;
      renderVolunteering();
    });
  }

  loadVolunteeringFromBD();
}

window.loadVolunteeringFromBD = function() {
  fetch(`${BASE_URL}obtener-mis-voluntariados`)
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        volunteering = res.data;
        renderVolunteering();
      }
    })
    .catch(err => console.error("Error al cargar voluntariados:", err));
};

function renderVolunteering() {
  const grid = document.getElementById("my-volunteering-grid");
  if (!grid) return;

  const filterVal = document.getElementById("filter-volunteering-select")?.value || "";
  const sortVal = document.getElementById("sort-volunteering-select")?.value || "";

  let filtered = [...volunteering];
  if (filterVal) {
    filtered = filtered.filter(v => v.status === filterVal);
  }

  if (sortVal === "reciente") {
    filtered.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  } else if (sortVal === "antiguas") {
    filtered.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  }

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (currentVolunteeringPage > totalPages && totalPages > 0) {
    currentVolunteeringPage = totalPages;
  }

  const startIndex = (currentVolunteeringPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = filtered.slice(startIndex, endIndex);

  grid.innerHTML = "";
  if (paginated.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--color-text-secondary);">
        No participás en ningún voluntariado actualmente.
      </div>
    `;
    renderVolunteeringPagination(0);
    return;
  }

  paginated.forEach((item, index) => {
    const cardClass = "alt-card";
    const imgUrl = item.images && item.images.length > 0 ? item.images[0] : "";
    const imgHTML = imgUrl 
      ? `<img src="${BASE_URL + imgUrl}" alt="${item.title}" style="width:100%; height:100%; object-fit:cover;">` 
      : `<i data-lucide="image"></i>`;

    const article = document.createElement("article");
    article.className = cardClass;
    article.addEventListener("click", () => openCampaignDetailsView(item.id));

    const today = new Date();
    today.setHours(0,0,0,0);
    const start = new Date(item.startDate);
    start.setHours(0,0,0,0);
    const end = new Date(item.endDate);
    end.setHours(0,0,0,0);

    let statusLabel = "Activa";
    let statusPillClass = "accepted-pill";
    if (today > end) {
      statusLabel = "Finalizada";
      statusPillClass = "rejected-pill";
    } else if (today < start) {
      statusLabel = "Programada";
      statusPillClass = "scheduled-pill";
    }

    article.innerHTML = `
      <div class="alt-card-img-col">
        <div class="alt-card-img-placeholder">
          ${imgHTML}
        </div>
      </div>
      <div class="alt-card-content-col">
        <h3 class="alt-card-title">${item.title}</h3>
        <div class="profile-tags-wrapper" style="margin-top: 4px; margin-bottom: 12px; gap: 8px; flex-wrap: wrap; display: flex;">
          <span class="tag-badge" style="padding: 4px 12px; font-size: 11px; height: auto;">
            <i data-lucide="tag" style="width:10px; height:10px;"></i> ${item.category || "Solidario"}
          </span>
        </div>
        <p class="alt-card-desc">${item.desc}</p>
        
        <div class="camp-card-actions" style="margin-top: auto; display: flex; justify-content: flex-end; width: 100%;">
          <span class="modal-status-badge ${statusPillClass}" style="font-size: 12px; padding: 8px 16px; border-radius: var(--radius-sm); font-weight: 600; text-transform: uppercase;">
            ${statusLabel}
          </span>
        </div>
      </div>
    `;
    grid.appendChild(article);
  });

  renderVolunteeringPagination(totalPages);

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

function renderVolunteeringPagination(totalPages) {
  const container = document.getElementById("volunteering-pagination");
  if (!container) return;

  container.innerHTML = "";
  if (totalPages <= 1) return;

  const prevBtn = document.createElement("button");
  prevBtn.className = "pag-btn";
  prevBtn.innerHTML = "&lt; Previous";
  prevBtn.disabled = currentVolunteeringPage === 1;
  prevBtn.addEventListener("click", () => {
    if (currentVolunteeringPage > 1) {
      currentVolunteeringPage--;
      renderVolunteering();
      scrollToCampaigns();
    }
  });
  container.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const numBtn = document.createElement("button");
    numBtn.className = i === currentVolunteeringPage ? "pag-num active" : "pag-num";
    numBtn.textContent = i;
    numBtn.addEventListener("click", () => {
      currentVolunteeringPage = i;
      renderVolunteering();
      scrollToCampaigns();
    });
    container.appendChild(numBtn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.className = "pag-btn";
  nextBtn.innerHTML = "Next &gt;";
  nextBtn.disabled = currentVolunteeringPage === totalPages;
  nextBtn.addEventListener("click", () => {
    if (currentVolunteeringPage < totalPages) {
      currentVolunteeringPage++;
      renderVolunteering();
      scrollToCampaigns();
    }
  });
  container.appendChild(nextBtn);
}


function loadVolunteerPostulations() {
  fetch(`${BASE_URL}obtener-mis-postulaciones`)
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      postulations = data.data;
      renderPostulations();
    }
  })
  .catch(err => {
    console.error("Error al cargar postulaciones:", err);
  });
}