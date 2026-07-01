/**
 * Perfil Común Logueado - Lógica Interactiva Compartida
 * Mano a Mano MVC
 * 
 * Este archivo contiene todas las variables de estado y funciones comunes
 * para la gestión de campañas e invitaciones que comparten los perfiles
 * de Voluntarios y de Organizaciones.
 */

// =========================================================================
// VARIABLES DE ESTADO COMUNES
// =========================================================================
let tempCampaignCauses = [];             // Causas temporales seleccionadas en la creación
let tempModifyCampaignCauses = [];       // Causas temporales seleccionadas en la modificación
let selectedCampaignFiles = [];          // Archivos de imagen seleccionados para creación
let selectedModifyCampaignFiles = [];    // Archivos de imagen seleccionados para modificación
let existingCampaignImages = [];         // Rutas de imágenes guardadas previamente en la BD

// Campañas e Invitaciones (Inicializadas con datos del servidor o fallback vacío)
let campaigns = window.campaigns || [];
let receivedInvitations = [];             // Se completará dinámicamente o vía simulación
let sentInvitations = [];                 // Se completará dinámicamente o vía simulación

// Variables de paginación común
let currentPage = 1;
const itemsPerPage = 2;
let currentReceivedPage = 1;
let currentSentPage = 1;

// ID de campaña activo para edición o eliminación
let currentEditCampaignId = null;
let currentDeleteCampaignId = null;
let currentCancelInvitationId = null;

// =========================================================================
// ENLACE DE EVENTOS EN DOMContentLoaded
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Inicialización de componentes comunes si los elementos existen en el DOM
  if (document.getElementById("my-campaigns-grid")) {
    setupCampaignsGrid();
  }
  if (document.getElementById("received-invitations-list") || document.getElementById("sent-invitations-list")) {
    setupInvitationsGrid();
  }
  setupCampaignCausesEvents();
  setupCampaignFormValidations();
  setupCommonConfirmEvents();

  // Configurar el click en el botón de postularme
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

// =========================================================================
// MÉTODOS DE AYUDA Y TRADUCCIÓN
// =========================================================================

function scrollToCampaigns() {
  const section = document.querySelector(".profile-tabs-sec");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// =========================================================================
// GESTIÓN DE LA GRILLA DE CAMPAÑAS PROPIAS
// =========================================================================
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
    createBtn.addEventListener("click", openCreateCampaignModal);
  }

  renderCampaigns();
}

// 1. RENDERIZADO DE LAS TARJETAS DE CAMPAÑAS EN LA GRILLA
function renderCampaigns() {
  const grid = document.getElementById("my-campaigns-grid");
  if (!grid) return;
  const filterVal = document.getElementById("filter-campaigns-select")?.value || "";
  const sortVal = document.getElementById("sort-campaigns-select")?.value || "";

  // 1. Filtrado
  let filtered = [...campaigns];
  if (filterVal) {
    filtered = filtered.filter(c => c.type === filterVal);
  }

  // 2. Ordenamiento
  if (sortVal === "reciente") {
    filtered.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  } else if (sortVal === "antiguas") {
    filtered.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  }

  // 3. Paginación
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (currentPage > totalPages && totalPages > 0) {
    currentPage = totalPages;
  }
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = filtered.slice(startIndex, endIndex);
  
  // 4. Renderizar HTML
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
    const isReverse = index % 2 !== 0;
    const cardClass = isReverse ? "alt-card alt-card-reverse" : "alt-card";
    const imgUrl = camp.images && camp.images.length > 0 ? camp.images[0] : "";
    const imgHTML = imgUrl 
      ? `<img src="${BASE_URL + imgUrl}" alt="${camp.title}" style="width:100%; height:100%; object-fit:cover;">` 
      : `<i data-lucide="image"></i>`;
    // Renderizamos las causas reales como badges pequeños en la tarjeta
    const causesHTML = (camp.causes || []).map(cause => `
      <span class="tag-badge" style="background-color: var(--color-surface); font-size:11px;">
        ${cause}
      </span>
    `).join(" ");

    const article = document.createElement("article");
    article.className = cardClass;
    article.addEventListener("click", () => openCampaignDetailsView(camp.id));
    const today = new Date();
    today.setHours(0,0,0,0);
    const start = new Date(camp.startDate);
    start.setHours(0,0,0,0);
    const end = new Date(camp.endDate);
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
      <div class="alt-card-content-col" style="position: relative;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
          <h3 class="alt-card-title">${camp.title}</h3>
          <div style="display: flex; gap: 4px; flex-wrap: wrap;">
            ${causesHTML || `<span class="tag-badge" style="background-color: var(--color-surface); font-size:11px;">Solidario</span>`}
          </div>
        </div>
        <p class="alt-card-desc">${camp.desc}</p>
        
        <div class="camp-card-actions" style="margin-top: auto; display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <span class="modal-status-badge ${statusPillClass}" style="font-size: 12px; padding: 8px 16px; border-radius: var(--radius-sm); font-weight: 600; text-transform: uppercase;">
            ${statusLabel}
          </span>
          <div style="display: flex; gap: 8px;">
            <button class="camp-action-btn edit" title="Modificar campaña" onclick="event.stopPropagation(); openModifyCampaignModal(${camp.id});">
              <i data-lucide="edit-2" style="width:18px; height:18px;"></i>
            </button>
            
            <button class="camp-action-btn delete" title="Eliminar campaña" onclick="event.stopPropagation(); openDeleteConfirmModal(${camp.id});">
              <i data-lucide="trash-2" style="width:18px; height:18px;"></i>
            </button>
          </div>
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

// =========================================================================
// MODAL DE DETALLE DE CAMPAÑA (COMPARTIDO)
// =========================================================================
// Variable para trackear la campaña visualizada en el modal
let currentViewedCampaignId = null;
let attendanceInterval = null;

function openCampaignDetailsView(campaignId, options = {}) {
  const campLocal = campaigns.find(c => c.id === campaignId);

  if (campLocal) {
    // Campaña disponible localmente: renderizar de inmediato
    _renderCampaignModal(campLocal, options);
  } else {
    // Campaña externa (ej: de una invitación): obtenerla del backend
    fetch(`${BASE_URL}obtener-campania-por-id?id=${campaignId}`)
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          _renderCampaignModal(res.data, options);
        } else {
          console.warn("No se pudo obtener el detalle de la campaña:", res.message);
        }
      })
      .catch(err => console.error("Error al cargar detalle de campaña:", err));
  }
}

