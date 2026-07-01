<?php
class Usuario {
    protected $bd;    /* Se declara el atributo privado para mantener la conexión a la BD  */
    protected $camposUsuario = ['nombre', 'email', 'descripcion', 'telefono', 'ubicacion', 'img_perfil'];

    public function __construct() {
        $this->bd = new BaseDatos();
    }

    /* -------------------- METODOS DE CLASE -------------------- */
    public static function emailExiste (string $email): bool {
        $bd = new BaseDatos();

        $consulta = "SELECT id, email FROM usuarios 
                        WHERE email = :email";
        
        $bd->consulta($consulta);
        $bd->asignar(":email", $email);
        $bd->ejecutar();

        return (bool) $bd->resultado();
    }

    public static function estaRegistrado () :int {
        if (isset($_SESSION['id_usuario']))
            return $_SESSION['id_usuario'];
        else
            return 0;
    }

    /* -------------------- OBTENER DATOS (CONSULTAS) -------------------- */
    /* abstract public function obtenerUsuarios() :array;   */

    /* public function obtenerUsuarioporID( int $idUsuario ) :array|bool {
        $consulta = "SELECT * FROM usuarios WHERE id = :id";

        $this->bd->consulta($consulta);
        $this->bd->asignar(":id", $idUsuario);
        $this->bd->ejecutar();
        
        $resultado = $this->bd->resultado();
        return $resultado;
    } */
    
    public function obtenerFotoPerfil(int $idUsuario) : ?string {
        $consulta = "SELECT img_perfil FROM usuarios WHERE id = :id";

        $this->bd->consulta($consulta);
        $this->bd->asignar(":id", $idUsuario);
        $this->bd->ejecutar();
        
        $resultado = $this->bd->resultado();
        return $resultado ? $resultado['img_perfil'] : null;
    }

    /* -------------------- INSERTAR DATOS -------------------- */
    protected function nuevoUsuario( string $nombre, string $email, string $clave, string $telefono, ?string $ubicacion = null ) :bool {
        $consulta = "INSERT INTO `usuarios`(`nombre`, `email`, `clave`, `telefono`, `ubicacion`) 
                        VALUES (:nom, :email, :clave, :telef, :ubic)";
        $this->bd->consulta($consulta);

        $this->bd->asignar(":nom", $nombre);
        $this->bd->asignar(":email", $email);
        $this->bd->asignar(":clave", $clave);
        $this->bd->asignar(":telef", $telefono);
        $this->bd->asignar(":ubic", $ubicacion);

        return $this->bd->ejecutar();
    }
    // string $nombre, string $email, string $clave, string $telefono, ?string $ubicacion = null

    public function agregarDescripcion (int $id, string $desc) :bool{
        $consulta = "INSERT INTO usuarios (descripcion) 
                        VALUES (:descripcion) WHERE id = :id";
        $this->bd->consulta($consulta);

        $this->bd->asignar(":descripcion", $desc);
        $this->bd->asignar(":id", $id);
        
        return $this->bd->ejecutar();
        // RETORNA TRUE si se ejecutó con éxito.
    }

    public function agregarUbicacion (int $id, string $ubic) :bool{
        $consulta = "INSERT INTO usuarios (ubicacion) 
                        VALUES (:ubicacion) WHERE id = :id";
        $this->bd->consulta($consulta);

        $this->bd->asignar(":ubicacion", $ubic);
        $this->bd->asignar(":id", $id);
        
        return $this->bd->ejecutar();
        // RETORNA TRUE si se ejecutó con éxito.
    }

    public function agregarImagenPerfil (int $id, string $rutaArchivo) :bool{
        $consulta = "INSERT INTO usuarios (img_perfil) 
                        VALUES (:img_perfil) WHERE id = :id";
        $this->bd->consulta($consulta);

        $this->bd->asignar(":img_perfil", $rutaArchivo);
        $this->bd->asignar(":id", $id);
        
        return $this->bd->ejecutar();
        // RETORNA TRUE si se ejecutó con éxito.
    }

    /* -------------------- ACTUALIZAR DATOS -------------------- */
    protected function actualizarDatosUsuario( int $id, array $datos ) :bool {
        $campos = [];
        
        if(array_key_exists('nombre', $datos))
            $campos[] = "nombre = :nombre";
        if(array_key_exists('email', $datos))
            $campos[] = "email = :email";
        if(array_key_exists('descripcion', $datos))
            $campos[] = "descripcion = :descripcion";
        if(array_key_exists('telefono', $datos))
            $campos[] = "telefono = :telefono";
        if(array_key_exists('ubicacion', $datos))
            $campos[] = "ubicacion = :ubicacion";
        if(array_key_exists('img_perfil', $datos))
            $campos[] = "img_perfil = :img_perfil";
        if (empty($campos)) {
            return true;
        }

        $sql = "UPDATE usuarios SET " . implode(', ', $campos) . " WHERE id = :id";
        $this->bd->consulta($sql);
        $this->bd->asignar(":id", $id);

        $datosUsuario = array_intersect_key($datos, array_flip($this->camposUsuario));
        /* intersección: se queda con los que sí coinciden */
        foreach ($datosUsuario as $campo => $valor){
            $this->bd->asignar(":$campo", $valor);
        }
        
        return $this->bd->ejecutar();
    }

    public function actualizarFotoPerfil(int $idUsuario, string $rutaFoto) : bool {
        $consulta = "UPDATE usuarios SET img_perfil = :ruta WHERE id = :id";

        $this->bd->consulta($consulta);
        $this->bd->asignar(":ruta", $rutaFoto);
        $this->bd->asignar(":id", $idUsuario);
        
        return $this->bd->ejecutar();
    }

