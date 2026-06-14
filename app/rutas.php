<?php 
/* Se define un array de rutas para todo el Sitio */
$rutas = [
    '' => ['controlador' => 'inicioCtrl', 'metodo' => 'index'],

    /* Registro y Sesión */
    'registro' => ['controlador' => 'registroCtrl', 'metodo' => 'index'],
    'sesion' => ['controlador' => 'sesionCtrl', 'metodo' => 'index'],
    'cerrar-sesion' => ['controlador' => 'sesionCtrl', 'metodo' => 'cerrarSesion'],


    /* Voluntarios */

    /* Organizaciones */

    /* Contacto */
    'contacto' => ['controlador' => 'contactoCtrl', 'metodo' => 'index'],
    /* 'enviar-correo' => ['controlador' => 'contactoCtrl', 'metodo' => 'enviarCorreo'] */

];

?>