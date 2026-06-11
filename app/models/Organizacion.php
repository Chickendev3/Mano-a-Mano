<?php
include_once "../app/models/Usuario.php";

class Organizacion extends Usuario {

    public function __construct() {
        parent::__construct();
    }

    /* 
        FALTAN VER LAS EL TEMA DE LAS ETIQUETAS y los DETELEs

        Además de gestionar las TABLAS DE RELACIÓN según les correspondan
    */

    /* -------------------- OBTENER DATOS (CONSULTAS) -------------------- */
    public function obtenerUsuarios() :array {
        $consulta = "SELECT u.id as 'id', u.nombre as 'nombre', u.email, u.telefono, u.ubicacion, u.img_perfil 
                        FROM usuarios u JOIN organizaciones o ON u.id = o.usuario_id;";
    
        $this->bd->consulta($consulta);
        $this->bd->ejecutar();

        return $this->bd->resultados();
    }

    public function obtenerUsuarioPorID( int $idUsuario ) :array {
        $consulta = "SELECT u.id as 'id', u.nombre as 'nombre', u.email, u.descripcion, u.telefono, u.ubicacion, u.img_perfil 
                        FROM usuarios u JOIN organizaciones o ON u.id = o.usuario_id
                        WHERE o.usuario_id = :id";
    
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id", $idUsuario);
        $this->bd->ejecutar();

        return $this->bd->resultado();
    }

    public function obtenerIDOrganizacion ( int $idUsuario ) :array {
        $consulta = "SELECT o.id 
                        FROM organizaciones o JOIN usuarios u ON u.id = o.usuario_id
                        WHERE u.id = :id_usuario";
    
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_usuario", $idUsuario);
        $this->bd->ejecutar();

        return $this->bd->resultado();
    }

    /* public function obtenerOrganizacionPorEmail( string $email ) :array {
        $consulta = "SELECT u.id as 'id', u.nombre as 'nombre', u.email as 'email', u.telefono, u.ubicacion, u.img_perfil 
                        FROM usuarios u JOIN organizaciones o ON u.id = o.usuario_id
                        WHERE u.email = :email";
    
        $this->bd->consulta($consulta);
        $this->bd->asignar(":email", $email);
        $this->bd->ejecutar();

        return $this->bd->resultado();
    } */

    /* -------------------- INSERTAR DATOS -------------------- */
    public function nuevaOrganizacion( string $nombre, string $email, string $clave, string $telefono, ?string $ubicacion = null ) :bool {
        
        parent::nuevoUsuario($nombre, $email, $clave, $telefono, $ubicacion);
        $sql = "SELECT id FROM usuarios u WHERE u.email = :email";
        $this->bd->consulta($sql);
        $this->bd->asignar(":email", $email);
        $this->bd->ejecutar();
        $usuarioID = $this->bd->resultado()['id'];

        $consulta = "INSERT INTO `organizaciones`(`usuario_id`) 
                        VALUES (:us_id)";
        $this->bd->consulta($consulta);

        $this->bd->asignar(":us_id", $usuarioID);

        return $this->bd->ejecutar();
    }


    /* -------------------- ACTUALIZAR DATOS -------------------- */
    public function actualizarDatosOrganizacion (int $idUsuario, array $datos) :bool {
        /* $datos tiene los campos que se quieren actualizar */
        
        parent::actualizarDatosUsuario($idUsuario, $datos);
                 
        return true;
    }

    /* -------------------- ELIMINAR -------------------- */


}
?>