function _renderCampaignModal(camp, options = {}) {
  const campaignId = camp.id;
  currentViewedCampaignId = campaignId;

  const isOwner = camp.usuario_id == SESSION_USER_ID;
  const isOrg = SESSION_USER_ROL === "organizacion";

  const mTitle = document.getElementById("m-camp-title");
  const mDesc = document.getElementById("m-camp-desc");
  const mTags = document.getElementById("m-camp-tags");
  const mBadge = document.getElementById("m-camp-accepted-badge");
  const mPostulateBtn = document.getElementById("m-camp-postulate-btn");
  const mSensitive = document.getElementById("m-camp-sensitive-info");

  if (mTitle) mTitle.textContent = camp.title;
  
  // Lógica de inyección del Creador (añadir en ambas funciones de apertura del modal)
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

  // dividiendo el período en dos campos lógicos.
  if (mDesc) {
    mDesc.innerHTML = `
      <p style="margin-bottom:12px;"><strong>Descripción:</strong> ${camp.desc}</p>
      <p style="margin-bottom:12px;"><strong>Ubicación:</strong> ${camp.location}</p>
      <p style="margin-bottom:12px;"><strong>Fecha de inicio:</strong> ${camp.startDate}</p>
      <p><strong>Fecha de finalización:</strong> ${camp.endDate}</p>
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
    const typeLabel = camp.type === "convocatoria" ? "Convocatoria" : "Informativa";
    typeSpan.innerHTML = `<i data-lucide="info" style="width:12px; height:12px;"></i> ${typeLabel}`;
    mTags.appendChild(typeSpan);
  }

  // Carga de Galería (respetando la clase original gallery-placeholder-img para mantener los estilos intactos)
  const gallerySec = document.getElementById("m-camp-gallery-sec");
  const galleryGrid = document.getElementById("m-camp-gallery-grid");
  if (gallerySec && galleryGrid) {
    galleryGrid.innerHTML = "";
    if (camp.images && camp.images.length > 0) {
      camp.images.forEach(imgUrl => {
        const div = document.createElement("div");
        div.className = "gallery-placeholder-img"; // Mantiene la clase de estilos original
        div.innerHTML = `<img src="${BASE_URL + imgUrl}" alt="Foto de campaña" style="width:100%; height:100%; object-fit:cover; border-radius:inherit;">`;
        galleryGrid.appendChild(div);
      });
      gallerySec.style.display = "block";
    } else {
      gallerySec.style.display = "none";
    }
  }

  // Organizaciones en asociación
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

  if (mBadge) {
    mBadge.style.display = "none";
    if (typeof SESSION_USER_ROL !== 'undefined' && SESSION_USER_ROL === "voluntario") {
      // 1. Si existe postulación en el perfil privado
      if (typeof postulations !== 'undefined') {
        const post = postulations.find(p => p.campaignId === camp.id);
        if (post) {
          const statusLabels = {
            pendiente: "PENDIENTE",
            aceptado: "ACEPTADO",
            rechazado: "RECHAZADO"
          };
          mBadge.textContent = statusLabels[post.status] || "PENDIENTE";
          mBadge.className = `modal-status-badge ${post.status === "aceptado" ? "accepted-pill" : (post.status === "rechazado" ? "rejected-pill" : "pending-pill")}`;
          mBadge.style.display = "inline-block";
        }
      }
      // 2. Si existe invitación recibida en el listado
      if (typeof receivedInvitations !== 'undefined') {
        const inv = receivedInvitations.find(i => i.campaignId === camp.id);
        if (inv) {
          const statusLabels = {
            pendiente: "PENDIENTE",
            aceptado: "ACEPTADO",
            rechazado: "RECHAZADO"
          };
          mBadge.textContent = statusLabels[inv.status] || "PENDIENTE";
          mBadge.className = `modal-status-badge ${inv.status === "aceptado" ? "accepted-pill" : (inv.status === "rechazado" ? "rejected-pill" : "pending-pill")}`;
          mBadge.style.display = "inline-block";
        }
      }
    }
  }

  // Lógica de visualización de información de coordinación (adicional)
  let showAdditionalInfo = false;
  if (typeof SESSION_USER_ID !== 'undefined' && SESSION_USER_ID) {
    const isOwner = camp.usuario_id == SESSION_USER_ID;
    if (isOwner) {
      showAdditionalInfo = true;
    } else if (SESSION_USER_ROL === "voluntario" && camp.es_voluntario_aceptado) {
      showAdditionalInfo = true;
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

  const devStateCard = document.querySelector(".dev-state-selector-card");
  if (devStateCard) devStateCard.style.display = "none";

  if (mPostulateBtn) {
    if (options.hidePostulateBtn) {
      mPostulateBtn.style.display = "none";
    } else {
      const isOwner = camp.usuario_id == SESSION_USER_ID;
      const isOrg = SESSION_USER_ROL === "organizacion";
      mPostulateBtn.style.display = (camp.type === "convocatoria" && !isOwner && !isOrg) ? "inline-flex" : "none";
    }
  }

  // Lógica de validación de asistencia
  const attendanceSec = document.getElementById("m-camp-attendance-sec");
  if (attendanceSec) {
    attendanceSec.style.display = "none";
    attendanceSec.innerHTML = "";
    
    if (typeof SESSION_USER_ID !== 'undefined' && SESSION_USER_ID && camp.type === 'convocatoria') {
      const isOwner = camp.usuario_id == SESSION_USER_ID;
      const isAcceptedVol = camp.es_voluntario_aceptado || false;

      if (isOwner) {
        attendanceSec.style.display = "block";
        
        let codeAreaHTML = "";
        if (camp.codigo_activo) {
          codeAreaHTML = `
            <div style="margin-top: 12px; padding: 12px; background: rgba(99, 102, 241, 0.05); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
              <span>Código activo: <strong style="font-size: 16px; color: var(--color-primary); letter-spacing: 1px;">${camp.codigo_activo}</strong></span>
            </div>
          `;
        }

        attendanceSec.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <h4 style="font-size: 14px; font-weight: 600; margin: 0; display: inline-flex; align-items: center; gap: 6px;">
              Validación de Asistencia
              <span class="info-tooltip-trigger" title="Compartí el código generado con los voluntarios que participaron de la campaña. El código vence pasados 5 minutos (puedes generar nuevos si los necesitas)." style="cursor:help; display:inline-flex; align-items:center; justify-content:center; width:16px; height:16px; background:#e0e7ff; color:#4f46e5; border-radius:50%; font-size:10px; font-weight:bold;">?</span>
            </h4>
          </div>
          <button class="btn btn-primary" id="btn-generate-attendance-code" style="width: 100%; justify-content: center; gap: 8px;">
            <i data-lucide="key" style="width: 16px; height: 16px;"></i> Generar Código
          </button>
          <div id="attendance-code-result-area">${codeAreaHTML}</div>
        `;

        const genBtn = document.getElementById("btn-generate-attendance-code");
        if (genBtn) {
          genBtn.addEventListener("click", () => {
            genBtn.disabled = true;
            const formData = new FormData();
            formData.append("id_campania", camp.id);

            fetch(`${BASE_URL}generar-codigo-asistencia`, {
              method: "POST",
              body: formData
            })
            .then(res => res.json())
            .then(res => {
              genBtn.disabled = false;
              if (res.success) {
                camp.codigo_activo = res.codigo;
                
                document.getElementById("attendance-code-result-area").innerHTML = `
                  <div style="margin-top: 12px; padding: 12px; background: rgba(99, 102, 241, 0.05); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <span>Código activo: <strong style="font-size: 16px; color: var(--color-primary); letter-spacing: 1px;">${res.codigo}</strong></span>
                  </div>
                `;
                if (typeof lucide !== "undefined") lucide.createIcons();
              } else {
                alert(res.message || "Error al generar código.");
              }
            })
            .catch(err => {
              genBtn.disabled = false;
              console.error(err);
            });
          });
        }
      } 
      else if (isAcceptedVol) {
        attendanceSec.style.display = "block";

        if (camp.asistencia_registrada) {
          attendanceSec.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px; color: var(--color-success); font-weight: 600; padding: 12px; background: rgba(34, 197, 94, 0.05); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 8px;">
              <i data-lucide="check-circle" style="width: 18px; height: 18px;"></i> Asistencia Confirmada
            </div>
          `;
        } else {
          attendanceSec.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <h4 style="font-size: 14px; font-weight: 600; margin: 0; display: inline-flex; align-items: center; gap: 6px;">
                Validar Asistencia
                <span class="info-tooltip-trigger" title="Ingresá el código provisto por la organización de la campaña para registrar tu participación y que figure en tu perfil." style="cursor:help; display:inline-flex; align-items:center; justify-content:center; width:16px; height:16px; background:#e0e7ff; color:#4f46e5; border-radius:50%; font-size:10px; font-weight:bold;">?</span>
              </h4>
            </div>
            <div id="attendance-input-area">
              <button class="btn btn-primary" id="btn-show-attendance-input" style="width: 100%; justify-content: center; gap: 8px;">
                <i data-lucide="key" style="width: 16px; height: 16px;"></i> Ingresar Código
              </button>
            </div>
          `;

          const showInputBtn = document.getElementById("btn-show-attendance-input");
          if (showInputBtn) {
            showInputBtn.addEventListener("click", () => {
              document.getElementById("attendance-input-area").innerHTML = `
                <div style="display: flex; gap: 8px; margin-top: 8px;">
                  <input type="text" id="attendance-code-val" class="edit-input" placeholder="Ej: ABC1234" maxlength="10" style="text-transform: uppercase; flex: 1;">
                  <button class="btn btn-primary" id="btn-validate-attendance-code" style="padding: 10px 20px;">Validar</button>
                </div>
                <div id="attendance-validation-error" style="color: #EF4444; font-size: 12px; margin-top: 4px; display: none;"></div>
              `;
              
              const valBtn = document.getElementById("btn-validate-attendance-code");
              const valInput = document.getElementById("attendance-code-val");
              if (valBtn && valInput) {
                valBtn.addEventListener("click", () => {
                  const codeVal = valInput.value.trim().toUpperCase();
                  if (!codeVal) return;

                  valBtn.disabled = true;
                  const formData = new FormData();
                  formData.append("id_campania", camp.id);
                  formData.append("codigo", codeVal);

                  fetch(`${BASE_URL}validar-codigo-asistencia`, {
                    method: "POST",
                    body: formData
                  })
                  .then(res => res.json())
                  .then(res => {
                    valBtn.disabled = false;
                    if (res.success) {
                      camp.asistencia_registrada = true;
                      attendanceSec.innerHTML = `
                        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; color: var(--color-success); font-weight: 600; padding: 12px; background: rgba(34, 197, 94, 0.05); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 8px;">
                          <i data-lucide="check-circle" style="width: 18px; height: 18px;"></i> Asistencia Confirmada
                        </div>
                      `;
                      if (typeof lucide !== "undefined") lucide.createIcons();
                      if (typeof showToast !== "undefined") {
                        showToast("Asistencia Confirmada", res.message, true);
                      }
                      if (typeof loadVolunteeringFromBD === "function") {
                        loadVolunteeringFromBD();
                      }
                    } else {
                      const errDiv = document.getElementById("attendance-validation-error");
                      if (errDiv) {
                        errDiv.textContent = res.message;
                        errDiv.style.display = "block";
                      }
                    }
                  })
                  .catch(err => {
                    valBtn.disabled = false;
                    console.error(err);
                  });
                });
              }
            });
          }
        }
      }
    }
  }

  openModal("modal-profile-camp-detail");

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  const ownerSection = document.getElementById("m-camp-owner-postulations-sec");
  if (ownerSection) {
    if (isOwner && camp.type === "convocatoria") {
      ownerSection.style.display = "block";
      loadCampaignPostulations(campaignId);
    } else {
      ownerSection.style.display = "none";
    }
  }
}

