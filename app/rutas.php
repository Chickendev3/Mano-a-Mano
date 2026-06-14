<?php 
/* Se define un array de rutas para todo el Sitio */
$rutas = [
    '' => ['controlador' => 'inicioCtrl', 'metodo' => 'index'],

    /* Sesión */
    'sesion' => ['controlador' => 'sesionCtrl', 'metodo' => 'index'],
    'sesion/salir' => ['controlador' => 'sesionCtrl', 'metodo' => 'salir'],

    /* Registro */
    'registro' => ['controlador' => 'registroCtrl', 'metodo' => 'index'],
    'registro/voluntario' => ['controlador' => 'registroCtrl', 'metodo' => 'voluntario'],
    'registro/organizacion' => ['controlador' => 'registroCtrl', 'metodo' => 'organizacion'],

    /* Contacto */
    'contacto' => ['controlador' => 'contactoCtrl', 'metodo' => 'index'],

    /* Conectar */
    'conectar' => ['controlador' => 'conectarCtrl', 'metodo' => 'index'],

    'perfil_organizacion_vista' => ['controlador' => 'inicioCtrl', 'metodo' => 'perfilOrganizacion'],
    'perfil_voluntario_vista' => ['controlador' => 'inicioCtrl', 'metodo' => 'perfilVoluntario'],
    'perfil_voluntario_logueado' => ['controlador' => 'inicioCtrl', 'metodo' => 'perfilVoluntarioLogueado']
];
?>