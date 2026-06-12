<?php
class registroCtrl extends Controlador {

    // Renders the role selection page
    public function index() {
        $datos = ['error' => null];
        $this->cargarVista('registro', $datos, 'Registro | Mano a Mano');
    }

    // Handles Volunteer registration
    public function voluntario() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $nombre = trim($_POST['nombre'] ?? '');
            $apellido = trim($_POST['apellido'] ?? '');
            $email = trim($_POST['email'] ?? '');
            $clave = $_POST['clave'] ?? '';
            $telefono = '00000000'; // Default phone placeholder since it's required in model

            if (empty($nombre) || empty($apellido) || empty($email) || empty($clave)) {
                $datos = ['error' => 'Por favor, completa todos los campos obligatorios.'];
                $this->cargarVista('registro_voluntario', $datos, 'Registrarse como Voluntario');
                return;
            }

            // Check if email already exists
            require_once '../app/models/Usuario.php';
            if (Usuario::emailExiste($email)) {
                $datos = ['error' => 'El correo electrónico ya está registrado.'];
                $this->cargarVista('registro_voluntario', $datos, 'Registrarse como Voluntario');
                return;
            }

            // Hash password securely
            $claveHash = password_hash($clave, PASSWORD_DEFAULT);

            /** @var Voluntario $volModel */
            $volModel = $this->cargarModelo('Voluntario');
            $exito = $volModel->nuevoVoluntario($nombre, $apellido, $email, $claveHash, $telefono);

            if ($exito) {
                // Fetch new user to save in session
                $usuario = $volModel->obtenerVoluntarioPorEmail($email);
                $_SESSION['usuario_logueado'] = true;
                $_SESSION['usuario_id'] = $usuario['id'];
                $_SESSION['usuario_nombre'] = $nombre;
                $_SESSION['usuario_email'] = $email;
                $_SESSION['usuario_rol'] = 'voluntario';

                header('Location: ' . BASE_URL);
                exit;
            } else {
                $datos = ['error' => 'Hubo un error al crear tu cuenta. Por favor, intenta de nuevo.'];
                $this->cargarVista('registro_voluntario', $datos, 'Registrarse como Voluntario');
                return;
            }
        }

        $datos = ['error' => null];
        $this->cargarVista('registro_voluntario', $datos, 'Registrarse como Voluntario');
    }

    // Handles Organization registration
    public function organizacion() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $nombre = trim($_POST['nombre'] ?? '');
            $email = trim($_POST['email'] ?? '');
            $clave = $_POST['clave'] ?? '';
            $direccion = trim($_POST['direccion'] ?? '');
            $telefono = '00000000'; // Default phone placeholder

            if (empty($nombre) || empty($email) || empty($clave) || empty($direccion)) {
                $datos = ['error' => 'Por favor, completa todos los campos obligatorios.'];
                $this->cargarVista('registro_organizacion', $datos, 'Registrarse como Organización');
                return;
            }

            // Check if email exists
            require_once '../app/models/Usuario.php';
            if (Usuario::emailExiste($email)) {
                $datos = ['error' => 'El correo electrónico ya está registrado.'];
                $this->cargarVista('registro_organizacion', $datos, 'Registrarse como Organización');
                return;
            }

            $claveHash = password_hash($clave, PASSWORD_DEFAULT);

            /** @var Organizacion $orgModel */
            $orgModel = $this->cargarModelo('Organizacion');
            $exito = $orgModel->nuevaOrganizacion($nombre, $email, $claveHash, $telefono, $direccion);

            if ($exito) {
                $_SESSION['usuario_logueado'] = true;
                $_SESSION['usuario_nombre'] = $nombre;
                $_SESSION['usuario_email'] = $email;
                $_SESSION['usuario_rol'] = 'organizacion';

                header('Location: ' . BASE_URL);
                exit;
            } else {
                $datos = ['error' => 'Hubo un error al registrar la organización. Por favor, intenta de nuevo.'];
                $this->cargarVista('registro_organizacion', $datos, 'Registrarse como Organización');
                return;
            }
        }

        $datos = ['error' => null];
        $this->cargarVista('registro_organizacion', $datos, 'Registrarse como Organización');
    }
}
?>