function loadCampaignPostulations(campaignId) {
  const formData = new FormData();
  formData.append("id_campania", campaignId);

  Promise.all([
    fetch(`${BASE_URL}obtener-postulantes`, {
      method: "POST",
      body: formData
    }).then(res => res.json()),
    fetch(`${BASE_URL}obtener-participantes-aceptados`, {
      method: "POST",
      body: formData
    }).then(res => res.json())
  ])
  .then(([postulantesRes, participantesRes]) => {
    if (postulantesRes.success && participantesRes.success) {
      renderPostulationsList(campaignId, postulantesRes.data, participantesRes.data);
    }
  });
}

function renderPostulationsList(campaignId, postulantesList, participantesList) {
  const pendingList = postulantesList.filter(p => p.estado.toLowerCase().includes("pend"));
  const rejectedList = postulantesList.filter(p => p.estado.toLowerCase().includes("rech"));
  const acceptedList = participantesList;

  document.getElementById("count-pending").textContent = pendingList.length;
  document.getElementById("count-accepted").textContent = acceptedList.length;
  document.getElementById("count-rejected").textContent = rejectedList.length;

  renderAccordionCategory("list-pending", pendingList, (item) => `
    <div class="postulant-actions">
      <button class="btn btn-primary btn-sm" onclick="changePostulationStatus(${campaignId}, ${item.id}, 'ACEPTADO')">Aceptar</button>
      <button class="btn btn-ghost btn-sm" style="color: #EF4444;" onclick="changePostulationStatus(${campaignId}, ${item.id}, 'RECHAZADO')">Rechazar</button>
    </div>
  `);

  renderAccordionCategory("list-accepted", acceptedList, (item) => `
    <div class="postulant-actions">
      <button class="btn btn-ghost btn-sm" style="color: #EF4444;" onclick="deleteParticipant(${campaignId}, ${item.asociacion_id}, '${item.tipo_asociacion}')">Eliminar</button>
    </div>
  `);

  renderAccordionCategory("list-rejected", rejectedList, () => "");
}

window.deleteParticipant = function(campaignId, asociacionId, tipoAsociacion) {
  if (!confirm("¿Seguro que deseas eliminar a este participante?")) return;

  const formData = new FormData();
  if (tipoAsociacion === 'postulacion') {
    formData.append("id_postulacion", asociacionId);
    fetch(`${BASE_URL}eliminar-postulacion`, {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        showToast("Participante eliminado", data.message, true);
        loadCampaignPostulations(campaignId);
      }
    });
  } else if (tipoAsociacion === 'invitacion') {
    formData.append("id_invitacion", asociacionId);
    fetch(`${BASE_URL}cancelar-invitacion`, {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        showToast("Participante eliminado", data.message, true);
        loadCampaignPostulations(campaignId);
      }
    });
  }
};

