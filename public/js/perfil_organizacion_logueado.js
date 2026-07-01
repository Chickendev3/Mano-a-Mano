/**
 * Perfil Organización Logueada - Interactive Logic
 * Mano a Mano MVC
 */

// Initial State
let orgProfile = window.initialUserProfile || {
  name: "",
  desc: "",
  location: "",
  email: "",
  avatar: "",
  causes: []
};

const availableCauses = window.availableCauses || [];

// Local state for temporary causes tags being edited
let tempCauses = [];

// CRUD State variables
let uploadedImagesForForm = [];

// Initialize Page
document.addEventListener("DOMContentLoaded", () => {
  renderProfileData();
  setupProfileEditEvents();
  setupTabs();
  setupCampaignsGrid();
  setupVolunteersSection();
  setupInvitationsGrid();
  setupAssociationsGrid();
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
  const viewCauses = document.getElementById("view-causes-badges");

  // Avatar
  if (orgProfile.avatar) {
    avatarView.src = orgProfile.avatar;
    avatarView.style.display = "block";
    avatarPlaceholder.style.display = "none";
  } else {
    avatarView.style.display = "none";
    avatarPlaceholder.style.display = "block";
  }

  // Text details
  if (viewName) viewName.textContent = orgProfile.name;
  if (viewDesc) viewDesc.textContent = orgProfile.desc;
  if (viewLocation) viewLocation.textContent = orgProfile.location;
  if (viewEmail) viewEmail.textContent = orgProfile.email;

     // Causes Badges (Read-Only)
   if (viewCauses) {
     viewCauses.innerHTML = "";
     orgProfile.causes.forEach(cause => {
       const span = document.createElement("span");
       
      span.className = "tag-badge";
       span.innerHTML = `<i data-lucide="tag"></i> ${cause}`;
       
       viewCauses.appendChild(span);
     });
   }

  // Update navbar if logged in
  const navDropdownSpan = document.querySelector(".nav-dropdown-toggle span");
  if (navDropdownSpan) {
    navDropdownSpan.textContent = orgProfile.name;
  }

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
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
      editName.value = orgProfile.name;
      editDesc.value = orgProfile.desc;
      editLocation.value = orgProfile.location || "";
      editEmail.value = orgProfile.email || "";
      
      tempCauses = [...orgProfile.causes];
      renderEditableCauses();

      viewState.style.display = "none";
      editState.style.display = "block";
    });
  }

  // Click "Cancelar"
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      viewState.style.display = "block";
      editState.style.display = "none";
      document.getElementById("tag-suggestions").classList.remove("active");
    });
  }

  // Click "Guardar"
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const nombreVal = editName.value.trim();
      const emailVal = editEmail.value.trim();

      if (!nombreVal || !emailVal) {
        if (typeof showToast !== "undefined") {
          showToast("Campos obligatorios", "Por favor completa el nombre y el correo electrónico.", false);
        }
        return;
      }

      const formData = new FormData();
      formData.append("nombre", nombreVal);
      formData.append("descripcion", editDesc.value.trim());
      formData.append("ubicacion", editLocation.value.trim());
      formData.append("email", emailVal);
      tempCauses.forEach(cause => {
        formData.append("causas[]", cause);
      });

      fetch(`${BASE_URL}editar-perfil-organizacion`, {
        method: "POST",
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          orgProfile.name = nombreVal;
          orgProfile.desc = editDesc.value.trim();
          orgProfile.location = editLocation.value.trim();
          orgProfile.email = emailVal;
          orgProfile.causes = [...tempCauses];

          renderProfileData();

          viewState.style.display = "block";
          editState.style.display = "none";

          if (typeof showToast !== "undefined") {
            showToast("Perfil actualizado", data.message || "Los datos de la organización se guardaron correctamente.", true);
          }
        } else {
          if (typeof showToast !== "undefined") {
            showToast("Error", data.message || "No se pudo actualizar el perfil.", false);
          }
        }
      })
      .catch(err => {
        console.error("Error al guardar el perfil:", err);
        if (typeof showToast !== "undefined") {
          showToast("Error", "Error de comunicación con el servidor.", false);
        }
      });
    });
  }

  // Handle Avatar Input
  if (avatarInput) {
    avatarInput.addEventListener("change", function() {
      if (this.files && this.files[0]) {
        const file = this.files[0];
        
        const formData = new FormData();
        formData.append('foto_perfil', file);

        fetch(`${BASE_URL}perfil-actualizar-img`, {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            const imgView = document.getElementById('avatar-img-view');
            const placeholder = document.getElementById('avatar-icon-placeholder');
            
            if (imgView) {
              imgView.src = BASE_URL + data.ruta;
              imgView.style.display = 'block';
            }
            if (placeholder) {
              placeholder.style.display = 'none';
            }
            
            orgProfile.avatar = BASE_URL + data.ruta;
            if (typeof showToast !== "undefined") {
              showToast("Imagen de perfil", "Logotipo de la organización actualizado con éxito.", true);
            }
          } else {
            alert('Error al subir la imagen: ' + data.message);
          }
        })
        .catch(err => console.error('Error en la petición:', err));
      }
    });
  }

  // Autocomplete search causes
  const tagInput = document.getElementById("tag-search-input");
  const tagSuggestions = document.getElementById("tag-suggestions");

  if (tagInput) {
    tagInput.addEventListener("focus", () => showSuggestions(tagInput.value));
    tagInput.addEventListener("input", () => showSuggestions(tagInput.value));
    
    document.addEventListener("click", (e) => {
      if (!tagInput.contains(e.target) && !tagSuggestions.contains(e.target)) {
        tagSuggestions.classList.remove("active");
      }
    });
  }
}

