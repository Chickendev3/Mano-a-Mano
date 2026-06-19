<?php 
class perfilCtrl extends Controlador {
    
	public function index() : void {
		$datos = ['msj' => null,
				  'cssPropio' => '',
				  'jsPropio' => ''];
        
    }

    public function cargaPerfil() : void {
        $css = ['perfil_organizacion_vist.css', 'perfil_voluntario_logueado.css', 'perfil_voluntario_vista.css'];
        $js = ['perfil_organizacion_vist.js', 'perfil_voluntario_logueado.js', 'perfil_voluntario_vista.js'];;
        $datos = ['cssPropio' => $css,
				  'jsPropio' => $js];

        if ($_SESSION['usuario_rol'] == 'voluntario') {
            $this->cargarVista('perfil_voluntario_logueado', $datos, 'Mano a Mano - Perfil');
        }
        elseif ($_SESSION['usuario_rol'] == 'organizacion') {
            $datos = [];
            $this->cargarVista('perfil_pendiente', $datos, 'Mano a Mano - Perfil');		/* OJO QUE ACÁ VA EL PERFIL PROPIO DE LA ORGANIZACIÓN  */
        }
    }

    
}
?>