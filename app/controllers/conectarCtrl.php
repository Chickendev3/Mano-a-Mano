<?php
class conectarCtrl extends Controlador {

    public function index() : void {
        $modeloCampania = $this->cargarModelo('Campania');

        $campanias = $modeloCampania->obtenerTodasCampanias();
    
    
        $datos = ['cssPropio' => 'conectar.css',
                  'jsPropio' => 'conectar.js',
                  'campanias' => $campanias ?? []];
        
        $this->cargarVista('conectar', $datos, 'Conectar - Mano a Mano');
    }


}
?>
