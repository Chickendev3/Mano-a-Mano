// CONECTAR PAGE - Lógica de Búsqueda e Interactividad
let currentViewedCampaignId = null;
let attendanceInterval = null;
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

    const isMobile = window.innerWidth <= 768;

    list.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item;
      
      // Acortar etiquetas en mobile para evitar desbordamiento del desplegable nativo
      let label = item;
      if (isMobile) {
        if (item === 'Asistencia Alimentaria') label = 'Alimentos';
        else if (item === 'Educación y Desarrollo') label = 'Educación';
        else if (item === 'Emergencias y Desastres') label = 'Emergencias';
        else if (item === 'Género y Diversidad') label = 'Género/Div.';
        else if (item === 'Deporte e Inclusión') label = 'Deportes';
        else if (item === 'Salud y Bienestar') label = 'Salud/Bienestar';
        else if (item === 'Bienestar Animal') label = 'Animales';
      }
      opt.textContent = label;
      
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

      // Renderizado de causas directamente como etiquetas
      if (mTags) {
        mTags.innerHTML = "";
        const causesList = camp.causes || [];
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
              a.innerHTML = `<img src="${BASE_URL + org.img_perfil}" alt="${org.nombre}" class="association-logo-img" style="width:55px; height:55px; border-radius:50%; object-fit:cover;">`;
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

      const devStateCard = document.querySelector(".dev-state-selector-card");
      if (devStateCard) devStateCard.style.display = "none";

      if (mPostulateBtn) {
        const isOwner = camp.usuario_id == SESSION_USER_ID;
        const isOrg = SESSION_USER_ROL === "organizacion";
        
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
            const app = appliedCampaignsMap.get(campaignId);
            if (app) {
              mPostulateBtn.disabled = true;
              if (app.status === "aceptado") {
                mPostulateBtn.textContent = "Postulado";
                mPostulateBtn.style.backgroundColor = "#c0c0c0";
                mPostulateBtn.style.color = "#666666";
                mPostulateBtn.style.cursor = "default";
              } else {
                mPostulateBtn.textContent = "Ya postulado";
                mPostulateBtn.style.backgroundColor = "";
                mPostulateBtn.style.color = "";
                mPostulateBtn.style.cursor = "";
              }
              
              if (mBadge) {
                mBadge.textContent = app.status.toUpperCase();
                mBadge.className = `modal-status-badge ${app.status === "aceptado" ? "accepted-pill" : (app.status === "rechazado" ? "rejected-pill" : "pending-pill")}`;
                mBadge.style.display = "inline-block";
              }
            } else {
              mPostulateBtn.disabled = false;
              mPostulateBtn.textContent = "Postularme";
              mPostulateBtn.style.backgroundColor = "";
              mPostulateBtn.style.color = "";
              mPostulateBtn.style.cursor = "";
            }
          }
        } else {
          mPostulateBtn.style.display = "none";
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
                          
                          setTimeout(() => {
                            window.location.reload();
                          }, 1000);
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
    });
};