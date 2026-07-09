<?php
class Invitacion {
    private $bd;

    public function __construct() {
        $this->bd = new BaseDatos();
    }

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

        /* Vista desde Destinatarios (Lista de Invitaciones recibidas por el Destinatario) */
        $consulta = "SELECT i.id, i.campania_id, c.titulo, c.descripcion, c.ubicacion, e.estado, u.id as emisor_id, 
                            CASE WHEN v_e.id IS NOT NULL THEN CONCAT(u.nombre, ' ', v_e.apellido) ELSE u.nombre END as emisor_nombre, 
                            u.img_perfil as emisor_img_perfil,
                            CASE WHEN v_e.id IS NOT NULL THEN 'voluntario' ELSE 'organizacion' END as emisor_rol
                     FROM invitaciones i 
                     JOIN campanias c ON i.campania_id = c.id
                     JOIN usuarios u ON i.emisor_id = u.id
                     JOIN estados e ON i.estado_id = e.id
                     LEFT JOIN voluntarios v_e ON i.emisor_id = v_e.usuario_id
                     WHERE i.destinatario_id = :id_destin;";
        
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_destin", $idDestinatario);
        $this->bd->ejecutar();

        return $this->bd->resultados();
    }

    public function obtenerInvitacionesPorEmisor ( int $idEmisor ) :array {
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
        $consulta = "SELECT i.id, i.campania_id, c.titulo, c.descripcion, c.ubicacion, e.estado, u.id as destinatario_id, 
                            CASE WHEN v_d.id IS NOT NULL THEN CONCAT(u.nombre, ' ', v_d.apellido) ELSE u.nombre END as destinatario_nombre, 
                            u.img_perfil as destinatario_img_perfil,
                            CASE WHEN v_d.id IS NOT NULL THEN 'voluntario' ELSE 'organizacion' END as destinatario_rol
                     FROM invitaciones i 
                     JOIN campanias c ON i.campania_id = c.id
                     JOIN usuarios u ON i.destinatario_id = u.id
                     JOIN estados e ON i.estado_id = e.id
                     LEFT JOIN voluntarios v_d ON i.destinatario_id = v_d.usuario_id
                     WHERE i.emisor_id = :id_emisor;";
        
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_emisor", $idEmisor);
        $this->bd->ejecutar();

        return $this->bd->resultados();
    }

    /* Obtener asociaciones de una organización */
    public function obtenerAsociacionesPorOrganizacion ( int $idUsuario ) :array {
        $consulta = "SELECT c.id, c.titulo, c.descripcion, c.fecha_inicio, c.fecha_finalizacion as endDate, c.ubicacion, c.info_adicional, u_creator.id as creator_id, 
                        CASE WHEN v_creator.id IS NOT NULL THEN CONCAT(u_creator.nombre, ' ', v_creator.apellido) ELSE u_creator.nombre END as creator_name, 
                        u_creator.img_perfil as creator_img,
                        CASE WHEN v_creator.id IS NOT NULL THEN 'voluntario' ELSE 'organizacion' END as creator_role,
                        u_invited.id as invited_id, 
                        u_invited.nombre as invited_name, 
                        u_invited.img_perfil as invited_img,
                        'organizacion' as invited_role
                            FROM campanias c
                            JOIN usuarios u_creator ON c.usuario_id = u_creator.id
                            LEFT JOIN voluntarios v_creator ON u_creator.id = v_creator.usuario_id
                            JOIN invitaciones i ON c.id = i.campania_id AND i.estado_id = 1
                            JOIN usuarios u_invited ON i.destinatario_id = u_invited.id
                            JOIN organizaciones o_invited ON u_invited.id = o_invited.usuario_id
                            WHERE c.usuario_id = :usuario_id OR i.destinatario_id = :usuario_id;";
        
        $this->bd->consulta($consulta);
        $this->bd->asignar(":usuario_id", $idUsuario);
        $this->bd->ejecutar();

        return $this->bd->resultados();
    }

    /* Obtener organizaciones asociadas a una campaña específica (Aceptadas) */
    public function obtenerAsociacionesPorCampania( int $idCampania ) :array {
        $consulta = "SELECT u.id, u.nombre, u.img_perfil 
                     FROM invitaciones i 
                     JOIN usuarios u ON i.destinatario_id = u.id
                     JOIN organizaciones o ON u.id = o.usuario_id
                     WHERE i.campania_id = :camp_id AND i.estado_id = 1;";
        
        $this->bd->consulta($consulta);
        $this->bd->asignar(":camp_id", $idCampania);
        $this->bd->ejecutar();

        return $this->bd->resultados();
    }

    /* ------------------------ INSERTAR DATOS ------------------------ */
    public function nuevaInvitacion ( int $idCampania, int $idEmisor, int $idDestinatario ) :bool {
        // Verificar si ya existe una invitación activa o pendiente
        $check = "SELECT id FROM invitaciones WHERE campania_id = :id_camp AND emisor_id = :id_emisor AND destinatario_id = :id_destin AND estado_id IN (1, 3);";
        $this->bd->consulta($check);
        $this->bd->asignar(":id_camp", $idCampania);
        $this->bd->asignar(":id_emisor", $idEmisor);
        $this->bd->asignar(":id_destin", $idDestinatario);
        $this->bd->ejecutar();
        if ($this->bd->resultado()) {
            return false;
        }

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
        $consulta = "UPDATE invitaciones SET estado_id = 2  
                        WHERE campania_id = :id_camp 
                        AND estado_id = 3
                        AND (SELECT fecha_finalizacion FROM campanias WHERE id = :id_camp) < CURDATE();";
        
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_camp", $idCampania);
        $this->bd->ejecutar();
    }

    public function cambiarEstadoInvitacion ( int $idInvitacion, string $estado ) :bool {
        $estadoUpper = strtoupper($estado);
        $estadoId = ($estadoUpper === 'ACEPTADO') ? 1 : (($estadoUpper === 'RECHAZADO') ? 2 : 3);

        $consulta = "UPDATE invitaciones SET estado_id = :estado_id WHERE id = :id_invitacion;";
        $this->bd->consulta($consulta);
        $this->bd->asignar(":estado_id", $estadoId);
        $this->bd->asignar(":id_invitacion", $idInvitacion);
        $ok = $this->bd->ejecutar();

        return $ok;
    }

    /* ------------------------ ELIMINAR ------------------------ */
    public function cancelarInvitacion( int $idInvitacion ) :bool {
        $consulta = "DELETE FROM invitaciones WHERE id = :id_inv;";
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_inv", $idInvitacion);
        return $this->bd->ejecutar();
    }
}
?>