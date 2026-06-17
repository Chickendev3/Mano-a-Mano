<section class="section" style="padding-top: 140px; min-height: calc(100vh - 90px); display: flex; align-items: center;">
  <div class="container">
    <div class="section-header" style="margin-bottom: 40px;">
      <span class="section-tag">Conectar</span>
      <h1 class="section-title">Buscador de Campañas y Voluntariado</h1>
      <p class="section-subtitle">Explorá las campañas activas, organizaciones sociales registradas o perfiles de voluntarios disponibles en la comunidad.</p>
    </div>

    <!-- Search bar and Filter controls mockup -->
    <div style="background-color: var(--color-surface); padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--color-border); box-shadow: var(--shadow-sm); margin-bottom: 40px; display: flex; flex-direction: column; gap: 20px;">
      <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 16px;" class="form-row">
        <div class="form-group" style="margin-bottom: 0;">
          <label for="search-input" class="form-label" style="display: none;">Buscar</label>
          <input type="text" id="search-input" class="form-input" placeholder="Buscar por palabra clave, ONG o habilidad..." style="background-color: var(--color-background);">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label for="category-select" class="form-label" style="display: none;">Categoría</label>
          <select id="category-select" class="form-input" style="background-color: var(--color-background);">
            <option value="">Todas las categorías</option>
            <option value="medio-ambiente">Medio Ambiente</option>
            <option value="educacion">Educación</option>
            <option value="accion-social">Acción Social</option>
          </select>
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label for="location-select" class="form-label" style="display: none;">Ubicación</label>
          <select id="location-select" class="form-input" style="background-color: var(--color-background);">
            <option value="">Cualquier ubicación</option>
            <option value="buenos-aires">Buenos Aires</option>
            <option value="cordoba">Córdoba</option>
            <option value="rosario">Rosario</option>
          </select>
        </div>
      </div>
      
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button class="filter-btn active">Campañas</button>
          <button class="filter-btn">Organizaciones</button>
          <button class="filter-btn">Voluntarios</button>
        </div>
        <button class="btn btn-primary" style="padding: 10px 24px;">Buscar</button>
      </div>
    </div>

    <!-- Placeholder block representing future stage -->
    <div style="text-align: center; padding: 60px 40px; background-color: var(--color-surface); border: 2px dashed var(--color-border); border-radius: var(--radius-lg); color: var(--color-text-secondary); box-shadow: var(--shadow-sm);">
      <div style="width: 64px; height: 64px; border-radius: 50%; background-color: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; font-size: 28px;">
        <i data-lucide="search"></i>
      </div>
      <h2 style="margin-bottom: 8px; font-size: 22px; color: var(--color-text-primary); font-family: 'Outfit', sans-serif;">Módulo de Búsqueda Activa</h2>
      <p style="max-width: 500px; margin: 0 auto 24px auto; font-size: 15px;">Esta sección está reservada para el desarrollo de la siguiente etapa académica. Aquí se conectarán los filtros con la base de datos para la búsqueda interactiva en tiempo real.</p>
      <a href="<?= BASE_URL ?>" class="btn btn-outline">Volver al inicio</a>
    </div>
  </div>
</section>