    /* -------------------- ELIMINAR -------------------- */
    public function eliminarCuentaCompleta(int $idUsuario, string $rol) : bool {
        $this->bd->beginTransaction();
        try {
            if ($rol === 'voluntario') {
                // Find volunteer ID
                $consultaVol = "SELECT id FROM voluntarios WHERE usuario_id = :usu_id";
                $this->bd->consulta($consultaVol);
                $this->bd->asignar(":usu_id", $idUsuario);
                $this->bd->ejecutar();
                $vol = $this->bd->resultado();
                
                if ($vol) {
                    $idVol = (int)$vol['id'];
                    
                    // 1. Delete from voluntarios_oficios
                    $this->bd->consulta("DELETE FROM voluntarios_oficios WHERE voluntario_id = :id_vol");
                    $this->bd->asignar(":id_vol", $idVol);
                    $this->bd->ejecutar();
                    
                    // 2. Delete from voluntarios_fijos
                    $this->bd->consulta("DELETE FROM voluntarios_fijos WHERE voluntario_id = :id_vol");
                    $this->bd->asignar(":id_vol", $idVol);
                    $this->bd->ejecutar();
                    
                    // 3. Delete from postulaciones
                    $this->bd->consulta("DELETE FROM postulaciones WHERE voluntario_id = :id_vol");
                    $this->bd->asignar(":id_vol", $idVol);
                    $this->bd->ejecutar();
                    
                    // 4. Delete from asistencias
                    $this->bd->consulta("DELETE FROM asistencias WHERE voluntario_id = :id_vol");
                    $this->bd->asignar(":id_vol", $idVol);
                    $this->bd->ejecutar();
                    
                    // 5. Delete from voluntarios
                    $this->bd->consulta("DELETE FROM voluntarios WHERE id = :id_vol");
                    $this->bd->asignar(":id_vol", $idVol);
                    $this->bd->ejecutar();
                }
            } elseif ($rol === 'organizacion') {
                // Find organization ID
                $consultaOrg = "SELECT id FROM organizaciones WHERE usuario_id = :usu_id";
                $this->bd->consulta($consultaOrg);
                $this->bd->asignar(":usu_id", $idUsuario);
                $this->bd->ejecutar();
                $org = $this->bd->resultado();
                
                if ($org) {
                    $idOrg = (int)$org['id'];
                    
                    // 1. Delete from organizaciones_causas
                    $this->bd->consulta("DELETE FROM organizaciones_causas WHERE organizacion_id = :id_org");
                    $this->bd->asignar(":id_org", $idOrg);
                    $this->bd->ejecutar();
                    
                    // 2. Delete from voluntarios_fijos
                    $this->bd->consulta("DELETE FROM voluntarios_fijos WHERE organizacion_id = :id_org");
                    $this->bd->asignar(":id_org", $idOrg);
                    $this->bd->ejecutar();
                    
                    // 3. Delete from organizaciones
                    $this->bd->consulta("DELETE FROM organizaciones WHERE id = :id_org");
                    $this->bd->asignar(":id_org", $idOrg);
                    $this->bd->ejecutar();
                }
            }

            // 6. Delete all campaigns created by this user (and their dependencies)
            // Find campaign IDs
            $consultaCamps = "SELECT id FROM campanias WHERE usuario_id = :usu_id";
            $this->bd->consulta($consultaCamps);
            $this->bd->asignar(":usu_id", $idUsuario);
            $this->bd->ejecutar();
            $camps = $this->bd->resultados();
            
            foreach ($camps as $camp) {
                $campId = (int)$camp['id'];
                
                // a. Delete from campanias_causas
                $this->bd->consulta("DELETE FROM campanias_causas WHERE campania_id = :camp_id");
                $this->bd->asignar(":camp_id", $campId);
                $this->bd->ejecutar();
                
                // b. Delete from archivos
                $this->bd->consulta("DELETE FROM archivos WHERE campania_id = :camp_id");
                $this->bd->asignar(":camp_id", $campId);
                $this->bd->ejecutar();
                
                // c. Delete from codigos_asistencia
                $this->bd->consulta("DELETE FROM codigos_asistencia WHERE campania_id = :camp_id");
                $this->bd->asignar(":camp_id", $campId);
                $this->bd->ejecutar();
                
                // d. Delete from postulaciones
                $this->bd->consulta("DELETE FROM postulaciones WHERE campania_id = :camp_id");
                $this->bd->asignar(":camp_id", $campId);
                $this->bd->ejecutar();
                
                // e. Delete from asistencias
                $this->bd->consulta("DELETE FROM asistencias WHERE campania_id = :camp_id");
                $this->bd->asignar(":camp_id", $campId);
                $this->bd->ejecutar();
                
                // f. Delete from invitaciones
                $this->bd->consulta("DELETE FROM invitaciones WHERE campania_id = :camp_id");
                $this->bd->asignar(":camp_id", $campId);
                $this->bd->ejecutar();
                
                // g. Delete from campanias
                $this->bd->consulta("DELETE FROM campanias WHERE id = :camp_id");
                $this->bd->asignar(":camp_id", $campId);
                $this->bd->ejecutar();
            }

            // 7. Delete all general invitations (sent or received by this user)
            $this->bd->consulta("DELETE FROM invitaciones WHERE emisor_id = :usu_id OR destinatario_id = :usu_id");
            $this->bd->asignar(":usu_id", $idUsuario);
            $this->bd->ejecutar();

            // 8. Delete from usuarios
            $this->bd->consulta("DELETE FROM usuarios WHERE id = :usu_id");
            $this->bd->asignar(":usu_id", $idUsuario);
            $this->bd->ejecutar();

            $this->bd->commit();
            return true;
        } catch (Exception $e) {
            $this->bd->rollBack();
            return false;
        }
    }

}

?>