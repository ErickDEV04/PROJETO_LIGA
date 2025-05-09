// Modal de Especialidade
function showModalEspecialidade() {
  const modalHtml = `
    <div class="modal fade" id="modalEspecialidade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><i class="bi bi-heart-pulse"></i> Nova Especialidade</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form id="formEspecialidade">
              <div class="mb-3">
                <label class="form-label">Nome da Especialidade</label>
                <input type="text" class="form-control" required>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" form="formEspecialidade" class="btn btn-primary">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('modals-container').innerHTML = modalHtml;
  const modal = new bootstrap.Modal(document.getElementById('modalEspecialidade'));
  modal.show();
  
  document.getElementById('formEspecialidade').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = this.querySelector('input').value;
    state.especialidades.push(nome);
    modal.hide();
    renderEspecialidades();
    showNotification('Especialidade cadastrada com sucesso!', 'success');
  });
}

// Modal de Convênio
function showModalConvenio() {
  const modalHtml = `
    <div class="modal fade" id="modalConvenio" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><i class="bi bi-credit-card"></i> Novo Convênio</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form id="formConvenio">
              <div class="mb-3">
                <label class="form-label">Nome do Convênio</label>
                <input type="text" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Número de Registro</label>
                <input type="text" class="form-control" required>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" form="formConvenio" class="btn btn-success">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('modals-container').innerHTML = modalHtml;
  const modal = new bootstrap.Modal(document.getElementById('modalConvenio'));
  modal.show();
  
  document.getElementById('formConvenio').addEventListener('submit', function(e) {
    e.preventDefault();
    const inputs = this.querySelectorAll('input');
    const novoConvenio = {
      id: state.convenios.length + 1,
      nome: inputs[0].value,
      registro: inputs[1].value
    };
    state.convenios.push(novoConvenio);
    modal.hide();
    renderConvenios();
    showNotification('Convênio cadastrado com sucesso!', 'success');
  });
}

