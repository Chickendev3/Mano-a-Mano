<?php 
/* Vista de Perfil de Voluntario (Logueado - Dashboard Privado)
  Esta vista incluye los paneles y modales comunes mediante llamados a funciones PHP. */

/** @var array $causas */
/** @var array $campaniasUsuario */
/** @var array $insignias */
/** @var array $usuario */

/* Carga de componentes comunes (Campañas e Invitaciones) */
include_once '../app/views/componentes/perfil_comun_logueado.php';
?>
<!-- =========================================================================
     VARIABLES GLOBALES DE JS PARA LA CARGA DE LOS DATOS DEL PERFIL
     ========================================================================= -->
<script>
  window.initialUserProfile = {
    name: <?= json_encode($usuario['nombre completo'] ?? '') ?>,
    nombre: <?= json_encode($usuario['nombre'] ?? '') ?>,
    apellido: <?= json_encode($usuario['apellido'] ?? '') ?>,
    desc: <?= json_encode($usuario['descripcion'] ?? '') ?>,
    location: <?= json_encode($usuario['ubicacion'] ?? '') ?>,
    availability: <?= json_encode($usuario['disponibilidad_horaria'] ?? '') ?>,
    email: <?= json_encode($usuario['email'] ?? '') ?>,
    phone1: <?= json_encode($usuario['telefono'] ?? '') ?>,
    phone2: <?= json_encode($usuario['telefono_emergencia'] ?? '') ?>,
    avatar: <?= json_encode(!empty($usuario['img_perfil']) ? BASE_URL . $usuario['img_perfil'] : '') ?>,
    skills: <?= json_encode($oficios_voluntario ?? []) ?>,
  };

  window.availableSkills = <?= json_encode($oficios ?? []) ?>
</script>

