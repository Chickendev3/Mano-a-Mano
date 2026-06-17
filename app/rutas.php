<?php 
/* Se define un array de rutas para todo el Sitio */
$rutas = [
    '' => ['controlador' => 'inicioCtrl', 'metodo' => 'index'],

    /* Sesión */
    'sesion' => ['controlador' => 'sesionCtrl', 'metodo' => 'index'],
    'cerrar-sesion' => ['controlador' => 'sesionCtrl', 'metodo' => 'cerrarSesion'],

    /* Registro */
    'registro' => ['controlador' => 'registroCtrl', 'metodo' => 'index'],
    /* 'registro/voluntario' => ['controlador' => 'registroCtrl', 'metodo' => 'voluntario'],
    'registro/organizacion' => ['controlador' => 'registroCtrl', 'metodo' => 'organizacion'], */

    /* Contacto */
    'contacto' => ['controlador' => 'contactoCtrl', 'metodo' => 'index'],

    /* Conectar */
    'conectar' => ['controlador' => 'conectarCtrl', 'metodo' => 'index'],

    /* Perfiles */
    'perfil' => ['controlador' => 'inicioCtrl', 'metodo' => 'perfilDesarrollo']
];
?>