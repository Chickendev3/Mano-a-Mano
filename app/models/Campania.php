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


    /* ------------------------ INSERTAR DATOS ------------------------ */
    public function crearNuevaCampania (int $idUsuario, string $tipoConvocatoria, string $titulo, string $fechaFinalizacion, ?string $descripcion = null, ?string $infoAdicional = null ) :bool {
        $idTipo = $this->obtenerIDTipoPorNombre( $tipoConvocatoria );
        
        $consulta = "INSERT INTO `campanias`(`usuario_id`, `tipo_id`, `titulo`, `descripcion`, `fecha_finalizacion`, `info_adicional`) 
                        VALUES (:usu_id, :tipo_id, :titulo, :descripcion, :fecha_fin, :info_ad)";
        $this->bd->consulta($consulta);

        $this->bd->asignar(":usu_id", $idUsuario);
        $this->bd->asignar(":tipo_id", $idTipo);
        $this->bd->asignar(":titulo", $titulo);
        $this->bd->asignar(":descripcion", $descripcion);
        $this->bd->asignar(":fecha_fin", $fechaFinalizacion);
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