function renderEditableCauses() {
  const container = document.getElementById("edit-tags-list");
  if (!container) return;

  container.innerHTML = "";
  tempCauses.forEach((cause, index) => {
    const div = document.createElement("div");
    div.className = "edit-tag-item";
    div.innerHTML = `
      <span>${cause}</span>
      <button type="button" class="edit-tag-remove-btn" onclick="removeTempCause(${index})">x</button>
    `;
    container.appendChild(div);
  });
}

window.removeTempCause = function(index) {
  tempCauses.splice(index, 1);
  renderEditableCauses();
  const tagInput = document.getElementById("tag-search-input");
  if (tagInput) showSuggestions(tagInput.value);
};

function showSuggestions(filterText) {
  const listElement = document.getElementById("tag-suggestions");
  if (!listElement) return;

  const searchVal = filterText.toLowerCase().trim();
  
  const filtered = availableCauses.filter(cause => {
    const isAlreadySelected = tempCauses.includes(cause);
    const matchesSearch = cause.toLowerCase().includes(searchVal);
    return !isAlreadySelected && matchesSearch;
  });

  if (filtered.length > 0) {
    listElement.innerHTML = "";
    filtered.forEach(cause => {
      const li = document.createElement("li");
      li.className = "tag-suggestion-item";
      li.textContent = cause;
      li.addEventListener("click", () => {
        tempCauses.push(cause);
        renderEditableCauses();
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

      tabBtns.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });

      panes.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add("active");

      if (targetId === "pane-gestionar") {
        currentPage = 1;
        renderCampaigns();
      }

      if (targetId === "pane-invitaciones") {
        currentReceivedPage = 1;
        currentSentPage = 1;
        renderReceivedInvitations();
        renderSentInvitations();
      }

      if (targetId === "pane-asociaciones") {
        currentAssociationsPage = 1;
        renderAssociations();
      }

      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    });
  });
}

// ==========================================
// 4. CAMPAIGN LISTS & FILTERS (CRUD & GRID)
// ==========================================


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
// 6. CREATE CAMPAIGN CRUD FLOW
// ==========================================

window.removeUploadedImage = function(index, gridId) {
  uploadedImagesForForm.splice(index, 1);
  renderFormImagesPreview(gridId);
};

// ==========================================
// 9. GESTIONAR VOLUNTARIOS FIJOS LÓGICA
// ==========================================
function setupVolunteersSection() {
  const toggleSearchBtn = document.getElementById("btn-toggle-volunteer-search");
  const searchContainer = document.getElementById("volunteer-search-container");
  const searchBtn = document.getElementById("btn-execute-volunteer-search");
  const searchInput = document.getElementById("volunteer-search-email");

  if (toggleSearchBtn && searchContainer) {
    toggleSearchBtn.addEventListener("click", () => {
      const isHidden = searchContainer.style.display === "none";
      searchContainer.style.display = isHidden ? "block" : "none";
      if (isHidden && searchInput) {
        searchInput.value = "";
        const resultsDiv = document.getElementById("volunteer-search-results");
        if (resultsDiv) resultsDiv.innerHTML = "";
        searchInput.focus();
      }
    });
  }

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
      performVolunteerSearch();
    });

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        performVolunteerSearch();
      }
    });
  }

  loadVolunteersFromBD();
}

