<?php
class conectarCtrl extends Controlador {

    public function index() : void {
        $datos = ['error' => null,
                  'cssPropio' => 'conectar.css',
                  'jsPropio' => 'conectar.js'];
        $this->cargarVista('conectar', $datos, 'Conectar | Mano a Mano');
    }
}
?>
