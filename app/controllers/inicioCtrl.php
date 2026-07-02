<?php
class inicioCtrl extends Controlador {

    public function index() : void {
        // Mock campaigns data representing database records
        $campanas = [
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
            ],
            [
                'id' => 4,
                'titulo' => 'Limpieza de Río Luján',
                'org' => 'EcoRed',
                'categoria' => 'medio-ambiente',
                'categoria_label' => 'Medio Ambiente',
                'badge_clase' => 'badge-env',
                'descripcion' => 'Limpieza colaborativa de las orillas del Río Luján para remover plásticos y concientizar sobre el cuidado de humedales.',
                'registrados' => 8,
                'requeridos' => 15,
                'progreso' => 53,
                'ubicacion' => 'Tigre',
                'fecha' => '25 Jun, 2026',
                'horario' => '09:00 - 12:30',
                'imagen' => 'img/campaign_park.png'
            ],
            [
                'id' => 5,
                'titulo' => 'Apoyo de Matemática',
                'org' => 'Huellas del Mañana',
                'categoria' => 'educacion',
                'categoria_label' => 'Educación',
                'badge_clase' => 'badge-edu',
                'descripcion' => 'Clases grupales de refuerzo de matemáticas y álgebra para estudiantes que están rindiendo sus exámenes de ingreso.',
                'registrados' => 5,
                'requeridos' => 8,
                'progreso' => 62,
                'ubicacion' => 'Tucumán',
                'fecha' => '27 Jun, 2026',
                'horario' => '17:00 - 19:00',
                'imagen' => 'img/campaign_tutoring.png'
            ],
            [
                'id' => 6,
                'titulo' => 'Adopción de Mascotas',
                'org' => 'Patitas Felices',
                'categoria' => 'accion-social',
                'categoria_label' => 'Acción Social',
                'badge_clase' => 'badge-soc',
                'descripcion' => 'Jornada dominical para incentivar la adopción responsable de animales rescatados y recaudar alimento balanceado.',
                'registrados' => 10,
                'requeridos' => 12,
                'progreso' => 83,
                'ubicacion' => 'Mendoza',
                'fecha' => '29 Jun, 2026',
                'horario' => '10:00 - 17:00',
                'imagen' => 'img/campaign_food.png'
            ],
            [
                'id' => 7,
                'titulo' => 'Taller de Compostaje',
                'org' => 'Techo Verde',
                'categoria' => 'medio-ambiente',
                'categoria_label' => 'Medio Ambiente',
                'badge_clase' => 'badge-env',
                'descripcion' => 'Aprendé las técnicas básicas para compostar residuos orgánicos en casa y reducir tu basura diaria a la mitad.',
                'registrados' => 12,
                'requeridos' => 20,
                'progreso' => 60,
                'ubicacion' => 'Rosario',
                'fecha' => '30 Jun, 2026',
                'horario' => '15:00 - 17:00',
                'imagen' => 'img/campaign_park.png'
            ],
            [
                'id' => 8,
                'titulo' => 'Robótica Infantil',
                'org' => 'Mentes Brillantes',
                'categoria' => 'educacion',
                'categoria_label' => 'Educación',
                'badge_clase' => 'badge-edu',
                'descripcion' => 'Introducción a la lógica y la programación utilizando pequeños kits de robótica educativa para niños en edad escolar.',
                'registrados' => 3,
                'requeridos' => 6,
                'progreso' => 50,
                'ubicacion' => 'Córdoba',
                'fecha' => '02 Jul, 2026',
                'horario' => '14:00 - 16:30',
                'imagen' => 'img/campaign_tutoring.png'
            ],
            [
                'id' => 9,
                'titulo' => 'Colecta de Frazadas',
                'org' => 'Corazones Abiertos',
                'categoria' => 'accion-social',
                'categoria_label' => 'Acción Social',
                'badge_clase' => 'badge-soc',
                'descripcion' => 'Recepción, clasificación y armado de kits de abrigo invernal para personas que asisten a refugios temporales en épocas frías.',
                'registrados' => 18,
                'requeridos' => 20,
                'progreso' => 90,
                'ubicacion' => 'Buenos Aires',
                'fecha' => '04 Jul, 2026',
                'horario' => '09:00 - 18:00',
                'imagen' => 'img/campaign_food.png'
            ],
            [
                'id' => 10,
                'titulo' => 'Huertas Comunitarias',
                'org' => 'Techo Verde',
                'categoria' => 'medio-ambiente',
                'categoria_label' => 'Medio Ambiente',
                'badge_clase' => 'badge-env',
                'descripcion' => 'Colaborá con el mantenimiento y la cosecha de verduras frescas cultivadas en la huerta del centro integrador vecinal.',
                'registrados' => 5,
                'requeridos' => 10,
                'progreso' => 50,
                'ubicacion' => 'Buenos Aires',
                'fecha' => '05 Jul, 2026',
                'horario' => '09:30 - 12:30',
                'imagen' => 'img/campaign_park.png'
            ],
            [
                'id' => 11,
                'titulo' => 'Mentoría Académica',
                'org' => 'Huellas del Mañana',
                'categoria' => 'educacion',
                'categoria_label' => 'Educación',
                'badge_clase' => 'badge-edu',
                'descripcion' => 'Acompañá el tramo final de la escuela secundaria de un estudiante guiándolo en el armado de su CV y búsqueda de carreras.',
                'registrados' => 4,
                'requeridos' => 5,
                'progreso' => 80,
                'ubicacion' => 'Buenos Aires',
                'fecha' => '08 Jul, 2026',
                'horario' => '18:00 - 19:30',
                'imagen' => 'img/campaign_tutoring.png'
            ],
            [
                'id' => 12,
                'titulo' => 'Comedor Solidario',
                'org' => 'Corazones Abiertos',
                'categoria' => 'accion-social',
                'categoria_label' => 'Acción Social',
                'badge_clase' => 'badge-soc',
                'descripcion' => 'Buscamos voluntarios para ayudar a cocinar y servir viandas calientes los viernes por la noche en la estación de trenes.',
                'registrados' => 6,
                'requeridos' => 10,
                'progreso' => 60,
                'ubicacion' => 'Rosario',
                'fecha' => '10 Jul, 2026',
                'horario' => '20:00 - 22:30',
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
            ],
            [
                'nombre' => 'Patitas Felices',
                'categoria' => 'Acción Social',
                'avatar_clase' => 'avatar-2',
                'iniciales' => 'PF',
                'descripcion' => 'Refugio animal abocado al rescate, rehabilitación y búsqueda de familias responsables para perros y gatos en situación de calle.',
                'campanas_activas' => '5 campañas activas',
                'ubicacion' => 'Mendoza',
                'imagen' => ''
            ],
            [
                'nombre' => 'Huellas del Mañana',
                'categoria' => 'Educación',
                'avatar_clase' => 'avatar-3',
                'iniciales' => 'HM',
                'descripcion' => 'Programa de mentoría escolar que busca inspirar y motivar a estudiantes de secundaria para continuar sus estudios universitarios.',
                'campanas_activas' => '2 campañas activas',
                'ubicacion' => 'Tucumán',
                'imagen' => ''
            ],
            [
                'nombre' => 'EcoRed',
                'categoria' => 'Medio Ambiente',
                'avatar_clase' => 'avatar-1',
                'iniciales' => 'ER',
                'descripcion' => 'Red de voluntarios ecológicos que promueve el reciclaje doméstico, limpiezas de playas locales y compostaje comunitario.',
                'campanas_activas' => '3 campañas activas',
                'ubicacion' => 'Mar del Plata',
                'imagen' => ''
            ]
        ];