function renderAccordionCategory(containerId, list, actionRenderer) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `<div class="empty-state" style="padding: 10px; font-size: 12px; text-align: center; color: var(--color-text-light);">Sin postulantes en esta sección.</div>`;
    return;
  }

  const isAcceptedSection = containerId === "list-accepted";

  list.forEach(item => {
    const avatar = item.img_perfil 
      ? `<img src="${BASE_URL + item.img_perfil}" alt="Avatar" class="postulant-avatar">`
      : `<div class="postulant-avatar" style="background-color: var(--color-border); display: flex; align-items: center; justify-content: center; color: var(--color-text-light);"><i data-lucide="user" style="width: 14px; height: 14px;"></i></div>`;

    // Generar info de contacto sólo para aceptados
    const contactInfoHTML = isAcceptedSection
      ? `<div class="postulant-contact-info" style="font-size: 11px; color: var(--color-text-light); margin-top: 2px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          ${item.telefono ? `<span><i data-lucide="phone" style="width:10px; height:10px; display:inline-block; vertical-align:middle; margin-right:2px;"></i>${item.telefono}</span>` : ''}
          ${item.email ? `<span><i data-lucide="mail" style="width:10px; height:10px; display:inline-block; vertical-align:middle; margin-right:2px;"></i>${item.email}</span>` : ''}
         </div>`
      : '';

    const div = document.createElement("div");
    div.className = "postulant-item";
    div.innerHTML = `
      <div class="postulant-left" style="display: flex; align-items: center; gap: 8px;">
        ${avatar}
        <div style="display: flex; flex-direction: column;">
          <a href="${BASE_URL}perfil/voluntario?id=${item.usuario_id}" class="postulant-name-link" style="font-weight: 500;">${item.nombre_completo}</a>
          ${contactInfoHTML}
        </div>
      </div>
      ${actionRenderer(item)}
    `;
    container.appendChild(div);
  });

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

window.changePostulationStatus = function(campaignId, idPostulacion, nuevoEstado) {
  const formData = new FormData();
  formData.append("id_postulacion", idPostulacion);
  formData.append("estado", nuevoEstado);

  fetch(`${BASE_URL}actualizar-estado-postulacion`, {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      showToast("Estado actualizado", data.message, true);
      loadCampaignPostulations(campaignId);
    }
  });
};

window.deletePostulation = function(campaignId, idPostulacion) {
  if (!confirm("¿Seguro que deseas eliminar a este postulante?")) return;

  const formData = new FormData();
  formData.append("id_postulacion", idPostulacion);

  fetch(`${BASE_URL}eliminar-postulacion`, {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      showToast("Postulación eliminada", data.message, true);
      loadCampaignPostulations(campaignId);
    }
  });
};

// =========================================================================
// MODAL DE CREACIÓN DE CAMPAÑA
// =========================================================================
function openCreateCampaignModal() {
  const msgBox = document.getElementById("create-camp-message-box");
  if (msgBox) msgBox.innerHTML = "";
  const form = document.getElementById("create-camp-form");
  if (form) form.reset();

  selectedCampaignFiles = [];
  renderSelectedFilesPreview();

  tempCampaignCauses = [];
  renderCampaignCauses();
  
  openModal("modal-create-campaign");
}

window.toggleCreateAddInfoField = function() {
  const typeVal = document.querySelector('input[name="tipo_campania"]:checked')?.value || "convocatoria";
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

// =========================================================================
// GESTIÓN DE CAUSAS (ETIQUETAS DINÁMICAS EN MODALES)
// =========================================================================
function setupCampaignCausesEvents() {
  // Buscador de causas en Creación
  const causeInput = document.getElementById("campaign-cause-search-input");
  const causeSuggestions = document.getElementById("campaign-cause-suggestions");

  if (causeInput) {
    causeInput.addEventListener("focus", () => showCampaignCauseSuggestions(causeInput.value));
    causeInput.addEventListener("input", () => showCampaignCauseSuggestions(causeInput.value));
  }

  // Buscador de causas en Modificación
  const modifyCauseInput = document.getElementById("modify-campaign-cause-search-input");
  const modifyCauseSuggestions = document.getElementById("modify-campaign-cause-suggestions");

  if (modifyCauseInput) {
    modifyCauseInput.addEventListener("focus", () => showModifyCampaignCauseSuggestions(modifyCauseInput.value));
    modifyCauseInput.addEventListener("input", () => showModifyCampaignCauseSuggestions(modifyCauseInput.value));
  }
  
  // Cierre de sugerencias al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (causeInput && causeSuggestions && !causeInput.contains(e.target) && !causeSuggestions.contains(e.target)) {
      causeSuggestions.classList.remove("active");
    }
    if (modifyCauseInput && modifyCauseSuggestions && !modifyCauseInput.contains(e.target) && !modifyCauseSuggestions.contains(e.target)) {
      modifyCauseSuggestions.classList.remove("active");
    }
  });
}

// Lógica de causas en Creación
function renderCampaignCauses() {
  const container = document.getElementById("create-campaign-causes-list");
  const form = document.getElementById("create-camp-form");
  if (!container || !form) return;

  container.innerHTML = "";
  form.querySelectorAll('input[name="causas[]"]').forEach(input => input.remove());

  tempCampaignCauses.forEach((cause, index) => {
    const div = document.createElement("div");
    div.className = "edit-tag-item";
    div.innerHTML = `
      <span>${cause}</span>
      <button type="button" class="edit-tag-remove-btn" onclick="removeCampaignCause(${index})">×</button>
    `;
    container.appendChild(div);

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "causas[]";
    hiddenInput.value = cause;
    form.appendChild(hiddenInput);
  });
}

window.removeCampaignCause = function(index) {
  tempCampaignCauses.splice(index, 1);
  renderCampaignCauses();
  const causeInput = document.getElementById("campaign-cause-search-input");
  if (causeInput) showCampaignCauseSuggestions(causeInput.value);
};

