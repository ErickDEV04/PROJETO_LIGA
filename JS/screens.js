// Renderiza o Dashboard
function renderDashboard() {
  const html = `
    <div class="row mb-4">
      <div class="col-md-4 mb-3">
        <div class="card card-hover h-100">
          <div class="card-body text-center">
            <h5 class="card-title"><i class="bi bi-heart-pulse text-primary"></i> Especialidades</h5>
            <p class="display-5 fw-bold">${state.especialidades.length}</p>
            <button onclick="loadScreen('especialidades')" class="btn btn-outline-primary">Ver Todas</button>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card card-hover h-100">
          <div class="card-body text-center">
            <h5 class="card-title"><i class="bi bi-credit-card text-success"></i> Convênios</h5>
            <p class="display-5 fw-bold">${state.convenios.length}</p>
            <button onclick="loadScreen('convenios')" class="btn btn-outline-success">Ver Todos</button>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card card-hover h-100">
          <div class="card-body text-center">
            <h5 class="card-title"><i class="bi bi-calendar-check text-info"></i> Agendamentos Hoje</h5>
            <p class="display-5 fw-bold">${state.agendamentos.filter(a => a.data === new Date().toISOString().split('T')[0]).length}</p>
            <button onclick="loadScreen('agendamentos')" class="btn btn-outline-info">Ver Todos</button>
          </div>
        </div>
      </div>
    </div>

    <div class="card card-hover">
      <div class="card-header bg-white">
        <h5 class="mb-0"><i class="bi bi-calendar3"></i> Próximos Agendamentos</h5>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Médico</th>
                <th>Data/Hora</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              ${state.agendamentos.slice(0, 5).map(ag => `
                <tr>
                  <td>${ag.paciente}</td>
                  <td>${ag.medico}</td>
                  <td>${formatarData(ag.data)} ${ag.hora}</td>
                  <td><span class="badge ${getStatusBadgeClass(ag.status)}">${ag.status}</span></td>
                  <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="showModalAgendamento(${ag.id})">
                      <i class="bi bi-pencil"></i>
                    </button>
                    ${ag.status === 'agendado' ? `
                      <button class="btn btn-sm btn-outline-success" onclick="marcarComoAtendido(${ag.id})">
                        <i class="bi bi-check-circle"></i>
                      </button>
                    ` : ''}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  document.getElementById('app-content').innerHTML = html;
}

