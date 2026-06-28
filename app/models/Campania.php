<?php
class Campania {
    private $bd;

    public function __construct() {
        $this->bd = new BaseDatos();
    }

    /* 
        FALTAN VER LAS EL TEMA DE LAS ETIQUETAS y los DETELEs

        Además de gestionar las TABLAS DE RELACIÓN según les correspondan

        METODOS FALTANTES:
        - Mostrar la lista de los Usuarios que fueron aceptados para participar de la campaña (estado de Postulación e Invitación: ACEPTADO).
    */

    /* -------------------- OBTENER DATOS (CONSULTAS) -------------------- */
    public function obtenerCampanias ( array $filtros = [] ) :array {
        /* Actualizalizar el estado de la campaña en caso de fecha de finalización vencida */

        $condicionesOrgs = [];
        $condicionesVol = [];
        $parametros = [];

        if (!empty($filtros['q'])) {
            $condicionesOrgs[] = "(c.titulo LIKE :q_org OR c.descripcion LIKE :q_org OR u.nombre LIKE :q_org)";
            $condicionesVol[] = "(c.titulo LIKE :q_vol OR c.descripcion LIKE :q_vol OR CONCAT(u.nombre, ' ', v.apellido) LIKE :q_vol)";
            $parametros[':q_org'] = '%' . $filtros['q'] . '%';
            $parametros[':q_vol'] = '%' . $filtros['q'] . '%';
        }
        if (!empty($filtros['category'])) {
            $condicionesOrgs[] = "c.id IN (SELECT cc.campania_id FROM campanias_causas cc JOIN causas ca ON cc.causa_id = ca.id WHERE ca.causa = :category)";
            $condicionesVol[] = "c.id IN (SELECT cc.campania_id FROM campanias_causas cc JOIN causas ca ON cc.causa_id = ca.id WHERE ca.causa = :category)";
            $parametros[':category'] = $filtros['category'];
        }
        if (!empty($filtros['location'])) {
            $condicionesOrgs[] = "(c.ubicacion LIKE :location OR u.ubicacion LIKE :location)";
            $condicionesVol[] = "(c.ubicacion LIKE :location OR u.ubicacion LIKE :location)";
            $parametros[':location'] = '%' . $filtros['location'] . '%';
        }

        $whereOrgs = !empty($condicionesOrgs) ? " AND " . implode(" AND ", $condicionesOrgs) : "";
        $whereVol = !empty($condicionesVol) ? " AND " . implode(" AND ", $condicionesVol) : "";
        
        $consultaOrgs = "SELECT c.id, c.usuario_id, u.nombre, u.img_perfil, t.tipo, c.titulo, c.descripcion, c.fecha_inicio, c.fecha_finalizacion, c.ubicacion, c.info_adicional 
                        FROM campanias c 
                            JOIN usuarios u ON c.usuario_id = u.id
                            JOIN tipos_campanias t ON t.id = c.tipo_id
                            JOIN organizaciones o ON u.id = o.usuario_id
                        WHERE 1=1 " . $whereOrgs;
        
        $consultaVol = "SELECT c.id, c.usuario_id, CONCAT(u.nombre, ' ', v.apellido) as 'nombre', u.img_perfil, t.tipo, c.titulo, c.descripcion, c.fecha_inicio, c.fecha_finalizacion, c.ubicacion, c.info_adicional 
                        FROM campanias c 
                            JOIN usuarios u ON c.usuario_id = u.id
                            JOIN tipos_campanias t ON t.id = c.tipo_id
                            JOIN voluntarios v ON u.id = v.usuario_id
                        WHERE 1=1 " . $whereVol;
        
        // Consulta Organizaciones
        $this->bd->consulta($consultaOrgs);
        foreach ($parametros as $key => $val) {
            if (strpos($consultaOrgs, $key) !== false) {
                $this->bd->asignar($key, $val);
            }
        }
        $this->bd->ejecutar();
        $campaniasOrgs = $this->bd->resultados();
        
        // Consulta Voluntarios
        $this->bd->consulta($consultaVol);
        foreach ($parametros as $key => $val) {
            if (strpos($consultaVol, $key) !== false) {
                $this->bd->asignar($key, $val);
            }
        }
        $this->bd->ejecutar();
        $campaniasVol = $this->bd->resultados();

        $todasLasCampanias = array_merge($campaniasOrgs, $campaniasVol);
        
        $campaniasMapeadas = [];
        foreach ($todasLasCampanias as $camp) {
            $idCamp = (int)$camp['id'];
            $causes = $this->obtenerCausasDeCampania($idCamp);
            $images = $this->obtenerArchivosDeCampania($idCamp);
            
            $campaniasMapeadas[] = [
                'id' => $idCamp,
                'nombre' => $camp['nombre'],
                'usuario_id' => (int)$camp['usuario_id'],
                'usuario_nombre' => $camp['nombre'],
                'usuario_img_perfil' => $camp['img_perfil'],
                'tipo' => strtolower($camp['tipo']) === 'convocatoria' ? 'convocatoria' : 'informativa',
                'titulo' => $camp['titulo'],
                'descripcion' => $camp['descripcion'],
                'fecha_inicio' => $camp['fecha_inicio'],
                'fecha_finalizacion' => $camp['fecha_finalizacion'],
                'ubicacion' => $camp['ubicacion'],
                'info_adicional' => $camp['info_adicional'],
                'category' => !empty($causes) ? $causes[0] : '',
                'causes' => $causes,
                'imagen' => !empty($images) ? $images[0] : '',
                'images' => $images
            ];
        }
        
        return $campaniasMapeadas;
    }

