class MedScheduleWebSocket {
  constructor() {
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.connect();
  }

  connect() {
    // Modifique para seu endpoint real ou use um servidor de teste
    // Usando serviço público de echo
this.socket = new WebSocket('wss://ws.postman-echo.com/raw');

    this.socket.onopen = () => {
      console.log('Conexão WebSocket estabelecida');
      this.reconnectAttempts = 0;
      this.send({ 
        type: 'auth', 
        token: localStorage.getItem('authToken') 
      });
    };

    this.socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        this.handleMessage(message);
      } catch (error) {
        console.error('Erro ao processar mensagem:', error);
      }
    };

    this.socket.onclose = () => {
      console.log('Conexão fechada. Tentando reconectar...');
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        setTimeout(() => {
          this.reconnectAttempts++;
          this.connect();
        }, 3000);
      }
    };

    this.socket.onerror = (error) => {
      console.error('Erro no WebSocket:', error);
    };
  }

  send(data) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket não está conectado');
    }
  }

  handleMessage(message) {
    console.log('Mensagem recebida:', message);
    
    switch(message.type) {
      case 'notification':
        showNotification(message.text, 'info');
        break;
      case 'new_appointment':
        showNotification(`Novo agendamento: ${message.data.paciente}`, 'success');
        break;
      default:
        console.warn('Tipo de mensagem não reconhecido:', message.type);
    }
  }
}

// Inicialização segura
let websocket;

function initWebSocket() {
  if (!websocket && typeof WebSocket !== 'undefined') {
    websocket = new MedScheduleWebSocket();
  }
  return websocket;
}
