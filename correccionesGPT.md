# Correcciones Realizadas - Mano a Mano

Este archivo detalla todas las modificaciones realizadas en el sistema para corregir los problemas de visualización del botón "Postularme", la visualización de la "Información adicional", y la separación de lógicas entre postulaciones e invitaciones.

---

## 1. Cambios en Modelos (`app/models/`)

### [Invitacion.php](file:///c:/xampp/htdocs/Mano-a-Mano/app/models/Invitacion.php)
- **Función:** `cambiarEstadoInvitacion(int $idInvitacion, string $estado)`
  - **Modificación:** Se eliminó por completo la lógica que insertaba automáticamente un registro en la tabla `postulaciones` cuando una invitación era aceptada por un voluntario.
  - **Motivo:** Evitar que los voluntarios invitados figuren en el listado y la sección de "Postulaciones", manteniendo separados ambos flujos.
- **Función:** `cancelarInvitacion(int $idInvitacion)`
  - **Modificación:** Se eliminó la lógica que borraba de la tabla `postulaciones` al cancelar/eliminar la invitación.
  - **Motivo:** Alineación con la eliminación del alta automática en postulaciones.

### [Campania.php](file:///c:/xampp/htdocs/Mano-a-Mano/app/models/Campania.php)
- **Función:** `obtenerParticipantesAceptados(int $campaniaId)`
  - **Modificación:** Se agregaron las columnas `u.img_perfil`, `p.id/i.id` (como `asociacion_id`) y `'postulacion'/'invitacion'` (como `tipo_asociacion`) al query de UNION de postulaciones e invitaciones aceptadas.
  - **Motivo:** Obtener la información completa para poder renderizar las fotos de perfil en el acordeón de gestión de voluntarios del creador, y disponer de los identificadores necesarios para poder eliminar a un participante aceptado según su procedencia.

---

## 2. Cambios en Controladores (`app/controllers/`)

### [perfilCtrl.php](file:///c:/xampp/htdocs/Mano-a-Mano/app/controllers/perfilCtrl.php)
- **Función:** `obtenerParticipantesAceptados()` (Nueva función/endpoint)
  - **Detalle:** Llama al método `obtenerParticipantesAceptados` del modelo `Campania` y devuelve la lista consolidada en formato JSON para el creador de la campaña.
- **Función:** `obtenerCampaniaPorIdPublico()`
  - **Modificación:** Se actualizaron las claves devueltas en la respuesta de campaña mapeada para incluir tanto las claves mapeadas en inglés (`title`, `desc`, `location`, `startDate`, `endDate`, `type`) como las originales en español de la base de datos (`titulo`, `descripcion`, `ubicacion`, `fecha_inicio`, `fecha_finalizacion`, `tipo`).
  - **Motivo:** Evitar problemas de compatibilidad y desajustes de propiedades entre las llamadas JavaScript de los distintos perfiles y vistas públicas.

---

## 3. Cambios en Configuración de Rutas (`app/`)

### [rutas.php](file:///c:/xampp/htdocs/Mano-a-Mano/app/rutas.php)
- **Modificación:** Se registró la ruta `'obtener-participantes-aceptados' => ['controlador' => 'perfilCtrl', 'metodo' => 'obtenerParticipantesAceptados']`.
- **Motivo:** Permitir el consumo AJAX desde el panel de gestión del creador.

---

## 4. Cambios en Vistas (`app/views/`)

### [perfil_comun_logueado.php](file:///c:/xampp/htdocs/Mano-a-Mano/app/views/componentes/perfil_comun_logueado.php)
- **Modificación:**
  - Se modificaron los textos explicativos de la creación y edición de campañas de "postulantes aceptados" a "participantes aceptados".
  - Se renombró el encabezado del segundo acordeón de gestión de voluntarios de `<span>Postulantes Aceptados</span>` a `<span>Participantes Aceptados</span>`.
- **Motivo:** Mantener coherencia en el cambio de terminología e interfaz de usuario.

---

## 5. Cambios en Javascripts (`public/js/`)

### [conectar.js](file:///c:/xampp/htdocs/Mano-a-Mano/public/js/conectar.js)
- **Función:** `window.openCampaignDetails(campaignId)`
  - **Modificación:** Se refactorizó la función para que siempre consulte al servidor por medio de `obtener-campania-por-id` en lugar de leer del array local estático.
  - **Modificación (Botón y Modal):** Al abrir el detalle, si el voluntario tiene `camp.es_voluntario_aceptado === true`, el botón de postulación se deshabilita (`disabled = true`), cambia su texto a `"Postulado"` y se le asigna el color gris `#c0c0c0` con cursor por defecto.
  - **Modificación (Información Adicional):** Se valida si el usuario es creador o voluntario/organización aceptado, y si la campaña contiene `info_adicional`. De ser así, se renderiza la caja de información. Si no posee contenido, la caja se oculta por completo (`display = 'none'`).

### [perfil_comun_logueado.js](file:///c:/xampp/htdocs/Mano-a-Mano/public/js/perfil_comun_logueado.js)
- **Función:** `loadCampaignPostulations(campaignId)`
  - **Modificación:** Se modificó para realizar dos consultas concurrentes mediante `Promise.all` (`obtener-postulantes` y `obtener-participantes-aceptados`).
- **Función:** `renderPostulationsList(campaignId, postulantesList, participantesList)`
  - **Modificación:** El listado de la pestaña "Aceptados" se alimenta ahora de `participantesList` (UNION de postulaciones e invitaciones de la campaña) y las acciones de eliminación llaman a la nueva función global `deleteParticipant`.
- **Función:** `window.deleteParticipant(campaignId, asociacionId, tipoAsociacion)` (Nueva función global)
  - **Detalle:** Discrimina si el participante proviene de una postulación o de una invitación. Llama al endpoint de eliminación/cancelación correspondiente (`eliminar-postulacion` o `cancelar-invitacion`) y refresca la lista.
- **Función:** `showAdditionalInfo` logic:
  - **Modificación:** Se adaptó para verificar `camp.es_voluntario_aceptado` y ocultar la caja si `camp.info_adicional` está vacío o en blanco.

### [perfil_voluntario_vista.js](file:///c:/xampp/htdocs/Mano-a-Mano/public/js/perfil_voluntario_vista.js) & [perfil_organizacion_vista.js](file:///c:/xampp/htdocs/Mano-a-Mano/public/js/perfil_organizacion_vista.js)
- **Modificación:** Se actualizó la lógica de pintado del botón "Postularme" y la visualización de la "Información de coordinación". Si el usuario ya fue aceptado (a través de `es_voluntario_aceptado`), el botón se deshabilita, se muestra en gris con el texto `"Postulado"` y se visualiza la información adicional (siempre y cuando contenga texto, ocultándose de lo contrario).

### [perfil_voluntario_logueado.js](file:///c:/xampp/htdocs/Mano-a-Mano/public/js/perfil_voluntario_logueado.js)
- **Función:** `openMyPostulationDetails`
  - **Modificación:** Se ocultó el contenedor de "Información de coordinación" (`mSensitive`) si la propiedad `post.additionalInfo` está vacía o contiene solo espacios en blanco.
