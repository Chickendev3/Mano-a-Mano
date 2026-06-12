<!-- HERO INTRODUCTORIO PEQUEÑO -->
<section class="section" style="padding-top: 140px; background-color: var(--color-background); border-bottom: 1px solid var(--color-border);">
  <div class="container">
    <div class="wireframe-grid">
      
      <!-- Column Left: Round blob shape -->
      <div class="col-img" style="display: flex; justify-content: center; align-items: center;">
        <div class="wireframe-placeholder" style="border-radius: 50%; width: 320px; height: 320px; min-height: auto;" aria-hidden="true">
          <div class="wireframe-placeholder-inner" style="border-radius: 50%;">
            <i data-lucide="help-circle"></i>
            <span>Soporte</span>
          </div>
        </div>
      </div>
      
      <!-- Column Right: Hero Text -->
      <div class="col-form" style="display: flex; flex-direction: column; justify-content: center; gap: 16px;">
        <span class="section-tag" style="align-self: flex-start;">Contacto</span>
        <h1 class="wireframe-title" style="font-size: 40px; margin-bottom: 8px;">Comunícate con nosotros</h1>
        <p class="wireframe-subtitle" style="margin-bottom: 24px; font-size: 16px;">
          Estamos aquí para ayudarte. Si tenés dudas sobre cómo registrarte, verificar tu organización social, publicar campañas o postularte, envíanos tu consulta.
        </p>
        <a href="#formulario-contacto" class="btn btn-primary" style="align-self: flex-start; padding: 14px 28px;">
          Contáctanos <i data-lucide="arrow-down" style="margin-left: 4px;"></i>
        </a>
      </div>
      
    </div>
  </div>
</section>

<!-- FORMULARIO SECCIÓN -->
<section class="section" id="formulario-contacto" style="background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container">
    <div class="wireframe-grid reverse-layout">
      
      <!-- Column 1: Placeholder Image (Left on desktop) -->
      <div class="col-img">
        <div class="wireframe-placeholder" aria-hidden="true">
          <div class="wireframe-placeholder-inner">
            <i data-lucide="image"></i>
            <span>Imagen del Formulario</span>
          </div>
        </div>
      </div>
      
      <!-- Column 2: Form (Right on desktop) -->
      <div class="col-form" style="max-width: 480px; width: 100%; margin-left: auto;">
        <h2 class="wireframe-title" style="font-size: 32px; margin-bottom: 8px;">Formulario</h2>
        <p class="wireframe-subtitle" style="margin-bottom: 28px;">Completa el siguiente formulario.</p>
        
        <form id="contact-form-page">
          <div class="form-row">
            <div class="form-group">
              <label for="contact-name" class="form-label">Nombre *</label>
              <input type="text" id="contact-name" class="form-input" placeholder="Placeholder" required>
            </div>
            <div class="form-group">
              <label for="contact-lastname" class="form-label">Apellido *</label>
              <input type="text" id="contact-lastname" class="form-input" placeholder="Placeholder" required>
            </div>
          </div>
          
          <div class="form-group">
            <label for="contact-email" class="form-label">Email *</label>
            <input type="email" id="contact-email" class="form-input" placeholder="Placeholder" required autocomplete="email">
          </div>
          
          <div class="form-group">
            <label for="contact-subject" class="form-label">Asunto</label>
            <select id="contact-subject" class="form-input" style="background-color: var(--color-background);">
              <option value="">Placeholder (Selecciona un asunto)</option>
              <option value="verificacion">Verificación de Organización</option>
              <option value="campanas">Problema con Campañas</option>
              <option value="postulacion">Dudas sobre Postulación</option>
              <option value="otro">Otro Motivo</option>
            </select>
          </div>
          
          <div class="form-group" style="margin-bottom: 24px;">
            <label for="contact-message" class="form-label">Cuerpo *</label>
            <textarea id="contact-message" class="form-input" rows="4" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..." style="resize: vertical;" required></textarea>
          </div>

          <div class="form-group" style="margin-bottom: 28px; display: flex; align-items: center; gap: 8px;">
            <input type="checkbox" id="contact-agree" class="form-checkbox" style="width: 16px; height: 16px; accent-color: var(--color-primary);" required>
            <label for="contact-agree" class="form-label" style="margin-bottom: 0; font-weight: 500; font-size: 14px; color: var(--color-text-secondary); cursor: pointer;">Estás de acuerdo que nos comuniquemos con vos *</label>
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
            <span>¿Quiénes pueden usar la plataforma? / Who should use the app?</span>
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
            <span>¿Qué incluye el servicio y registro? / What is included with my subscription?</span>
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
            <span>¿El trabajo de voluntariado es pago? / How do I get paid?</span>
            <i data-lucide="chevron-down"></i>
          </button>
          <div class="accordion-content" id="faq-ans-3" role="region">
            <div class="accordion-inner">
              El voluntariado es una actividad solidaria, libre y no remunerada. La recompensa principal es el impacto positivo en la comunidad y el desarrollo personal. Sin embargo, algunas ONGs coordinan apoyos específicos como viáticos o refrigerios para jornadas extensas.
            </div>
          </div>
        </div>

        <!-- Accordion Item 4 -->
        <div class="accordion-item">
          <button class="accordion-header" aria-expanded="false" aria-controls="faq-ans-4">
            <span>¿Mis datos personales están seguros? / Is my personal information safe?</span>
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
            <span>¿Cómo podemos ponernos en contacto? / How can we get in touch?</span>
            <i data-lucide="chevron-down"></i>
          </button>
          <div class="accordion-content" id="faq-ans-5" role="region">
            <div class="accordion-inner">
              Podés escribirnos a través del formulario de contacto superior de esta página, o enviarnos un correo electrónico directo a <strong>contacto@manoamano.org</strong>. Nuestro equipo de soporte universitario te responderá a la brevedad.
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
