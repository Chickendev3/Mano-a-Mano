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
    <link rel="stylesheet" href="<?= BASE_URL ?>css/estilos.css?v=4.5">

    <!-- CSS Dinámicos según la vista cargada -->
    <?php if (isset($cssPropio) && !empty($cssPropio)){
            if (!is_array($cssPropio)) 
                $cssPropio = [$cssPropio];
            
            foreach($cssPropio as $css){
        ?>
        
        <link rel="stylesheet" href="<?= BASE_URL ?>css/<?php echo htmlspecialchars($css); ?>?v=4.5">
    <?php }} ?>

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>


    <!-- Definición de BASE_URL para JavaScript -->
    <script>
        const BASE_URL = '<?= BASE_URL ?>';
        const SESSION_USER_ID = <?= json_encode($_SESSION['id_usuario'] ?? null) ?>;
        const SESSION_USER_ROL = <?= json_encode($_SESSION['usuario_rol'] ?? null) ?>;

        // Cargar tema desde localStorage para evitar flickering
        (function() {
            if (localStorage.getItem('theme') === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
            }
        })();
    </script>
    
    <!-- Carga de JS Global-->
    <script src="<?= BASE_URL ?>js/main.js"></script>    

</head>

<?php require_once '../app/views/componentes/header.php'; ?>

<body>

    <?php require_once '../app/views/' . $rutaVista . '.php'; ?> 
    
    <!-- Carga de JS Dinámicos-->
    <?php if (isset($jsPropio) && !empty($jsPropio)){
            if (!is_array($jsPropio)) 
                $jsPropio = [$jsPropio];
            
            foreach($jsPropio as $js){
        ?>
        
        <script src="<?= BASE_URL ?>js/<?php echo htmlspecialchars($js); ?>"></script>
    <?php }} ?>

    <!-- Contenedor Global para Notificaciones Flotantes (Toasts) -->
    <div class="toast" id="global-toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-icon"></div>
        <div class="toast-content">
            <h4 id="toast-title"></h4>
            <p id="toast-message"></p>
        </div>
    </div>
</body>

<?php require_once '../app/views/componentes/footer.php'; ?>

</html>