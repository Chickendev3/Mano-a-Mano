/**
 * Perfil Voluntario Logueado - Interactive Logic
 * Mano a Mano MVC
 */

// Initial State
let userProfile = {
  name: "Voluntario de Prueba",
  desc: "Apasionado por la educación y el trabajo social. Busco colaborar en proyectos comunitarios que generen un impacto positivo en la niñez y el medio ambiente.",
  location: "Buenos Aires, Argentina",
  email: "voluntario@gmail.com",
  avatar: "", // Base64 data or URL
  skills: ["Cocinero", "Profesor"]
};

const availableSkills = [
  "Cocinero",
  "Profesor",
  "Logística",
  "Tallerista",
  "Coordinador",
  "Apoyo Escolar",
  "Administración",
  "Primeros Auxilios",
  "Diseño Gráfico",
  "Redes Sociales",
  "Fotografía"
];

// Local state for temporary skill tags being edited
let tempSkills = [];

// Campaign Mock Database
let campaigns = [
  {
    id: 301,
    title: "Apoyo Escolar Primario",
    desc: "Clases de apoyo escolar para niños en situación de vulnerabilidad en la biblioteca popular.",
    type: "convocatoria", // Campaña con postulaciones
    category: "educacion",
    startDate: "2026-06-20",
    endDate: "2026-12-20",
    location: "San Martín, Buenos Aires",
    details: "Buscamos voluntarios con disposición pedagógica para guiar y motivar a niños de escuela primaria en sus tareas de matemáticas y lengua. Se realiza en la Biblioteca Popular San Martín.",
    additionalInfo: "Dirección exacta: Belgrano 456, San Martín. Coordinador: Lucas Gómez (+54 11 5555-1234). Traer cartuchera y cuaderno.",
    images: ["img/campaign_tutoring.png"]
  },
  {
    id: 302,
    title: "Taller de Huertas Comunitarias",
    desc: "Aprende sobre agricultura urbana, compostaje y cuidado del medio ambiente en nuestro taller semanal.",
    type: "informativa", // Campaña informativa (sin postulaciones)
    category: "medio-ambiente",
    startDate: "2026-06-25",
    endDate: "2026-08-25",
    location: "Villa Crespo, CABA",
    details: "Un espacio interactivo y gratuito para todos los vecinos donde se aprende a crear huertas orgánicas en balcones y patios. No requiere conocimientos previos.",
    additionalInfo: "", // Informativa
    images: ["img/campaign_park.png"]
  },
  {
    id: 303,
    title: "Colecta y Clasificación de Ropa",
    desc: "Ayudanos a recibir y clasificar donaciones de ropa y abrigo que serán enviadas a comedores en el invierno.",
    type: "convocatoria",
    category: "accion-social",
    startDate: "2026-07-01",
    endDate: "2026-07-15",
    location: "Palermo, CABA",
    details: "Campaña de invierno para clasificar abrigos, calzado y frazadas recibidas. Las donaciones se empaquetan por edad y talle para una distribución ágil.",
    additionalInfo: "Dirección del galpón: Av. Santa Fe 3400. Coordinadora: Estela Maris (+54 11 4444-5678). Venir con ropa cómoda.",
    images: ["img/campaign_food.png"]
  }
];

// ABM State variables
let currentEditCampaignId = null;
let currentDeleteCampaignId = null;
let uploadedImagesForForm = [];

// Pagination State
let currentPage = 1;
const itemsPerPage = 2;

// Initialize Page
document.addEventListener("DOMContentLoaded", () => {
  renderProfileData();
  setupProfileEditEvents();
  setupTabs();
  setupCampaignsGrid();
  setupMockUploads();
});