    public function obtenerCampaniaPorID ( int $idCampania ) :array {
        $consulta = "SELECT * FROM campanias
                        WHERE id = :id;";
    
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id", $idCampania);
        $this->bd->ejecutar();

        return $this->bd->resultado();
    }

    public function obtenerImgenesPorCampania ( int $idCampania ) :array {
        $consulta = "SELECT a.referencia, a.tipo as 'tipo_archivo'
                        FROM campanias c JOIN archivos a ON c.id = a.campania_id
                        WHERE c.id = :id;";
    
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id", $idCampania);
        $this->bd->ejecutar();

        return $this->bd->resultados();
    }

    private function obtenerIDTipoPorNombre (string $nombreTipo) :int {
        $consulta = "SELECT id as 'id_tipo'
                        FROM tipos_campanias WHERE tipo = :tipo;";
    
        $this->bd->consulta($consulta);
        $this->bd->asignar(":tipo", $nombreTipo);
        $this->bd->ejecutar();

        return $this->bd->resultado()['id_tipo'];
    }
    public function obtenerTipoPorID ( int $idTipo ) :string {
        $consulta = "SELECT tipo FROM tipos_campanias 
                        WHERE id = :id_tipo;";
    
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_tipo", $idTipo);
        $this->bd->ejecutar();

        return $this->bd->resultado()['tipo'];
    }
    

    public function obtenerCausas () :array {
        $consulta = "SELECT causa FROM `causas`;";
    
        $this->bd->consulta($consulta);
        $this->bd->ejecutar();

        return $this->bd->resultados();
    }

    
    public function obtenerUltimoIDCampaniaDeUsuario(int $idUsuario) : int|bool {
        // Toma el último ID de Campaña desde un Usuario específico
        $consulta = "SELECT id FROM campanias WHERE usuario_id = :usu_id ORDER BY id DESC LIMIT 1;";

        $this->bd->consulta($consulta);
        $this->bd->asignar(":usu_id", $idUsuario);
        $this->bd->ejecutar();
        
        $resultado = $this->bd->resultado();
        return $resultado ? (int)$resultado['id'] : false;
    }

    public function obtenerIDCausaPorNombre(string $nombreCausa) : int|bool {
        $consulta = "SELECT id FROM causas WHERE causa = :nombre;";

        $this->bd->consulta($consulta);
        $this->bd->asignar(":nombre", $nombreCausa);
        $this->bd->ejecutar();
        
        $resultado = $this->bd->resultado();
        return $resultado ? (int)$resultado['id'] : false;
    }

    public function obtenerCausasDeCampania ( int $idCampania ) : array {
        $consulta = "SELECT c.causa FROM campanias_causas cc
                        JOIN causas c ON c.id = cc.causa_id
                        WHERE cc.campania_id = :camp_id;";

        $this->bd->consulta($consulta);
        $this->bd->asignar(":camp_id", $idCampania);
        $this->bd->ejecutar();
        
        $resultados = $this->bd->resultados();
        return array_column($resultados, 'causa');
    }

