// Estado Global da Aplicação
const state = {
  especialidades: ['Cardiologia', 'Pediatria', 'Dermatologia'],
  convenios: [
    { id: 1, nome: 'Unimed', registro: '123456' },
    { id: 2, nome: 'Amil', registro: '789012' }
  ],
  agendamentos: [
    { 
      id: 1, 
      paciente: 'João Silva', 
      medico: 'Dr. Carlos', 
      especialidade: 'Cardiologia', 
      convenio: 'Unimed',
      data: '2023-11-20', 
      hora: '14:00', 
      status: 'agendado' 
    }
  ],
  medicos: [
    { id: 1, nome: 'Dr. Carlos', especialidade: 'Cardiologia' },
    { id: 2, nome: 'Dra. Ana', especialidade: 'Pediatria' }
  ]
};

// Navegação entre Telas
function loadScreen(screenName) {
  const contentDiv = document.getElementById('app-content');
  
  switch(screenName) {
    case 'dashboard':
      renderDashboard();
      break;
    case 'especialidades':
      renderEspecialidades();
      break;
    case 'convenios':
      renderConvenios();
      break;
    case 'agendamentos':
      renderAgendamentos();
      break;
    case 'atendimentos':
      renderAtendimentos();
      break;
    case 'novo-agendamento':
      showModalAgendamento();
      break;
    default:
      renderDashboard();
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  loadScreen('dashboard');
});

// Notificações
let notifications = [];

function showNotification(message, type = 'info') {
  // Adiciona ao histórico
  notifications.unshift({
    id: Date.now(),
    message,
    type,
    time: new Date().toLocaleTimeString()
  });
  
  // Atualiza a UI
  updateNotificationUI();
  
  // Toast do Bootstrap
  const toastHtml = `
    <div class="toast show align-items-center text-white bg-${type}" role="alert">
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>
  `;
  
  const container = document.createElement('div');
  container.innerHTML = toastHtml;
  document.body.appendChild(container);
  
  // Remove após 5 segundos
  setTimeout(() => {
    container.remove();
  }, 5000);
}

function updateNotificationUI() {
  const list = document.getElementById('notification-list');
  if (list) {
    list.innerHTML = notifications.slice(0, 5).map(not => `
      <li>
        <a class="dropdown-item d-flex align-items-center py-2" href="#">
          <div class="me-3">
            <i class="bi bi-${not.type === 'success' ? 'check-circle' : 'info-circle'} text-${not.type}"></i>
          </div>
          <div>
            <div class="small">${not.message}</div>
            <div class="text-muted small">${not.time}</div>
          </div>
        </a>
      </li>
    `).join('');
  }
  
  // Atualiza badges
  const badges = document.querySelectorAll('#notification-badge, #notification-badge-mobile');
  badges.forEach(badge => {
    badge.textContent = notifications.length;
    badge.classList.toggle('d-none', notifications.length === 0);
  });
}

// Inicializa o WebSocket quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  initWebSocket();
  
  // Atualiza o nome do usuário
  const userName = localStorage.getItem('userName') || 'Usuário';
  document.querySelectorAll('#user-name, #dropdown-username').forEach(el => {
    el.textContent = userName;
  });
  
  loadScreen('dashboard');
});