// ==========================================
// 1. RENDER PROFILE DATA
// ==========================================
function renderProfileData() {
  const avatarView = document.getElementById("avatar-img-view");
  const avatarPlaceholder = document.getElementById("avatar-icon-placeholder");
  const viewName = document.getElementById("view-profile-name");
  const viewDesc = document.getElementById("view-profile-desc");
  const viewLocation = document.getElementById("view-profile-location");
  const viewEmail = document.getElementById("view-profile-email");
  const viewSkills = document.getElementById("view-skills-badges");

  // Avatar
  if (userProfile.avatar) {
    avatarView.src = userProfile.avatar;
    avatarView.style.display = "block";
    avatarPlaceholder.style.display = "none";
  } else {
    avatarView.style.display = "none";
    avatarPlaceholder.style.display = "block";
  }

  // Text details
  if (viewName) viewName.textContent = userProfile.name;
  if (viewDesc) viewDesc.textContent = userProfile.desc;
  if (viewLocation) viewLocation.textContent = userProfile.location;
  if (viewEmail) viewEmail.textContent = userProfile.email;

  // Skills Badges (Read-Only)
  if (viewSkills) {
    viewSkills.innerHTML = "";
    userProfile.skills.forEach(skill => {
      const span = document.createElement("span");
      span.className = "skill-badge-text";
      span.textContent = skill;
      viewSkills.appendChild(span);
    });
  }

  // Update navbar/header if logged in (user menu name)
  const navDropdownSpan = document.querySelector(".nav-dropdown-toggle span");
  if (navDropdownSpan) {
    navDropdownSpan.textContent = userProfile.name;
  }
}

// ==========================================
// 2. PROFILE EDIT LOGIC
// ==========================================
function setupProfileEditEvents() {
  const editBtn = document.getElementById("edit-profile-btn");
  const cancelBtn = document.getElementById("cancel-profile-btn");
  const saveBtn = document.getElementById("save-profile-btn");
  const editState = document.getElementById("profile-edit-state");
  const viewState = document.getElementById("profile-view-state");

  const editName = document.getElementById("edit-name");
  const editDesc = document.getElementById("edit-desc");
  const editLocation = document.getElementById("edit-location");
  const editEmail = document.getElementById("edit-email");
  const avatarInput = document.getElementById("edit-avatar-input");

  // Click "Editar Perfil"
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      // Prefill fields
      editName.value = userProfile.name;
      editDesc.value = userProfile.desc;
      editLocation.value = userProfile.location;
      editEmail.value = userProfile.email;
      
      // Copy skills list to temp list
      tempSkills = [...userProfile.skills];
      renderEditableSkills();

      // Toggle display
      viewState.style.display = "none";
      editState.style.display = "block";
    });
  }

  // Click "Cancelar"
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      viewState.style.display = "block";
      editState.style.display = "none";
      // Clear suggestions
      document.getElementById("tag-suggestions").classList.remove("active");
    });
  }

  // Click "Guardar"
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      // Save data
      userProfile.name = editName.value.trim() || "Voluntario de Prueba";
      userProfile.desc = editDesc.value.trim() || "Sin descripción.";
      userProfile.location = editLocation.value.trim() || "No especificada";
      userProfile.email = editEmail.value.trim() || "voluntario@gmail.com";
      userProfile.skills = [...tempSkills];

      renderProfileData();

      // Toggle display back
      viewState.style.display = "block";
      editState.style.display = "none";

      if (typeof showToast !== "undefined") {
        showToast("Perfil actualizado", "Los datos personales se guardaron correctamente.", true);
      }
    });
  }

  // Handle Avatar Input File Reader
  if (avatarInput) {
    avatarInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          // Temporarily show preview in UI circle
          const avatarView = document.getElementById("avatar-img-view");
          const avatarPlaceholder = document.getElementById("avatar-icon-placeholder");
          avatarView.src = event.target.result;
          avatarView.style.display = "block";
          avatarPlaceholder.style.display = "none";
          
          // Save in profile state immediately
          userProfile.avatar = event.target.result;
          if (typeof showToast !== "undefined") {
            showToast("Imagen de perfil", "Foto de perfil actualizada con éxito.", true);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Skills tag autocomplete
  const tagInput = document.getElementById("tag-search-input");
  const tagSuggestions = document.getElementById("tag-suggestions");

  if (tagInput) {
    tagInput.addEventListener("focus", () => showSuggestions(tagInput.value));
    tagInput.addEventListener("input", () => showSuggestions(tagInput.value));
    
    // Close suggestions list on click outside
    document.addEventListener("click", (e) => {
      if (!tagInput.contains(e.target) && !tagSuggestions.contains(e.target)) {
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
  // Refresh autocomplete list
  const tagInput = document.getElementById("tag-search-input");
  if (tagInput) showSuggestions(tagInput.value);
};

function showSuggestions(filterText) {
  const listElement = document.getElementById("tag-suggestions");
  if (!listElement) return;

  const searchVal = filterText.toLowerCase().trim();
  
  // Filter available skills that are not already selected
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

// ==========================================
// 3. TAB CONTROLLER
// ==========================================
function setupTabs() {
  const tabBtns = document.querySelectorAll(".profile-tab-btn");
  const panes = document.querySelectorAll(".profile-pane");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("aria-controls");

      // Deactivate all buttons
      tabBtns.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });

      // Hide all panes
      panes.forEach(p => p.classList.remove("active"));

      // Activate clicked
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add("active");

      // Reset campaign page on tab back
      if (targetId === "pane-gestionar") {
        currentPage = 1;
        renderCampaigns();
      }

      // Re-render Lucide icons
      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    });
  });
}

