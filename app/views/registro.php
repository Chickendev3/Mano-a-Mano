<!-- VISTA DE REGISTRO DE UN NUEVO USUARIO -->
<main>
    <?php
        $tipoFormulario = $tipo ?? null;
        $mostrarSelector = empty($tipoFormulario);
        $mostrarVoluntario = $tipoFormulario === 'voluntario';
        $mostrarOrganizacion = $tipoFormulario === 'organizacion';
    ?>

    <section id="selector-tipo" <?= $mostrarSelector ? '' : 'hidden' ?>>
        <div>
            <h2>Elegí tipo de usuario</h2>
        </div>

        <div>
            <button type="button" onclick="mostrarFormulario('voluntario')">Registrarse como Voluntario</button>
            <button type="button" onclick="mostrarFormulario('organizacion')">Registrarse como Organización</button>
        </div>
    </section>

    <section id="formulario-voluntario" <?= $mostrarVoluntario ? '' : 'hidden' ?>>
        <h2>Registro de Voluntario</h2>
        <form action="<?= BASE_URL?>registro" method="post">
            <div>
                <label for="voluntario-nombre">Nombre*</label>
                <input type="text" maxlength=50 id="voluntario-nombre" name="nombre" required>
            </div>
            <div>
                <label for="voluntario-apellido">Apellido*</label>
                <input type="text" maxlength=50 id="voluntario-apellido" name="apellido" required>
            </div>
            <div>
                <label for="voluntario-telefono">Teléfono*</label>
                <input type="text" maxlength=15 id="voluntario-telefono" name="telefono" required>
            </div>
            <div>
                <label for="voluntario-telefono">Teléfono Adicional</label>
                <input type="text" maxlength=15 id="voluntario-telefono-adicional" name="telefono_adicional">
            </div>
            <div>
                <label for="voluntario-ubicacion">Ubicación (Provincia, Localidad, Ciudad)</label>
                <input type="text" maxlength=50 id="voluntario-ubicacion" name="ubicacion">
            </div>

            <div>
                <label for="voluntario-email">Correo electrónico*</label>
                <input type="email" id="voluntario-email" name="email" required>
            </div>
            <div>
                <label for="voluntario-password">Contraseña*</label>
                <input type="password" id="voluntario-password" name="password" required>
                <input type="hidden" name="action" value="voluntario">
            </div>

            
            <div>
                <button type="button" onclick="window.location.href='<?= BASE_URL ?>registro'">Volver</button>
                <button type="submit">Crear cuenta</button>
                <?php if (!empty($error)) : ?>
                    <p><?= htmlspecialchars($error) ?></p>
                <?php endif; ?>
            </div>
        </form>
    </section>

    <section id="formulario-organizacion" <?= $mostrarOrganizacion ? '' : 'hidden' ?>>
        <h2>Registro de Organización</h2>
        <form action="<?= BASE_URL?>registro" method="post">
            <div>
                <label for="organizacion-nombre">Nombre de la Organización</label>
                <input type="text" maxlength=50 id="organizacion-nombre" name="nombre" required>
            </div>
            <div>
                <label for="organizacion-telefono">Teléfono</label>
                <input type="text" maxlength=15 id="organizacion-telefono" name="telefono" required>
            </div>
            <div>
                <label for="organizacion-ubicacion">Ubicación (Provincia, Localidad, Ciudad)</label>
                <input type="text" maxlength=50 id="organizacion-ubicacion" name="ubicacion">
            </div>

            <div>
                <label for="organizacion-email">Correo electrónico</label>
                <input type="email" id="organizacion-email" name="email" required>
            </div>
            <div>
                <label for="organizacion-password">Contraseña</label>
                <input type="password" id="organizacion-password" name="password" required>
            </div>

            <div>
                <input type="hidden" name="action" value="organizacion">
                <button type="button" onclick="window.location.href='<?= BASE_URL ?>registro'">Volver</button>
                <button type="submit">Crear cuenta</button>
                <?php if (!empty($error)) : ?>
                    <p><?= htmlspecialchars($error) ?></p>
                <?php endif; ?>
            </div>
        </form>
    </section>

    <script>
        const selectorTipo = document.getElementById('selector-tipo');
        const formularioVoluntario = document.getElementById('formulario-voluntario');
        const formularioOrganizacion = document.getElementById('formulario-organizacion');

        function ocultarFormularios() {
            formularioVoluntario.hidden = true;
            formularioOrganizacion.hidden = true;
        }

        function mostrarFormulario(tipo) {
            selectorTipo.hidden = true;
            ocultarFormularios();

            if (tipo === 'voluntario') {
                formularioVoluntario.hidden = false;
                return;
            }

            if (tipo === 'organizacion') {
                formularioOrganizacion.hidden = false;
            }
        }

        function volverAlSelector() {
            ocultarFormularios();
            selectorTipo.hidden = false;
        }
    </script>

</main>