<?php 
/* Se define un array de rutas para todo el Sitio */
$rutas = [
    '' => ['controlador' => 'inicioCtrl', 'metodo' => 'index'],

    /* Sesión */
    'sesion' => ['controlador' => 'sesionCtrl', 'metodo' => 'index'],
    'cerrar-sesion' => ['controlador' => 'sesionCtrl', 'metodo' => 'cerrarSesion'],

    /* Registro */
    'registro' => ['controlador' => 'registroCtrl', 'metodo' => 'index'],
    'registro/voluntario' => ['controlador' => 'registroCtrl', 'metodo' => 'cargarFormVoluntario'],
    'registro/organizacion' => ['controlador' => 'registroCtrl', 'metodo' => 'cargarFormOrganizacion'],

    /* Conectar */
    'conectar' => ['controlador' => 'conectarCtrl', 'metodo' => 'index'],
    /* 'busqueda' => ['controlador' => 'conectarCtrl', 'metodo' => 'busqueda'], */

    /* Contacto */
    'contacto' => ['controlador' => 'contactoCtrl', 'metodo' => 'index'],
    /* 'enviar-correo' => ['controlador' => 'contactoCtrl', 'metodo' => 'enviarCorreo'] */


    /* Perfiles */
    'perfil' => ['controlador' => 'perfilCtrl', 'metodo' => 'index'],
    'perfil-actualizar-img' => ['controlador' => 'perfilCtrl', 'metodo' => 'actualizarImgPerfil'],
    'editar-perfil-voluntario' => ['controlador' => 'perfilCtrl', 'metodo' => 'editarPerfilVoluntario'],
    'editar-perfil-organizacion' => ['controlador' => 'perfilCtrl', 'metodo' => 'editarPerfilOrganizacion'],
    'crear-campania' => ['controlador' => 'perfilCtrl', 'metodo' => 'crearCampania'],
    'modificar-campania' => ['controlador' => 'perfilCtrl', 'metodo' => 'modificarCampania'],
    'eliminar-campania' => ['controlador' => 'perfilCtrl', 'metodo' => 'eliminarCampania'],
    'postular-campania' => ['controlador' => 'perfilCtrl', 'metodo' => 'postularCampania'],
    'obtener-postulantes' => ['controlador' => 'perfilCtrl', 'metodo' => 'obtenerPostulantes'],
    'obtener-participantes-aceptados' => ['controlador' => 'perfilCtrl', 'metodo' => 'obtenerParticipantesAceptados'],
    'actualizar-estado-postulacion' => ['controlador' => 'perfilCtrl', 'metodo' => 'actualizarEstadoPostulacion'],
    'eliminar-postulacion' => ['controlador' => 'perfilCtrl', 'metodo' => 'eliminarPostulacion'],
    'obtener-mis-postulaciones' => ['controlador' => 'perfilCtrl', 'metodo' => 'obtenerMisPostulaciones'],

    /* Gestión de Voluntarios Fijos - Organización */
    'obtener-mis-voluntarios-fijos' => ['controlador' => 'perfilCtrl', 'metodo' => 'obtenerMisVoluntariosFijos'],
    'buscar-voluntarios-email' => ['controlador' => 'perfilCtrl', 'metodo' => 'buscarVoluntariosEmail'],
    'alta-voluntario-fijo' => ['controlador' => 'perfilCtrl', 'metodo' => 'altaVoluntarioFijo'],
    'baja-voluntario-fijo' => ['controlador' => 'perfilCtrl', 'metodo' => 'bajaVoluntarioFijo'],

    /* Invitaciones y Asociaciones */
    'obtener-mis-invitaciones-recibidas' => ['controlador' => 'perfilCtrl', 'metodo' => 'obtenerMisInvitacionesRecibidas'],
    'obtener-mis-invitaciones-enviadas' => ['controlador' => 'perfilCtrl', 'metodo' => 'obtenerMisInvitacionesEnviadas'],
    'obtener-mis-convocatorias-activas' => ['controlador' => 'perfilCtrl', 'metodo' => 'obtenerMisConvocatoriasActivas'],
    'crear-invitacion' => ['controlador' => 'perfilCtrl', 'metodo' => 'crearInvitacion'],
    'responder-invitacion' => ['controlador' => 'perfilCtrl', 'metodo' => 'responderInvitacion'],
    'cancelar-invitacion' => ['controlador' => 'perfilCtrl', 'metodo' => 'cancelarInvitacion'],
    'obtener-mis-asociaciones' => ['controlador' => 'perfilCtrl', 'metodo' => 'obtenerMisAsociaciones'],
    'obtener-campania-por-id'  => ['controlador' => 'perfilCtrl', 'metodo' => 'obtenerCampaniaPorIdPublico'],
    'generar-codigo-asistencia' => ['controlador' => 'perfilCtrl', 'metodo' => 'generarCodigoAsistencia'],
    'validar-codigo-asistencia' => ['controlador' => 'perfilCtrl', 'metodo' => 'validarCodigoAsistencia'],
    'obtener-mis-voluntariados' => ['controlador' => 'perfilCtrl', 'metodo' => 'obtenerMisVoluntariados'],

    /* Perfiles Públicos */
    'perfil/organizacion' => ['controlador' => 'perfilCtrl', 'metodo' => 'mostrarOrganizacionPublico'],
    'perfil/voluntario' => ['controlador' => 'perfilCtrl', 'metodo' => 'mostrarVoluntarioPublico']

];
?>