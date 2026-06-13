<?php 
class App {
    protected $controlador = ''; 
    //Se inicializa un controlador por default.

    protected $metodo = 'index';
    //Se inicializa un método por default para que sea llamado por el controlador.

    protected $params = [];
    //Parámetros para que sean usador por los métodos.

    public function __construct() {
        /* Habilitando las variables de SESIÓN */
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $urlPartes = $this->parseUrl();

        require_once '../app/rutas.php';

        // Verifica si la 1ra parte de la URL existe
        if (isset($urlPartes[0])) {
            $ruta = $urlPartes[0]; // Establece la ruta a la primera parte de la URL
        }

        // Verifica si la 2da parte de la URL existe
        if (isset($urlPartes[1])) {
            $ruta = $urlPartes[0] . '/' . $urlPartes[1];   // Añade la 2da parte de la URL a la ruta
        }

        // Verifica que la ruta exista dentro del array del archivo 'rutas.php'
        if (isset($rutas[$ruta])) {
            // Establece el controlador de acuerdo a la confguración de la ruta
            $this->controlador = $rutas[$ruta]['controlador'];
            // Establece el método
            $this->metodo = $rutas[$ruta]['metodo'];
            // Establece las partes restantes de la URL en los parámetros
            $this->params = array_slice($urlPartes, 2);

        } else {
            // Si la ruta no se encontró en el array de 'rutas.php' -> mensaje de error 404
            echo "404 - Ruta no encontrada";
            return;
        }

        // Se inlcuyen el archivo del controlador
        require_once '../app/controllers/' . $this->controlador . '.php';
        // Se crea un objeto (una instancia de la clase del controlador) del arhcivo antes importado
        $this->controlador = new $this->controlador;

        // Llama al método del controlador con los parámetros
        call_user_func_array([$this->controlador, $this->metodo], $this->params);
        /* --------------------------------------------------------------------------------------------------------------------
            call_user_func_array() se utiliza para llamar a una función que devuelve con una matriz de parámetros
             que se van a pasar a la función
            Ej: call_user_func_array([BookController, updateBook], [$id])
            Esta función llamará al método updateBook($id) de la clase BookController
            -------------------------------------------------------------------------------------------------------------------- */
    }


    // Funcion que parsea la URL y devuelve sus componentes
    private function parseUrl() : array {
        // Verifica si los parámetros de 'url' (de .htaccess) está definido en la solicitud GET.
        if (isset($_GET['url'])) {
            // Recorta las barras finales de la URL, la depura y las divide en una matriz
            return explode('/', filter_var(rtrim($_GET['url'], '/'), FILTER_SANITIZE_URL));
        }
        // Devuelve un array con un string vacío si el parámetro de 'url' no está definido. 
        return [''];
    }
}

?>