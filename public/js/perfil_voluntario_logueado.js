/**
 * Perfil Voluntario Logueado - Interactive Logic
 * Mano a Mano MVC
 */

// Initial State
let userProfile = {
  name: "Voluntario de Prueba",
  desc: "Apasionado por la educación y el trabajo social. Busco colaborar en proyectos comunitarios que generen un impacto positivo en la niñez y el medio ambiente.",
  location: "Buenos Aires, Argentina",
  availability: "Lunes a Viernes de 14:00 a 18:00",
  email: "voluntario@gmail.com",
  phone1: "+54 11 5555-5678",
  phone2: "+54 11 9999-1234",
  avatar: "", // Base64 data or URL
  skills: ["Cocinero", "Profesor"]
};

const availableSkills = [
  "Cocinero",
  "Profesor",
  "Carpintero",
  "Electricista",
  "Plomero",
  "Pintor",
  "Jardinero",
  "Albañil",
  "Costurero",
  "Peluquero",
  "Conductor",
  "Cuidador",
  "Tallerista",
  "Logística",
  "Apoyo Escolar"
];

// Local state for temporary skill tags being edited
let tempSkills = [];
// Local state for temporary campaign causes tags being selected
let tempCampaignCauses = [];

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

// Postulations Mock Database
let postulations = [
  {
    id: 501,
    campaignId: 1,
    title: "Reforestación Parque Central",
    desc: "Sumate a nuestra jornada de plantación de árboles nativos para recuperar el pulmón verde de la ciudad. Apto para toda la familia.",
    status: "aceptado",
    category: "medio-ambiente",
    startDate: "2026-06-14",
    endDate: "2026-06-21",
    location: "Parque Central, Buenos Aires",
    details: "Actividades de plantación, riego y tutorado de 50 plantines autóctonos. Se proveen herramientas y guantes.",
    additionalInfo: "Dirección: Av. Sarmiento 2300 (junto al lago). Coordinador: Martín Silva (+54 11 9876-5432).",
    images: ["img/campaign_park.png"]
  },
  {
    id: 502,
    campaignId: 2,
    title: "Clases de Apoyo Digital",
    desc: "Buscamos tutores para enseñar el uso de herramientas de oficina básicas y programación web inicial a jóvenes.",
    status: "rechazado",
    category: "educacion",
    startDate: "2026-06-18",
    endDate: "2026-07-18",
    location: "San Martín, Rosario",
    details: "Tutorías presenciales de herramientas de oficina básicas (Word, Excel) y nociones iniciales de HTML/CSS para jóvenes de 12 a 18 años.",
    additionalInfo: "Dirección: Belgrano 1200, Rosario. Coordinadora: Clara Gómez (+54 341 555-4321).",
    images: ["img/campaign_tutoring.png"]
  },
  {
    id: 503,
    campaignId: 3,
    title: "Colecta de Alimentos",
    desc: "Ayudanos a clasificar, empaquetar y distribuir las donaciones del banco de alimentos destinadas a comedores.",
    status: "pendiente",
    category: "accion-social",
    startDate: "2026-06-21",
    endDate: "2026-06-30",
    location: "Centro, Córdoba",
    details: "Recepción, control de vencimiento y clasificación por rubros de alimentos no perecederos. Distribución posterior a comedores infantiles.",
    additionalInfo: "Dirección: Deán Funes 450, Córdoba. Coordinador: Juan Pérez (+54 351 444-1234).",
    images: ["img/campaign_food.png"]
  }
];

let currentCancelPostulationId = null;
let currentPostulationsPage = 1;

// Received Invitations Mock Database (Campaña | Invitador | etc.)
let receivedInvitations = [
  {
    id: 701,
    campaignId: 401,
    title: "Clases de Pintura Infantil",
    desc: "Buscamos voluntarios para dictar talleres recreativos de dibujo y pintura a niños del barrio.",
    category: "cultura",
    startDate: "2026-07-05",
    endDate: "2026-07-26",
    location: "Rosario, Santa Fe",
    details: "Talleres grupales los domingos para fomentar la expresión artística e integración de los niños de la zona.",
    images: ["img/camp_placeholder.png"]
  },
  {
    id: 702,
    campaignId: 402,
    title: "Limpieza de Río Luján",
    desc: "Jornada ecológica para recolectar plásticos, vidrios y residuos en las costas del río.",
    category: "medio-ambiente",
    startDate: "2026-07-12",
    endDate: "2026-07-12",
    location: "Tigre, Buenos Aires",
    details: "Limpieza participativa en la costa del río con provisión de bolsas de residuos, pinzas de agarre y chalecos.",
    images: ["img/campaign_park.png"]
  }
];

