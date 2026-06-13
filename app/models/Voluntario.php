<?php
include_once "../app/models/Usuario.php";

class Voluntario extends Usuario{

    public function __construct() {
        parent::__construct();
    }

    /* 
        FALTAN VER LAS EL TEMA DE LAS ETIQUETAS y los DETELEs

        Además de gestionar las TABLAS DE RELACIÓN según les correspondan
    */


    /* -------------------- OBTENER DATOS (CONSULTAS) -------------------- */
    public function obtenerUsuarios() :array {
        $consulta = "SELECT u.id as 'id', CONCAT(u.nombre, ' ', v.apellido) as 'nombre completo', u.email, u.telefono, u.ubicacion, v.telefono_emergencia, v.disponibilidad_horaria, u.img_perfil 
                        FROM usuarios u JOIN voluntarios v ON u.id = v.usuario_id;";
    
        $this->bd->consulta($consulta);
        $this->bd->ejecutar();

        return $this->bd->resultados();
    }

    public function obtenerUsuarioPorID ( int $idUsuario ) :array {
        $consulta = "SELECT u.id as 'id', CONCAT(u.nombre, ' ', v.apellido) as 'nombre completo', u.email, u.descripcion, u.telefono, u.ubicacion, v.telefono_emergencia, v.disponibilidad_horaria, u.img_perfil 
                        FROM usuarios u JOIN voluntarios v ON u.id = v.usuario_id
                        WHERE v.usuario_id = :id";
    
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id", $idUsuario);
        $this->bd->ejecutar();

        return $this->bd->resultado();
    }

    public function obtenerIDVoluntario ( int $idUsuario ) :array {
        $consulta = "SELECT v.id 
                        FROM voluntarios v JOIN usuarios u ON u.id = v.usuario_id
                        WHERE u.id = :id_usuario";
    
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_usuario", $idUsuario);
        $this->bd->ejecutar();

        return $this->bd->resultado();
    }

    public function obtenerVoluntarioPorEmail( string $email ) :array|bool {
        $consulta = "SELECT u.id as 'id_usuario', v.id as 'id_voluntario', u.nombre, v.apellido, u.email as 'email', u.clave, u.telefono, u.ubicacion, v.telefono_emergencia, v.disponibilidad_horaria, u.img_perfil 
                        FROM usuarios u JOIN voluntarios v ON u.id = v.usuario_id
                        WHERE u.email = :email;";
    
        $this->bd->consulta($consulta);
        $this->bd->asignar(":email", $email);
        $this->bd->ejecutar();

        return $this->bd->resultado();
    }


    /* -------------------- INSERTAR DATOS -------------------- */
    public function nuevoVoluntario( string $nombre, string $apellido, string $email, string $clave, string $telefono, ?string $telefonoEmergencia = null, ?string $ubicacion = null ) :bool {
        
        parent::nuevoUsuario($nombre, $email, $clave, $telefono, $ubicacion);

        $sql = "SELECT id FROM usuarios u WHERE u.email = :email";
        $this->bd->consulta($sql);
        $this->bd->asignar(":email", $email);
        $this->bd->ejecutar();
        $usuarioID = $this->bd->resultado()['id'];

        $consulta = "INSERT INTO `voluntarios`(`usuario_id`, `apellido`, `telefono_emergencia`) 
                        VALUES (:us_id, :apell, :telefono_eme)";
        $this->bd->consulta($consulta);

        $this->bd->asignar(":us_id", $usuarioID);
        $this->bd->asignar(":apell", $apellido);
        $this->bd->asignar(":telefono_eme", $telefonoEmergencia);

        return $this->bd->ejecutar();
    }


    /* -------------------- ACTUALIZAR DATOS -------------------- */
    public function actualizarDatosVoluntario (int $idUsuario, array $datos) :bool {
        /* $datos tiene los campos que se quieren actualizar */
        
        parent::actualizarDatosUsuario($idUsuario, $datos);
        
        $datosVoluntario = array_diff_key($datos, array_flip($this->camposUsuario));
        /* diferencia: se queda con los que no coinciden */
        if (empty($datosVoluntario)) {
            return true;
        }
        $campos = [];
        
        if(isset($datosVoluntario['apellido']))
            $campos[] = "apellido = :apellido";
        if(isset($datosVoluntario['telefono_emergencia']))
            $campos[] = "telefono_emergencia = :telefono_emergencia";
        if(isset($datosVoluntario['disponibilidad_horaria']))
            $campos[] = "disponibilidad_horaria = :disponibilidad_horaria";
        
        $sql = "UPDATE voluntarios SET " . implode(', ', $campos) . " WHERE id_usuario = :id_usuario";
        $this->bd->consulta($sql);

        $this->bd->asignar(":id_usuario", $idUsuario);
        foreach ($datosVoluntario as $campo => $valor){
            $this->bd->asignar(":$campo", $valor);
        }
        
        return $this->bd->ejecutar();
    }

    /* -------------------- ELIMINAR -------------------- */

}

?>