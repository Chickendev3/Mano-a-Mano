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
    public function obtenerVoluntarios ( array $filtros = [] ) :array {
        $condiciones = [];
        $parametros = [];

        if (!empty($filtros['q'])) {
            $condiciones[] = "(u.nombre LIKE :q OR v.apellido LIKE :q OR u.descripcion LIKE :q)";
            $parametros[':q'] = '%' . $filtros['q'] . '%';
        }
        if (!empty($filtros['category'])) {
            $condiciones[] = "u.id IN (SELECT vo.voluntario_id FROM voluntarios_oficios vo JOIN oficios o ON vo.oficio_id = o.id WHERE o.oficio = :category)";
            $parametros[':category'] = $filtros['category'];
        }
        if (!empty($filtros['location'])) {
            $condiciones[] = "u.ubicacion LIKE :location";
            $parametros[':location'] = '%' . $filtros['location'] . '%';
        }
        $where = !empty($condiciones) ? " AND " . implode(" AND ", $condiciones) : "";
        
        $consulta = "SELECT u.id as 'id', CONCAT(u.nombre, ' ', v.apellido) as 'nombre completo', u.email, u.telefono, u.ubicacion, v.telefono_emergencia, v.disponibilidad_horaria, u.img_perfil 
                        FROM usuarios u JOIN voluntarios v ON u.id = v.usuario_id
                        WHERE 1=1 " . $where;
    
        $this->bd->consulta($consulta);
        foreach ($parametros as $key => $val) {
            $this->bd->asignar($key, $val);
        }
        $this->bd->ejecutar();

        return $this->bd->resultados();
    }

    public function obtenerOficios() :array {
        $consulta = "SELECT oficio FROM `oficios`;";
        
        $this->bd->consulta($consulta);
        $this->bd->ejecutar();
        
        return $this->bd->resultados();
    }

    public function obtenerVoluntarioPorID ( int $idUsuario ) :array {
        $consulta = "SELECT u.id as 'id', CONCAT(u.nombre, ' ', v.apellido) as 'nombre completo', u.email, u.descripcion, u.telefono, u.ubicacion, v.telefono_emergencia, v.disponibilidad_horaria, u.img_perfil 
                        FROM usuarios u JOIN voluntarios v ON u.id = v.usuario_id
                        WHERE v.usuario_id = :id";
    
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id", $idUsuario);
        $this->bd->ejecutar();

        return $this->bd->resultado();
    }

    public function obtenerIDVoluntario ( int $idUsuario ) :array|bool {
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

    /* public function obtenerCampaniasPorVoluntario ( int $idVoluntario ) :array {

    } */

    public function obtenerInsignias ( int $idUsuario ) : array {
        $idVol = $this->obtenerIDVoluntario( $idUsuario );

        if ($idVol == false){
            return [];     // Falló o no hay voluntario con ese ID
        }

        $consulta = "SELECT u.nombre FROM `voluntarios_fijos` vf 
                        JOIN voluntarios v ON vf.voluntario_id = v.id
                        JOIN organizaciones o ON vf.organizacion_id = o.id
                        JOIN usuarios u ON o.usuario_id = u.id
                        WHERE vf.activo = true AND v.id = :id_vol;";
    
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_vol", (int) $idVol['id']);
        $this->bd->ejecutar();

        return $this->bd->resultados();
    }
    
    public function obtenerOficiosVoluntario (int $idUsuario) :array {
        $idVol = $this->obtenerIDVoluntario( $idUsuario );

        if (!$idVol){
            return [];     // Falló o no hay voluntario con ese ID
        }

        $consulta = "SELECT of.oficio FROM `voluntarios_oficios` vo 
                        JOIN voluntarios v ON vo.voluntario_id = v.id
                        JOIN oficios of ON vo.oficio_id = of.id
                        WHERE v.id = :id_vol;";

        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_vol", (int) $idVol['id']);
        $this->bd->ejecutar();

        return $this->bd->resultados();
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