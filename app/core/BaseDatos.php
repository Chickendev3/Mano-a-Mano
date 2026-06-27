<?php
/* --------------- Clase encargada de la conexión a la BD --------------- */

class BaseDatos {
    private $host = BD_HOST;
    private $usuario = BD_USUARIO;
    private $clave = BD_CLAVE;
    private $nombre = BD_NOMBRE;
    private $puerto = BD_PUERTO;

    private $dbh;       // Define database handler. Es decir será el objeto del PDO.
    private $stmt;      // 'statement'. Define la sentencia SQL. 
    private $error;     // Define el mensaje de error que usa throw.

    // Constructor que inicializa la conexión a la BD.
    public function __construct() {
        // Data Source Name (DSN) para la conexión PDO. Cadena o "dirección" completa que necesita PDO para conectarse a la BD.
        $dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->nombre . ';port=' . $this->puerto;

        // Optciones para la conexión PDO
        $options = [
            // Usa la conexión persistente 
            // (Por ejemplo: Esto previene establecer una nueva conexión cada vez que se crea la stancia de un nuevo objeto de clase BaseDatos).
            PDO::ATTR_PERSISTENT => true,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION // Throw exceptions on errors
        ];

        // Intenta conectarse a la BD mediante la creación de una nueva instancia PDO
        try {
            $this->dbh = new PDO($dsn, $this->usuario, $this->clave, $options);
            /* $this->dbh procede a ser el objeto PDO: la conexión. */

        } catch (PDOException $e) {
            // Si ocurre un error, se guarda el mensaje de error. Después se muestra
            $this->error = $e->getMessage();
            echo $this->error;
        }
    }

    // Método para preparar una consulta SQL
    public function consulta (string $sql) :void {
        // Prepara la consulta. Ésto devuelve un OBJETO tipo PDOStatment (sentencia/statement), que se guarda en $stmt.
        $this->stmt = $this->dbh->prepare($sql);
    }

    /* Método que enlaza/asigna el valor y su tipo recibido (desde fuera) con el parámetro que va a reemplazar en la sentencia SQL. 
    Es el método que se llama para que lo ingresado desde afuera ocupe su lugar en la sentencia SQL con el tipo de dato que corresponde para la BD. */ 
    public function asignar(string|int $param, mixed $valor) :void {   
        
        if(is_null($valor)) {
            $this->stmt->bindValue($param, null, PDO::PARAM_NULL);

        }else{
            switch(gettype($valor)){                
                case 'string':
                    $this->stmt->bindValue($param, $valor, PDO::PARAM_STR);
                    break;
                case 'integer':
                    $this->stmt->bindValue($param, $valor, PDO::PARAM_INT);
                    break;
                case 'boolean':
                    $this->stmt->bindValue($param, $valor, PDO::PARAM_BOOL);
                    break;  
                default:
                    $this->stmt->bindValue($param, $valor);
                    /* Por default, el tercer parámetro de PDO bindValue() es string, por lo que 
                    concibe que el tipo de dato ingresado en $valor es un string. Así, si se ejecuta
                    bindValue() del objeto stmt sin un tercer parámetro, todos almacenarían en la BD
                    como strings. */
                    break;
            }
        }
    }

    // Método que ejecuta la sentencia preparada
    public function ejecutar() :bool {
        // Ejecuta y retorna si tuvo éxito o no.
        return $this->stmt->execute();
    }

    // Captura todos los resultados en un array (vector) asocioativo
    public function resultados() :array {
        $this->ejecutar();                                                                                    //----------------- CONSERVAR??
        return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Captura y devuelve un único resultado en un array asocioativo 
    public function resultado() :mixed {
        $this->ejecutar();
        return $this->stmt->fetch(PDO::FETCH_ASSOC);
    }

}

?>