    public function obtenerArchivosDeCampania(int $idCampania) : array {
        $consulta = "SELECT referencia FROM archivos 
                        WHERE campania_id = :camp_id AND tipo = 'imagen';";
        
        $this->bd->consulta($consulta);
        $this->bd->asignar(":camp_id", $idCampania);
        $this->bd->ejecutar();
        
        $resultados = $this->bd->resultados();
        return array_column($resultados, 'referencia');
    }

    public function obtenerCampaniasDeUsuario(int $idUsuario) : array {
        $consulta = "SELECT c.*, t.tipo as 'nombre_tipo', u.nombre, u.img_perfil, v.apellido as 'vol_apellido'
                     FROM campanias c
                     JOIN tipos_campanias t ON t.id = c.tipo_id
                     JOIN usuarios u ON u.id = c.usuario_id
                     LEFT JOIN voluntarios v ON u.id = v.usuario_id
                     WHERE c.usuario_id = :usu_id
                     ORDER BY c.id DESC;";
        $this->bd->consulta($consulta);
        $this->bd->asignar(":usu_id", $idUsuario);
        $this->bd->ejecutar();
        
        $campaniasDb = $this->bd->resultados();
        $campaniasMapeadas = [];
        
        foreach ($campaniasDb as $camp) {
            $idCamp = (int)$camp['id'];
            $causes = $this->obtenerCausasDeCampania($idCamp);
            $images = $this->obtenerArchivosDeCampania($idCamp);
            $nombreCompleto = $camp['nombre'];
            if (!empty($camp['vol_apellido'])) {
                $nombreCompleto .= ' ' . $camp['vol_apellido'];
            }
            
            // Array mapeado para la lectura de perfil_voluntario_logueado.js
            $campaniasMapeadas[] = [
                'id' => $idCamp,
                'title' => $camp['titulo'],
                'desc' => $camp['descripcion'],
                'usuario_id' => $camp['usuario_id'],
                'usuario_nombre' => $nombreCompleto,
                'usuario_img_perfil' => $camp['img_perfil'],
                'category' => !empty($causes) ? $causes[0] : '',
                'causes' => $causes, // Listado completo de causas
                'type' => strtolower($camp['nombre_tipo']) === 'convocatoria' ? 'convocatoria' : 'informativa',
                'startDate' => $camp['fecha_inicio'],
                'endDate' => $camp['fecha_finalizacion'],
                'location' => $camp['ubicacion'],
                'details' => $camp['descripcion'],
                'additionalInfo' => $camp['info_adicional'],
                'images' => $images
            ];
        }
        
        return $campaniasMapeadas;
    }


    /* ------------------------ INSERTAR DATOS ------------------------ */
    public function crearNuevaCampania (int $idUsuario, string $tipoConvocatoria, string $titulo, string $fechaFinalizacion, string $fechaInicio, string $ubicacion, ?string $descripcion = null, ?string $infoAdicional = null ) :bool {
        $idTipo = $this->obtenerIDTipoPorNombre( $tipoConvocatoria );
        
        $consulta = "INSERT INTO `campanias`(`usuario_id`, `tipo_id`, `titulo`, `descripcion`, `fecha_finalizacion`, `fecha_inicio`, `ubicacion`, `info_adicional`) 
                        VALUES (:usu_id, :tipo_id, :titulo, :descripcion, :fecha_fin, :fecha_ini, :ubicacion,  :info_ad)";
        $this->bd->consulta($consulta);

        $this->bd->asignar(":usu_id", $idUsuario);
        $this->bd->asignar(":tipo_id", $idTipo);
        $this->bd->asignar(":titulo", $titulo);
        $this->bd->asignar(":descripcion", $descripcion);
        $this->bd->asignar(":fecha_fin", $fechaFinalizacion);
        $this->bd->asignar(":fecha_ini", $fechaInicio);
        $this->bd->asignar(":ubicacion", $ubicacion);
        $this->bd->asignar(":info_ad", $infoAdicional);


        return $this->bd->ejecutar();
    }

    public function agregarCausaACampania(int $idCampania, int $idCausa) : bool {
        // Asocia una causa a una Campaña
        $consulta = "INSERT INTO campanias_causas (campania_id, causa_id) VALUES (:campania_id, :causa_id);";

        $this->bd->consulta($consulta);
        $this->bd->asignar(":campania_id", $idCampania);
        $this->bd->asignar(":causa_id", $idCausa);

        return $this->bd->ejecutar();
    }

