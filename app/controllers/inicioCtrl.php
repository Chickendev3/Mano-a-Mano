<?php
class inicioCtrl extends Controlador {

	public function index() : void {
		$datos = ['error' => null];

		$this->cargarVista('inicio', $datos); 
	}
}
?>