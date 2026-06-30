<?php
class Asistencia {
    private $bd;

    public function __construct() {
        $this->bd = new BaseDatos();
    }

    /* ------------------------ CONSUTAR DATOS ------------------------ */
    public function cantidadAsistenciasPorVoluntario ( int $idVoluntario ) :int {
        $consulta = "SELECT COUNT(voluntario_id)  as cantidad_asistencia FROM `asistencias` WHERE voluntario_id = :id_vol";

        $this->bd->consulta($consulta);

        $this->bd->asignar(":id_vol", $idVoluntario);
        $this->bd->ejecutar();

        return $this->bd->resultado()['cantidad_asistencia'];
    }

    public function verificaCoincidencia ( string $ingreso, int $idCampania ) : bool {
        $this->eliminaCodigosVencidos();

        $consulta = "SELECT id FROM `codigos_asistencia` 
	                    WHERE codigo = :codigo_ing AND campania_id = :id_camp
                        AND DATE_FORMAT(fecha_vencimiento, '%Y-%m-%d %H:%i') > DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i');";    
        
        $this->bd->consulta($consulta);

        $this->bd->asignar(":codigo_ing", $ingreso);
        $this->bd->asignar(":id_camp", $idCampania);
        $this->bd->ejecutar();
        
        $result = $this->bd->resultado();
        return $result ? true : false;
    }

    public function obtenerAsistenciasPorVoluntario ( int $idVoluntario ) :array {
        $consulta = "SELECT * FROM `asistencias` WHERE voluntario_id = :id_vol";

        $this->bd->consulta($consulta);

        $this->bd->asignar(":id_vol", $idVoluntario);
        $this->bd->ejecutar();

        return $this->bd->resultados();
    }


    /* ------------------------ INSERTAR DATOS ------------------------ */
    public function insertarCodigoAsistencia ( string $idCampania, string $codigo ) :bool{
        $this->eliminaCodigosVencidos();

        $consulta = "INSERT INTO `codigos_asistencia`(`campania_id`, `codigo`, `fecha_vencimiento`) 
                        VALUES (:id_camp, :codigo, (NOW() + INTERVAL 5 MINUTE))";
        
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_camp", $idCampania);
        $this->bd->asignar(":codigo", $codigo);
        return $this->bd->ejecutar();
    }

    public function registrarAsistencia ( int $idVoluntario, int $idCampania ) : bool {

        $consulta = "INSERT INTO `asistencias`(`voluntario_id`, `campania_id`) 
                        VALUES (:id_vol, :id_camp)";
        
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_vol", $idVoluntario);
        $this->bd->asignar(":id_camp", $idCampania);
        return $this->bd->ejecutar();
    }

    /* ------------------------ ELIMINAR DATOS ------------------------ */
    private function eliminaCodigosVencidos () :void {
        $consulta = "DELETE FROM `codigos_asistencia` 
                        WHERE DATE_FORMAT(fecha_vencimiento, '%Y-%m-%d %H:%i') < DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i');";    
        
        $this->bd->consulta($consulta);

        $this->bd->ejecutar();
    }

}
?>