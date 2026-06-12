<?php
class contactoCtrl extends Controlador {

    public function index() : void {
        $datos = ['error' => null];
        $this->cargarVista('contacto', $datos, 'Contacto | Mano a Mano');
    }
}
?>
