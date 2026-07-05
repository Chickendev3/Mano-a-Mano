<!-- HERO INTRODUCTORIO CON IMAGEN DE FONDO CLARA/DESVANECIDA -->
<section class="section contact-hero">
  <!-- Contenedor absoluto para la imagen desvanecida -->
  <div class="contact-hero-bg" style="background-image: url('<?= BASE_URL ?>img/banner-contacto.webp');"></div>

  <div class="container contact-hero-container">
    <span class="section-tag">Contacto</span>
    <h1 class="wireframe-title contact-hero-title">Comunícate con nosotros</h1>
    <p class="wireframe-subtitle contact-hero-subtitle">
      Estamos aquí para ayudarte. Si tenés dudas sobre cómo registrarte, verificar tu organización social, publicar campañas o postularte, envíanos tu consulta.
    </p>
    <a href="#formulario-contacto" class="btn btn-primary contact-hero-btn">
      Contáctanos <i data-lucide="arrow-down" style="width: 18px; height: 18px;"></i>
    </a>
  </div>
</section>

<!-- FORMULARIO SECCIÓN -->
<section class="section" id="formulario-contacto" style="background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container">
    <div class="contact-form-grid">
      
      <!-- Column 1: Google Map (Left on desktop) -->
      <div class="col-img">
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14256.215686669038!2d-58.60061863630412!3d-34.64744590751182!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc951c0fe2d9f5%3A0x9f1c540898efecbe!2sUTN%20HAEDO!5e0!3m2!1ses-419!2sar!4v1782950753336!5m2!1ses-419!2sar" class="contact-map-iframe" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
      </div>
      
      <!-- Column 2: Form (Right on desktop) -->
      <div class="col-form" style="max-width: 480px; width: 100%; margin-left: auto;">
        <h2 class="wireframe-title" style="font-size: 32px; margin-bottom: 8px;">Formulario</h2>
        <p class="wireframe-subtitle" style="margin-bottom: 28px;">Completa el siguiente formulario.</p>

        <div id="contact-message-box">
          <?php if (!empty($msj)) : ?>
            <div role="alert" style="margin-bottom: 24px; padding: 16px; border-radius: 12px; background-color: <?= strpos(strtolower($msj), 'error') !== false ? 'rgba(254, 226, 226, 0.9)' : 'rgba(220, 252, 231, 0.9)'; ?>; color: <?= strpos(strtolower($msj), 'error') !== false ? '#b91c1c' : '#166534'; ?>; border: 1px solid <?= strpos(strtolower($msj), 'error') !== false ? '#fca5a5' : '#86efac'; ?>;">
              <?= htmlspecialchars($msj) ?>
            </div>
          <?php endif; ?>
        </div>

        <form action="<?= BASE_URL ?>contacto" method="post" id="contact-form-page">
          <div class="form-row">
            <div class="form-group">
              <label for="contact-name" class="form-label">Nombre *</label>
              <input type="text" id="contact-name" name="nombre" class="form-input" placeholder="Nombre" required>
            </div>
            <div class="form-group">
              <label for="contact-lastname" class="form-label">Apellido *</label>
              <input type="text" id="contact-lastname" name="apellido" class="form-input" placeholder="Apellido" required>
            </div>
          </div>
          
          <div class="form-group">
            <label for="contact-email" class="form-label">Email *</label>
            <input type="email" id="contact-email" name="email" class="form-input" placeholder="tucorreo@aqui.com" required autocomplete="email">
          </div>
          
          <div class="form-group">
            <label for="contact-name" class="form-label">Asunto *</label>
            <input type="text" id="contact-asunto" name="asunto" class="form-input" placeholder="Titulo del asunto" required>
          </div>
          
          <div class="form-group" style="margin-bottom: 24px;">
            <label for="contact-message" class="form-label">Cuerpo *</label>
            <textarea id="contact-message" name="cuerpo" class="form-input" rows="4" placeholder="Escriba aquí el cuerpo del mensaje" style="resize: vertical;" required></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; font-size: 16px; padding: 14px;">
            Enviar
          </button>
        </form>
      </div>
      
    </div>
  </div>