function showCampaignCauseSuggestions(filterText) {
  const listElement = document.getElementById("campaign-cause-suggestions");
  if (!listElement) return;

  const searchVal = filterText.toLowerCase().trim();
  const causesList = window.availableCampaignCauses || [];
  
  const filtered = causesList.filter(cause => {
    const isAlreadySelected = tempCampaignCauses.includes(cause);
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
        tempCampaignCauses.push(cause);
        renderCampaignCauses();
        const causeInput = document.getElementById("campaign-cause-search-input");
        if (causeInput) {
          causeInput.value = "";
          causeInput.focus();
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

// Lógica de causas en Modificación
function renderModifyCampaignCauses() {
  const container = document.getElementById("modify-campaign-causes-list");
  const form = document.getElementById("modify-camp-form");
  if (!container || !form) return;

  container.innerHTML = "";
  form.querySelectorAll('input[name="causas[]"]').forEach(input => input.remove());

  tempModifyCampaignCauses.forEach((cause, index) => {
    const div = document.createElement("div");
    div.className = "edit-tag-item";
    div.innerHTML = `
      <span>${cause}</span>
      <button type="button" class="edit-tag-remove-btn" onclick="removeModifyCampaignCause(${index})">×</button>
    `;
    container.appendChild(div);

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "causas[]";
    hiddenInput.value = cause;
    form.appendChild(hiddenInput);
  });
}

window.removeModifyCampaignCause = function(index) {
  tempModifyCampaignCauses.splice(index, 1);
  renderModifyCampaignCauses();
  const causeInput = document.getElementById("modify-campaign-cause-search-input");
  if (causeInput) showModifyCampaignCauseSuggestions(causeInput.value);
};

function showModifyCampaignCauseSuggestions(filterText) {
  const listElement = document.getElementById("modify-campaign-cause-suggestions");
  if (!listElement) return;

  const searchVal = filterText.toLowerCase().trim();
  const causesList = window.availableCampaignCauses || [];
  
  const filtered = causesList.filter(cause => {
    const isAlreadySelected = tempModifyCampaignCauses.includes(cause);
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
        tempModifyCampaignCauses.push(cause);
        renderModifyCampaignCauses();
        const causeInput = document.getElementById("modify-campaign-cause-search-input");
        if (causeInput) {
          causeInput.value = "";
          causeInput.focus();
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
// GESTIÓN DE IMÁGENES REALES EN MODALES
// =========================================================================

// Subida de imágenes en Creación
window.handleFileSelect = function(event) {
  const files = event.target.files;
  if (selectedCampaignFiles.length + files.length > 3) {
    if (typeof showToast !== "undefined") {
      showToast("Límite de imágenes", "Solo puedes subir hasta 3 imágenes por campaña.", false);
    }
    return;
  }
  for (let i = 0; i < files.length; i++) {
    selectedCampaignFiles.push(files[i]);
  }
  renderSelectedFilesPreview();
};

function renderSelectedFilesPreview() {
  const grid = document.getElementById("create-images-preview-grid");
  if (!grid) return;

  grid.innerHTML = "";
  selectedCampaignFiles.forEach((file, index) => {
    const url = URL.createObjectURL(file);
    const div = document.createElement("div");
    div.className = "uploaded-image-preview";
    div.innerHTML = `
      <img src="${url}" alt="Preview image">
      <button type="button" class="remove-preview-img-btn" onclick="removeSelectedFile(${index})">×</button>
    `;
    grid.appendChild(div);
  });
  syncFileInput();
}

window.removeSelectedFile = function(index) {
  selectedCampaignFiles.splice(index, 1);
  renderSelectedFilesPreview();
};

function syncFileInput() {
  const input = document.getElementById("campaign-images-input");
  if (!input) return;
  const dataTransfer = new DataTransfer();
  selectedCampaignFiles.forEach(file => {
    dataTransfer.items.add(file);
  });
  input.files = dataTransfer.files;
}

// Subida y conservación de imágenes en Modificación
window.handleModifyFileSelect = function(event) {
  const files = event.target.files;
  if (selectedModifyCampaignFiles.length + existingCampaignImages.length + files.length > 3) {
    if (typeof showToast !== "undefined") {
      showToast("Límite de imágenes", "Solo puedes subir hasta 3 imágenes en total.", false);
    }
    return;
  }
  for (let i = 0; i < files.length; i++) {
    selectedModifyCampaignFiles.push(files[i]);
  }
  renderModifyImagesPreview();
};

function renderModifyImagesPreview() {
  const grid = document.getElementById("modify-images-preview-grid");
  const form = document.getElementById("modify-camp-form");
  if (!grid || !form) return;

  grid.innerHTML = "";
  form.querySelectorAll('input[name="imagenes_existentes[]"]').forEach(input => input.remove());

  // 1. Imágenes ya existentes en la Base de Datos
  existingCampaignImages.forEach((imgUrl, index) => {
    const div = document.createElement("div");
    div.className = "uploaded-image-preview";
    div.innerHTML = `
      <img src="${BASE_URL + imgUrl}" alt="Imagen guardada">
      <button type="button" class="remove-preview-img-btn" onclick="removeExistingCampaignImage(${index})">×</button>
    `;
    grid.appendChild(div);

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "imagenes_existentes[]";
    hiddenInput.value = imgUrl;
    form.appendChild(hiddenInput);
  });

  // 2. Nuevas imágenes locales a subir
  selectedModifyCampaignFiles.forEach((file, index) => {
    const url = URL.createObjectURL(file);
    const div = document.createElement("div");
    div.className = "uploaded-image-preview";
    div.innerHTML = `
      <img src="${url}" alt="Nueva imagen a subir">
      <button type="button" class="remove-preview-img-btn" onclick="removeSelectedModifyFile(${index})">×</button>
    `;
    grid.appendChild(div);
  });

  syncModifyFileInput();
}

window.removeExistingCampaignImage = function(index) {
  existingCampaignImages.splice(index, 1);
  renderModifyImagesPreview();
};

window.removeSelectedModifyFile = function(index) {
  selectedModifyCampaignFiles.splice(index, 1);
  renderModifyImagesPreview();
};

function syncModifyFileInput() {
  const input = document.getElementById("modify-campaign-images-input");
  if (!input) return;
  const dataTransfer = new DataTransfer();
  selectedModifyCampaignFiles.forEach(file => {
    dataTransfer.items.add(file);
  });
  input.files = dataTransfer.files;
}

// =========================================================================
// MODAL DE MODIFICACIÓN DE CAMPAÑA
// =========================================================================
window.openModifyCampaignModal = function(id) {
  const camp = campaigns.find(c => c.id === id);
  if (!camp) return;

  currentEditCampaignId = id;

  const idInput = document.getElementById("modify-campaign-id-input");
  if (idInput) idInput.value = id;

  const titleInput = document.getElementById("modify-title");
  if (titleInput) titleInput.value = camp.title || "";

  const descInput = document.getElementById("modify-desc");
  if (descInput) descInput.value = camp.desc || "";

  const locationInput = document.getElementById("modify-location");
  if (locationInput) locationInput.value = camp.location || "";

  const startDateInput = document.getElementById("modify-start-date");
  if (startDateInput) startDateInput.value = camp.startDate || "";

  const endDateInput = document.getElementById("modify-end-date");
  if (endDateInput) endDateInput.value = camp.endDate || "";

  // Selección defensiva y excluyente de los radios de tipo
  const additionalInput = document.getElementById("modify-additional");
  const radioConvocatoria = document.getElementById("modify-type-convocatoria");
  const radioInformativa = document.getElementById("modify-type-informativa");

  if (camp.type === "convocatoria") {
    if (radioConvocatoria) radioConvocatoria.checked = true;
    if (radioInformativa) radioInformativa.checked = false;
    if (additionalInput) additionalInput.value = camp.additionalInfo || "";
  } else {
    if (radioConvocatoria) radioConvocatoria.checked = false;
    if (radioInformativa) radioInformativa.checked = true;
    if (additionalInput) additionalInput.value = "";
  }

  // Pre-carga de causas en la modificación
  if (camp.causes && Array.isArray(camp.causes)) {
    tempModifyCampaignCauses = [...camp.causes];
  } else if (camp.category) {
    tempModifyCampaignCauses = [camp.category];
  } else {
    tempModifyCampaignCauses = [];
  }
  renderModifyCampaignCauses();

  existingCampaignImages = [...(camp.images || [])];
  selectedModifyCampaignFiles = [];
  renderModifyImagesPreview();

  toggleModifyAddInfoField();
  openModal("modal-modify-campaign");

  const msgBox = document.getElementById("modify-camp-message-box");
  if (msgBox) msgBox.innerHTML = "";
};

window.toggleModifyAddInfoField = function() {
  const isConvocatoria = document.getElementById("modify-type-convocatoria")?.checked ?? true;
  const infoGroup = document.getElementById("modify-additional-info-group");
  const additionalInput = document.getElementById("modify-additional");
  
  if (infoGroup && additionalInput) {
    if (isConvocatoria) {
      infoGroup.style.display = "block";
      additionalInput.required = true;
    } else {
      infoGroup.style.display = "none";
      additionalInput.required = false;
      additionalInput.value = "";
    }
  }
};

// =========================================================================
// MODALES DE CONFIRMACIÓN (ELIMINAR CAMPAÑA Y CANCELAR INVITACIÓN)
// =========================================================================
window.openDeleteConfirmModal = function(id) {
  currentDeleteCampaignId = id;
  openModal("modal-delete-confirm");
};

window.openCancelInvitationConfirmModal = function(id) {
  currentCancelInvitationId = id;
  openModal("modal-cancel-invitation-confirm");
};

function setupCommonConfirmEvents() {
  // Confirmar eliminación de campaña (Ya enlazado con PHP)
  const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener("click", () => {
      if (currentDeleteCampaignId) {
        const formData = new FormData();
        formData.append('id_campania', currentDeleteCampaignId);

        fetch(`${BASE_URL}eliminar-campania`, {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Eliminar localmente del listado y renderizar
            campaigns = campaigns.filter(c => c.id !== currentDeleteCampaignId);
            closeModal("modal-delete-confirm");
            currentDeleteCampaignId = null;
            currentPage = 1;
            renderCampaigns();

            if (typeof showToast !== "undefined") {
              showToast("Campaña eliminada", data.message, true);
            }
          } else {
            if (typeof showToast !== "undefined") {
              showToast("Error", data.message || "No se pudo eliminar la campaña.", false);
            }
          }
        })
        .catch(err => {
          console.error("Error al eliminar la campaña:", err);
          if (typeof showToast !== "undefined") {
            showToast("Error de conexión", "No se pudo comunicar con el servidor.", false);
          }
        });
      }
    });
  }

  // Confirmar cancelación de invitación enviada
  const confirmCancelBtn = document.getElementById("confirm-cancel-invitation-btn");
  if (confirmCancelBtn) {
    confirmCancelBtn.addEventListener("click", () => {
      if (currentCancelInvitationId) {
        const formData = new FormData();
        formData.append("id_invitacion", currentCancelInvitationId);

        fetch(`${BASE_URL}cancelar-invitacion`, {
          method: "POST",
          body: formData
        })
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            sentInvitations = sentInvitations.filter(inv => inv.id !== currentCancelInvitationId);
            closeModal("modal-cancel-invitation-confirm");
            currentCancelInvitationId = null;
            currentSentPage = 1;
            renderSentInvitations();

            if (typeof showToast !== "undefined") {
              showToast("Invitación cancelada", res.message, true);
            }
          } else {
            if (typeof showToast !== "undefined") {
              showToast("Error", res.message, false);
            }
          }
        })
        .catch(err => console.error("Error al cancelar invitación:", err));
      }
    });
  }
}

// =========================================================================
// SECCIÓN DE INVITACIONES (COMÚN)
// =========================================================================
function setupInvitationsGrid() {
  const filterReceived = document.getElementById("filter-received-select");
  const sortReceived = document.getElementById("sort-received-select");
  const filterSent = document.getElementById("filter-sent-select");
  const sortSent = document.getElementById("sort-sent-select");

  if (filterReceived) {
    filterReceived.addEventListener("change", () => {
      currentReceivedPage = 1;
      renderReceivedInvitations();
    });
  }
  if (sortReceived) {
    sortReceived.addEventListener("change", () => {
      currentReceivedPage = 1;
      renderReceivedInvitations();
    });
  }
  if (filterSent) {
    filterSent.addEventListener("change", () => {
      currentSentPage = 1;
      renderSentInvitations();
    });
  }
  if (sortSent) {
    sortSent.addEventListener("change", () => {
      currentSentPage = 1;
      renderSentInvitations();
    });
  }

  fetch(`${BASE_URL}obtener-mis-invitaciones-recibidas`)
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        receivedInvitations = res.data;
        renderReceivedInvitations();
      }
    });

  fetch(`${BASE_URL}obtener-mis-invitaciones-enviadas`)
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        sentInvitations = res.data;
        renderSentInvitations();
      }
    });
}

