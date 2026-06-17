<?php
class inicioCtrl extends Controlador {

    public function index() : void {
        // CARGAR TODO DINÁMICAMENTEE !!! !!!!!!!!!!!!!!!! !!!!!!!!!!!!  !!!!!!!!!!!!!! !!!!!!!FESMFKLDSNVDSJVB DSUKBCVDSJH FBEJS
        $campanias = [
            [
                'id' => 1,
                'titulo' => 'Reforestación Parque Central',
                'org' => 'Techo Verde',
                'categoria' => 'medio-ambiente',
                'categoria_label' => 'Medio Ambiente',
                'badge_clase' => 'badge-env',
                'descripcion' => 'Sumate a nuestra jornada de plantación de árboles nativos para recuperar el pulmón verde de la ciudad. Apto para toda la familia.',
                'registrados' => 14,
                'requeridos' => 20,
                'progreso' => 70,
                'ubicacion' => 'Buenos Aires',
                'fecha' => '14 Jun, 2026',
                'horario' => '09:00 - 13:00',
                'imagen' => 'img/campaign_park.png'
            ],
            [
                'id' => 2,
                'titulo' => 'Clases de Apoyo Digital',
                'org' => 'Mentes Brillantes',
                'categoria' => 'educacion',
                'categoria_label' => 'Educación',
                'badge_clase' => 'badge-edu',
                'descripcion' => 'Buscamos tutores para enseñar el uso de herramientas de oficina básicas y programación web inicial a jóvenes del barrio de San Martín.',
                'registrados' => 4,
                'requeridos' => 10,
                'progreso' => 40,
                'ubicacion' => 'Rosario',
                'fecha' => '18 Jun, 2026',
                'horario' => '16:00 - 18:00',
                'imagen' => 'img/campaign_tutoring.png'
            ],
            [
                'id' => 3,
                'titulo' => 'Colecta de Alimentos',
                'org' => 'Corazones Abiertos',
                'categoria' => 'accion-social',
                'categoria_label' => 'Acción Social',
                'badge_clase' => 'badge-soc',
                'descripcion' => 'Ayudanos a clasificar, empaquetar y distribuir las donaciones del banco de alimentos destinadas a 5 comedores comunitarios infantiles.',
                'registrados' => 13,
                'requeridos' => 15,
                'progreso' => 86,
                'ubicacion' => 'Córdoba',
                'fecha' => '21 Jun, 2026',
                'horario' => '08:30 - 14:00',
                'imagen' => 'img/campaign_food.png'
            ]
        ];

        // Mock organizations data representing database records
        $organizaciones = [
            [
                'nombre' => 'Techo Verde',
                'categoria' => 'Medio Ambiente',
                'avatar_clase' => 'avatar-1',
                'iniciales' => 'TV',
                'descripcion' => 'Organización dedicada a la reforestación urbana y a dictar talleres sobre cultivo sostenible y huertas comunitarias en vecindarios locales.',
                'campanas_activas' => '4 campañas activas',
                'ubicacion' => 'Buenos Aires',
                'imagen' => '' // Leave empty to test fallback placeholder
            ],
            [
                'nombre' => 'Corazones Abiertos',
                'categoria' => 'Acción Social',
                'avatar_clase' => 'avatar-2',
                'iniciales' => 'CA',
                'descripcion' => 'Red solidaria de asistencia comunitaria que gestiona comedores barriales y realiza colectas nacionales de ropa y abrigo para el invierno.',
                'campanas_activas' => '3 campañas activas',
                'ubicacion' => 'Córdoba',
                'imagen' => ''
            ],
            [
                'nombre' => 'Mentes Brillantes',
                'categoria' => 'Educación',
                'avatar_clase' => 'avatar-3',
                'iniciales' => 'MB',
                'descripcion' => 'Agrupación que promueve la inclusión digital brindando apoyo escolar y alfabetización tecnológica a niños y adolescentes de sectores vulnerables.',
                'campanas_activas' => '2 campañas activas',
                'ubicacion' => 'Rosario',
                'imagen' => ''
            ]
        ];

        $datos = [
            'campanias' => $campanias,
            'organizaciones' => $organizaciones,
            'error' => null
        ];

        $this->cargarVista('inicio', $datos, 'Mano a Mano | Conectando Personas y Causas');
    }

    public function perfilDesarrollo() : void {
        $datos = [];
        $this->cargarVista('perfil_pendiente', $datos, 'Perfil en Desarrollo | Mano a Mano');
    }
}
?>