// ==========================================
// 4. CAMPAIGN LISTS & FILTERS (CRUD & GRID)
// ==========================================
function setupCampaignsGrid() {
  const filterSelect = document.getElementById("filter-campaigns-select");
  const sortSelect = document.getElementById("sort-campaigns-select");
  const createBtn = document.getElementById("btn-create-campaign-modal");

  if (filterSelect) {
    filterSelect.addEventListener("change", () => {
      currentPage = 1;
      renderCampaigns();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      currentPage = 1;
      renderCampaigns();
    });
  }

  if (createBtn) {
    createBtn.addEventListener("click", () => {
      openCreateCampaignModal();
    });
  }

  // Delete Confirm button
  const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener("click", () => {
      if (currentDeleteCampaignId) {
        campaigns = campaigns.filter(c => c.id !== currentDeleteCampaignId);
        closeModal("modal-delete-confirm");
        currentDeleteCampaignId = null;
        
        currentPage = 1; // reset page
        renderCampaigns();

        if (typeof showToast !== "undefined") {
          showToast("Campaña eliminada", "La campaña se eliminó correctamente de tu perfil.", true);
        }
      }
    });
  }

  // Initial render
  renderCampaigns();
}

function getCategoryLabel(cat) {
  switch (cat) {
    case "medio-ambiente": return "Medio Ambiente";
    case "educacion": return "Educación";
    case "accion-social": return "Acción Social";
    case "salud": return "Salud";
    case "cultura": return "Cultura";
    default: return "Solidario";
  }
}

