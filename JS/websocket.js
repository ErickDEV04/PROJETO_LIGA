class MedScheduleWebSocket {
  constructor() {
    this.socket = null;
    this.connect();
  }

  connect() {
    // Em produção, substituir por seu servidor WebSocket real
    this.socket = new WebSocket('wss://seu-servidor-websocket.com');

    this.socket.onopen = () => {
      console.log('Conexão WebSocket estabelecida');
      this.send({ type: 'auth', token: localStorage.getItem('authToken') });
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.handleMessage(message);
    };

    this.socket.onclose = () => {
      console.log('Conexão WebSocket fechada. Tentando reconectar...');
      setTimeout(() => this.connect(), 5000);
    };
  }

  send(data) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    }
  }

  handleMessage(message) {
    switch (message.type) {
      case 'notification':
        showNotification(message.text, 'info');
        this.updateBadge();
        break;
      case 'new_appointment':
        showNotification(`Novo agendamento: ${message.data.paciente}`, 'success');
        state.agendamentos.push(message.data);
        if (currentScreen === 'agendamentos') renderAgendamentos();
        this.updateBadge();
        break;
      case 'appointment_update':
        const index = state.agendamentos.findIndex(a => a.id === message.data.id);
        if (index !== -1) {
          state.agendamentos[index] = message.data;
          if (currentScreen === 'agendamentos') renderAgendamentos();
          showNotification(`Agendamento atualizado: ${message.data.paciente}`, 'info');
        }
        break;
    }
  }

  updateBadge() {
    const badge = document.getElementById('notification-badge');
    if (badge) {
      const count = parseInt(badge.textContent) || 0;
      badge.textContent = count + 1;
      badge.classList.remove('d-none');
    }
  }
}

// Inicialização
let websocket;

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('authToken')) {
    websocket = new MedScheduleWebSocket();
  }
});