// Sent Invitations Mock Database (Destinatario | Estado | Campaña)
let sentInvitations = [
  {
    id: 801,
    name: "Brian Clark",
    type: "voluntario",
    status: "pendiente",
    campaignId: 301,
    campaignTitle: "Apoyo Escolar Primario",
    campaignDesc: "Clases de apoyo escolar para niños en situación de vulnerabilidad en la biblioteca popular.",
    campaignCategory: "educacion",
    campaignStartDate: "2026-06-20",
    campaignEndDate: "2026-12-20",
    campaignLocation: "San Martín, Buenos Aires",
    campaignDetails: "Buscamos voluntarios con disposición pedagógica para guiar y motivar a niños de escuela primaria en sus tareas de matemáticas y lengua.",
    avatar: "img/org_placeholder.png"
  },
  {
    id: 802,
    name: "Techo Verde",
    type: "organizacion",
    status: "aceptado",
    campaignId: 302,
    campaignTitle: "Taller de Huertas Comunitarias",
    campaignDesc: "Aprende sobre agricultura urbana, compostaje y cuidado del medio ambiente en nuestro taller semanal.",
    campaignCategory: "medio-ambiente",
    campaignStartDate: "2026-06-25",
    campaignEndDate: "2026-08-25",
    campaignLocation: "Villa Crespo, CABA",
    campaignDetails: "Un espacio interactivo y gratuito para todos los vecinos donde se aprende a crear huertas orgánicas.",
    avatar: "img/org_placeholder.png"
  },
  {
    id: 803,
    name: "María Inés",
    type: "voluntario",
    status: "rechazado",
    campaignId: 301,
    campaignTitle: "Apoyo Escolar Primario",
    campaignDesc: "Clases de apoyo escolar para niños en situación de vulnerabilidad en la biblioteca popular.",
    campaignCategory: "educacion",
    campaignStartDate: "2026-06-20",
    campaignEndDate: "2026-12-20",
    campaignLocation: "San Martín, Buenos Aires",
    campaignDetails: "Buscamos voluntarios con disposición pedagógica para guiar y motivar a niños de escuela primaria en sus tareas de matemáticas y lengua.",
    avatar: "img/org_placeholder.png"
  },
  {
    id: 804,
    name: "Mentes Brillantes",
    type: "organizacion",
    status: "pendiente",
    campaignId: 303,
    campaignTitle: "Colecta y Clasificación de Ropa",
    campaignDesc: "Ayudanos a recibir y clasificar donaciones de ropa y abrigo que serán enviadas a comedores.",
    campaignCategory: "accion-social",
    campaignStartDate: "2026-07-01",
    campaignEndDate: "2026-07-15",
    campaignLocation: "Palermo, CABA",
    campaignDetails: "Campaña de invierno para clasificar abrigos, calzado y frazadas recibidas.",
    avatar: "img/org_placeholder.png"
  }
];

let currentCancelInvitationId = null;
let currentReceivedPage = 1;
let currentSentPage = 1;

// Volunteering Mock Database
let volunteering = [
  {
    id: 901,
    title: "Reforestación Parque Central",
    desc: "Sumate a nuestra jornada de plantación de árboles nativos para recuperar el pulmón verde de la ciudad.",
    category: "medio-ambiente",
    startDate: "2026-06-14",
    endDate: "2026-06-21",
    location: "Parque Central, Buenos Aires",
    status: "activa",
    ownerName: "Techo Verde",
    ownerType: "organizacion",
    images: ["img/campaign_park.png"],
    details: "Actividades de plantación, riego y tutorado de 50 plantines autóctonos. Se proveen herramientas y guantes.",
    additionalInfo: "Dirección: Av. Sarmiento 2300 (junto al lago). Coordinador: Martín Silva (+54 11 9876-5432)."
  },
  {
    id: 902,
    title: "Apoyo Escolar Primario",
    desc: "Clases de apoyo escolar para niños en situación de vulnerabilidad en la biblioteca popular.",
    category: "educacion",
    startDate: "2026-06-20",
    endDate: "2026-12-20",
    location: "San Martín, Buenos Aires",
    status: "activa",
    ownerName: "Mentes Brillantes",
    ownerType: "organizacion",
    images: ["img/campaign_tutoring.png"],
    details: "Buscamos voluntarios con disposición pedagógica para guiar y motivar a niños de escuela primaria en sus tareas de matemáticas y lengua.",
    additionalInfo: "Dirección exacta: Belgrano 456, San Martín. Coordinador: Lucas Gómez (+54 11 5555-1234). Traer cartuchera y cuaderno."
  },
  {
    id: 903,
    title: "Taller de RCP y Primeros Auxilios",
    desc: "Taller teórico-práctico de reanimación cardiopulmonar y primeros auxilios básicos para la comunidad.",
    category: "salud",
    startDate: "2026-03-01",
    endDate: "2026-03-15",
    location: "Salguero 120, CABA",
    status: "finalizada",
    ownerName: "Juan Pérez",
    ownerType: "voluntario",
    images: ["img/camp_placeholder.png"],
    details: "Taller interactivo abierto a la comunidad sobre maniobras básicas de reanimación y primeros auxilios.",
    additionalInfo: "Dirección: Salguero 120, CABA. Coordinador: Juan Pérez (+54 11 3333-7777). Se entrega certificado de asistencia."
  },
  {
    id: 904,
    title: "Colecta Navideña",
    desc: "Recepción y empaquetado de juguetes y alimentos navideños para familias necesitadas.",
    category: "accion-social",
    startDate: "2025-12-01",
    endDate: "2025-12-25",
    location: "Mansilla 2900, CABA",
    status: "finalizada",
    ownerName: "Cáritas",
    ownerType: "organizacion",
    images: ["img/campaign_food.png"],
    details: "Campaña para recolectar y clasificar alimentos no perecederos y juguetes para la mesa navideña.",
    additionalInfo: "Dirección: Mansilla 2900, CABA. Coordinadora: Hermana Teresa (+54 11 2222-1111)."
  }
];