</section>

<!-- FAQ SECCIÓN -->
<style>
  /* Solución robusta para ocultar las respuestas del acordeón cuando está cerrado */
  .faq-accordion .accordion-content {
    display: none !important;
    overflow: hidden !important;
  }
  .faq-accordion .accordion-item.active .accordion-content {
    display: block !important;
  }
</style>
<section class="section faq-section" id="faq">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Dudas Frecuentes</span>
      <h2 class="section-title">¿Tenés dudas?</h2>
      <p class="section-subtitle">Respuestas a las consultas más habituales de nuestra comunidad de voluntarios y ONGs.</p>
    </div>
    
    <div class="faq-container">
      <div class="faq-accordion">
        
        <!-- Accordion Item 1 -->
        <div class="accordion-item">
          <button class="accordion-header" aria-expanded="false" aria-controls="faq-ans-1">
            <span>¿Quiénes pueden usar la plataforma?</span>
            <i data-lucide="chevron-down"></i>
          </button>
          <div class="accordion-content" id="faq-ans-1" role="region">
            <div class="accordion-inner">
              Mano a Mano está pensada tanto para voluntarios particulares que quieren donar su tiempo y habilidades, como para organizaciones sociales y ONGs que buscan convocar personas para sus proyectos solidarios.
            </div>
          </div>
        </div>

        <!-- Accordion Item 2 -->
        <div class="accordion-item">
          <button class="accordion-header" aria-expanded="false" aria-controls="faq-ans-2">
            <span>¿Qué incluye el servicio y registro?</span>
            <i data-lucide="chevron-down"></i>
          </button>
          <div class="accordion-content" id="faq-ans-2" role="region">
            <div class="accordion-inner">
              La plataforma es 100% gratuita. No existen abonos, membresías ni comisiones. Podés registrarte, explorar causas, publicar campañas y contactar voluntarios sin ningún tipo de costo.
            </div>
          </div>
        </div>

        <!-- Accordion Item 3 -->
        <div class="accordion-item">
          <button class="accordion-header" aria-expanded="false" aria-controls="faq-ans-3">
            <span>¿El trabajo de voluntariado es pago?</span>
            <i data-lucide="chevron-down"></i>
          </button>
          <div class="accordion-content" id="faq-ans-3" role="region">
            <div class="accordion-inner">
              El voluntariado es una actividad solidaria, libre y no remunerada. La recompensa principal es el impacto positivo en la comunidad y el desarrollo personal. Sin embargo, algunas ONGs coordinan apoyos específicos como viáticos o refrigerios para jornadas extensas, pero la plataforma no servirá como intermediara para esos casos.
            </div>
          </div>
        </div>

        <!-- Accordion Item 4 -->
        <div class="accordion-item">
          <button class="accordion-header" aria-expanded="false" aria-controls="faq-ans-4">
            <span>¿Mis datos personales están seguros?</span>
            <i data-lucide="chevron-down"></i>
          </button>
          <div class="accordion-content" id="faq-ans-4" role="region">
            <div class="accordion-inner">
              Sí, la privacidad es fundamental. Tus datos de contacto (como teléfono o email exactos) sólo se comparten con la organización correspondiente una vez que decidís postularte a una campaña específica y sos preseleccionado.
            </div>
          </div>
        </div>

        <!-- Accordion Item 5 -->
        <div class="accordion-item">
          <button class="accordion-header" aria-expanded="false" aria-controls="faq-ans-5">
            <span>¿Cómo podemos ponernos en contacto con soporte?</span>
            <i data-lucide="chevron-down"></i>
          </button>
          <div class="accordion-content" id="faq-ans-5" role="region">
            <div class="accordion-inner">
              Podés escribirnos a través del formulario de contacto superior de esta página, o enviarnos un correo electrónico directo a <strong>mano.a.mano.proy@gmail.com</strong>. Nuestro equipo de soporte universitario te responderá a la brevedad.
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
