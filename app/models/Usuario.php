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
    /* abstract public function obtenerUsuarios() :array;

    abstract public function obtenerUsuarioporID( int $id ) :array; */
    
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

    

}

?>