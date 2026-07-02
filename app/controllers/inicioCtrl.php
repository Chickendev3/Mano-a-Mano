<?php
class inicioCtrl extends Controlador {

    public function index() : void {
        $modeloOrganizacion = $this->cargarModelo('Organizacion');
        $modeloCampania = $this->cargarModelo('Campania');

        $organizacionesRaw = $modeloOrganizacion->obtenerOrganizaciones();
        $organizaciones = [];
        $today = date('Y-m-d');

        foreach ($organizacionesRaw as $org) {
            $idUsuario = (int)$org['id'];
            
            // Obtener causas asociadas
            $causasRaw = $modeloOrganizacion->obtenerCausasOrganizacion($idUsuario);
            $causes = array_map(function($item) {
                return $item['causa'];
            }, $causasRaw);

            // Calcular cantidad de campañas activas en base a la fecha de hoy
            $camps = $modeloCampania->obtenerCampaniasDeUsuario($idUsuario);
            $activeCount = 0;
            foreach ($camps as $c) {
                if ($today >= $c['startDate'] && $today <= $c['endDate']) {
                    $activeCount++;
                }
            }

            $organizaciones[] = [
                'id' => $idUsuario,
                'nombre' => $org['nombre'],
                'descripcion' => !empty($org['descripcion']) ? $org['descripcion'] : 'Sin descripción cargada.',
                'img_perfil' => $org['img_perfil'],
                'ubicacion' => !empty($org['ubicacion']) ? $org['ubicacion'] : 'No especificada',
                'causas' => $causes,
                'campanas_activas' => $activeCount . ($activeCount == 1 ? ' campaña activa' : ' campañas activas')
            ];
        }

        $campaniasRaw = $modeloCampania->obtenerCampanias();
        $campanias = [];
        foreach ($campaniasRaw as $camp) {
            $startDate = $camp['fecha_inicio'];
            $endDate = $camp['fecha_finalizacion'];
            
            // Filtrar sólo campañas activas en rango de fechas
            if ($today >= $startDate && $today <= $endDate) {
                $orgName = !empty($camp['nombre']) ? $camp['nombre'] : 'Organización';
                
                $causes = $modeloCampania->obtenerCausasDeCampania((int)$camp['id']);
                $images = $modeloCampania->obtenerArchivosDeCampania((int)$camp['id']);
                
                $campanias[] = [
                    'id' => (int)$camp['id'],
                    'titulo' => $camp['titulo'],
                    'org' => $orgName,
                    'descripcion' => $camp['descripcion'],
                    'ubicacion' => $camp['ubicacion'],
                    'fecha_inicio' => $camp['fecha_inicio'],
                    'causa' => !empty($causes) ? $causes[0] : 'Solidario',
                    'imagen' => !empty($images) ? $images[0] : ''
                ];
            }
        }

        $datos = [
            'campanias' => $campanias,
            'organizaciones' => $organizaciones,
            'error' => null,
            'cssPropio' => 'inicio.css',
            'jsPropio' => 'inicio.js'
        ];

        $this->cargarVista('inicio', $datos, 'Mano a Mano | Conectando Personas y Causas');
    }

    /* public function perfilDesarrollo() : void {
        $datos = [];
        $this->cargarVista('perfil_pendiente', $datos, 'Perfil en Desarrollo | Mano a Mano');
    } */

}
?>