<?php
class registroCtrl extends Controlador{

    public function index() {
        $datos = ['error' => null];
        
        $this->cargarVista('registro', $datos);
    }

}
?>