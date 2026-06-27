<?php
class conectarCtrl extends Controlador {

    public function index() : void {
        $modeloCampania = $this->cargarModelo('Campania');
        $modeloVoluntario = $this->cargarModelo('Voluntario');
        $modeloOrganizacion = $this->cargarModelo('Organizacion');
    
        // Captura de filtros desde la URL
        $filtros = [
            'q' => $_GET['q'] ?? '',
            'category' => $_GET['category'] ?? '',
            'location' => $_GET['location'] ?? ''
        ];

        $campanias = $modeloCampania->obtenerCampanias( $filtros );
        $voluntarios = $modeloVoluntario->obtenerVoluntarios( $filtros );
        $organizaciones = $modeloOrganizacion->obtenerOrganizaciones( $filtros );
        $causas = $modeloCampania->obtenerCausas();
        $oficios = $modeloVoluntario->obtenerOficios();
    

        $datos = ['cssPropio' => 'conectar.css',
                  'jsPropio' => 'conectar.js',
                  'campanias' => $campanias ?? [],
                  'voluntarios' => $voluntarios ?? [],
                  'organizaciones' => $organizaciones ?? [],
                  'causas' => $causas ?? [],
                  'oficios' => $oficios ?? []];
        
        $this->cargarVista('conectar', $datos, 'Conectar - Mano a Mano');
    }

    public function busqueda () :void {

        

    }


}
?>
