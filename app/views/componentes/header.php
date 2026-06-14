<p>HEADER ACÁ</p>
<div>
    <button type="button" onclick="window.location.href='<?= BASE_URL ?>'">
        Inicio
    </button>

    <button type="button" onclick="window.location.href='<?= BASE_URL ?>registro'">
        Registro
    </button>

    <?php if (isset($_SESSION['id_usuario'])): ?>
    <button type="button" onclick="window.location.href='<?= BASE_URL ?>cerrar-sesion'">
        Cerrar Sesión
    </button>
    <?php else: ?>
    <button type="button" onclick="window.location.href='<?= BASE_URL ?>sesion'">
        Iniciar Sesión
    </button>
    <?php endif; ?>

    <button type="button" onclick="window.location.href='<?= BASE_URL ?>contacto'">
        Contacto
    </button>
</div>