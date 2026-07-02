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
    public function obtenerOrganizaciones ( array $filtros = [] ) :array {
        $condiciones = [];
        $parametros = [];

        if (!empty($filtros['q'])) {
            $condiciones[] = "(u.nombre LIKE :q OR u.descripcion LIKE :q)";
            $parametros[':q'] = '%' . $filtros['q'] . '%';
        }
        if (!empty($filtros['category'])) {
            $condiciones[] = "u.id IN (SELECT oc.organizacion_id FROM organizaciones_causas oc JOIN causas c ON oc.causa_id = c.id WHERE c.causa = :category)";
            $parametros[':category'] = $filtros['category'];
        }
        if (!empty($filtros['location'])) {
            $condiciones[] = "u.ubicacion LIKE :location";
            $parametros[':location'] = '%' . $filtros['location'] . '%';
        }
        $where = !empty($condiciones) ? " AND " . implode(" AND ", $condiciones) : "";
        
        $consulta = "SELECT u.id as 'id', u.nombre as 'nombre', u.email, u.descripcion, u.telefono, u.ubicacion, u.img_perfil 
                        FROM usuarios u JOIN organizaciones o ON u.id = o.usuario_id
                        WHERE 1=1 " . $where;
    
        $this->bd->consulta($consulta);
        foreach ($parametros as $key => $val) {
            $this->bd->asignar($key, $val);
        }
        $this->bd->ejecutar();
        
        return $this->bd->resultados();
    }

    public function obtenerOrganizacionPorID( int $idUsuario ) :array|bool {
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

    public function obtenerOrganizacionPorEmail( string $email ) :array|bool {
        $consulta = "SELECT u.id as 'id_usuario', o.id as 'id_organizacion', u.nombre, u.email, u.clave, u.telefono, u.ubicacion, u.img_perfil 
                        FROM usuarios u JOIN organizaciones o ON u.id = o.usuario_id
                        WHERE u.email = :email";
    
        $this->bd->consulta($consulta);
        $this->bd->asignar(":email", $email);
        $this->bd->ejecutar();

        return $this->bd->resultado();
    }

    public function obtenerCausasOrganizacion(int $idUsuario) :array {
        $consulta = "SELECT c.causa 
                        FROM organizaciones_causas oc
                        JOIN causas c ON c.id = oc.causa_id
                        JOIN organizaciones o ON o.id = oc.organizacion_id
                        WHERE o.usuario_id = :id_usuario;";

        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_usuario", $idUsuario);
        $this->bd->ejecutar();

        return $this->bd->resultados();
    }

    public function obtenerMiembrosOrganizacion(int $idOrgUsuario) :array {
        $idOrgArr = $this->obtenerIDOrganizacion($idOrgUsuario);
        if (!$idOrgArr) {
            return [];
        }
        $consulta = "SELECT u.id as usuario_id, u.nombre, u.img_perfil 
                        FROM voluntarios_fijos vf 
                        JOIN voluntarios v ON vf.voluntario_id = v.id
                        JOIN usuarios u ON v.usuario_id = u.id
                        WHERE vf.organizacion_id = :id_org AND vf.activo = true;";
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_org", (int)$idOrgArr['id']);
        $this->bd->ejecutar();
        return $this->bd->resultados();
    }

    public function obtenerVoluntariosFijosPorOrganizacion(int $idOrgUsuario, bool $activo = true) :array {
        $idOrg = $this->obtenerIDOrganizacion($idOrgUsuario);
        if (!$idOrg) {
            return [];
        }
        $consulta = "SELECT u.email, u.nombre as name, v.apellido as lastName, u.img_perfil as avatar
                        FROM voluntarios_fijos vf 
                        JOIN voluntarios v ON vf.voluntario_id = v.id
                        JOIN usuarios u ON v.usuario_id = u.id
                        WHERE vf.organizacion_id = :id_org AND vf.activo = :activo;";
                        
        $this->bd->consulta($consulta);
        $this->bd->asignar(":id_org", (int)$idOrg['id']);
        $this->bd->asignar(":activo", $activo);
        $this->bd->ejecutar();

        return $this->bd->resultados();
    }

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

    public function agregarVoluntarioFijo(int $idOrg, int $idVol) :bool {
        // Consultamos 'activo' en lugar de un 'id' que no existe
        $consultaCheck = "SELECT activo FROM voluntarios_fijos WHERE organizacion_id = :id_org AND voluntario_id = :id_vol;";
        
        $this->bd->consulta($consultaCheck);
        $this->bd->asignar(":id_org", $idOrg);
        $this->bd->asignar(":id_vol", $idVol);
        $this->bd->ejecutar();

        $exists = $this->bd->resultado();
        if ($exists) {
            // Si existe, se actualizamos a activo = true filtrando por la clave compuesta
            $consultaUpdate = "UPDATE voluntarios_fijos SET activo = true WHERE organizacion_id = :id_org AND voluntario_id = :id_vol;";
            $this->bd->consulta($consultaUpdate);
            $this->bd->asignar(":id_org", $idOrg);
            $this->bd->asignar(":id_vol", $idVol);

            return $this->bd->ejecutar();
        } else {
            // Si no existe, se inserta el nuevo registro
            $consultaInsert = "INSERT INTO voluntarios_fijos (organizacion_id, voluntario_id, activo) VALUES (:id_org, :id_vol, true);";
            $this->bd->consulta($consultaInsert);
            $this->bd->asignar(":id_org", $idOrg);
            $this->bd->asignar(":id_vol", $idVol);
            return $this->bd->ejecutar();
        }
    }

    /* -------------------- ACTUALIZAR DATOS -------------------- */
    public function actualizarDatosOrganizacion (int $idUsuario, array $datos) :bool {
        /* $datos tiene los campos que se quieren actualizar */
        
        parent::actualizarDatosUsuario($idUsuario, $datos);
                 
        return true;
    }

    public function actualizarCausasOrganizacion(int $idUsuario, array $causas) :void {
        $org = $this->obtenerIDOrganizacion($idUsuario);
        if (!$org) return;
        $idOrg = $org['id'];

        $consultaDelete = "DELETE FROM organizaciones_causas WHERE organizacion_id = :id_org";

        $this->bd->consulta($consultaDelete);
        $this->bd->asignar(":id_org", $idOrg);
        $this->bd->ejecutar();

        foreach ($causas as $nombreCausa) {
            $consultaCausa = "SELECT id FROM causas WHERE causa = :nombre_causa";

            $this->bd->consulta($consultaCausa);
            $this->bd->asignar(":nombre_causa", $nombreCausa);
            $this->bd->ejecutar();
            
            $causaDb = $this->bd->resultado();
            if ($causaDb) {
                $idCausa = $causaDb['id'];
                
                $consultaInsert = "INSERT INTO organizaciones_causas (organizacion_id, causa_id) VALUES (:id_org, :id_causa)";

                $this->bd->consulta($consultaInsert);
                $this->bd->asignar(":id_org", $idOrg);
                $this->bd->asignar(":id_causa", $idCausa);
                $this->bd->ejecutar();
            }
        }
    }

    public function darDeBajaVoluntarioFijo(int $idOrg, int $idVol) :bool {

        $consultaUpdate = "UPDATE voluntarios_fijos SET activo = false WHERE organizacion_id = :id_org AND voluntario_id = :id_vol;";
        
        $this->bd->consulta($consultaUpdate);
        $this->bd->asignar(":id_org", $idOrg);
        $this->bd->asignar(":id_vol", $idVol);
        
        return $this->bd->ejecutar();
    }

    /* -------------------- ELIMINAR -------------------- */


}
?>