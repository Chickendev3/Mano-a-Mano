<?php
class Correo {
    private $bd;

    public function __construct() {
        $this->bd = new BaseDatos();
    }

    /* ------------------------ INSERTAR DATOS ------------------------ */
    public function nuevoCorreo ( string $nombre_completo, string $email, string $asunto, string $cuerpo, ?string $telefono = null ) : bool {
        $consulta = "INSERT INTO `correos`(`nombre`, `email`, `telefono`, `asunto`, `cuerpo`) 
                            VALUES (:nom_completo, :email, :telefono, :asunto, :cuerpo);";

        $this->bd->consulta($consulta);
        $this->bd->asignar(":nom_cpmpleto", $nombre_completo);
        $this->bd->asignar(":email", $email);
        $this->bd->asignar(":telefono", $telefono);
        $this->bd->asignar(":asunto", $asunto);
        $this->bd->asignar(":cuerpo", $cuerpo);

        return $this->bd->ejecutar();
    }

}
?>