// Renderiza a tela de Especialidades
function renderEspecialidades() {
  const html = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2><i class="bi bi-heart-pulse text-primary"></i> Especialidades Médicas</h2>
      <button class="btn btn-primary" onclick="showModalEspecialidade()">
        <i class="bi bi-plus-lg me-1"></i> Nova Especialidade
      </button>
    </div>
    
    <div class="card card-hover">
      <div class="card-body">
        ${state.especialidades.length === 0 ? `
          <div class="text-center py-5">
            <i class="bi bi-heart-pulse text-muted" style="font-size: 3rem;"></i>
            <p class="mt-3 text-muted">Nenhuma especialidade cadastrada</p>
          </div>
        ` : `
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                ${state.especialidades.map((esp, index) => `
                  <tr>
                    <td>${esp}</td>
                    <td>
                      <button class="btn btn-sm btn-outline-danger" onclick="removerEspecialidade(${index})">
                        <i class="bi bi-trash"></i> Remover
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    </div>
  `;
  document.getElementById('app-content').innerHTML = html;
}

// Renderiza a tela de Convênios
function renderConvenios() {
  const html = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2><i class="bi bi-credit-card text-success"></i> Convênios Médicos</h2>
      <button class="btn btn-success" onclick="showModalConvenio()">
        <i class="bi bi-plus-lg me-1"></i> Novo Convênio
      </button>
    </div>
    
    <div class="card card-hover">
      <div class="card-body">
        ${state.convenios.length === 0 ? `
          <div class="text-center py-5">
            <i class="bi bi-credit-card text-muted" style="font-size: 3rem;"></i>
            <p class="mt-3 text-muted">Nenhum convênio cadastrado</p>
          </div>
        ` : `
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Registro</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                ${state.convenios.map(conv => `
                  <tr>
                    <td>${conv.nome}</td>
                    <td>${conv.registro}</td>
                    <td>
                      <button class="btn btn-sm btn-outline-danger" onclick="removerConvenio(${conv.id})">
                        <i class="bi bi-trash"></i> Remover
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    </div>
  `;
  document.getElementById('app-content').innerHTML = html;
}

// Renderiza a tela de Agendamentos
function renderAgendamentos() {
  const html = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2><i class="bi bi-calendar-check text-info"></i> Agendamentos</h2>
      <div>
        <button class="btn btn-info me-2" onclick="showModalAgendamento()">
          <i class="bi bi-plus-lg me-1"></i> Novo Agendamento
        </button>
        <div class="btn-group">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
            <i class="bi bi-funnel"></i> Filtrar
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" onclick="filtrarAgendamentos('hoje')">Hoje</a></li>
            <li><a class="dropdown-item" href="#" onclick="filtrarAgendamentos('semana')">Esta Semana</a></li>
            <li><a class="dropdown-item" href="#" onclick="filtrarAgendamentos('mes')">Este Mês</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" onclick="filtrarAgendamentos('todos')">Todos</a></li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="card card-hover">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Médico</th>
                <th>Especialidade</th>
                <th>Convênio</th>
                <th>Data/Hora</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              ${state.agendamentos.map(ag => `
                <tr>
                  <td>${ag.paciente}</td>
                  <td>${ag.medico}</td>
                  <td>${ag.especialidade}</td>
                  <td>${ag.convenio}</td>
                  <td>${formatarData(ag.data)} ${ag.hora}</td>
                  <td><span class="badge ${getStatusBadgeClass(ag.status)}">${ag.status}</span></td>
                  <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="showModalAgendamento(${ag.id})">
                      <i class="bi bi-pencil"></i>
                    </button>
                    ${ag.status === 'agendado' ? `
                      <button class="btn btn-sm btn-outline-success" onclick="marcarComoAtendido(${ag.id})">
                        <i class="bi bi-check-circle"></i>
                      </button>
                    ` : ''}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  document.getElementById('app-content').innerHTML = html;
}

// Renderiza a tela de Atendimentos
function renderAtendimentos() {
  const atendimentos = state.agendamentos.filter(a => a.status === 'atendido');
  
  const html = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2><i class="bi bi-clipboard2-check text-success"></i> Atendimentos Realizados</h2>
      <div class="btn-group">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
          <i class="bi bi-funnel"></i> Filtrar
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#" onclick="filtrarAtendimentos('hoje')">Hoje</a></li>
          <li><a class="dropdown-item" href="#" onclick="filtrarAtendimentos('semana')">Esta Semana</a></li>
          <li><a class="dropdown-item" href="#" onclick="filtrarAtendimentos('mes')">Este Mês</a></li>
        </ul>
      </div>
    </div>
    
    <div class="card card-hover">
      <div class="card-body">
        ${atendimentos.length === 0 ? `
          <div class="text-center py-5">
            <i class="bi bi-clipboard2-check text-muted" style="font-size: 3rem;"></i>
            <p class="mt-3 text-muted">Nenhum atendimento registrado</p>
          </div>
        ` : `
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Médico</th>
                  <th>Especialidade</th>
                  <th>Data</th>
                  <th>Hora</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                ${atendimentos.map(ag => `
                  <tr>
                    <td>${ag.paciente}</td>
                    <td>${ag.medico}</td>
                    <td>${ag.especialidade}</td>
                    <td>${formatarData(ag.data)}</td>
                    <td>${ag.hora}</td>
                    <td>
                      <button class="btn btn-sm btn-outline-primary" onclick="verDetalhesAtendimento(${ag.id})">
                        <i class="bi bi-eye"></i> Detalhes
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    </div>
  `;
  document.getElementById('app-content').innerHTML = html;
}

// Funções Auxiliares
function formatarData(dataStr) {
  const [ano, mes, dia] = dataStr.split('-');
  return `${dia}/${mes}/${ano}`;
}

function getStatusBadgeClass(status) {
  return {
    'agendado': 'bg-primary',
    'atendido': 'bg-success',
    'cancelado': 'bg-danger'
  }[status] || 'bg-secondary';
}
