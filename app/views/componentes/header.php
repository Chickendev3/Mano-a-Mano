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