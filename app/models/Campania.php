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
    public function obtenerCampanias() :array {
        /* Actualizalizar el estado de la campaña en caso de fecha de finalización vencida */

        $consulta = "SELECT o.*, t.tipo as 'nombre_tipo'
                        FROM organizaciones o JOIN tipos_campanias t ON t.id = o.tipo_id;";
    
        $this->bd->consulta($consulta);
        $this->bd->ejecutar();

        return $this->bd->resultados();
    }

    public function obtenerCampaniaPorID ( int $idCampania ) :array {
        $consulta = "SELECT o.*, t.tipo as 'nombre_tipo'
                        FROM organizaciones o JOIN tipos_campanias t ON t.id = o.tipo_id
                        WHERE o.id = :id;";
    
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id", $idCampania);
        $this->bd->ejecutar();

        return $this->bd->resultado();
    }

    public function obtenerImgenesPorCampania ( int $idCampania ) :array {
        $consulta = "SELECT a.referencia, a.tipo as 'tipo_archivo'
                        FROM organizaciones o JOIN archivos a ON o.id = a.campania_id
                        WHERE o.id = :id;";
    
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


    /* ------------------------ ACTUALIZAR DATOS ------------------------ */
    public function actualizarDatosCampania (int $idCampania, array $datos) :bool {
        /* $datos puede contener: titulo, descripcion, fechaFinalizacion e infoAdicional */
        
        if (empty($datos)) {
            return true;
        }
        $campos = [];
        
        if(isset($datos['titulo']))
            $campos[] = "titulo = :titulo";
        if(isset($datos['descripcion']))
            $campos[] = "descripcion = :descripcion";
        if(isset($datos['fecha_finalizacion']))
            $campos[] = "fecha_finalizacion = :fecha_finalizacion";
        if(isset($datos['fecha_inicio']))
            $campos[] = "fecha_inicio = :fecha_inicio";
        if(isset($datos['ubicacion']))
            $campos[] = "ubicacion = :ubicacion";
        if(isset($datos['info_adicional']))
            $campos[] = "info_adicional = :info_adicional";

        $consulta = "UPDATE campanias SET " . implode(', ', $campos) . " WHERE id = :campania_id";
        $this->bd->consulta($consulta);

        $this->bd->asignar(":campania_id", $idCampania);
        foreach ($datos as $campo => $valor){
            $this->bd->asignar(":$campo", $valor);
        }

        return $this->bd->ejecutar();
    }


    /* ------------------------ ELIMINAR ------------------------ */

}

?>