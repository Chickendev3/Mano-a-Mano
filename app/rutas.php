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

    /* Contacto */
    'contacto' => ['controlador' => 'contactoCtrl', 'metodo' => 'index'],
    /* 'enviar-correo' => ['controlador' => 'contactoCtrl', 'metodo' => 'enviarCorreo'] */

    /* Organizaciones */

    /* Perfiles */
    'perfil' => ['controlador' => 'inicioCtrl', 'metodo' => 'perfilDesarrollo']
];
?>