let currentVolunteeringPage = 1;

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
  setupPostulationsGrid();
  setupInvitationsGrid();
  setupVolunteeringGrid();
  setupMockUploads();
  setupCampaignCausesEvents();
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
  const viewAvailability = document.getElementById("view-profile-availability");
  const viewEmail = document.getElementById("view-profile-email");
  const viewPhone1 = document.getElementById("view-profile-phone1");
  const viewPhone2 = document.getElementById("view-profile-phone2");
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
  if (viewAvailability) viewAvailability.textContent = userProfile.availability;
  if (viewEmail) viewEmail.textContent = userProfile.email;
  if (viewPhone1) viewPhone1.textContent = userProfile.phone1;
  if (viewPhone2) viewPhone2.textContent = userProfile.phone2;

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
  const editAvailability = document.getElementById("edit-availability");
  const editEmail = document.getElementById("edit-email");
  const editPhone1 = document.getElementById("edit-phone1");
  const editPhone2 = document.getElementById("edit-phone2");
  const avatarInput = document.getElementById("edit-avatar-input");

  // Click "Editar Perfil"
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      // Prefill fields
      editName.value = userProfile.name;
      editDesc.value = userProfile.desc;
      editLocation.value = userProfile.location;
      editAvailability.value = userProfile.availability;
      editEmail.value = userProfile.email;
      editPhone1.value = userProfile.phone1 || "";
      editPhone2.value = userProfile.phone2 || "";
      
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
      userProfile.availability = editAvailability.value.trim() || "No especificada";
      userProfile.email = editEmail.value.trim() || "voluntario@gmail.com";
      userProfile.phone1 = editPhone1.value.trim() || "";
      userProfile.phone2 = editPhone2.value.trim() || "";
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

// Dibuja las etiquetas de causas seleccionadas en el formulario
function renderCampaignCauses() {
  const container = document.getElementById("create-campaign-causes-list");
  const form = document.getElementById("create-camp-form");
  if (!container || !form) return;

  // Limpia el contenedor de etiquetas visuales
  container.innerHTML = "";
  
  // 2. Elimina cualquier input oculto anterior de causas para no duplicar
  form.querySelectorAll('input[name="causas[]"]').forEach(input => input.remove());

  // 3. Genera las etiquetas visuales y los inputs ocultos para el POST
  tempCampaignCauses.forEach((cause, index) => {
    // Crear etiqueta visual
    const div = document.createElement("div");
    div.className = "edit-tag-item";
    div.innerHTML = `
      <span>${cause}</span>
      <button type="button" class="edit-tag-remove-btn" onclick="removeCampaignCause(${index})">×</button>
    `;
    container.appendChild(div);

    // Crea el input oculto que viajará en el POST a PHP
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "causas[]"; // PHP lo lee como array
    hiddenInput.value = cause;
    form.appendChild(hiddenInput);
  });
}

// Elimina una causa seleccionada
window.removeCampaignCause = function(index) {
  tempCampaignCauses.splice(index, 1);
  renderCampaignCauses();
  const causeInput = document.getElementById("campaign-cause-search-input");
  if (causeInput) showCampaignCauseSuggestions(causeInput.value);
};

// Filtra y muestra las sugerencias basadas en lo que escribe el usuario
function showCampaignCauseSuggestions(filterText) {
  const listElement = document.getElementById("campaign-cause-suggestions");
  if (!listElement) return;

  const searchVal = filterText.toLowerCase().trim();
  
  // Leemos del objeto global window, si no existe usamos un array vacío
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
      if (targetId === "pane-postulaciones") {
        currentPostulationsPage = 1;
        renderPostulations();
      }
      if (targetId === "pane-invitaciones") {
        currentReceivedPage = 1;
        currentSentPage = 1;
        renderReceivedInvitations();
        renderSentInvitations();
      }
      if (targetId === "pane-voluntariado") {
        currentVolunteeringPage = 1;
        renderVolunteering();
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
/* Ésta funcion se queda */
function openCreateCampaignModal() {
  const form = document.getElementById("create-camp-form");
  if (form) form.reset();

  // Resetear archivos e imágenes seleccionadas
  selectedCampaignFiles = [];
  renderSelectedFilesPreview();

  tempCampaignCauses = [];
  renderCampaignCauses();
  
  openModal("modal-create-campaign");
}

/* Ésta funcion se queda */
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

/* Ésta funcion se queda */
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

/* Ésta funcion se queda */
window.removeUploadedImage = function(index, gridId) {
  uploadedImagesForForm.splice(index, 1);
  renderFormImagesPreview(gridId);
};

/* 
  Nota: La función window.handleCreateCampaignSubmit fue removida 
  ya que el formulario se envía directamente por POST a PHP.
*/

/* Maneja el comportamiento del buscador de causas */
function setupCampaignCausesEvents() {
  const causeInput = document.getElementById("campaign-cause-search-input");
  const causeSuggestions = document.getElementById("campaign-cause-suggestions");

  if (causeInput) {
    causeInput.addEventListener("focus", () => showCampaignCauseSuggestions(causeInput.value));
    causeInput.addEventListener("input", () => showCampaignCauseSuggestions(causeInput.value));
    
    // Cierra la lista de sugerencias al hacer clic afuera
    document.addEventListener("click", (e) => {
      if (!causeInput.contains(e.target) && !causeSuggestions.contains(e.target)) {
        causeSuggestions.classList.remove("active");
      }
    });
  }
}

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
  
  // Initialize radio selection listeners in details modal
  const radios = document.querySelectorAll('input[name="dev-state-choice"]');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      updateModalStateBasedOnRadio();
    });
  });
}

