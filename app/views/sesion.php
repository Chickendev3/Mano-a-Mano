<!-- VISTA DE FORM DE INICIAR SESIÓN -->

<main>
	<section>
		<h2>Iniciar sesión</h2>

		<?php if (!empty($error)) : ?>
			<p><?= htmlspecialchars($error) ?></p>
		<?php endif; ?>

		<form action="<?= BASE_URL ?>sesion" method="post">
			<div>
				<label for="sesion-email">Correo electrónico</label>
				<input type="email" id="sesion-email" name="email" required>
			</div>

			<div>
				<label for="sesion-password">Contraseña</label>
				<input type="password" id="sesion-password" name="password" required>
			</div>

			<div>
				<label>
					<input type="checkbox" name="recordarme">
					Recordarme
				</label>
			</div>

			<div>
				<button type="submit">Ingresar</button>
			</div>
			<?php if (!empty($msj)) : ?>
				<p><?= htmlspecialchars($msj) ?></p>
			<?php endif; ?>
		</form>
	</section>
</main>


