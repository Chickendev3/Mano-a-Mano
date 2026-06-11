<?php
class Invitacion {
    private $bd;

    public function __construct() {
        $this->bd = new BaseDatos();
    }

    /* 
        FALTAN VER LOS DETELEs

    */

    /* -------------------- OBTENER DATOS (CONSULTAS) -------------------- */
    public function obtenerInvitacionesPorDestinatario ( int $idDestinatario ) :array {
        $id_campanias = "SELECT c.id as 'campania_id' 
                        FROM invitaciones i JOIN campanias c ON i.campania_id = c.id
                        WHERE i.destinatario_id = :id_destin;";
        
        $this->bd->consulta($id_campanias);
        $this->bd->asignar(":id_destin", $idDestinatario);
        $this->bd->ejecutar();

        $invitaciones = $this->bd->resultados();
        foreach ($invitaciones as $invitacion){
            $this->actualizarInvitacionesVencidas($invitacion['campania_id']);
        }


        /* Vista desde Destinatarios (Lista de Invitaciones recibidas por el Desinatario) */
        $consulta = "SELECT u.img_perfil as 'imagen_perfil_emisor', c.titulo, c.descripcion, e.estado
                        FROM invitaciones i JOIN usuarios u ON i.emisor_id = u.id
                                            JOIN campanias c ON i.campania_id = c.id
                                            JOIN estados e ON i.estado_id = e.id
                        WHERE i.destinatario_id = :id_destin;";
        
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_destin", $idDestinatario);
        $this->bd->ejecutar();

        return $this->bd->resultados();
    }

    public function obtenerInvitacionesPorEmisor ( int $idEmisor ) :void {
        $id_campanias = "SELECT c.id as 'campania_id' 
                        FROM invitaciones i JOIN campanias c ON i.campania_id = c.id
                        WHERE i.emisor_id = :id_emisor;";
        
        $this->bd->consulta($id_campanias);
        $this->bd->asignar(":id_emisor", $idEmisor);
        $this->bd->ejecutar();

        $invitaciones = $this->bd->resultados();
        foreach ($invitaciones as $invitacion){
            $this->actualizarInvitacionesVencidas($invitacion['campania_id']);
        }


        /* Vista desde Emisores (Lista de Invitaciones que fueron enviadas por los Usuarios) */

        /* .............. FALTA DEFINIR (ojo que quedó retorno void CAMBIAR A array CUANDO SE COMPLETE EL METODO) ............... */
    }



    /* ------------------------ INSERTAR DATOS ------------------------ */
    public function nuevaInvitacion ( int $idCampania, int $idEmisor, int $idDestinatario ) :bool {
        $consulta = "INSERT INTO `invitaciones`(`campania_id`, `emisor_id`, `destinatario_id`, `estado_id`) 
                        VALUES (:id_camp, :id_emisor, :id_destin, 3);";

        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_camp", $idCampania);
        $this->bd->asignar(":id_emisor", $idEmisor);
        $this->bd->asignar(":id_destin", $idDestinatario);

        return $this->bd->ejecutar();
    }


    /* ------------------------ ACTUALIZAR DATOS ------------------------ */

    private function actualizarInvitacionesVencidas (int $idCampania) :void {
        // Al obtener postulaciones, primero actualizar las vencidas
        $consulta = "UPDATE invitaciones SET estado_id = 2  
                        WHERE campania_id = :id_camp 
                        AND estado_id = 3
                        AND (SELECT fecha_finalizacion FROM campanias WHERE id = :id_camp) < CURDATE();";
        
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_camp", $idCampania);
        $this->bd->ejecutar();
    }

    public function cambiarEstadoInvitacion ( int $idInvitacion, string $estado ) :bool {
        if (strtoupper($estado) == 'ACEPTADO') {
            $consulta = "UPDATE postulaciones SET estado_id = 1 
                            WHERE id = :id_postulacion;";
            $this->bd->consulta($consulta);
            $this->bd->asignar(":id_postulacion", $idInvitacion);
        }
        if (strtoupper($estado) == 'RECHAZADO') {
            $consulta = "UPDATE postulaciones SET estado_id = 2 
                            WHERE id = :id_postulacion;";
            $this->bd->consulta($consulta);
            $this->bd->asignar(":id_postulacion", $idInvitacion);
        }
        
        return $this->bd->ejecutar();
    }


    /* ------------------------ ELIMINAR ------------------------ */

}
?>