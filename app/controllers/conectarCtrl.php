<?php
class conectarCtrl extends Controlador {

    public function index() : void {
        $modeloCampania = $this->cargarModelo('Campania');
        $modeloVoluntario = $this->cargarModelo('Voluntario');
        $modeloOrganizacion = $this->cargarModelo('Organizacion');

        $campanias = $modeloCampania->obtenerCampanias();
        $voluntarios = $modeloVoluntario->obtenerVoluntarios();
        $organizaciones = $modeloOrganizacion->obtenerOrganizaciones();
    
    
        $datos = ['cssPropio' => 'conectar.css',
                  'jsPropio' => 'conectar.js',
                  'campanias' => $campanias ?? [],
                  'voluntarios' => $voluntarios ?? [],
                  'organizaciones' => $organizaciones ?? []];
        
        $this->cargarVista('conectar', $datos, 'Conectar - Mano a Mano');
    }


}
?>
