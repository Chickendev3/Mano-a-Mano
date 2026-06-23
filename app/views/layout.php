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

    <!-- CSS Dinámicos según la vista cargada -->
    <?php if (isset($cssPropio) && !empty($cssPropio)){
            if (!is_array($cssPropio)) 
                $cssPropio = [$cssPropio];
            
            foreach($cssPropio as $css){
        ?>
        
        <link rel="stylesheet" href="<?= BASE_URL ?>css/<?php echo htmlspecialchars($css); ?>">
    <?php }} ?>

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>


    <!-- Definición de BASE_URL para JavaScript -->
    <script>
        const BASE_URL = '<?= BASE_URL ?>';
    </script>
    
    <!-- Carga de JS Global-->
    <script src="<?= BASE_URL ?>js/main.js"></script>

    <!-- Carga de JS Dinámicos-->
    <?php if (isset($jsPropio) && !empty($jsPropio)){
            if (!is_array($jsPropio)) 
                $jsPropio = [$jsPropio];
            
            foreach($jsPropio as $js){
        ?>
        
        <script src="<?= BASE_URL ?>js/<?php echo htmlspecialchars($js); ?>"></script>
    <?php }} ?>

</head>

<?php
    require_once '../app/views/componentes/header.php'; 
?>

<body>

    <?php require_once '../app/views/' . $rutaVista . '.php'; ?> 
    
</body>



<?php
    require_once '../app/views/componentes/footer.php';
?>

</html>