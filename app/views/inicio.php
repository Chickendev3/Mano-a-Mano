<!-- VISTA DE INICIO PRECARIA -->

<main>
    <section>
        <h1>Mano a Mano</h1>

        <?php
            // Cargar el nombre de usuario con la sesión activa.
            if (isset($_SESSION['id_usuario'])) {
                $nombreUsuario = $_SESSION['nombre_usuario'] . ' ' . $_SESSION['apellido_usuario'];
            } else {
                $nombreUsuario = "Usuario";
            }
            echo "<h3>Hola " . htmlspecialchars($nombreUsuario) . "</h3>";
        ?>

        <p>Esto es la página de inicio.</p>
        
    </section>

</main>