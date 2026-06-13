<?php 
/** @var string $rutaVista */
/** @var string $titulo */
?>
<!-- Layout.php es la página 'molde' para la coherencia del Sitio. 
    Permite reutilizar la configuración base (head, header y footer)
-->

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $titulo; ?> </title>

    <!-- Carga de CSS según vistas-->
</head>
    <p>HEADER ACÁ</p>
    <div>
        <button type="button" onclick="window.location.href='<?= BASE_URL ?>'">
            Ir a inicio
        </button>

        <button type="button" onclick="window.location.href='<?= BASE_URL ?>registro'">
            Ir a registro
        </button>

        <?php if (isset($_SESSION['id_usuario'])): ?>
        <button type="button" onclick="window.location.href='<?= BASE_URL ?>cerrar-sesion'">
            Cerrar Sesión
        </button>
        <?php else: ?>
        <button type="button" onclick="window.location.href='<?= BASE_URL ?>sesion'">
            Ir a sesión
        </button>
        <?php endif; ?>
    </div>
<header>
    
</header>
<body>
    <!-- Acá se incluye la localización del archivo PHP de './app/views/' seguido del valor de $rutaVista + extensión '.php' -->
    <?php  require_once '../app/views/' . $rutaVista . '.php'; ?> 
</body>

    <!-- Carga de JS globales-->

<footer>
    <p>FOOTER ACÁ</p>
</footer>

</html>