function loadVolunteersFromBD() {
  fetch(`${BASE_URL}obtener-mis-voluntarios-fijos`)
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        fixedVolunteers = res.fixed;
        dischargedVolunteers = res.discharged;
        renderVolunteerLists();
      }
    })
    .catch(err => console.error("Error al cargar lista de voluntarios fijos:", err));
}

function renderVolunteerLists() {
  const fixedList = document.getElementById("fixed-volunteers-list");
  const dischargedList = document.getElementById("discharged-volunteers-list");

  // RENDER FIXED VOLUNTEERS
  if (fixedList) {
    fixedList.innerHTML = "";
    if (fixedVolunteers.length === 0) {
      fixedList.innerHTML = `
        <div class="volunteer-empty-state">
          No hay voluntarios fijos registrados.
        </div>
      `;
    } else {
      fixedVolunteers.forEach(vol => {
        const card = document.createElement("article");
        card.className = "invite-card volunteer-card";
        
        const avatarHTML = vol.avatar 
          ? `<img src="${BASE_URL + vol.avatar}" alt="${vol.name}">`
          : `<i data-lucide="user"></i>`;

        card.innerHTML = `
          <div class="invite-card-img-col user-avatar">
            ${avatarHTML}
          </div>
          <div class="invite-card-content-col">
            <h3 class="alt-card-title">${vol.name} ${vol.lastName}</h3>
            <p class="alt-card-desc">${vol.email}</p>
          </div>
          <div class="invite-card-actions-col">
            <button class="btn btn-ghost volunteer-btn-remove" onclick="dischargeVolunteer('${vol.email}')">
              <i data-lucide="user-minus" style="width: 14px; height: 14px; margin-right: 4px;"></i> Dar de baja
            </button>
          </div>
        `;
        fixedList.appendChild(card);
      });
    }
  }

  // RENDER DISCHARGED VOLUNTEERS
  if (dischargedList) {
    dischargedList.innerHTML = "";
    if (dischargedVolunteers.length === 0) {
      dischargedList.innerHTML = `
        <div class="volunteer-empty-state">
          No hay voluntarios dados de baja.
        </div>
      `;
    } else {
      dischargedVolunteers.forEach(vol => {
        const card = document.createElement("article");
        card.className = "invite-card volunteer-card";
        
        const avatarHTML = vol.avatar 
          ? `<img src="${BASE_URL + vol.avatar}" alt="${vol.name}">`
          : `<i data-lucide="user"></i>`;

        card.innerHTML = `
          <div class="invite-card-img-col user-avatar">
            ${avatarHTML}
          </div>
          <div class="invite-card-content-col">
            <h3 class="alt-card-title">${vol.name} ${vol.lastName}</h3>
            <p class="alt-card-desc">${vol.email}</p>
          </div>
          <div class="invite-card-actions-col">
            <button class="btn btn-ghost volunteer-btn-add" onclick="enrollVolunteer('${vol.email}')">
              <i data-lucide="user-check" style="width: 14px; height: 14px; margin-right: 4px;"></i> Volver a dar de alta
            </button>
          </div>
        `;
        dischargedList.appendChild(card);
      });
    }
  }

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

function performVolunteerSearch() {
  const emailInput = document.getElementById("volunteer-search-email");
  const resultsDiv = document.getElementById("volunteer-search-results");
  
  if (!emailInput || !resultsDiv) return;

  const q = emailInput.value.trim();
  if (!q) {
    resultsDiv.innerHTML = `
      <div style="color: #EF4444; font-size: 14px; font-weight: 500;">
        Por favor, ingrese un correo electrónico para buscar.
      </div>
    `;
    return;
  }

  fetch(`${BASE_URL}buscar-voluntarios-email?q=${encodeURIComponent(q)}`)
    .then(res => res.json())
    .then(res => {
      resultsDiv.innerHTML = "";
      if (res.success && res.data.length > 0) {
        res.data.forEach(foundUser => {
          const isActive = fixedVolunteers.some(v => v.email.toLowerCase() === foundUser.email.toLowerCase());
          
          const avatarHTML = foundUser.img_perfil 
            ? `<img src="${BASE_URL + foundUser.img_perfil}" alt="${foundUser.nombre}">`
            : `<i data-lucide="user"></i>`;

          const article = document.createElement("article");
          article.className = "invite-card volunteer-card";
          article.style.backgroundColor = "var(--color-surface)";
          article.style.marginBottom = "8px";

          if (isActive) {
            article.innerHTML = `
              <div class="invite-card-img-col user-avatar">
                ${avatarHTML}
              </div>
              <div class="invite-card-content-col">
                <h3 class="alt-card-title">${foundUser.nombre} ${foundUser.apellido}</h3>
                <p class="alt-card-desc">${foundUser.email}</p>
              </div>
              <div class="invite-card-actions-col">
                <span class="volunteer-status-badge">
                  Ya es voluntario fijo
                </span>
              </div>
            `;
          } else {
            article.innerHTML = `
              <div class="invite-card-img-col user-avatar">
                ${avatarHTML}
              </div>
              <div class="invite-card-content-col">
                <h3 class="alt-card-title">${foundUser.nombre} ${foundUser.apellido}</h3>
                <p class="alt-card-desc">${foundUser.email}</p>
              </div>
              <div class="invite-card-actions-col">
                <button class="btn btn-primary" style="padding: 8px 16px; font-size: 13px;" onclick="enrollVolunteer('${foundUser.email}')">
                  <i data-lucide="user-check" style="width: 14px; height: 14px; margin-right: 4px;"></i> Dar de Alta
                </button>
              </div>
            `;
          }
          resultsDiv.appendChild(article);
        });

        if (typeof lucide !== "undefined") {
          lucide.createIcons();
        }
      } else {
        resultsDiv.innerHTML = `
          <div style="color: #EF4444; font-size: 14px; font-weight: 500; padding: 12px; background-color: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: var(--radius-sm);">
            No se encontró ningún usuario registrado con el correo: <strong>${q}</strong>
          </div>
        `;
      }
    })
    .catch(err => console.error("Error al buscar voluntarios:", err));
}

window.enrollVolunteer = function(email) {
  const formData = new FormData();
  formData.append("email", email);

  fetch(`${BASE_URL}alta-voluntario-fijo`, {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      if (typeof showToast !== "undefined") {
        showToast("Voluntario dado de alta", res.message || "Se sumó a tus voluntarios fijos.", true);
      }
      const searchInput = document.getElementById("volunteer-search-email");
      const resultsDiv = document.getElementById("volunteer-search-results");
      if (searchInput) searchInput.value = "";
      if (resultsDiv) resultsDiv.innerHTML = "";
      
      const searchContainer = document.getElementById("volunteer-search-container");
      if (searchContainer) searchContainer.style.display = "none";

      loadVolunteersFromBD();
    } else {
      if (typeof showToast !== "undefined") {
        showToast("Error", res.message || "No se pudo dar de alta.", false);
      }
    }
  })
  .catch(err => console.error("Error al dar de alta voluntario:", err));
};

