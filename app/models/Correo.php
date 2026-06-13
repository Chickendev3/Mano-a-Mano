<?php
class Correo {
    private $bd;

    public function __construct() {
        $this->bd = new BaseDatos();
    }

    /* ------------------------ INSERTAR DATOS ------------------------ */
    public function nuevoCorreo ( string $nombre, string $apellido, string $email, string $asunto, string $cuerpo ) : bool {
        $consulta = "INSERT INTO `correos`(`nombre`, `email`, `apellido`, `asunto`, `cuerpo`) 
                            VALUES (:nom, :email, :apell, :asunto, :cuerpo);";

        $this->bd->consulta($consulta);
        $this->bd->asignar(":nom", $nombre);
        $this->bd->asignar(":email", $email);
        $this->bd->asignar(":apell", $apellido);
        $this->bd->asignar(":asunto", $asunto);
        $this->bd->asignar(":cuerpo", $cuerpo);

        return $this->bd->ejecutar();
    }

}
?>