function renderReceivedInvitations() {
  const grid = document.getElementById("received-invitations-list");
  if (!grid) return;

  const filterVal = document.getElementById("filter-received-select")?.value || "";
  const sortVal = document.getElementById("sort-received-select")?.value || "";

  let filtered = [...receivedInvitations];
  if (filterVal) {
    filtered = filtered.filter(inv => inv.status === filterVal);
  }

  if (sortVal === "reciente") {
    filtered.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  } else if (sortVal === "antiguas") {
    filtered.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  }

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (currentReceivedPage > totalPages && totalPages > 0) {
    currentReceivedPage = totalPages;
  }

  const startIndex = (currentReceivedPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = filtered.slice(startIndex, endIndex);

  grid.innerHTML = "";
  if (paginated.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-secondary);">
        No tienes invitaciones recibidas registradas.
      </div>
    `;
    renderReceivedPagination(0);
    return;
  }

  paginated.forEach(inv => {
    const imgUrl = inv.images && inv.images.length > 0 ? inv.images[0] : "";
    const imgHTML = imgUrl 
      ? `<img src="${BASE_URL + imgUrl}" alt="${inv.title}">` 
      : `<i data-lucide="image"></i>`;

    const article = document.createElement("article");
    article.className = "invite-card";
    article.addEventListener("click", () => openCampaignDetailsView(inv.campaignId, { hidePostulateBtn: true }));     /* Acaaa */

    let actionsHTML = "";
    if (inv.status === "pendiente") {
      actionsHTML = `
        <button class="btn btn-primary aceptar-invite-btn" type="button" onclick="event.stopPropagation(); acceptReceivedInvitation(${inv.id});">
          Aceptar
        </button>
        <button class="btn btn-ghost" type="button" onclick="event.stopPropagation(); rejectReceivedInvitation(${inv.id});">
          Rechazar
        </button>
      `;
    } else if (inv.status === "aceptado") {
      actionsHTML = `<span class="postulation-status-btn aceptado" style="pointer-events: none; padding: 8px 16px;">Has aceptado</span>`;
    } else if (inv.status === "rechazado") {
      actionsHTML = `<span class="postulation-status-btn rechazado" style="pointer-events: none; padding: 8px 16px;">Has rechazado</span>`;
    }

    article.innerHTML = `
      <div class="invite-card-img-col campaign-img">
        ${imgHTML}
      </div>
      <div class="invite-card-content-col">
        <span style="font-size: 11px; font-weight: 700; color: var(--color-primary); display: flex; align-items: center; gap: 4px; margin-bottom: 2px;">
          <i data-lucide="mail" style="width:12px; height:12px;"></i> ¡Te invitaron a una campaña!
        </span>
        <h3 class="alt-card-title">${inv.title}</h3>
        <p class="alt-card-desc">${inv.desc}</p>
        <span style="font-size: 12px; color: var(--color-text-muted); margin-top: 4px; display: block;">
          <i data-lucide="map-pin" style="width: 12px; height: 12px; display: inline; vertical-align: middle; margin-right: 2px;"></i> ${inv.location || "Sin ubicación"}
        </span>
      </div>
      
      <div class="invite-card-actions-col">
        ${actionsHTML}
      </div>
    `;
    grid.appendChild(article);
  });

  renderReceivedPagination(totalPages);

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

function renderReceivedPagination(totalPages) {
  const container = document.getElementById("received-invitations-pagination");
  if (!container) return;

  container.innerHTML = "";
  if (totalPages <= 1) return;

  const prevBtn = document.createElement("button");
  prevBtn.className = "pag-btn";
  prevBtn.innerHTML = "&lt; Previous";
  prevBtn.disabled = currentReceivedPage === 1;
  prevBtn.addEventListener("click", () => {
    if (currentReceivedPage > 1) {
      currentReceivedPage--;
      renderReceivedInvitations();
    }
  });
  container.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const numBtn = document.createElement("button");
    numBtn.className = i === currentReceivedPage ? "pag-num active" : "pag-num";
    numBtn.textContent = i;
    numBtn.addEventListener("click", () => {
      currentReceivedPage = i;
      renderReceivedInvitations();
    });
    container.appendChild(numBtn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.className = "pag-btn";
  nextBtn.innerHTML = "Next &gt;";
  nextBtn.disabled = currentReceivedPage === totalPages;
  nextBtn.addEventListener("click", () => {
    if (currentReceivedPage < totalPages) {
      currentReceivedPage++;
      renderReceivedInvitations();
    }
  });
  container.appendChild(nextBtn);
}

window.acceptReceivedInvitation = function(id) {
  const formData = new FormData();
  formData.append("id_invitacion", id);
  formData.append("estado", "ACEPTADO");

  fetch(`${BASE_URL}responder-invitacion`, {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      if (typeof showToast !== "undefined") {
        showToast("Invitación aceptada", "Te has unido a la campaña.", true);
      }
      fetch(`${BASE_URL}obtener-mis-invitaciones-recibidas`)
        .then(r => r.json())
        .then(r => {
          if (r.success) {
            receivedInvitations = r.data;
            renderReceivedInvitations();
          }
        });
    } else {
      if (typeof showToast !== "undefined") {
        showToast("Error", res.message, false);
      }
    }
  });
};

window.rejectReceivedInvitation = function(id) {
  const formData = new FormData();
  formData.append("id_invitacion", id);
  formData.append("estado", "RECHAZADO");

  fetch(`${BASE_URL}responder-invitacion`, {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      if (typeof showToast !== "undefined") {
        showToast("Invitación rechazada", "Has rechazado la invitación.", true);
      }
      fetch(`${BASE_URL}obtener-mis-invitaciones-recibidas`)
        .then(r => r.json())
        .then(r => {
          if (r.success) {
            receivedInvitations = r.data;
            renderReceivedInvitations();
          }
        });
    } else {
      if (typeof showToast !== "undefined") {
        showToast("Error", res.message, false);
      }
    }
  });
};

function renderSentInvitations() {
  const grid = document.getElementById("sent-invitations-list");
  if (!grid) return;

  const filterVal = document.getElementById("filter-sent-select")?.value || "";
  const sortVal = document.getElementById("sort-sent-select")?.value || "";

  let filtered = [...sentInvitations];
  if (filterVal) {
    filtered = filtered.filter(inv => inv.status === filterVal);
  }
  if (sortVal === "antiguas") {
    filtered.reverse();
  }

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (currentSentPage > totalPages && totalPages > 0) {
    currentSentPage = totalPages;
  }

  const startIndex = (currentSentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = filtered.slice(startIndex, endIndex);

  grid.innerHTML = "";
  if (paginated.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-secondary);">
        No has enviado invitaciones aún.
      </div>
    `;
    renderSentPagination(0);
    return;
  }

  paginated.forEach(inv => {
    const name = inv.destinatarioName;
    const avatar = inv.destinatarioImg;
    const role = inv.destinatarioRole;
    const campaignTitle = inv.title;

    const avatarHTML = avatar 
      ? `<img src="${BASE_URL + avatar}" alt="${name}">` 
      : `<i data-lucide="user"></i>`;

    const profileUrl = role === "voluntario" ? "perfil/voluntario" : "perfil/organizacion";
    const labelType = role === "voluntario" ? "Voluntario" : "Organización";

    let statusLabel = "";
    let statusClass = "";
    if (inv.status === "aceptado") {
      statusLabel = "Aceptado";
      statusClass = "aceptado";
    } else if (inv.status === "pendiente") {
      statusLabel = "Pendiente";
      statusClass = "pendiente";
    } else if (inv.status === "rechazado") {
      statusLabel = "Rechazado";
      statusClass = "rechazado";
    }

    const cancelHTML = (inv.status === "pendiente" || inv.status === "aceptado")
      ? `<button class="post-cancel-btn" type="button" onclick="event.stopPropagation(); openCancelInvitationConfirmModal(${inv.id});">
          Cancelar invitación
         </button>`
      : "";

    const article = document.createElement("article");
    article.className = "invite-card";

    article.innerHTML = `
      <div class="invite-card-img-col user-avatar">
        ${avatarHTML}
      </div>
      <div class="invite-card-content-col">
        <h3 class="alt-card-title" style="margin-bottom: 2px;">${name}</h3>
        <span style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">${labelType}</span>
        
        <div style="display:flex; flex-direction:column; gap:4px; margin-top: 8px;">
          <a href="${BASE_URL}${profileUrl}?id=${inv.destinatarioId}" class="invite-meta-link" onclick="event.stopPropagation();">
            <i data-lucide="user" style="width:12px; height:12px;"></i> Ir al perfil de ${name}
          </a>
          <button type="button" class="invite-meta-link" onclick="event.stopPropagation(); openCampaignDetailsView(${inv.campaignId});">
            <i data-lucide="external-link" style="width:12px; height:12px;"></i> Campaña invitada: <strong>${campaignTitle}</strong>
          </button>
        </div>
      </div>
      
      <div class="invite-card-actions-col">
        <button class="postulation-status-btn ${statusClass}" type="button" style="pointer-events: none;">
          ${statusLabel}
        </button>
        ${cancelHTML}
      </div>
    `;
    grid.appendChild(article);
  });

  renderSentPagination(totalPages);

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

function renderSentPagination(totalPages) {
  const container = document.getElementById("sent-invitations-pagination");
  if (!container) return;

  container.innerHTML = "";
  if (totalPages <= 1) return;

  const prevBtn = document.createElement("button");
  prevBtn.className = "pag-btn";
  prevBtn.innerHTML = "&lt; Previous";
  prevBtn.disabled = currentSentPage === 1;
  prevBtn.addEventListener("click", () => {
    if (currentSentPage > 1) {
      currentSentPage--;
      renderSentInvitations();
    }
  });
  container.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const numBtn = document.createElement("button");
    numBtn.className = i === currentSentPage ? "pag-num active" : "pag-num";
    numBtn.textContent = i;
    numBtn.addEventListener("click", () => {
      currentSentPage = i;
      renderSentInvitations();
    });
    container.appendChild(numBtn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.className = "pag-btn";
  nextBtn.innerHTML = "Next &gt;";
  nextBtn.disabled = currentSentPage === totalPages;
  nextBtn.addEventListener("click", () => {
    if (currentSentPage < totalPages) {
      currentSentPage++;
      renderSentInvitations();
    }
  });
  container.appendChild(nextBtn);
}


// =========================================================================
// MENSAJES DINÁMICOS Y VALIDACIONES DE FORMULARIO AJAX (FETCH)
// =========================================================================
function renderModalMessage(messageBoxId, message, isSuccess) {
  const messageBox = document.getElementById(messageBoxId);
  if (!messageBox) return;

  messageBox.innerHTML = '';

  const alert = document.createElement('div');
  alert.setAttribute('role', 'alert');
  alert.style.marginBottom = '20px';
  alert.style.padding = '14px';
  alert.style.borderRadius = '10px';
  alert.style.fontSize = '13px';
  alert.style.lineHeight = '1.4';
  alert.style.fontWeight = '500';
  alert.style.border = '1px solid';
  
  alert.style.backgroundColor = isSuccess ? 'rgba(220, 252, 231, 0.95)' : 'rgba(254, 226, 226, 0.95)';
  alert.style.color = isSuccess ? '#166534' : '#b91c1c';
  alert.style.borderColor = isSuccess ? '#86efac' : '#fca5a5';
  
  alert.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px;">
      <i data-lucide="${isSuccess ? 'check-circle' : 'alert-circle'}" style="width: 16px; height: 16px; flex-shrink: 0;"></i>
      <span>${message}</span>
    </div>
  `;

  messageBox.appendChild(alert);

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function setupCampaignFormValidations() {
  
  // A. Formulario de Creación
  const createForm = document.getElementById("create-camp-form");
  if (createForm) {
    createForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const title = document.getElementById("create-title").value.trim();
      const desc = document.getElementById("create-desc").value.trim();
      const location = document.getElementById("create-location").value.trim();
      const startDateVal = document.getElementById("create-start-date").value;
      const endDateVal = document.getElementById("create-end-date").value;
      
      const type = document.querySelector('input[name="tipo_campania"]:checked')?.value;
      const additionalInfoInput = document.getElementById("create-additional");
      const additionalInfo = additionalInfoInput ? additionalInfoInput.value.trim() : "";

      if (!title || !desc || !location || !startDateVal || !endDateVal) {
        renderModalMessage("create-camp-message-box", "Por favor, completa todos los campos obligatorios.", false);
        return;
      }

      if (type === "convocatoria" && !additionalInfo) {
        renderModalMessage("create-camp-message-box", "Por favor, ingresa la información adicional requerida para la convocatoria.", false);
        return;
      }

      if (tempCampaignCauses.length === 0) {
        renderModalMessage("create-camp-message-box", "Debes seleccionar al menos una causa para la campaña.", false);
        return;
      }

      const today = new Date();
      today.setHours(0,0,0,0);
      const start = new Date(startDateVal + "T00:00:00");
      const end = new Date(endDateVal + "T00:00:00");

      if (start < today) {
        renderModalMessage("create-camp-message-box", "La fecha de inicio no puede ser anterior a la fecha actual.", false);
        return;
      }
      if (end < today) {
        renderModalMessage("create-camp-message-box", "La fecha de finalización no puede ser anterior a la fecha actual.", false);
        return;
      }
      if (end < start) {
        renderModalMessage("create-camp-message-box", "La fecha de finalización no puede ser anterior a la fecha de inicio.", false);
        return;
      }

      const submitBtn = createForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creando...';
      }

      const formData = new FormData(createForm);

      try {
        const response = await fetch(createForm.action, {
          method: 'POST',
          body: formData
        });

        if (!response.ok) throw new Error('Error en el servidor');

        const data = await response.json();

        if (data.success) {
          closeModal("modal-create-campaign");
          createForm.reset();
          if (typeof showToast !== "undefined") {
            showToast("¡Campaña creada!", data.message, true);
          }
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          renderModalMessage("create-camp-message-box", data.message, false);
        }
      } catch (error) {
        renderModalMessage("create-camp-message-box", "No se pudo conectar con el servidor. Intenta de nuevo.", false);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }
    });
  }

  // B. Formulario de Modificación
  const modifyForm = document.getElementById("modify-camp-form");
  if (modifyForm) {
    modifyForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const title = document.getElementById("modify-title").value.trim();
      const desc = document.getElementById("modify-desc").value.trim();
      const location = document.getElementById("modify-location").value.trim();
      const startDateVal = document.getElementById("modify-start-date").value;
      const endDateVal = document.getElementById("modify-end-date").value;
      
      const type = document.getElementById("modify-type-convocatoria").checked ? "convocatoria" : "informativa";
      const additionalInfoInput = document.getElementById("modify-additional");
      const additionalInfo = additionalInfoInput ? additionalInfoInput.value.trim() : "";

      if (!title || !desc || !location || !startDateVal || !endDateVal) {
        renderModalMessage("modify-camp-message-box", "Por favor, completa todos los campos obligatorios.", false);
        return;
      }

      if (type === "convocatoria" && !additionalInfo) {
        renderModalMessage("modify-camp-message-box", "Por favor, ingresa la información adicional requerida para la convocatoria.", false);
        return;
      }

      if (tempModifyCampaignCauses.length === 0) {
        renderModalMessage("modify-camp-message-box", "Debes seleccionar al menos una causa para la campaña.", false);
        return;
      }

      const today = new Date();
      today.setHours(0,0,0,0);
      const start = new Date(startDateVal + "T00:00:00");
      const end = new Date(endDateVal + "T00:00:00");

      if (end < start) {
        renderModalMessage("modify-camp-message-box", "La fecha de finalización no puede ser anterior a la fecha de inicio.", false);
        return;
      }
      if (end < today) {
        renderModalMessage("modify-camp-message-box", "La fecha de finalización no puede ser anterior a la fecha actual.", false);
        return;
      }

      const submitBtn = modifyForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Guardando...';
      }

      const formData = new FormData(modifyForm);

      try {
        const response = await fetch(modifyForm.action, {
          method: 'POST',
          body: formData
        });

        if (!response.ok) throw new Error('Error en el servidor');

        const data = await response.json();

        if (data.success) {
          closeModal("modal-modify-campaign");
          modifyForm.reset();
          if (typeof showToast !== "undefined") {
            showToast("¡Cambios guardados!", data.message, true);
          }
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          renderModalMessage("modify-camp-message-box", data.message, false);
        }
      } catch (error) {
        renderModalMessage("modify-camp-message-box", "No se pudo conectar con el servidor. Intenta de nuevo.", false);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }
    });
  }
}
