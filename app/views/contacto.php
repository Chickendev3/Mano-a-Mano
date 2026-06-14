<section class="contacto">
	<h1>Contacto</h1>
	<p>Dejanos tu mensaje y te respondemos a la brevedad.</p>

	<form action="contacto" method="post" class="contacto_formulario">
		<div>
			<label for="nombre">Nombre</label>
			<input type="text" id="nombre" name="nombre" required>
		</div>

		<div>
			<label for="apellido">Apellido</label>
			<input type="text" id="apellido" name="apellido" required>
		</div>

		<div>
			<label for="email">Email</label>
			<input type="email" id="email" name="email" required>
		</div>

		<div>
			<label for="asunto">Asunto</label>
			<input type="text" id="asunto" name="asunto" required>
		</div>

		<div>
			<label for="cuerpo">Cuerpo</label>
			<textarea id="cuerpo" name="cuerpo" rows="6" required></textarea>
		</div>

		<button type="submit">Enviar mensaje</button>
		<?php if (!empty($msj)) : ?>
			<p><?= htmlspecialchars($msj) ?></p>
		<?php endif; ?>
	</form>
</section>
