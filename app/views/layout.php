<?php 
/** @var string $rutaVista */
/** @var string $titulo */
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($titulo); ?></title>

    <!-- Global CSS -->
    <link rel="stylesheet" href="<?= BASE_URL ?>css/estilos.css">

    <!-- Dynamic CSS load based on the view -->
    <?php 
        $base_css = $rutaVista;
        if ($rutaVista === 'registro_voluntario' || $rutaVista === 'registro_organizacion') {
            $base_css = 'registro';
        }
        echo '<link rel="stylesheet" href="' . BASE_URL . 'css/' . $base_css . '.css">';
    ?>

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <!-- Define global Javascript configurations from PHP -->
    <script>
        const BASE_URL = '<?= BASE_URL ?>';
        const IS_LOGGED_IN = <?= (isset($_SESSION['usuario_logueado']) && $_SESSION['usuario_logueado'] === true) ? 'true' : 'false' ?>;
    </script>
</head>
<body>

    <!-- Load Header Component -->
    <?php require_once '../app/views/componentes/header.php'; ?> 

    <!-- Load Dynamic Page Content -->
    <?php require_once '../app/views/' . $rutaVista . '.php'; ?> 

    <!-- Load Footer Component -->
    <?php require_once '../app/views/componentes/footer.php'; ?> 

    <!-- Global JS Script -->
    <script src="<?= BASE_URL ?>js/main.js"></script>

    <!-- Dynamic JS load based on the view -->
    <?php 
        $base_js = $rutaVista;
        if ($rutaVista === 'registro_voluntario' || $rutaVista === 'registro_organizacion') {
            $base_js = 'registro';
        }
        echo '<script src="' . BASE_URL . 'js/' . $base_js . '.js"></script>';
    ?>
</body>
</html>