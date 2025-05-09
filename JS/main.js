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