window.dischargeVolunteer = function(email) {
  const formData = new FormData();
  formData.append("email", email);

  fetch(`${BASE_URL}baja-voluntario-fijo`, {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      if (typeof showToast !== "undefined") {
        showToast("Voluntario dado de baja", res.message || "Removido de tus voluntarios fijos.", true);
      }
      loadVolunteersFromBD();
    } else {
      if (typeof showToast !== "undefined") {
        showToast("Error", res.message || "No se pudo dar de baja.", false);
      }
    }
  })
  .catch(err => console.error("Error al dar de baja voluntario:", err));
};

// ==========================================
// 11. ASOCIACIONES DINÁMICAS DESDE LA BD
// ==========================================
let currentAssociationsPage = 1;
let associations = [];

function setupAssociationsGrid() {
  const filterSelect = document.getElementById("filter-associations-select");
  const sortSelect = document.getElementById("sort-associations-select");

  if (filterSelect) {
    filterSelect.addEventListener("change", () => {
      currentAssociationsPage = 1;
      renderAssociations();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      currentAssociationsPage = 1;
      renderAssociations();
    });
  }

  fetch(`${BASE_URL}obtener-mis-asociaciones`)
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        associations = res.data;
        renderAssociations();
      }
    })
    .catch(err => console.error("Error al cargar asociaciones:", err));
}

