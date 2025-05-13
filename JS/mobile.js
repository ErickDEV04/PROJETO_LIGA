class MobileMenu {
  constructor() {
    this.offcanvasInitialized = false;
    this.navbarInitialized = false;
    this.init();
  }

  init() {
    this.initOffcanvas();
    this.initBottomNav();
    this.setupEventListeners();
    this.setCurrentActiveItem();
  }

  initOffcanvas() {
    // Verifica se já existe para não duplicar
    if (document.getElementById('offcanvasMenu') || this.offcanvasInitialized) return;
    
    const offcanvasHtml = `
      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasMenu">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title">Menu</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body">
          <div class="list-group" id="mobile-menu-list">
            <a href="#" class="list-group-item list-group-item-action" data-screen="dashboard">
              <i class="bi bi-speedometer2 me-2"></i> Dashboard
            </a>
            <a href="#" class="list-group-item list-group-item-action" data-screen="agendamentos">
              <i class="bi bi-calendar-check me-2"></i> Agendamentos
            </a>
            <a href="#" class="list-group-item list-group-item-action" data-screen="atendimentos">
              <i class="bi bi-clipboard2-check me-2"></i> Atendimentos
            </a>
            <a href="#" class="list-group-item list-group-item-action" data-screen="relatorios">
              <i class="bi bi-graph-up me-2"></i> Relatórios
            </a>
            <a href="#" class="list-group-item list-group-item-action" data-screen="especialidades">
              <i class="bi bi-heart-pulse me-2"></i> Especialidades
            </a>
            <a href="#" class="list-group-item list-group-item-action" data-screen="convenios">
              <i class="bi bi-credit-card me-2"></i> Convênios
            </a>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', offcanvasHtml);
    this.offcanvasInitialized = true;
  }

  initBottomNav() {
    // Verifica se já existe para não duplicar
    if (document.querySelector('.navbar-mobile') || this.navbarInitialized) return;
    
    const navbarHtml = `
      <div class="navbar-mobile d-lg-none">
        <a href="#" class="navbar-mobile-item" data-screen="dashboard">
          <i class="bi bi-house-door"></i>
          <span class="navbar-mobile-label">Início</span>
        </a>
        <a href="#" class="navbar-mobile-item" data-screen="agendamentos">
          <i class="bi bi-calendar"></i>
          <span class="navbar-mobile-label">Agenda</span>
        </a>
        <a href="#" class="navbar-mobile-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu">
          <i class="bi bi-list"></i>
          <span class="navbar-mobile-label">Menu</span>
        </a>
        <a href="#" class="navbar-mobile-item position-relative" data-screen="notifications">
          <i class="bi bi-bell"></i>
          <span id="notification-badge-mobile" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger d-none">0</span>
          <span class="navbar-mobile-label">Notificações</span>
        </a>
        <a href="#" class="navbar-mobile-item" data-screen="perfil">
          <i class="bi bi-person"></i>
          <span class="navbar-mobile-label">Perfil</span>
        </a>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', navbarHtml);
    this.navbarInitialized = true;
  }

  setupEventListeners() {
    // Delegação de eventos para os itens do menu
    document.addEventListener('click', (e) => {
      const menuItem = e.target.closest('[data-screen]');
      if (menuItem) {
        e.preventDefault();
        this.setActiveItem(menuItem);
        loadScreen(menuItem.dataset.screen);
        
        // Fecha o offcanvas se estiver aberto
        const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasMenu'));
        if (offcanvas) offcanvas.hide();
      }
    });
  }

  setCurrentActiveItem() {
    // Define o item ativo baseado na URL ou estado
    const currentScreen = window.location.hash.replace('#', '') || 'dashboard';
    const activeItem = document.querySelector(`[data-screen="${currentScreen}"]`);
    if (activeItem) this.setActiveItem(activeItem);
  }

  setActiveItem(element) {
    // Remove a classe 'active' de todos os itens
    document.querySelectorAll('[data-screen]').forEach(item => {
      item.classList.remove('active');
    });
    
    // Adiciona a classe 'active' no item clicado
    element.classList.add('active');
    
    // Atualiza também no menu offcanvas
    const correspondingItem = document.querySelector(`#mobile-menu-list [data-screen="${element.dataset.screen}"]`);
    if (correspondingItem) correspondingItem.classList.add('active');
  }
}

// Inicialização condicional apenas em mobile
function initMobileMenu() {
  if (window.innerWidth < 992) {
    window.mobileMenu = new MobileMenu();
  }
}

// Carrega quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initMobileMenu);

// Re-inicializa quando a janela for redimensionada
window.addEventListener('resize', () => {
  if (window.innerWidth < 992 && !window.mobileMenu) {
    initMobileMenu();
  }
});