    public function agregarArchivoCampania(int $idCampania, string $referencia, ?string $tipo = null) : bool {
        $consulta = "INSERT INTO archivos (campania_id, referencia, tipo) VALUES (:campania_id, :referencia, :tipo);";

        $this->bd->consulta($consulta);
        $this->bd->asignar(":campania_id", $idCampania);
        $this->bd->asignar(":referencia", $referencia);
        $this->bd->asignar(":tipo", $tipo);
        
        return $this->bd->ejecutar();
    }



    /* ------------------------ ACTUALIZAR DATOS ------------------------ */
    public function actualizarDatosCampania (int $idCampania, array $datos) :bool {
        /* $datos puede contener: titulo, descripcion, fechaFinalizacion e infoAdicional */
        
        if (empty($datos)) {
            return true;
        }
        $campos = [];
        $parametrosABindear = [];
        
        // array_key_exists para acepteptar valores NULL
        if (array_key_exists('titulo', $datos)) {
            $campos[] = "titulo = :titulo";
            $parametrosABindear['titulo'] = $datos['titulo'];
        }
        if (array_key_exists('descripcion', $datos)) {
            $campos[] = "descripcion = :descripcion";
            $parametrosABindear['descripcion'] = $datos['descripcion'];
        }
        if (array_key_exists('fecha_finalizacion', $datos)) {
            $campos[] = "fecha_finalizacion = :fecha_finalizacion";
            $parametrosABindear['fecha_finalizacion'] = $datos['fecha_finalizacion'];
        }
        if (array_key_exists('fecha_inicio', $datos)) {
            $campos[] = "fecha_inicio = :fecha_inicio";
            $parametrosABindear['fecha_inicio'] = $datos['fecha_inicio'];
        }
        if (array_key_exists('ubicacion', $datos)) {
            $campos[] = "ubicacion = :ubicacion";
            $parametrosABindear['ubicacion'] = $datos['ubicacion'];
        }
        if (array_key_exists('info_adicional', $datos)) {
            $campos[] = "info_adicional = :info_adicional";
            $parametrosABindear['info_adicional'] = $datos['info_adicional'];
        }
        if (empty($campos)) {
            return true;
        }

        $consulta = "UPDATE campanias SET " . implode(', ', $campos) . " WHERE id = :campania_id";
        $this->bd->consulta($consulta);
        $this->bd->asignar(":campania_id", $idCampania);
        
        foreach ($parametrosABindear as $campo => $valor) {
            $this->bd->asignar(":$campo", $valor);
        }

        return $this->bd->ejecutar();
    }

    public function sincronizarImagenesExistentes ( int $idCampania, array $imagenesExistentes ) :void {
        $consulta = "SELECT referencia FROM archivos 
                            WHERE campania_id = :camp_id AND tipo = 'imagen';";
        
        $this->bd->consulta($consulta);
        $this->bd->asignar(":camp_id", $idCampania);
        
        $this->bd->ejecutar();
        $imagenesBD = $this->bd->resultados();  // Se retorna un array de arrays

        foreach ($imagenesBD as $imagen) {
            $rutaBD = $imagen['referencia']; 
            
            if (!in_array($rutaBD, $imagenesExistentes)) {
                // Se borra el archivo en la carpeta 'archivos'
                /* Como el entry point del sitio es public/index.php, la ruta relativa 'archivos/...' es directa. */
                if (file_exists($rutaBD)) {
                    unlink($rutaBD); // Elimina físicamente el archivo
                }
                
                $consultaBorrar = "DELETE FROM archivos WHERE campania_id = :camp_id AND referencia = :ref;";
                $this->bd->consulta($consultaBorrar);
                $this->bd->asignar(":camp_id", $idCampania);
                $this->bd->asignar(":ref", $rutaBD);

                $this->bd->ejecutar();
            }
        }
    }


    /* ------------------------ ELIMINAR ------------------------ */
    public function eliminarCausasDeCampania ( int $idCampania ) :void {
        $consulta = "DELETE FROM campanias_causas WHERE campania_id = :id";

        $this->bd->consulta($consulta);
        $this->bd->asignar(":id", $idCampania);

        $this->bd->ejecutar();
    }

    public function eliminarCampania ( int $idCampania ) :bool {
        $consulta = "DELETE FROM campanias WHERE id = :id";

        $this->bd->consulta($consulta);
        $this->bd->asignar(":id", $idCampania);

        return $this->bd->ejecutar();
    }

    

}

?>