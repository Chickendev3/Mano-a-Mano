<?php
/*  Método encargado de cargar cada modelo. 
    Toma el modelo como nombre de parámetro. Cargará el modelo desde el directorio de modelos (carpeta 'models').

*/
class Controlador {

    protected function cargarModelo (string $modelo) : mixed{
        require_once "../app/models/" . $modelo . ".php";                /* Se incluye el archivo del modelo desde la carpeta de modelos */

        return new $modelo; //Se retorna un objeto del tipo pedido como parámetro.
        /* PHP puede instanciar un objeto desde un string. Loco!. */
    }

    /* Toma como parámetros: la ruta de la vista, array de datos y titulo opcional.  */
    protected function cargarVista(string $rutaVista, array $datos = [], ?string $titulo = "Mano a Mano") : void {
        extract($datos);

        /* extract(['rutaVista' => $rutaVista, 'titulo' => $titulo]); */
        require "../app/views/layout.php";
    }

}

?>