function renderAssociations() {
  const grid = document.getElementById("associations-list");
  if (!grid) return;

  const filterVal = document.getElementById("filter-associations-select")?.value || "";
  const sortVal = document.getElementById("sort-associations-select")?.value || "";

  // 1. Filter
  let filtered = [...associations];
  
  if (filterVal) {
    const today = new Date();
    today.setHours(0,0,0,0);
    
    if (filterVal === "activas") {
      filtered = filtered.filter(assoc => new Date(assoc.endDate) >= today);
    } else if (filterVal === "finalizadas") {
      filtered = filtered.filter(assoc => new Date(assoc.endDate) < today);
    }
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
  
  if (currentAssociationsPage > totalPages && totalPages > 0) {
    currentAssociationsPage = totalPages;
  }

  const startIndex = (currentAssociationsPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = filtered.slice(startIndex, endIndex);

  // 4. Render HTML
  grid.innerHTML = "";
  if (paginated.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-secondary); background-color: var(--color-surface); border: 1px dashed var(--color-border); border-radius: var(--radius-md);">
        No se encontraron asociaciones registradas con este filtro.
      </div>
    `;
    renderAssociationsPagination(0);
    return;
  }

    paginated.forEach(assoc => {
    const imgHTML = assoc.partnerImg 
      ? `<img src="${BASE_URL + assoc.partnerImg}" alt="${assoc.partnerName}">` 
      : `<i data-lucide="${assoc.partnerRole === 'voluntario' ? 'user' : 'building'}"></i>`;

    const article = document.createElement("article");
    article.className = "invite-card";
    article.style.cursor = "pointer";
    article.addEventListener("click", () => {
      openCampaignDetailsView(assoc.id);
    });

    article.innerHTML = `
      <div class="invite-card-img-col user-avatar">
        ${imgHTML}
      </div>
      <div class="invite-card-content-col">
        <h3 class="alt-card-title" style="margin-bottom: 2px;">${assoc.partnerName}</h3>
        <span style="font-size: 11px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase;">
          ${assoc.partnerRole === 'voluntario' ? 'Particular' : 'Organización'}
        </span>
        <div style="margin-top: 8px; font-size: 13px; color: var(--color-text-secondary);">
          Colaborando en la campaña: <strong>${assoc.title}</strong>
        </div>
      </div>
    `;
    grid.appendChild(article);
  });

  renderAssociationsPagination(totalPages);

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

function renderAssociationsPagination(totalPages) {
  const container = document.getElementById("associations-pagination");
  if (!container) return;

  container.innerHTML = "";
  if (totalPages <= 1) return;

  const prevBtn = document.createElement("button");
  prevBtn.className = "pag-btn";
  prevBtn.innerHTML = "&lt; Previous";
  prevBtn.disabled = currentAssociationsPage === 1;
  prevBtn.addEventListener("click", () => {
    if (currentAssociationsPage > 1) {
      currentAssociationsPage--;
      renderAssociations();
    }
  });
  container.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const numBtn = document.createElement("button");
    numBtn.className = i === currentAssociationsPage ? "pag-num active" : "pag-num";
    numBtn.textContent = i;
    numBtn.addEventListener("click", () => {
      currentAssociationsPage = i;
      renderAssociations();
    });
    container.appendChild(numBtn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.className = "pag-btn";
  nextBtn.innerHTML = "Next &gt;";
  nextBtn.disabled = currentAssociationsPage === totalPages;
  nextBtn.addEventListener("click", () => {
    if (currentAssociationsPage < totalPages) {
      currentAssociationsPage++;
      renderAssociations();
    }
  });
  container.appendChild(nextBtn);
}



/* Redirección de BUSQUEDA DE VOLUNTARIO al presionar "Buscar" - VOLUNTARIOS FIJOS */
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const q = keywordInput ? keywordInput.value.trim() : '';
 
      if (q) params.set('q', q);
 
      window.location.href = `${BASE_URL}conectar?${params.toString()}`;
    });
  }