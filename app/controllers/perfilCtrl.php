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
            $insignias = $modeloRol->obtenerInsignias($_SESSION['id_usuario']);
            $oficiosVol = $modeloRol->obtenerOficiosVoluntario($_SESSION['id_usuario']);
            $listaOficiosVol = array_map(function($item) {
                return $item['oficio'];
            }, $oficiosVol);

            $todosOficios = $modeloRol->obtenerOficios();
            $listaOficios = array_map(function($item) {
                return $item['oficio'];
            }, $todosOficios);

            $css = ['perfil_voluntario_logueado.css'];
            $js = ['perfil_comun_logueado.js', 'perfil_voluntario_logueado.js'];
        }
        elseif($_SESSION['usuario_rol'] == 'organizacion') {
            $modeloRol = $this->cargarModelo('Organizacion');
            $infoUsuario = $modeloRol->obtenerOrganizacionPorID($_SESSION['id_usuario']);

            $todosOficios = [];
            $listaOficios = [];
            $listaOficiosVol = [];

            $causasOrg = $modeloRol->obtenerCausasOrganizacion($_SESSION['id_usuario']);
            $listaCausasOrg = array_map(function($item) {
                return $item['causa'];
            }, $causasOrg);

            $css = ['perfil_organizacion_logueado.css'];
            $js = ['perfil_comun_logueado.js', 'perfil_organizacion_logueado.js'];
        }
        
        /* Campañas y Causas */
        $modeloCampania = $this->cargarModelo('Campania');
        $causasDb = $modeloCampania->obtenerCausas();
        $causasMapeadas = array_map(function($item) {
            return $item['causa'];
        }, $causasDb);

        /* Obteniendo Datos de Usuarios (ambos)*/
        $modeloCampania = $this->cargarModelo('Campania');
        $campaniasUsuario = $modeloCampania->obtenerCampaniasDeUsuario($_SESSION['id_usuario']);

        /* Voluntarios Particular */
        // Traer valor del contador de asistencias.

        /* Organizaciones Particular */
        


        $datos = ['cssPropio' => $css,
				  'jsPropio' => $js,
                  'usuario' => $infoUsuario,
                  'causas' => $causasMapeadas,
                  'campaniasUsuario' => $campaniasUsuario ?? [],

                  'insignias' => $insignias ?? [],
                  'oficios_voluntario' => $listaOficiosVol ?? [],
                  'oficios' => $listaOficios ?? [],
                  'causas_organizacion' => $listaCausasOrg ?? []
        ];
        
        if ($_SESSION['usuario_rol'] == 'voluntario') {
            $this->cargarVista('perfil_voluntario_logueado', $datos, 'Mano a Mano - Perfil');
        }
        elseif ($_SESSION['usuario_rol'] == 'organizacion') {
            $this->cargarVista('perfil_organizacion_logueado', $datos, 'Mano a Mano - Perfil');
        }
    }

    public function crearCampania () :void {
        $msj = null;

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            header('Content-Type: application/json'); // Se notifica al navegador, una respuesta JSON

            $tipoCamp = trim($_POST['tipo_campania'] ?? '');
            $titulo = trim($_POST['titulo_campania'] ?? '');
            $descripcion = htmlspecialchars($_POST['descripcion_campania'], ENT_QUOTES, 'UTF-8');
            $causas = $_POST['causas'] ?? []; 
            $ubicacion = trim($_POST['ubicacion'] ?? '');
            $fechaInicio = trim($_POST['fecha_inicio'] ?? '');
            $fechaFin = trim($_POST['fecha_fin'] ?? '');
            $infoAdicional = isset($_POST['info_adicional']) ? htmlspecialchars($_POST['info_adicional'], ENT_QUOTES, 'UTF-8') : null;
            $imagenes = $_FILES['imagenes'] ?? null;


            /* Verificaciones */
            if (empty($titulo) || empty($descripcion) || empty($ubicacion) || empty($fechaInicio) || empty($fechaFin)) {
                echo json_encode(['success' => false, 'message' => 'Por favor, completa todos los campos requeridos.']);
                return;
            }
            if (strtotime($fechaFin) < strtotime($fechaInicio)) {
                echo json_encode(['success' => false, 'message' => 'La fecha de finalización no puede ser anterior a la fecha de inicio.']);
                return;
            }
            if (strtotime($fechaInicio) < strtotime(date('Y-m-d'))) {
                echo json_encode(['success' => false, 'message' => 'La fecha de inicio no puede ser anterior a la fecha actual.']);
                return;
            }

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
                echo json_encode(['success' => true, 
                                  'message' => 'Campaña creada con éxito.']);
            } else {
                echo json_encode(['success' => false, 
                                  'message' => 'Hubo un error al crear la Campaña.']);
            }
            return;
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

        // Se agarra el ID de la campaña recién insertada por el usuario
        $idCampania = $modeloCampania->obtenerUltimoIDCampaniaDeUsuario($idUsuario);
        if (!$idCampania) {
            return false;
        }

        // Se registran las causas seleccionadas en la tabla 'campanias_causas'
        foreach ($causas as $nombreCausa) {
            $idCausa = $modeloCampania->obtenerIDCausaPorNombre($nombreCausa);
            if ($idCausa) {
                $modeloCampania->agregarCausaACampania($idCampania, $idCausa);
            }
        }

        // Se procesan y guardan físicamente los archivos, registrándolos en la tabla 'archivos'
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

    public function modificarCampania() : void {

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            header('Content-Type: application/json'); // Envío al navegador que se responde un JSON

            $idCampania = (int)($_POST['id_campania'] ?? 0);
            if ($idCampania <= 0) {
                header('Location: ' . BASE_URL . 'perfil');
                exit;
            }

            $titulo = trim($_POST['titulo_campania'] ?? '');
            $descripcion = htmlspecialchars($_POST['descripcion_campania'] ?? '', ENT_QUOTES, 'UTF-8');
            $fechaInicio = trim($_POST['fecha_inicio'] ?? '');
            $fechaFin = trim($_POST['fecha_fin'] ?? '');
            $ubicacion = trim($_POST['ubicacion'] ?? '');
            $infoAdicional = isset($_POST['info_adicional']) ? trim($_POST['info_adicional']) : null;

            $causas = $_POST['causas'] ?? [];
            $imagenes = $_FILES['imagenes'] ?? null;
            $imagenesExistentes = $_POST['imagenes_existentes'] ?? [];

            /* Verificaciones */
            if (empty($titulo) || empty($descripcion) || empty($ubicacion) || empty($fechaInicio) || empty($fechaFin)) {
                echo json_encode(['success' => false, 
                                  'message' => 'Por favor, completa todos los campos requeridos.']);
                return;
            }
             if (strtotime($fechaFin) < strtotime($fechaInicio)) {
                echo json_encode(['success' => false, 
                                  'message' => 'La fecha de finalización no puede ser anterior a la fecha de inicio.']);
                return;
            }
            
            // Se identifica la fecha de creación original de la campaña
            $modeloCampania = $this->cargarModelo('Campania');
            $campaniaActual = $modeloCampania->obtenerCampaniaPorID($idCampania);

            if (!$campaniaActual) {
                echo json_encode(['success' => false, 'message' => 'La campaña seleccionada no existe.']);
                return;
            }

            $fechaCreacion = date('Y-m-d', strtotime($campaniaActual['fecha_creacion']));
            if (strtotime($fechaInicio) < strtotime($fechaCreacion)) {
                echo json_encode(['success' => false, 
                                  'message' => 'La fecha de inicio no puede ser anterior a la fecha de creación de la campaña (' . date('d-m-Y', strtotime($fechaCreacion)) . ').']);
                return;
            }

            $datosNuevos = [
                'titulo' => $titulo,
                'descripcion' => $descripcion,
                'fecha_inicio' => $fechaInicio,
                'fecha_finalizacion' => $fechaFin,
                'ubicacion' => $ubicacion,
                'info_adicional' => $infoAdicional
            ];

            $actualizado = $modeloCampania->actualizarDatosCampania($idCampania, $datosNuevos);

            if ($actualizado) {
                /* Causas */
                // Se eliminan las relaciones previas 
                $modeloCampania->eliminarCausasDeCampania($idCampania); 
                // Se guardan las nuevas
                foreach ($causas as $nombreCausa) {
                    $idCausa = $modeloCampania->obtenerIDCausaPorNombre($nombreCausa);
                    if ($idCausa) {
                        $modeloCampania->agregarCausaACampania($idCampania, $idCausa);
                    }
                }

                /* Impagenes */
                $modeloCampania->sincronizarImagenesExistentes($idCampania, $imagenesExistentes);   // Se eliminan las anteriores, se conservan las anteriores 
                
                if ($imagenes && !empty($imagenes['name'][0])) {
                    $totalFiles = count($imagenes['name']);
                    $dirDestino = 'archivos/';

                    if (!file_exists($dirDestino)) {
                        mkdir($dirDestino, 0777, true);
                    }

                    for ($i = 0; $i < $totalFiles; $i++) {
                        if ($imagenes['error'][$i] === UPLOAD_ERR_OK) {
                            $nombreTemporal = $imagenes['tmp_name'][$i];
                            $nombreOriginal = basename($imagenes['name'][$i]);
                            $extension = pathinfo($nombreOriginal, PATHINFO_EXTENSION);
                            
                            $nuevoNombre = uniqid('camp_', true) . '.' . $extension;
                            $rutaCompleta = $dirDestino . $nuevoNombre;

                            if (move_uploaded_file($nombreTemporal, $rutaCompleta)) {
                                $modeloCampania->agregarArchivoCampania($idCampania, 'archivos/' . $nuevoNombre, 'imagen');
                            }
                        }
                    }
                }

                echo json_encode(['success' => true, 'message' => 'Campaña modificada con éxito.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'No se pudieron guardar los cambios de la Campaña.']);
            }

            /* header('Location: ' . BASE_URL . 'perfil');
            exit; */
            return;
        }
    }
    
    public function editarPerfilVoluntario () :void {
        
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            header('Content-Type: application/json');

            $nombre = trim($_POST['nombre'] ?? '');
            $apellido = trim($_POST['apellido'] ?? ''); 
            $descripcion = trim($_POST['descripcion'] ?? '');
                $descripcion = ($descripcion !== '') ? htmlspecialchars($descripcion, ENT_QUOTES, 'UTF-8') : null;
            $ubicacion = trim($_POST['ubicacion'] ?? '');
                $ubicacion = ($ubicacion !== '') ? $ubicacion : null;
            $disponibilidad = trim($_POST['disponibilidad_horaria'] ?? '');
                $disponibilidad = ($disponibilidad !== '') ? $disponibilidad : null;
            $email = trim($_POST['email'] ?? '');
            $telefono = trim($_POST['telefono'] ?? '');
                $telefono = ($telefono !== '') ? $telefono : null;
            $telefonoEmergencia = trim($_POST['telefono_emergencia'] ?? '');
                $telefonoEmergencia = ($telefonoEmergencia !== '') ? $telefonoEmergencia : null;
            $oficios = $_POST['oficios'] ?? [];

            if (empty($nombre) || empty($apellido) || empty($email) || empty($telefono)) {
                echo json_encode(['success' => false, 'message' => 'El nombre, apellido, email y teléfono son campos requeridos.']);
                return;
            }

            $idUsuario = $_SESSION['id_usuario'];
            $modeloVol = $this->cargarModelo('Voluntario');

            // 1. Guardar la información básica (usuarios y voluntarios)
            $actualizado = $modeloVol->actualizarDatosVoluntario($idUsuario, [
                'nombre' => $nombre,
                'apellido' => $apellido,
                'descripcion' => $descripcion,
                'ubicacion' => $ubicacion,
                'disponibilidad_horaria' => $disponibilidad,
                'email' => $email,
                'telefono' => $telefono,
                'telefono_emergencia' => $telefonoEmergencia
            ]);

            // 2. Guardar los oficios seleccionados
            $oficiosActualizados = $modeloVol->actualizarOficiosVoluntario($idUsuario, $oficios);

            if ($actualizado && $oficiosActualizados) {
                // Actualizar los datos de sesión para que el header cambie dinámicamente al instante
                $_SESSION['nombre_usuario'] = $nombre;
                $_SESSION['apellido_usuario'] = $apellido;

                echo json_encode(['success' => true, 'message' => 'Perfil actualizado con éxito.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Error al guardar los datos del perfil.']);
            }
            return;
        }
    }

    public function actualizarImgPerfil() : void {

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            header('Content-Type: application/json');
            
            $idUsuario = $_SESSION['id_usuario'];

            // Se verifica que se haya enviado el archivo
            if (isset($_FILES['foto_perfil']) && $_FILES['foto_perfil']['error'] === UPLOAD_ERR_OK) {
                $archivo = $_FILES['foto_perfil'];
                $dirDestino = 'archivos/'; // public/archivos/
                
                if (!file_exists($dirDestino)) {
                    mkdir($dirDestino, 0777, true);
                }

                $nombreOriginal = basename($archivo['name']);
                $extension = pathinfo($nombreOriginal, PATHINFO_EXTENSION);
                
                // Se generamos un nombre único para evitar colisiones
                $nuevoNombre = uniqid('avatar_', true) . '.' . $extension;
                $rutaRelativa = 'archivos/' . $nuevoNombre;
                $rutaCompleta = $dirDestino . $nuevoNombre;

                // Obtener y borrar la imagen de perfil anterior si existe
                $modeloUsuario = $this->cargarModelo('Usuario');
                $fotoAnterior = $modeloUsuario->obtenerFotoPerfil($idUsuario);
                if (!empty($fotoAnterior) && strpos($fotoAnterior, 'archivos/') === 0 && file_exists($fotoAnterior)) {
                    unlink($fotoAnterior);
                }

                // Se mueve el archivo temporal a la carpeta destino
                if (move_uploaded_file($archivo['tmp_name'], $rutaCompleta)) {
                    // Actualización en BD
                    $actualizado = $modeloUsuario->actualizarFotoPerfil($idUsuario, $rutaRelativa);

                    if ($actualizado) {
                        // Actualización en información de sesión
                        $_SESSION['img_perfil'] = $rutaRelativa;
                        
                        echo json_encode(['success' => true, 'ruta' => $rutaRelativa]);
                    } else {
                        echo json_encode(['success' => false, 'message' => 'No se pudo actualizar la base de datos']);
                    }
                } else {
                    echo json_encode(['success' => false, 'message' => 'Error al mover el archivo']);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Archivo no recibido o con errores']);
            }
        }
    }

    public function eliminarCampania () : void {

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            header('Content-Type: application/json');

            $idCampania = (int)($_POST['id_campania'] ?? 0);
            if ($idCampania <= 0) {
                echo json_encode(['success' => false, 'message' => 'ID de campaña no válido.']);
                return;
            }

            $modeloCampania = $this->cargarModelo('Campania');
            $campania = $modeloCampania->obtenerCampaniaPorID($idCampania);
            
            if (!$campania) {
                echo json_encode(['success' => false, 'message' => 'La campaña no existe.']);
                return;
            }

            // Obtener el tipo real por tipo_id
            $tipo = $modeloCampania->obtenerTipoPorID((int)$campania['tipo_id']);
            $mensaje = 'La campaña se eliminó correctamente.';

            if ($tipo === 'Convocatoria') {
                $modeloPostulacion = $this->cargarModelo('Postulacion');
                $postulaciones = $modeloPostulacion->obtenerPostulacionesPorCampania($idCampania);
                $cantPostulantes = count($postulaciones);
                if ($cantPostulantes > 0) {
                    $mensaje = "Campaña de convocatoria eliminada. Se cancelaron las {$cantPostulantes} postulaciones activas asociadas.";
                }
            }

            // Eliminación de archivos de imágenes del servidor
            $imagenes = $modeloCampania->obtenerImgenesPorCampania($idCampania);
            foreach ($imagenes as $img) {
                $rutaFisica = $img['referencia'];
                if (!empty($rutaFisica) && strpos($rutaFisica, 'archivos/') === 0 && file_exists($rutaFisica)) {
                    unlink($rutaFisica);
                }
            }

            // Se elimina de la base de datos (borra relacionales por CASCADE previamente definido en la BD)
            $eliminado = $modeloCampania->eliminarCampania($idCampania);

            if ($eliminado) {
                echo json_encode(['success' => true, 'message' => $mensaje]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Error al eliminar la campaña de la base de datos.']);
            }
            return;
        }    
    }

    public function editarPerfilOrganizacion () :void {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            header('Content-Type: application/json');

            $nombre = trim($_POST['nombre'] ?? '');
            $descripcion = trim($_POST['descripcion'] ?? '');
                $descripcion = ($descripcion !== '') ? htmlspecialchars($descripcion, ENT_QUOTES, 'UTF-8') : null;
            $ubicacion = trim($_POST['ubicacion'] ?? '');
                $ubicacion = ($ubicacion !== '') ? $ubicacion : null;
            $email = trim($_POST['email'] ?? '');
            $causas = $_POST['causas'] ?? [];

            if (empty($nombre) || empty($email)) {
                echo json_encode(['success' => false, 'message' => 'El nombre y el email son campos requeridos.']);
                return;
            }

            $idUsuario = $_SESSION['id_usuario'];
            $modeloOrg = $this->cargarModelo('Organizacion');

            $actualizado = $modeloOrg->actualizarDatosOrganizacion($idUsuario, [
                'nombre' => $nombre,
                'descripcion' => $descripcion,
                'ubicacion' => $ubicacion,
                'email' => $email
            ]);

            $modeloOrg->actualizarCausasOrganizacion($idUsuario, $causas);

            if ($actualizado) {
                $_SESSION['nombre_usuario'] = $nombre;
                echo json_encode(['success' => true, 'message' => 'Perfil de organización actualizado con éxito.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Error al guardar los datos del perfil.']);
            }
            return;
        }
    }
}
?>