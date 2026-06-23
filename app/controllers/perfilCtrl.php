<?php 
class perfilCtrl extends Controlador {
    
	public function index() : void {
		$css = [];
        $js = [];
        $msj = null;
        
        /* Cargas de Modelos */
        //$modeloUsuario = $this->cargarModelo('Usuario');
        if ($_SESSION['usuario_rol'] == 'voluntario') {
            $modeloRol = $this->cargarModelo('Voluntario');
            $infoUsuario = $modeloRol->obtenerVoluntarioPorID($_SESSION['id_usuario']);

            $css = ['perfil_voluntario_logueado.css'];
            $js = ['perfil_voluntario_logueado.js'];
        }
        elseif($_SESSION['usuario_rol'] == 'organizacion') {
            $modeloRol = $this->cargarModelo('Organizacion');
            $infoUsuario = $modeloRol->obtenerOrganizacionPorID($_SESSION['id_usuario']);

            $css = ['perfil_organizacion_vista.css'];
            $js = ['perfil_organizacion_vista.js'];
        }
        
        /* Campañas y Causas */
        $modeloCampania = $this->cargarModelo('Campania');
        $causasDb = $modeloCampania->obtenerCausas();
        $causasMapeadas = array_map(function($item) {
            return $item['causa'];
        }, $causasDb);

        /* Obteniendo Datos de Usuarios (ambos)*/
        // Traer etiquetas del usuario.

        /* Voluntarios Particular */
        // Traer insignias por voluntariado fijo.
        // Traer valor del contador de asistencias.

        /* Organizaciones Particular */
        


        $datos = ['cssPropio' => $css,
				  'jsPropio' => $js,
                  'usuario' => $infoUsuario,
                  'causas' => $causasMapeadas   // Array de causas de campañas
        ];
        
        if ($_SESSION['usuario_rol'] == 'voluntario') {
            $this->cargarVista('perfil_voluntario_logueado', $datos, 'Mano a Mano - Perfil');
        }
        elseif ($_SESSION['usuario_rol'] == 'organizacion') {
            $datos = [];
            $this->cargarVista('perfil_pendiente', $datos, 'Mano a Mano - Perfil');		/* OJO QUE ACÁ VA EL PERFIL PROPIO DE LA ORGANIZACIÓN  */
        }
    }

    public function crearCampania () :void {
        $msj = null;

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {

            $tipoCamp = trim($_POST['tipo_campania'] ?? '');
            $titulo = trim($_POST['titulo_campania'] ?? '');
            $descripcion = htmlspecialchars($_POST['descripcion_campania'], ENT_QUOTES, 'UTF-8');
            $causas = $_POST['causas'] ?? []; 
            $ubicacion = trim($_POST['ubicacion'] ?? '');
            $fechaInicio = trim($_POST['fecha_inicio'] ?? '');
            $fechaFin = trim($_POST['fecha_fin'] ?? '');
            $infoAdicional = isset($_POST['info_adicional']) ? htmlspecialchars($_POST['info_adicional'], ENT_QUOTES, 'UTF-8') : null;
            $imagenes = $_FILES['imagenes'] ?? null;

            // Agrupar para pasar al modelo
            $datosCampania = [
                'tipo_campania' => $tipoCamp,
                'titulo' => $titulo,
                'descripcion' => $descripcion,
                'fecha_inicio' => $fechaInicio,
                'fecha_finalizacion' => $fechaFin,
                'ubicacion' => $ubicacion,
                'info_adicional' => $infoAdicional
            ];

            
            $exito = $this->agregarCampaniaBD($datosCampania, $causas, $imagenes);
            if ($exito) {
                $_SESSION['mensaje'] = "Campaña creada con éxito";
            } else {
                $_SESSION['error'] = "Hubo un error al intentar crear la campaña.";
            }
            // Redireccionar de vuelta al perfil
            header('Location: ' . BASE_URL . 'perfil');
            exit;
        }
    }

    private function agregarCampaniaBD ( array $datos, array $causas, ?array $imagenes) : bool {
        $modeloCampania = $this->cargarModelo('Campania');
        $idUsuario = $_SESSION['id_usuario'];

        $creada = $modeloCampania->crearNuevaCampania(
            $idUsuario,
            $datos['tipo_campania'],
            $datos['titulo'],
            $datos['fecha_finalizacion'],
            $datos['fecha_inicio'],
            $datos['ubicacion'],
            $datos['descripcion'],
            $datos['info_adicional']
        );
        if (!$creada) {
            return false;
        }

        // Se toma el ID de la campaña recién insertada por usuario
        $idCampania = $modeloCampania->obtenerUltimoIDCampaniaDeUsuario($idUsuario);
        if (!$idCampania) {
            return false;
        }

        // C. Se registran las causas seleccionadas en la tabla 'campanias_causas'
        foreach ($causas as $nombreCausa) {
            $idCausa = $modeloCampania->obtenerIDCausaPorNombre($nombreCausa);
            if ($idCausa) {
                $modeloCampania->agregarCausaACampania($idCampania, $idCausa);
            }
        }

        // D. Se procesan y guardan físicamente los archivos, registrándolos en la tabla 'archivos'
        if ($imagenes && isset($imagenes['name'])) {
            $totalFiles = count($imagenes['name']);
            $dirDestino = 'archivos/'; // public/archivos/

            // Si la carpeta destino no existe en el public, se crea
            if (!file_exists($dirDestino)) {
                mkdir($dirDestino, 0777, true);
            }

            for ($i = 0; $i < $totalFiles; $i++) {
                if ($imagenes['error'][$i] === UPLOAD_ERR_OK) {
                    $nombreTemporal = $imagenes['tmp_name'][$i];
                    $nombreOriginal = basename($imagenes['name'][$i]);
                    $extension = pathinfo($nombreOriginal, PATHINFO_EXTENSION);
                    
                    // Nombre único físico
                    $nuevoNombre = uniqid('camp_', true) . '.' . $extension;
                    $rutaCompleta = $dirDestino . $nuevoNombre;

                    if (move_uploaded_file($nombreTemporal, $rutaCompleta)) {
                        // Guardar la referencia en la tabla 'archivos'
                        $modeloCampania->agregarArchivoCampania($idCampania, 'archivos/' . $nuevoNombre, 'imagen');
                    }
                }
            }
        }
        return true;
    }

    
}
?>