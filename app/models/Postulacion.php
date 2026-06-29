<?php
class Postulacion {
    private $bd;

    public function __construct() {
        $this->bd = new BaseDatos();
    }

    /* -------------------- OBTENER DATOS (CONSULTAS) -------------------- */
    public function obtenerPostulacionesPorCampania ( int $idCampania ) :array {
        $this->actualizarPostulacionesVencidas( $idCampania );

        /* Vista desde una Campania (Lista de Postulantes) */
        $consulta = "SELECT p.id, u.id as usuario_id, CONCAT(u.nombre, ' ', v.apellido) as 'nombre_completo', u.img_perfil, u.telefono, u.email, e.estado 
                        FROM postulaciones p JOIN campanias c ON p.campania_id = c.id
                                            JOIN estados e ON p.estado_id = e.id
                                            JOIN voluntarios v ON p.voluntario_id = v.id
                                            JOIN usuarios u ON v.usuario_id = u.id 
                        WHERE c.id = :id_campania ;";
    
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_campania", $idCampania);
        $this->bd->ejecutar();

        return $this->bd->resultados();
    }

    public function obtenerPostulacionesPorVoluntario (int $idVoluntario) :array {
        $id_campanias = "SELECT c.id as 'campania_id' 
                        FROM postulaciones p JOIN voluntarios v ON p.voluntario_id = v.id
                                            JOIN campanias c ON p.campania_id = c.id
                        WHERE v.id = :id_voluntario;";
        
        $this->bd->consulta($id_campanias);
        $this->bd->asignar(":id_voluntario", $idVoluntario);
        $this->bd->ejecutar();

        $postulaciones = $this->bd->resultados();
        foreach ($postulaciones as $postulacion){
            $this->actualizarPostulacionesVencidas($postulacion['campania_id']);
        }
        
        /* Vista desde Voluntario (Lista de sus propias Postulaciones) */
        $consulta = "SELECT p.id, c.id as campania_id, c.usuario_id as 'creador_usuario_id', 
                            CASE WHEN v_c.id IS NOT NULL THEN CONCAT(u.nombre, ' ', v_c.apellido) ELSE u.nombre END as 'creador_nombre', 
                            u.img_perfil as 'creador_img_perfil',
                            CASE WHEN v_c.id IS NOT NULL THEN 'voluntario' ELSE 'organizacion' END as 'creador_usuario_rol',
                            c.titulo, c.descripcion, e.estado, c.ubicacion, c.fecha_inicio, c.fecha_finalizacion, c.info_adicional 
                        FROM postulaciones p JOIN voluntarios v ON p.voluntario_id = v.id
                                            JOIN campanias c ON p.campania_id = c.id
                                            JOIN usuarios u ON c.usuario_id = u.id
                                            JOIN estados e ON p.estado_id = e.id
                                            LEFT JOIN voluntarios v_c ON c.usuario_id = v_c.usuario_id
                        WHERE v.id = :id_voluntario;";

        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_voluntario", $idVoluntario);
        $this->bd->ejecutar();

        return $this->bd->resultados();
    }

    /* public function obtenerIdPostulacion (int $idCampania, int $idVoluntario) :array|bool {
        $consulta = "SELECT p.id, u.id as usuario_id, CONCAT(u.nombre, ' ', v.apellido) as 'nombre_completo', u.img_perfil, u.telefono, e.estado 
                         FROM postulaciones p JOIN campanias c ON p.campania_id = c.id
                                             JOIN estados e ON p.estado_id = e.id
                                             JOIN voluntarios v ON p.voluntario_id = v.id
                                             JOIN usuarios u ON v.usuario_id = u.id 
                         WHERE c.id = :id_campania ;";
        
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_camp", $idCampania);
        $this->bd->asignar(":id_vol", $idVoluntario);
        $this->bd->ejecutar();

        return $this->bd->resultado();
    }  */

    public function obtenerIdPostulacion (int $idCampania, int $idVoluntario) :array|bool {
        $consulta = "SELECT id FROM postulaciones 
                        WHERE voluntario_id = :id_vol AND campania_id = :id_camp;";
        
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_camp", $idCampania);
        $this->bd->asignar(":id_vol", $idVoluntario);
        $this->bd->ejecutar();

        return $this->bd->resultado();
    }

    public function obtenerCreadorCampaniaPorPostulacion(int $idPostulacion) :int|bool {
        $consulta = "SELECT c.usuario_id 
                        FROM postulaciones p JOIN campanias c ON p.campania_id = c.id
                        WHERE p.id = :id_postulacion;";
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_postulacion", $idPostulacion);
        $this->bd->ejecutar();
        $res = $this->bd->resultado();
        return $res ? (int)$res['usuario_id'] : false;
    }

        public function obtenerUsuarioIdDePostulacion(int $idPostulacion) :int|bool {
        $consulta = "SELECT v.usuario_id 
                        FROM postulaciones p JOIN voluntarios v ON p.voluntario_id = v.id
                        WHERE p.id = :id_postulacion;";
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_postulacion", $idPostulacion);
        $this->bd->ejecutar();
        $res = $this->bd->resultado();
        return $res ? (int)$res['usuario_id'] : false;
    }


    /* ------------------------ INSERTAR DATOS ------------------------ */
    public function nuevaPostulacion (int $idCampania, int $idVoluntario) :bool {
        $consulta = "INSERT INTO postulaciones(`voluntario_id`, `campania_id`, `estado_id`) 
                        VALUES (:id_voluntario, :id_campania, 3);";

        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_campania", $idCampania);
        $this->bd->asignar(":id_voluntario", $idVoluntario);

        return $this->bd->ejecutar();
    }


    /* ------------------------ ACTUALIZAR DATOS ------------------------ */
    private function actualizarPostulacionesVencidas(int $idCampania): void {
        // Al obtener postulaciones, primero actualizar las vencidas
        $consulta = "UPDATE postulaciones SET estado_id = 2  
                        WHERE campania_id = :id_camp 
                        AND estado_id = 3
                        AND (SELECT fecha_finalizacion FROM campanias WHERE id = :id_camp) < CURDATE();";
        
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_camp", $idCampania);
        $this->bd->ejecutar();
    }

    public function cambiarEstadoPostulacion ( int $idPostulacion, string $estado ) :bool {
        
        if (strtoupper($estado) == 'ACEPTADO') {
            $consulta = "UPDATE postulaciones SET estado_id = 1 
                            WHERE id = :id_postulacion;";
            $this->bd->consulta($consulta);
            $this->bd->asignar(":id_postulacion", $idPostulacion);
        }
        if (strtoupper($estado) == 'RECHAZADO') {
            $consulta = "UPDATE postulaciones SET estado_id = 2 
                            WHERE id = :id_postulacion;";
            $this->bd->consulta($consulta);
            $this->bd->asignar(":id_postulacion", $idPostulacion);
        }
        
        return $this->bd->ejecutar();
    }


    /* ------------------------ ELIMINAR ------------------------ */
    public function eliminarPostulacion(int $idPostulacion) :bool {
        $consulta = "DELETE FROM postulaciones WHERE id = :id_postulacion;";
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_postulacion", $idPostulacion);
        return $this->bd->ejecutar();
    }

}
?>