// ==========================================
// 4b. POSTULATIONS LISTS & FILTERS
// ==========================================
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

  // Confirm cancel postulation button
  const confirmCancelBtn = document.getElementById("confirm-cancel-postulation-btn");
  if (confirmCancelBtn) {
    confirmCancelBtn.addEventListener("click", () => {
      if (currentCancelPostulationId) {
        postulations = postulations.filter(p => p.id !== currentCancelPostulationId);
        closeModal("modal-cancel-postulation-confirm");
        currentCancelPostulationId = null;
        
        currentPostulationsPage = 1; // reset page
        renderPostulations();

        if (typeof showToast !== "undefined") {
          showToast("Postulación cancelada", "Tu postulación ha sido cancelada y retirada de la lista.", true);
        }
      }
    });
  }
}

function renderPostulations() {
  const grid = document.getElementById("my-postulations-grid");
  if (!grid) return;

  const filterVal = document.getElementById("filter-postulations-select")?.value || "";
  const sortVal = document.getElementById("sort-postulations-select")?.value || "";

  // 1. Filter
  let filtered = [...postulations];
  if (filterVal) {
    filtered = filtered.filter(p => p.status === filterVal);
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
  
  if (currentPostulationsPage > totalPages && totalPages > 0) {
    currentPostulationsPage = totalPages;
  }

  const startIndex = (currentPostulationsPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = filtered.slice(startIndex, endIndex);

  // 4. Render Grid HTML
  grid.innerHTML = "";
  if (paginated.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-secondary);">
        No se encontraron postulaciones registradas.
      </div>
    `;
    renderPostulationsPagination(0);
    return;
  }

  paginated.forEach((post, index) => {
    const isReverse = index % 2 !== 0;
    const cardClass = isReverse ? "alt-card alt-card-reverse" : "alt-card";
    
    // Choose image
    const imgUrl = post.images && post.images.length > 0 ? post.images[0] : "";
    const imgHTML = imgUrl 
      ? `<img src="${BASE_URL + imgUrl}" alt="${post.title}" style="width:100%; height:100%; object-fit:cover;">` 
      : `<i data-lucide="image"></i>`;

    // Map status text and class
    let statusLabel = "";
    let statusClass = "";
    if (post.status === "aceptado") {
      statusLabel = "Aceptado";
      statusClass = "aceptado";
    } else if (post.status === "pendiente") {
      statusLabel = "Pendiente";
      statusClass = "pendiente";
    } else if (post.status === "rechazado") {
      statusLabel = "Rechazado";
      statusClass = "rechazado";
    }

    const article = document.createElement("article");
    article.className = cardClass;
    article.style.cursor = "pointer";
    article.addEventListener("click", () => {
      openPostulationDetailsView(post.id);
    });

    article.innerHTML = `
      <div class="alt-card-img-col">
        <div class="alt-card-img-placeholder">
          ${imgHTML}
        </div>
      </div>
      <div class="alt-card-content-col" style="position: relative; display: flex; flex-direction: row; align-items: center; width: 100%; gap: 24px; box-sizing: border-box;">
        <div style="flex: 1; display: flex; flex-direction: column; height: 100%;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 8px;">
            <h3 class="alt-card-title">${post.title}</h3>
            <span class="tag-badge" style="background-color: var(--color-surface); font-size:11px;">
              ${getCategoryLabel(post.category)}
            </span>
          </div>
          <p class="alt-card-desc" style="margin-bottom: auto;">${post.desc}</p>
        </div>
        
        <div class="postulation-actions-col">
          <button class="postulation-status-btn ${statusClass}" type="button" style="pointer-events: none;">
            ${statusLabel}
          </button>
          
          <button class="post-cancel-btn" type="button" onclick="event.stopPropagation(); openCancelPostulationConfirmModal(${post.id});">
            Cancelar postulación
          </button>
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

  // Previous button
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

  // Page numbers
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

  // Next button
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

  // Prefill shared modal labels
  const mTitle = document.getElementById("m-camp-title");
  const mDesc = document.getElementById("m-camp-desc");
  const mTags = document.getElementById("m-camp-tags");
  const mBadge = document.getElementById("m-camp-accepted-badge");
  const mPostulateBtn = document.getElementById("m-camp-postulate-btn");
  const mSensitive = document.getElementById("m-camp-sensitive-info");

  if (mTitle) mTitle.textContent = post.title;
  
  if (mDesc) {
    mDesc.innerHTML = `
      <p style="margin-bottom:12px;"><strong>Resumen:</strong> ${post.desc}</p>
      <p style="margin-bottom:12px;"><strong>Detalle:</strong> ${post.details}</p>
      <p style="margin-bottom:12px;"><strong>Ubicación:</strong> ${post.location}</p>
      <p><strong>Período:</strong> ${post.startDate} al ${post.endDate}</p>
    `;
  }

  // Tags
  if (mTags) {
    mTags.innerHTML = "";
    const tags = [getCategoryLabel(post.category), "Convocatoria"];
    tags.forEach(tag => {
      const span = document.createElement("span");
      span.className = "tag-badge";
      span.innerHTML = `<i data-lucide="tag" style="width:12px; height:12px;"></i> ${tag}`;
      mTags.appendChild(span);
    });
  }

  // Reset simulated states and badges based on the real postulation status
  if (mBadge) {
    mBadge.style.display = "none";
  }
  if (mSensitive) {
    mSensitive.style.display = "none";
  }

  // Make the simulated dev choices card visible inside the modal for review
  const devStateCard = document.querySelector(".dev-state-selector-card");
  if (devStateCard) {
    devStateCard.style.display = "block";
    
    // Select the correct radio option based on status
    let radioVal = "no-login";
    if (post.status === "aceptado") {
      radioVal = "registrado-aceptado";
    } else if (post.status === "pendiente") {
      radioVal = "registrado-pendiente";
    } else if (post.status === "rechazado") {
      radioVal = "registrado-rechazado";
    }
    
    const radio = document.querySelector(`input[name="dev-state-choice"][value="${radioVal}"]`);
    if (radio) {
      radio.checked = true;
    }
  }

  // Configure postulation button
  if (mPostulateBtn) {
    mPostulateBtn.style.display = "block";
  }

  // Trigger simulated choice display updates
  updateModalStateBasedOnRadio();

  openModal("modal-profile-camp-detail");
  
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
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

// ==========================================
// 4c. INVITATIONS LISTS & FILTERS (RECEIVED & SENT)
// ==========================================
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

  // Confirm cancel sent invitation button
  const confirmCancelBtn = document.getElementById("confirm-cancel-invitation-btn");
  if (confirmCancelBtn) {
    confirmCancelBtn.addEventListener("click", () => {
      if (currentCancelInvitationId) {
        sentInvitations = sentInvitations.filter(inv => inv.id !== currentCancelInvitationId);
        closeModal("modal-cancel-invitation-confirm");
        currentCancelInvitationId = null;
        
        currentSentPage = 1; // reset page
        renderSentInvitations();

        if (typeof showToast !== "undefined") {
          showToast("Invitación cancelada", "La invitación enviada ha sido retirada.", true);
        }
      }
    });
  }
}

function renderReceivedInvitations() {
  const grid = document.getElementById("received-invitations-list");
  if (!grid) return;

  const filterVal = document.getElementById("filter-received-select")?.value || "";
  const sortVal = document.getElementById("sort-received-select")?.value || "";

  // 1. Filter
  let filtered = [...receivedInvitations];
  if (filterVal) {
    filtered = filtered.filter(inv => inv.category === filterVal);
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
  
  if (currentReceivedPage > totalPages && totalPages > 0) {
    currentReceivedPage = totalPages;
  }

  const startIndex = (currentReceivedPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = filtered.slice(startIndex, endIndex);

  // 4. Render Grid HTML
  grid.innerHTML = "";
  if (paginated.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-secondary);">
        No tienes invitaciones recibidas pendientes.
      </div>
    `;
    renderReceivedPagination(0);
    return;
  }

  paginated.forEach(inv => {
    // Square/rounded campaigns details, strictly on the left
    const imgUrl = inv.images && inv.images.length > 0 ? inv.images[0] : "";
    const imgHTML = imgUrl 
      ? `<img src="${BASE_URL + imgUrl}" alt="${inv.title}">` 
      : `<i data-lucide="image"></i>`;

    const article = document.createElement("article");
    article.className = "invite-card";
    article.addEventListener("click", () => {
      openReceivedCampaignDetailsView(inv.id);
    });

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
          <i data-lucide="map-pin" style="width: 12px; height: 12px; display: inline; vertical-align: middle; margin-right: 2px;"></i> ${inv.location}
        </span>
      </div>
      
      <div class="invite-card-actions-col">
        <button class="btn btn-primary aceptar-invite-btn" type="button" onclick="event.stopPropagation(); acceptReceivedInvitation(${inv.id});">
          Aceptar
        </button>
        <button class="btn btn-ghost rechazar-invite-btn" type="button" onclick="event.stopPropagation(); rejectReceivedInvitation(${inv.id});">
          Rechazar
        </button>
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
  receivedInvitations = receivedInvitations.filter(inv => inv.id !== id);
  renderReceivedInvitations();

  if (typeof showToast !== "undefined") {
    showToast("Invitación aceptada", "Te has unido a la campaña. Ya está programada en tu voluntariado.", true);
  }
};

window.rejectReceivedInvitation = function(id) {
  receivedInvitations = receivedInvitations.filter(inv => inv.id !== id);
  renderReceivedInvitations();

  if (typeof showToast !== "undefined") {
    showToast("Invitación rechazada", "Has rechazado la invitación.", true);
  }
};

function renderSentInvitations() {
  const grid = document.getElementById("sent-invitations-list");
  if (!grid) return;

  const filterVal = document.getElementById("filter-sent-select")?.value || "";
  const sortVal = document.getElementById("sort-sent-select")?.value || "";

  // 1. Filter
  let filtered = [...sentInvitations];
  if (filterVal) {
    filtered = filtered.filter(inv => inv.status === filterVal);
  }

  // 2. Sort
  if (sortVal === "antiguas") {
    filtered.reverse();
  }

  // 3. Paginate
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (currentSentPage > totalPages && totalPages > 0) {
    currentSentPage = totalPages;
  }

  const startIndex = (currentSentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = filtered.slice(startIndex, endIndex);

  // 4. Render Grid HTML
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
    // Circular user/org avatar strictly on the left
    const avatarHTML = inv.avatar 
      ? `<img src="${BASE_URL + inv.avatar}" alt="${inv.name}">` 
      : `<i data-lucide="user"></i>`;

    const profileUrl = inv.type === "voluntario" ? "perfil_voluntario_vista" : "perfil_organizacion_vista";
    const labelType = inv.type === "voluntario" ? "Voluntario" : "Organización";

    // Status mapping
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
    // Clicking card opens the public profile of the user/organization
    article.addEventListener("click", () => {
      window.location.href = BASE_URL + profileUrl;
    });

    article.innerHTML = `
      <div class="invite-card-img-col user-avatar">
        ${avatarHTML}
      </div>
      <div class="invite-card-content-col">
        <h3 class="alt-card-title" style="margin-bottom: 2px;">${inv.name}</h3>
        <span style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">${labelType}</span>
        
        <div style="display:flex; flex-direction:column; gap:4px; margin-top: 8px;">
          <a href="${BASE_URL + profileUrl}" class="invite-meta-link" onclick="event.stopPropagation();">
            <i data-lucide="user" style="width:12px; height:12px;"></i> Ir al perfil de ${inv.name}
          </a>
          <button type="button" class="invite-meta-link" onclick="event.stopPropagation(); openSentCampaignDetailsView(${inv.id});">
            <i data-lucide="external-link" style="width:12px; height:12px;"></i> Campaña invitada: <strong>${inv.campaignTitle}</strong>
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

window.openCancelInvitationConfirmModal = function(id) {
  currentCancelInvitationId = id;
  openModal("modal-cancel-invitation-confirm");
};

function openReceivedCampaignDetailsView(invitationId) {
  const inv = receivedInvitations.find(i => i.id === invitationId);
  if (!inv) return;

  // Prefill shared modal labels
  const mTitle = document.getElementById("m-camp-title");
  const mDesc = document.getElementById("m-camp-desc");
  const mTags = document.getElementById("m-camp-tags");
  const mBadge = document.getElementById("m-camp-accepted-badge");
  const mPostulateBtn = document.getElementById("m-camp-postulate-btn");
  const mSensitive = document.getElementById("m-camp-sensitive-info");

  if (mTitle) mTitle.textContent = inv.title;
  
  if (mDesc) {
    mDesc.innerHTML = `
      <p style="margin-bottom:12px;"><strong>Resumen:</strong> ${inv.desc}</p>
      <p style="margin-bottom:12px;"><strong>Detalle:</strong> ${inv.details}</p>
      <p style="margin-bottom:12px;"><strong>Ubicación:</strong> ${inv.location}</p>
      <p><strong>Período:</strong> ${inv.startDate} al ${inv.endDate}</p>
    `;
  }

  if (mTags) {
    mTags.innerHTML = "";
    const tags = [getCategoryLabel(inv.category), "Convocatoria"];
    tags.forEach(tag => {
      const span = document.createElement("span");
      span.className = "tag-badge";
      span.innerHTML = `<i data-lucide="tag" style="width:12px; height:12px;"></i> ${tag}`;
      mTags.appendChild(span);
    });
  }

  // Hidden developer state choices card since we're viewing received invitation details
  const devStateCard = document.querySelector(".dev-state-selector-card");
  if (devStateCard) devStateCard.style.display = "none";

  if (mBadge) mBadge.style.display = "none";
  if (mSensitive) mSensitive.style.display = "none";

  // Hide postulation button as they should either Aceptar/Rechazar from the invitations dashboard
  if (mPostulateBtn) {
    mPostulateBtn.style.display = "none";
  }

  openModal("modal-profile-camp-detail");
  
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

function openSentCampaignDetailsView(invitationId) {
  const inv = sentInvitations.find(i => i.id === invitationId);
  if (!inv) return;

  // Prefill shared modal labels
  const mTitle = document.getElementById("m-camp-title");
  const mDesc = document.getElementById("m-camp-desc");
  const mTags = document.getElementById("m-camp-tags");
  const mBadge = document.getElementById("m-camp-accepted-badge");
  const mPostulateBtn = document.getElementById("m-camp-postulate-btn");
  const mSensitive = document.getElementById("m-camp-sensitive-info");

  if (mTitle) mTitle.textContent = inv.campaignTitle;
  
  if (mDesc) {
    mDesc.innerHTML = `
      <p style="margin-bottom:12px;"><strong>Resumen:</strong> ${inv.campaignDesc}</p>
      <p style="margin-bottom:12px;"><strong>Detalle:</strong> ${inv.campaignDetails}</p>
      <p style="margin-bottom:12px;"><strong>Ubicación:</strong> ${inv.campaignLocation}</p>
      <p><strong>Período:</strong> ${inv.campaignStartDate} al ${inv.campaignEndDate}</p>
    `;
  }

  if (mTags) {
    mTags.innerHTML = "";
    const tags = [getCategoryLabel(inv.campaignCategory), "Convocatoria"];
    tags.forEach(tag => {
      const span = document.createElement("span");
      span.className = "tag-badge";
      span.innerHTML = `<i data-lucide="tag" style="width:12px; height:12px;"></i> ${tag}`;
      mTags.appendChild(span);
    });
  }

  // Hidden dev selector
  const devStateCard = document.querySelector(".dev-state-selector-card");
  if (devStateCard) devStateCard.style.display = "none";

  if (mBadge) mBadge.style.display = "none";
  if (mSensitive) mSensitive.style.display = "none";

  // Hide postulation button
  if (mPostulateBtn) {
    mPostulateBtn.style.display = "none";
  }

  openModal("modal-profile-camp-detail");
  
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

// ==========================================
// 4d. VOLUNTEERING LISTS & FILTERS
// ==========================================
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
}

function renderVolunteering() {
  const grid = document.getElementById("my-volunteering-grid");
  if (!grid) return;

  const filterVal = document.getElementById("filter-volunteering-select")?.value || "";
  const sortVal = document.getElementById("sort-volunteering-select")?.value || "";

  // 1. Filter
  let filtered = [...volunteering];
  if (filterVal) {
    filtered = filtered.filter(item => item.status === filterVal);
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
  
  if (currentVolunteeringPage > totalPages && totalPages > 0) {
    currentVolunteeringPage = totalPages;
  }

  const startIndex = (currentVolunteeringPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = filtered.slice(startIndex, endIndex);

  // 4. Render Grid HTML
  grid.innerHTML = "";
  if (paginated.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-secondary);">
        No tienes campañas registradas en esta sección.
      </div>
    `;
    renderVolunteeringPagination(0);
    return;
  }

  paginated.forEach(item => {
    // Reuses the invite-card class layout (strictly image on the left)
    const imgUrl = item.images && item.images.length > 0 ? item.images[0] : "";
    const imgHTML = imgUrl 
      ? `<img src="${BASE_URL + imgUrl}" alt="${item.title}">` 
      : `<i data-lucide="image"></i>`;

    const statusLabel = item.status === "activa" ? "Activa" : "Finalizada";
    const statusClass = item.status === "activa" ? "activa" : "finalizada";
    
    // Choose redirection URL type based on ownerType
    const profileUrl = item.ownerType === "voluntario" ? "perfil_voluntario_vista" : "perfil_organizacion_vista";

    const article = document.createElement("article");
    article.className = "invite-card";
    article.addEventListener("click", () => {
      openVolunteeringDetailsView(item.id);
    });

    article.innerHTML = `
      <div class="invite-card-img-col campaign-img">
        ${imgHTML}
      </div>
      <div class="invite-card-content-col">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 2px; flex-wrap: wrap; gap: 8px;">
          <h3 class="alt-card-title">${item.title}</h3>
          <span class="tag-badge" style="background-color: var(--color-surface); font-size:11px;">
            ${getCategoryLabel(item.category)}
          </span>
        </div>
        <p class="alt-card-desc">${item.desc}</p>
        
        <div style="display:flex; flex-direction:column; gap:4px; margin-top: auto;">
          <span style="font-size: 12px; color: var(--color-text-muted);">
            <i data-lucide="calendar" style="width: 12px; height: 12px; display: inline; vertical-align: middle; margin-right: 2px;"></i> Período: ${item.startDate} al ${item.endDate}
          </span>
          <span style="font-size: 12px; color: var(--color-text-muted);">
            <i data-lucide="map-pin" style="width: 12px; height: 12px; display: inline; vertical-align: middle; margin-right: 2px;"></i> ${item.location}
          </span>
          <a href="${BASE_URL + profileUrl}" class="invite-meta-link" onclick="event.stopPropagation();">
            <i data-lucide="user" style="width:12px; height:12px;"></i> Creado por: <strong>${item.ownerName}</strong>
          </a>
        </div>
      </div>
      
      <div class="invite-card-actions-col">
        <span class="vol-status-badge ${statusClass}">
          ${statusLabel}
        </span>
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

function openVolunteeringDetailsView(volunteeringId) {
  const item = volunteering.find(v => v.id === volunteeringId);
  if (!item) return;

  // Prefill shared modal labels
  const mTitle = document.getElementById("m-camp-title");
  const mDesc = document.getElementById("m-camp-desc");
  const mTags = document.getElementById("m-camp-tags");
  const mBadge = document.getElementById("m-camp-accepted-badge");
  const mPostulateBtn = document.getElementById("m-camp-postulate-btn");
  const mSensitive = document.getElementById("m-camp-sensitive-info");

  if (mTitle) mTitle.textContent = item.title;
  
  if (mDesc) {
    mDesc.innerHTML = `
      <p style="margin-bottom:12px;"><strong>Resumen:</strong> ${item.desc}</p>
      <p style="margin-bottom:12px;"><strong>Detalle:</strong> ${item.details}</p>
      <p style="margin-bottom:12px;"><strong>Ubicación:</strong> ${item.location}</p>
      <p><strong>Período:</strong> ${item.startDate} al ${item.endDate}</p>
    `;
  }

  if (mTags) {
    mTags.innerHTML = "";
    const tags = [getCategoryLabel(item.category), "Convocatoria"];
    tags.forEach(tag => {
      const span = document.createElement("span");
      span.className = "tag-badge";
      span.innerHTML = `<i data-lucide="tag" style="width:12px; height:12px;"></i> ${tag}`;
      mTags.appendChild(span);
    });
  }

  // Hide or pre-set developer simulation state card inside the details modal
  const devStateCard = document.querySelector(".dev-state-selector-card");
  if (devStateCard) {
    devStateCard.style.display = "block";
    const radio = document.querySelector('input[name="dev-state-choice"][value="registrado-aceptado"]');
    if (radio) {
      radio.checked = true;
    }
  }

  // Pre-fill sensitive coordinator info
  if (mSensitive) {
    mSensitive.innerHTML = `
      <h4>Información de Coordinación (Exclusivo Voluntarios)</h4>
      <div class="info-alert-content">
        <p style="font-size: 13px; line-height: 1.5; margin: 0; color: var(--color-text-secondary);">
          ${item.additionalInfo || "No se ha proporcionado información de contacto adicional."}
        </p>
      </div>
    `;
  }

  if (mPostulateBtn) {
    mPostulateBtn.style.display = "block";
  }

  // Trigger state simulator update logic (shows accepted badge, unlocks/reveals sensitive info block)
  updateModalStateBasedOnRadio();

  openModal("modal-profile-camp-detail");
  
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}


// ==========================================
// MANEJO DE ARCHIVOS REALES PARA CAMPAÑAS Y PERFIL
// ==========================================

// Estado local para los archivos reales seleccionados para subir
let selectedCampaignFiles = [];

// Maneja la selección de archivos desde el input file
window.handleFileSelect = function(event) {
  const files = event.target.files;
  
  // Validación: máximo de 3 imágenes
  if (selectedCampaignFiles.length + files.length > 3) {
    if (typeof showToast !== "undefined") {
      showToast("Límite de imágenes", "Solo puedes subir hasta 3 imágenes por campaña.", false);
    }
    return;
  }

  // Agrega los nuevos archivos seleccionados a nuestra lista local
  for (let i = 0; i < files.length; i++) {
    selectedCampaignFiles.push(files[i]);
  }

  renderSelectedFilesPreview();
};

// Dibuja las previsualizaciones de las imágenes seleccionadas
function renderSelectedFilesPreview() {
  const grid = document.getElementById("create-images-preview-grid");
  if (!grid) return;

  grid.innerHTML = "";
  selectedCampaignFiles.forEach((file, index) => {
    const url = URL.createObjectURL(file); // Genera una URL temporal local
    const div = document.createElement("div");
    div.className = "uploaded-image-preview";
    div.innerHTML = `
      <img src="${url}" alt="Preview image">
      <button type="button" class="remove-preview-img-btn" onclick="removeSelectedFile(${index})">×</button>
    `;
    grid.appendChild(div);
  });

  // Sincroniza la lista de archivos reales en el input file
  syncFileInput();
}

// Remueve una imagen seleccionada
window.removeSelectedFile = function(index) {
  selectedCampaignFiles.splice(index, 1);
  renderSelectedFilesPreview();
};

// Sincroniza el array de JS de vuelta con el elemento input file en el DOM
function syncFileInput() {
  const input = document.getElementById("campaign-images-input");
  if (!input) return;

  const dataTransfer = new DataTransfer();
  selectedCampaignFiles.forEach(file => {
    dataTransfer.items.add(file);
  });
  input.files = dataTransfer.files; // Asigna la nueva lista limpia de archivos
}
