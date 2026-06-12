<?php
class conectarCtrl extends Controlador {

    public function index() : void {
        $datos = ['error' => null];
        $this->cargarVista('conectar', $datos, 'Conectar | Mano a Mano');
    }
}
?>
