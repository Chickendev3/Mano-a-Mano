<?php
class registroCtrl extends Controlador {

    // Renders the role selection page
    public function index() {
        $datos = ['error' => null, 
                  'tipo' => null,
                  'cssPropio' => 'registro.css',
                  'jsPropio' => 'registro.js'];
        
        $action = $_POST['action'] ?? '';
        
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if ($action == 'voluntario') {
                $datos['tipo'] = 'voluntario';
                /* VOLUNTARIOS */
                $nombre = trim($_POST['nombre'] ?? '');
                $apellido = trim($_POST['apellido'] ?? '');
                $telefono = trim($_POST['telefono'] ?? '');
                $telefono_emergencia = trim($_POST['telefono_adicional'] ?? null) ?: null;
                $ubicacion = trim($_POST['ubicacion'] ?? null) ?: null;
                $email = trim($_POST['email'] ?? '');
                $clave = trim($_POST['password'] ?? '');

                $error = $this->registrarVoluntario( $nombre, $apellido, $email, $clave, $telefono, $telefono_emergencia, $ubicacion);

                if ($error !== null) {
                    $datos['error'] = $error;
                    $this->cargarVista('registro_voluntario', $datos, 'Registrarse como Voluntario');     // Fijarse acá si está bien al momento de hacer la unión con la VISTA
                    return;
                }

                $this->cargarVista('sesion');
                return;

            } elseif ($action == 'organizacion') {
                $datos['tipo'] = 'organizacion';
                /* ORGANIZACIONES */
                $nombre = trim($_POST['nombre'] ?? '');
                $telefono = trim($_POST['telefono'] ?? '');
                $ubicacion = trim($_POST['ubicacion'] ?? null) ?: null;
                $email = trim($_POST['email'] ?? '');
                $clave = trim($_POST['password'] ?? '');

                $error = $this->registrarOrganizacion( $nombre, $email, $clave, $telefono, $ubicacion );

                if ($error !== null) {
                    $datos['error'] = $error;
                    $this->cargarVista('registro_organizacion', $datos, 'Registrarse como Organización');     // Fijarse acá si está bien al momento de hacer la unión con la VISTA
                    return;
                }

                $this->cargarVista('sesion');
                return;
            }
        }
            
        $this->cargarVista('registro', $datos);
    }

    public function cargarFormOrganizacion() {
        $datos = [];
        $this->cargarVista('registro_organizacion', $datos, 'Registrarse como Organización');
    }

    public function cargarFormVoluntario() {
        $datos = [];
        $this->cargarVista('registro_voluntario', $datos, 'Registrarse como Voluntario');
    }

    private function registrarVoluntario( string $nombre, string $apellido, string $email, string $clave, string $telefono, ?string $telefonoEmergencia = null, ?string $ubicacion = null ) : ?string {
        $modeloVoluntario = $this->cargarModelo("Voluntario");

        if (empty($nombre) || empty($apellido) || empty($telefono) || empty($email) || empty($clave)) {
            return 'Complete los campos obligatorios';
        }
        
        $verfEmail = Usuario::emailExiste($email);
        if ( $verfEmail ) {
            return 'El email ingresado ya existe.';
        }

        $clave = password_hash($clave, PASSWORD_DEFAULT);
        $modeloVoluntario->nuevoVoluntario( $nombre, $apellido, $email, $clave, $telefono, $telefonoEmergencia, $ubicacion );

        return null;
    }

    private function registrarOrganizacion( string $nombre, string $email, string $clave, string $telefono, ?string $ubicacion = null ) : ?string {
        $modeloOrganizacion = $this->cargarModelo("Organizacion");

        if (empty($nombre) || empty($telefono) || empty($email) || empty($clave)) {
            return 'Complete los campos obligatorios.';
        }
        
        $verfEmail = Usuario::emailExiste($email);
        if ( $verfEmail ) {
            return 'El email ingresado ya existe.';
        }

        $clave = password_hash($clave, PASSWORD_DEFAULT);
        $modeloOrganizacion->nuevaOrganizacion( $nombre, $email, $clave, $telefono, $ubicacion );

        return null;
    }
}
?>