<main class="profile-view-container vol-profile-page">
  
  <!-- CABECERA DEL PERFIL DE VOLUNTARIO -->
  <section class="profile-header-sec">
    <div class="container profile-header-grid">
      <!-- Izquierda: Foto de Perfil (Editable) -->
      <div class="profile-avatar-wrapper">
        <div class="profile-avatar-circle editable" id="profile-avatar-clickable" onclick="document.getElementById('edit-avatar-input').click()">
          <img id="avatar-img-view" src="<?= !empty($usuario['img_perfil']) ? BASE_URL . $usuario['img_perfil'] : '' ?>" alt="Avatar voluntario" style="<?= !empty($usuario['img_perfil']) ? 'display: block;' : 'display: none;' ?>">
          <i data-lucide="image" class="avatar-placeholder-icon" id="avatar-icon-placeholder" style="<?= !empty($usuario['img_perfil']) ? 'display: none;' : 'display: block;' ?>"></i>
          <div class="avatar-edit-overlay">
            <i data-lucide="camera"></i>
            <span>Cambiar foto</span>
          </div>
        </div>
        <input type="file" id="edit-avatar-input" accept="image/*" style="display: none;">
      </div>
      
      <!-- Derecha: Datos, Descripción y Estadísticas (Editable) -->
      <div class="profile-info-content">
        
        <!-- ESTADO LECTURA (Visible por defecto) -->
        <div id="profile-view-state">
          <h1 class="profile-name" id="view-profile-name"> <?php echo htmlspecialchars($usuario['nombre completo'] ?? ''); ?> </h1>
          
          <p class="profile-desc-text" id="view-profile-desc">
            <?php echo !empty($usuario['descripcion']) ? htmlspecialchars($usuario['descripcion']) : 'Sin biografía cargada...'; ?>
          </p>

          <!-- Información Privada (Solo visible para el propio voluntario) -->
          <div class="private-info-section">
            <h4>
              <i data-lucide="lock" style="width: 14px; height: 14px;"></i> Información Privada (Visible sólo al aceptar postulaciones)
            </h4>
            <div class="profile-meta-row" style="margin-top: 0; gap: 12px 24px;">
              <div class="profile-meta-item">
                <i data-lucide="mail"></i>
                <span id="view-profile-email"> <?php echo htmlspecialchars($usuario['email'] ?? ''); ?> </span>
              </div>
              <div class="profile-meta-item">
                <i data-lucide="phone"></i>
                <span>Tel. Principal: <strong id="view-profile-phone1"> <?php echo htmlspecialchars($usuario['telefono'] ?? ''); ?> </strong></span>
              </div>
              <div class="profile-meta-item">
                <i data-lucide="phone-call"></i>
                <span>Tel. Secundario: 
                  <strong id="view-profile-phone2">
                  <?php if (!empty($usuario['telefono_emergencia'])):
                    echo htmlspecialchars($usuario['telefono_emergencia']);
                  else:
                    echo 'No asignado';
                  endif; ?>
                  </strong>
                </span>
              </div>
            </div>
          </div>

          <!-- Insignias y Estadísticas del Voluntario -->
          <div class="profile-badges-container" style="margin-top: 20px;">
            <?php if (!empty($insignias)): ?>
              <?php foreach ($insignias as $ins): ?>
                <div class="badge-row-item">
                  <i data-lucide="award" class="badge-icon-gold"></i>
                  <span>Voluntario en <?php echo htmlspecialchars($ins); ?></span>
                </div>
              <?php endforeach; ?>
            <?php endif; ?>
            
            <!-- Pendiente de DESARROLLO: Contador de Asistencias -->
          <?php if (!empty($cantVolutariados) && $cantVolutariados > 0): ?>
            <div class="badge-row-item">
              <i data-lucide="check-square" class="badge-icon-blue"></i>
              <span>Voluntariados asistidos: <?php echo $cantVolutariados ?></span>
            </div>
          <?php endif; ?>

            <!-- Oficios -->
            <div class="badge-row-item skills-list-row" id="view-skills-row" style="align-items: flex-start; <?= empty($oficios_voluntario) ? 'display: none;' : '' ?>">
              <i data-lucide="bookmark" class="badge-icon-tag" style="margin-top: 4px;"></i>
              <div class="skills-badges" id="view-skills-badges" style="display: flex; gap: 8px; flex-wrap: wrap;">
                <?php if (!empty($oficios_voluntario)): ?>
                  <?php foreach ($oficios_voluntario as $oficio): ?>
                    <span class="skill-badge-text"><?php echo htmlspecialchars($oficio); ?></span>
                  <?php endforeach; ?>
                <?php endif; ?>
              </div>
            </div>
          </div>

          <!-- Ubicación y Disponibilidad Horaria -->
          <div class="profile-meta-row" style="margin-top: 16px;">
            <div class="profile-meta-item">
              <i data-lucide="map-pin"></i>
              <span id="view-profile-location"><?php echo htmlspecialchars($usuario['ubicacion'] ?? 'No especificada'); ?></span>
            </div>
            <div class="profile-meta-item">
              <i data-lucide="clock"></i>
              <span id="view-profile-availability"><?php echo htmlspecialchars($usuario['disponibilidad_horaria'] ?? 'No especificada'); ?></span>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; width: 100%; flex-wrap: wrap; gap: 12px;">
            <button class="btn btn-ghost" id="edit-profile-btn" style="margin-top: 0;">
              <i data-lucide="edit-3"></i> Editar perfil
            </button>
            <button class="btn btn-danger-outline" id="btn-delete-account">
              <i data-lucide="user-x" style="width: 16px; height: 16px;"></i> Eliminar Cuenta
            </button>
          </div>
        </div>

        <!-- FORMULARIO DE EDICIÓN DEL PERFIL (Oculto por defecto) -->
        <form class="profile-info-edit-form" id="profile-edit-state" style="display: none;" onsubmit="event.preventDefault();">
          <h3 class="edit-section-title"><i data-lucide="globe"></i> Información Pública</h3>
          
          <div class="form-group-row" style="margin-bottom: 12px;">
            <div class="edit-row">
              <label for="edit-name">Nombre</label>
              <input type="text" name="nombre" id="edit-name" class="edit-input">
            </div>
            <div class="edit-row">
              <label for="edit-lastname">Apellido</label>
              <input type="text" name="apellido" id="edit-lastname" class="edit-input">
            </div>
          </div>

          <div class="edit-row" style="margin-bottom: 12px;">
              <label for="edit-location">Ubicación</label>
              <input type="text" name="ubicacion" placeholder="Provincia, Localidad, Ciudad" id="edit-location" class="edit-input">
            </div>
          <div class="edit-row" style="margin-bottom: 12px;">
            <label for="edit-desc">Descripción</label>
            <textarea name="descripcion" placeholder="Escriba lo que quiere que otros sepan de usted." id="edit-desc" class="edit-input" rows="3"></textarea>
          </div>

          <div class="edit-row" style="margin-bottom: 12px;">
            <label for="edit-availability">Horario de Disponibilidad</label>
            <input type="text" name="disponibilidad_horaria" id="edit-availability" class="edit-input" placeholder="Ej: Lunes a Viernes de 9:00 a 13:00 o Sábados todo el día">
          </div>

          <div class="edit-row" style="margin-bottom: 16px;">
            <label>Etiquetas de oficio</label>
            <div class="edit-tags-container" id="edit-tags-list">
              <!-- Se completa dinámicamente con JS -->
            </div>
            <div class="tag-search-wrapper">
              <input type="text" name="oficios[]" id="tag-search-input" class="edit-input" placeholder="Buscar oficios (ej: Cocinero, Profesor, Electricista...)">
              <ul class="tag-suggestions-list" id="tag-suggestions">
                <!-- Se completa dinámicamente con JS -->
              </ul>
            </div>
          </div>

          <h3 class="edit-section-title" style="margin-top: 24px;"><i data-lucide="lock"></i> Información Privada</h3>

          <div class="edit-row" style="margin-bottom: 12px;">
            <label for="edit-email">Email</label>
            <input type="email" name="email" id="edit-email" class="edit-input">
          </div>

          <div class="form-group-row" style="margin-bottom: 16px;">
            <div class="edit-row">
              <label for="edit-phone1">Teléfono Principal</label>
              <input type="text" name="telefono" id="edit-phone1" class="edit-input">
            </div>
            <div class="edit-row">
              <label for="edit-phone2">Teléfono Secundario</label>
              <input type="text" name="telefono_emergencia" id="edit-phone2" class="edit-input">
            </div>
          </div>

          <div class="camp-card-actions" style="margin-top: 16px;">
            <button class="btn btn-primary" id="save-profile-btn">Guardar</button>
            <button class="btn btn-ghost" id="cancel-profile-btn">Cancelar</button>
          </div>
        </form>
        
      </div>
    </div>
  </section>

  <!-- PESTAÑAS DE NAVEGACIÓN INTERNA -->
  <section class="profile-tabs-sec">
    <div class="container">
      <div class="tabs-nav-bar">
        <button class="profile-tab-btn active" id="tab-btn-gestionar" aria-controls="pane-gestionar" aria-selected="true">
          Gestionar campañas
        </button>
        <button class="profile-tab-btn" id="tab-btn-postulaciones" aria-controls="pane-postulaciones" aria-selected="false">
          Postulaciones
        </button>
        <button class="profile-tab-btn" id="tab-btn-invitaciones" aria-controls="pane-invitaciones" aria-selected="false">
          Invitaciones
        </button>
        <button class="profile-tab-btn" id="tab-btn-voluntariado" aria-controls="pane-voluntariado" aria-selected="false">
          Voluntariados
        </button>
      </div>

      <!-- CONTENEDOR DE PANELES DINÁMICOS -->
      <div class="dynamic-panes-wrapper">
        
        <!-- PANE A: GESTIONAR CAMPAÑAS (ABM COMÚN) -->
        <?php renderPanelGestionarCampanias(); ?>

        <!-- PANE B: POSTULACIONES (EXCLUSIVO VOLUNTARIO) -->
        <div class="profile-pane" id="pane-postulaciones" role="tabpanel">
          <div class="pane-header-actions">
            <h2>Postulaciones</h2>
          </div>

          <!-- Filtros de Postulaciones -->
          <div class="tabs-filters-bar">
            <div class="filter-group">
              <select class="filter-select" id="filter-postulations-select" aria-label="Filtrar por">
                <option value="">Filtrar por (Todas)</option>
                <option value="aceptado">Aceptadas</option>
                <option value="pendiente">Pendientes</option>
                <option value="rechazado">Rechazadas</option>
              </select>
              <select class="filter-select" id="sort-postulations-select" aria-label="Ordenar por">
                <option value="">Ordenar por (Defecto)</option>
                <option value="reciente">Más recientes</option>
                <option value="antiguas">Más antiguas</option>
              </select>
            </div>
          </div>

          <div class="alternating-grid" id="my-postulations-grid">
            <!-- Se completa dinámicamente con JS -->
          </div>

          <div class="pagination-container" id="postulations-pagination">
            <!-- Se completa dinámicamente con JS -->
          </div>
        </div>

        <!-- PANE C: INVITACIONES (COMÚN) -->
        <?php renderPanelInvitaciones($causas); ?>

        <!-- PANE D: VOLUNTARIADO (EXCLUSIVO VOLUNTARIO) -->
        <div class="profile-pane" id="pane-voluntariado" role="tabpanel">
          <div class="pane-header-actions">
            <h2>Voluntariados</h2>
          </div>

          <!-- Filtros de Voluntariado -->
          <div class="tabs-filters-bar">
            <div class="filter-group">
              <select class="filter-select" id="filter-volunteering-select" aria-label="Filtrar por">
                <option value="">Filtrar por (Todas)</option>
                <option value="activa">Activas</option>
                <option value="finalizada">Finalizadas</option>
              </select>
              <select class="filter-select" id="sort-volunteering-select" aria-label="Ordenar por">
                <option value="">Ordenar por (Defecto)</option>
                <option value="reciente">Más recientes</option>
                <option value="antiguas">Más antiguas</option>
              </select>
            </div>
          </div>

          <div class="invites-list-container alternating-grid" id="my-volunteering-grid">
            <!-- Se completa dinámicamente con JS -->
          </div>

          <div class="pagination-container" id="volunteering-pagination">
            <!-- Se completa dinámicamente con JS -->
          </div>
        </div>

      </div>

    </div>
  </section>