        $datos = [
            'campanas' => $campanas,
            'organizaciones' => $organizaciones,
            'error' => null
        ];

        $this->cargarVista('inicio', $datos, 'Mano a Mano | Conectando Personas y Causas');
    }


    public function perfilOrganizacion() : void {
        $datos = [];
        $this->cargarVista('perfil_organizacion_vista', $datos, 'Perfil de la Organización | Mano a Mano');
    }

    public function perfilVoluntario() : void {
        $datos = [];
        $this->cargarVista('perfil_voluntario_vista', $datos, 'Perfil del Voluntario | Mano a Mano');
    }

    public function perfilVoluntarioLogueado() : void {
        // Enforce login for this dashboard route
        if (!isset($_SESSION['usuario_logueado']) || $_SESSION['usuario_logueado'] !== true) {
            header('Location: ' . BASE_URL . 'sesion');
            exit;
        }
        $datos = [];
        $this->cargarVista('perfil_voluntario_logueado', $datos, 'Mi Perfil | Mano a Mano');
    }

    public function perfilOrganizacionLogueado() : void {
        // Enforce login for this dashboard route
        if (!isset($_SESSION['usuario_logueado']) || $_SESSION['usuario_logueado'] !== true) {
            header('Location: ' . BASE_URL . 'sesion');
            exit;
        }
        $datos = [];
        $this->cargarVista('perfil_organizacion_logueado', $datos, 'Mi Perfil de Organización | Mano a Mano');
    }
}
?>