// Modal de Agendamento
function showModalAgendamento(agendamentoId = null) {
  const agendamento = agendamentoId ? state.agendamentos.find(a => a.id === agendamentoId) : null;
  
  const modalHtml = `
    <div class="modal fade" id="modalAgendamento" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="bi bi-calendar-plus"></i> ${agendamento ? 'Editar' : 'Novo'} Agendamento
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form id="formAgendamento">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Paciente</label>
                  <input type="text" class="form-control" value="${agendamento ? agendamento.paciente : ''}" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Médico</label>
                  <select class="form-select" required>
                    <option value="">Selecione...</option>
                    ${state.medicos.map(med => `
                      <option value="${med.id}" ${agendamento && agendamento.medico === med.nome ? 'selected' : ''}>
                        ${med.nome} (${med.especialidade})
                      </option>
                    `).join('')}
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Data</label>
                  <input type="date" class="form-control" value="${agendamento ? agendamento.data : ''}" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Hora</label>
                  <input type="time" class="form-control" value="${agendamento ? agendamento.hora : ''}" required>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Convênio</label>
                  <select class="form-select" required>
                    <option value="">Selecione...</option>
                    ${state.convenios.map(conv => `
                      <option value="${conv.id}" ${agendamento && agendamento.convenio === conv.nome ? 'selected' : ''}>
                        ${conv.nome}
                      </option>
                    `).join('')}
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Status</label>
                  <select class="form-select" ${agendamento ? '' : 'disabled'}>
                    <option value="agendado" ${agendamento && agendamento.status === 'agendado' ? 'selected' : ''}>Agendado</option>
                    <option value="atendido" ${agendamento && agendamento.status === 'atendido' ? 'selected' : ''}>Atendido</option>
                    <option value="cancelado" ${agendamento && agendamento.status === 'cancelado' ? 'selected' : ''}>Cancelado</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" form="formAgendamento" class="btn btn-primary">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('modals-container').innerHTML = modalHtml;
  const modal = new bootstrap.Modal(document.getElementById('modalAgendamento'));
  modal.show();
  
  document.getElementById('formAgendamento').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = this;
    const inputs = form.querySelectorAll('input, select');
    
    const novoAgendamento = {
      id: agendamento ? agendamento.id : state.agendamentos.length + 1,
      paciente: inputs[0].value,
      medico: state.medicos.find(m => m.id === parseInt(inputs[1].value)).nome,
      especialidade: state.medicos.find(m => m.id === parseInt(inputs[1].value)).especialidade,
      data: inputs[2].value,
      hora: inputs[3].value,
      convenio: state.convenios.find(c => c.id === parseInt(inputs[4].value)).nome,
      status: agendamento ? inputs[5].value : 'agendado'
    };
    
    if (agendamento) {
      const index = state.agendamentos.findIndex(a => a.id === agendamento.id);
      state.agendamentos[index] = novoAgendamento;
    } else {
      state.agendamentos.push(novoAgendamento);
    }
    
    modal.hide();
    loadScreen(agendamento ? 'agendamentos' : 'dashboard');
    showNotification(`Agendamento ${agendamento ? 'atualizado' : 'criado'} com sucesso!`, 'success');
  });
}

// Funções de Ação
function removerEspecialidade(index) {
  if (confirm(`Tem certeza que deseja remover a especialidade "${state.especialidades[index]}"?`)) {
    state.especialidades.splice(index, 1);
    renderEspecialidades();
    showNotification('Especialidade removida com sucesso!', 'success');
  }
}

function removerConvenio(id) {
  const convenio = state.convenios.find(c => c.id === id);
  if (confirm(`Tem certeza que deseja remover o convênio "${convenio.nome}"?`)) {
    state.convenios = state.convenios.filter(c => c.id !== id);
    renderConvenios();
    showNotification('Convênio removido com sucesso!', 'success');
  }
}

function marcarComoAtendido(id) {
  const agendamento = state.agendamentos.find(a => a.id === id);
  if (confirm(`Marcar atendimento de ${agendamento.paciente} como realizado?`)) {
    agendamento.status = 'atendido';
    loadScreen('agendamentos');
    showNotification('Atendimento registrado com sucesso!', 'success');
  }
}

function verDetalhesAtendimento(id) {
  const agendamento = state.agendamentos.find(a => a.id === id);
  
  const modalHtml = `
    <div class="modal fade" id="modalDetalhesAtendimento" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><i class="bi bi-clipboard2-check"></i> Detalhes do Atendimento</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <h6>Paciente</h6>
              <p>${agendamento.paciente}</p>
            </div>
            <div class="mb-3">
              <h6>Médico</h6>
              <p>${agendamento.medico} (${agendamento.especialidade})</p>
            </div>
            <div class="mb-3">
              <h6>Data/Hora</h6>
              <p>${formatarData(agendamento.data)} às ${agendamento.hora}</p>
            </div>
            <div class="mb-3">
              <h6>Convênio</h6>
              <p>${agendamento.convenio}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('modals-container').innerHTML = modalHtml;
  const modal = new bootstrap.Modal(document.getElementById('modalDetalhesAtendimento'));
  modal.show();
}

// Filtros
function filtrarAgendamentos(filtro) {
  // Implementar lógica de filtro
  showNotification(`Filtro aplicado: ${filtro}`, 'info');
}

function filtrarAtendimentos(filtro) {
  // Implementar lógica de filtro
  showNotification(`Filtro aplicado: ${filtro}`, 'info');
}

// Notificações
function showNotification(message, type = 'info') {
  const toastHtml = `
    <div class="toast align-items-center text-white bg-${type} border-0" role="alert">
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>
  `;
  
  const container = document.getElementById('notification-container');
  container.insertAdjacentHTML('beforeend', toastHtml);
  
  const toast = new bootstrap.Toast(container.lastElementChild, {
    autohide: true,
    delay: 3000
  });
  toast.show();
}