</main>

<!-- =========================================================================
     INYECCIÓN DE VISTAS DE MODALES
     ========================================================================= -->

<!-- 1. DETALLE DE CAMPAÑA GENERAL (SHARED) -->
<?php renderModalDetalleCampania(); ?>

<!-- 2. INYECCIÓN DE MODALES COMUNES (CREACIÓN, MODIFICACIÓN, ELIMINACIÓN Y CANCELAR INVITACIÓN) -->
<?php renderModalesComunesPerfil($causas, $campaniasUsuario); ?>

<!-- 3. CONFIRMACIÓN CANCELACIÓN DE POSTULACIÓN (EXCLUSIVO VOLUNTARIO) -->
<div class="modal-overlay" id="modal-cancel-postulation-confirm" role="dialog" aria-modal="true" aria-labelledby="cancel-postulation-title">
  <div class="modal-box modal-box-small" style="max-width: 400px; padding: 24px; text-align: center;">
    <h3 class="modal-title" id="cancel-postulation-title" style="color: #EF4444; font-size: 18px; margin-bottom: 12px;">¿Cancelar postulación?</h3>
    <p style="font-size: 14px; color: var(--color-text-secondary); margin-bottom: 24px; line-height: 1.5;">Esta acción retirará tu postulación de la campaña y ya no aparecerá en tu lista.</p>
    <div style="display: flex; gap: 12px; justify-content: center;">
      <button class="btn btn-ghost" onclick="closeModal('modal-cancel-postulation-confirm')">Volver</button>
      <button class="btn btn-primary" id="confirm-cancel-postulation-btn" style="background-color: #EF4444; border-color: #EF4444; color: #ffffff;">Cancelar postulación</button>
    </div>
  </div>
</div>
