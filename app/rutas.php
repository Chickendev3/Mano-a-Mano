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
    'busqueda' => ['controlador' => 'conectarCtrl', 'metodo' => 'busqueda'],

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
    'actualizar-estado-postulacion' => ['controlador' => 'perfilCtrl', 'metodo' => 'actualizarEstadoPostulacion'],
    'eliminar-postulacion' => ['controlador' => 'perfilCtrl', 'metodo' => 'eliminarPostulacion'],
    'obtener-mis-postulaciones' => ['controlador' => 'perfilCtrl', 'metodo' => 'obtenerMisPostulaciones'],

    /* Perfiles Públicos */
    'perfil/organizacion' => ['controlador' => 'perfilCtrl', 'metodo' => 'mostrarOrganizacionPublico'],
    'perfil/voluntario' => ['controlador' => 'perfilCtrl', 'metodo' => 'mostrarVoluntarioPublico']

];
?>