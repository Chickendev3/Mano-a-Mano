<?php
class sesionCtrl extends Controlador {

	public function index() : void {
		$datos = ['error' => null];

		$this->cargarVista('sesion', $datos, 'Mano a Mano - Iniciar sesión');
	}

    
}
?>