function renderCampaigns() {
  const grid = document.getElementById("my-campaigns-grid");
  if (!grid) return;

  const filterVal = document.getElementById("filter-campaigns-select")?.value || "";
  const sortVal = document.getElementById("sort-campaigns-select")?.value || "";

  // 1. Filter
  let filtered = [...campaigns];
  if (filterVal) {
    filtered = filtered.filter(c => c.type === filterVal);
  }

  // 2. Sort
  if (sortVal === "reciente") {
    filtered.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  } else if (sortVal === "antiguas") {
    filtered.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  }

  // 3. Paginate
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (currentPage > totalPages && totalPages > 0) {
    currentPage = totalPages;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = filtered.slice(startIndex, endIndex);

  // 4. Render Grid HTML
  grid.innerHTML = "";
  if (paginated.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-secondary);">
        No se encontraron campañas registradas. ¡Crea una nueva campaña!
      </div>
    `;
    renderPagination(0);
    return;
  }

  paginated.forEach((camp, index) => {
    // Alternating style class reverses orientation
    const isReverse = index % 2 !== 0;
    const cardClass = isReverse ? "alt-card alt-card-reverse" : "alt-card";
    
    // Choose image
    const imgUrl = camp.images && camp.images.length > 0 ? camp.images[0] : "";
    const imgHTML = imgUrl 
      ? `<img src="${BASE_URL + imgUrl}" alt="${camp.title}" style="width:100%; height:100%; object-fit:cover;">` 
      : `<i data-lucide="image"></i>`;

    const article = document.createElement("article");
    article.className = cardClass;
    // Main card is clickable to view details modal
    article.addEventListener("click", () => {
      openCampaignDetailsView(camp.id);
    });

    article.innerHTML = `
      <div class="alt-card-img-col">
        <div class="alt-card-img-placeholder">
          ${imgHTML}
        </div>
      </div>
      <div class="alt-card-content-col" style="position: relative;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <h3 class="alt-card-title">${camp.title}</h3>
          <span class="tag-badge" style="background-color: var(--color-surface); font-size:11px;">
            ${getCategoryLabel(camp.category)}
          </span>
        </div>
        <p class="alt-card-desc">${camp.desc}</p>
        
        <div class="camp-card-actions" style="margin-top: auto;">
          <button class="btn btn-primary btn-info" style="margin-right: auto; pointer-events: none;">+ Más información</button>
          
          <!-- Modify campaign button -->
          <button class="camp-action-btn edit" title="Modificar campaña" onclick="event.stopPropagation(); openModifyCampaignModal(${camp.id});">
            <i data-lucide="edit-2" style="width:18px; height:18px;"></i>
          </button>
          
          <!-- Delete campaign button -->
          <button class="camp-action-btn delete" title="Eliminar campaña" onclick="event.stopPropagation(); openDeleteConfirmModal(${camp.id});">
            <i data-lucide="trash-2" style="width:18px; height:18px;"></i>
          </button>
        </div>
      </div>
    `;
    grid.appendChild(article);
  });

  renderPagination(totalPages);

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

function renderPagination(totalPages) {
  const container = document.getElementById("campaigns-pagination");
  if (!container) return;

  container.innerHTML = "";
  if (totalPages <= 1) return;

  // Previous button
  const prevBtn = document.createElement("button");
  prevBtn.className = "pag-btn";
  prevBtn.innerHTML = "&lt; Previous";
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderCampaigns();
      scrollToCampaigns();
    }
  });
  container.appendChild(prevBtn);

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const numBtn = document.createElement("button");
    numBtn.className = i === currentPage ? "pag-num active" : "pag-num";
    numBtn.textContent = i;
    numBtn.addEventListener("click", () => {
      currentPage = i;
      renderCampaigns();
      scrollToCampaigns();
    });
    container.appendChild(numBtn);
  }

  // Next button
  const nextBtn = document.createElement("button");
  nextBtn.className = "pag-btn";
  nextBtn.innerHTML = "Next &gt;";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderCampaigns();
      scrollToCampaigns();
    }
  });
  container.appendChild(nextBtn);
}

function scrollToCampaigns() {
  const section = document.querySelector(".profile-tabs-sec");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// ==========================================
// 5. VIEW CAMPAIGN DETAILS VIEW MODAL (SHARED)
// ==========================================
function openCampaignDetailsView(campaignId) {
  const camp = campaigns.find(c => c.id === campaignId);
  if (!camp) return;

  // Prefill shared modal labels
  const mTitle = document.getElementById("m-camp-title");
  const mDesc = document.getElementById("m-camp-desc");
  const mTags = document.getElementById("m-camp-tags");
  const mBadge = document.getElementById("m-camp-accepted-badge");
  const mPostulateBtn = document.getElementById("m-camp-postulate-btn");
  const mSensitive = document.getElementById("m-camp-sensitive-info");

  if (mTitle) mTitle.textContent = camp.title;
  
  // Composite detailed content in description
  if (mDesc) {
    mDesc.innerHTML = `
      <p style="margin-bottom:12px;"><strong>Resumen:</strong> ${camp.desc}</p>
      <p style="margin-bottom:12px;"><strong>Detalle:</strong> ${camp.details}</p>
      <p style="margin-bottom:12px;"><strong>Ubicación:</strong> ${camp.location}</p>
      <p><strong>Período:</strong> ${camp.startDate} al ${camp.endDate}</p>
    `;
  }

  // Tags
  if (mTags) {
    mTags.innerHTML = "";
    const tags = [getCategoryLabel(camp.category), camp.type === "convocatoria" ? "Convocatoria" : "Informativa"];
    tags.forEach(tag => {
      const span = document.createElement("span");
      span.className = "tag-badge";
      span.innerHTML = `<i data-lucide="tag" style="width:12px; height:12px;"></i> ${tag}`;
      mTags.appendChild(span);
    });
  }

  // Reset simulated states and badges
  if (mBadge) mBadge.style.display = "none";
  if (mSensitive) mSensitive.style.display = "none";

  // Hide simulated developer state choice card, because it's for external volunteers
  const devStateCard = document.querySelector(".dev-state-selector-card");
  if (devStateCard) devStateCard.style.display = "none";

  // Handles postulation button visibility
  if (mPostulateBtn) {
    // Hidden since this is the owner viewing their own campaigns
    mPostulateBtn.style.display = "none";
  }

  openModal("modal-profile-camp-detail");
  
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

// ==========================================
// 6. CREATE CAMPAIGN CRUD FLOW
// ==========================================
function openCreateCampaignModal() {
  const form = document.getElementById("create-camp-form");
  if (form) form.reset();

  uploadedImagesForForm = [];
  renderFormImagesPreview("create-images-preview-grid");
  toggleCreateAddInfoField();
  
  openModal("modal-create-campaign");
}

window.toggleCreateAddInfoField = function() {
  const typeVal = document.querySelector('input[name="create-camp-type"]:checked')?.value || "convocatoria";
  const infoGroup = document.getElementById("create-additional-info-group");
  if (infoGroup) {
    if (typeVal === "convocatoria") {
      infoGroup.style.display = "block";
      document.getElementById("create-additional").required = true;
    } else {
      infoGroup.style.display = "none";
      document.getElementById("create-additional").required = false;
    }
  }
};

window.simulateCreateCampaignImageUpload = function() {
  // Mock image upload simulation
  const mockImages = [
    "img/campaign_tutoring.png",
    "img/campaign_park.png",
    "img/campaign_food.png"
  ];
  const randImg = mockImages[Math.floor(Math.random() * mockImages.length)];
  
  if (uploadedImagesForForm.length >= 3) {
    if (typeof showToast !== "undefined") {
      showToast("Límite de imágenes", "Solo puedes subir hasta 3 imágenes por campaña.", false);
    }
    return;
  }

  uploadedImagesForForm.push(randImg);
  renderFormImagesPreview("create-images-preview-grid");
};

function renderFormImagesPreview(gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  grid.innerHTML = "";
  uploadedImagesForForm.forEach((img, index) => {
    const div = document.createElement("div");
    div.className = "uploaded-image-preview";
    div.innerHTML = `
      <img src="${BASE_URL + img}" alt="Preview image">
      <button type="button" class="remove-preview-img-btn" onclick="removeUploadedImage(${index}, '${gridId}')">×</button>
    `;
    grid.appendChild(div);
  });
}

window.removeUploadedImage = function(index, gridId) {
  uploadedImagesForForm.splice(index, 1);
  renderFormImagesPreview(gridId);
};

window.handleCreateCampaignSubmit = function() {
  const title = document.getElementById("create-title").value.trim();
  const desc = document.getElementById("create-desc").value.trim();
  const category = document.getElementById("create-category").value;
  const location = document.getElementById("create-location").value.trim();
  const startDate = document.getElementById("create-start-date").value;
  const endDate = document.getElementById("create-end-date").value;
  const details = document.getElementById("create-details").value.trim();
  const type = document.querySelector('input[name="create-camp-type"]:checked').value;
  const additionalInfo = type === "convocatoria" ? document.getElementById("create-additional").value.trim() : "";

  // Construct new campaign item
  const newCampaign = {
    id: Date.now(),
    title,
    desc,
    category,
    type,
    startDate,
    endDate,
    location,
    details,
    additionalInfo,
    images: [...uploadedImagesForForm]
  };

  // Push to local DB
  campaigns.unshift(newCampaign);

  closeModal("modal-create-campaign");
  currentPage = 1;
  renderCampaigns();

  if (typeof showToast !== "undefined") {
    showToast("Campaña creada con éxito", `"${title}" ya está registrada en tu cuenta.`, true);
  }
};

// ==========================================
// 7. MODIFY CAMPAIGN CRUD FLOW
// ==========================================
window.openModifyCampaignModal = function(id) {
  const camp = campaigns.find(c => c.id === id);
  if (!camp) return;

  currentEditCampaignId = id;

  // Fill in form inputs
  document.getElementById("modify-title").value = camp.title;
  document.getElementById("modify-desc").value = camp.desc;
  document.getElementById("modify-category").value = camp.category;
  document.getElementById("modify-location").value = camp.location;
  document.getElementById("modify-start-date").value = camp.startDate;
  document.getElementById("modify-end-date").value = camp.endDate;
  document.getElementById("modify-details").value = camp.details;
  
  if (camp.type === "convocatoria") {
    document.getElementById("modify-type-convocatoria").checked = true;
    document.getElementById("modify-additional").value = camp.additionalInfo;
  } else {
    document.getElementById("modify-type-informativa").checked = true;
    document.getElementById("modify-additional").value = "";
  }

  // Load images
  uploadedImagesForForm = [...(camp.images || [])];
  renderFormImagesPreview("modify-images-preview-grid");

  toggleModifyAddInfoField();
  openModal("modal-modify-campaign");
};

window.toggleModifyAddInfoField = function() {
  const typeVal = document.querySelector('input[name="modify-camp-type"]:checked')?.value || "convocatoria";
  const infoGroup = document.getElementById("modify-additional-info-group");
  if (infoGroup) {
    if (typeVal === "convocatoria") {
      infoGroup.style.display = "block";
      document.getElementById("modify-additional").required = true;
    } else {
      infoGroup.style.display = "none";
      document.getElementById("modify-additional").required = false;
    }
  }
};

window.simulateModifyCampaignImageUpload = function() {
  const mockImages = [
    "img/campaign_tutoring.png",
    "img/campaign_park.png",
    "img/campaign_food.png"
  ];
  const randImg = mockImages[Math.floor(Math.random() * mockImages.length)];
  
  if (uploadedImagesForForm.length >= 3) {
    if (typeof showToast !== "undefined") {
      showToast("Límite de imágenes", "Solo puedes subir hasta 3 imágenes por campaña.", false);
    }
    return;
  }

  uploadedImagesForForm.push(randImg);
  renderFormImagesPreview("modify-images-preview-grid");
};

window.handleModifyCampaignSubmit = function() {
  if (!currentEditCampaignId) return;

  const campIndex = campaigns.findIndex(c => c.id === currentEditCampaignId);
  if (campIndex === -1) return;

  const title = document.getElementById("modify-title").value.trim();
  const desc = document.getElementById("modify-desc").value.trim();
  const category = document.getElementById("modify-category").value;
  const location = document.getElementById("modify-location").value.trim();
  const startDate = document.getElementById("modify-start-date").value;
  const endDate = document.getElementById("modify-end-date").value;
  const details = document.getElementById("modify-details").value.trim();
  const type = document.querySelector('input[name="modify-camp-type"]:checked').value;
  const additionalInfo = type === "convocatoria" ? document.getElementById("modify-additional").value.trim() : "";

  // Update mock item
  campaigns[campIndex] = {
    ...campaigns[campIndex],
    title,
    desc,
    category,
    type,
    startDate,
    endDate,
    location,
    details,
    additionalInfo,
    images: [...uploadedImagesForForm]
  };

  closeModal("modal-modify-campaign");
  currentEditCampaignId = null;
  renderCampaigns();

  if (typeof showToast !== "undefined") {
    showToast("Campaña modificada", `Se guardaron los cambios para "${title}".`, true);
  }
};

// ==========================================
// 8. DELETE CAMPAIGN CONFIRM DIALOG
// ==========================================
window.openDeleteConfirmModal = function(id) {
  currentDeleteCampaignId = id;
  openModal("modal-delete-confirm");
};

function setupMockUploads() {
  // Empty helper to configure simulation triggers
}
