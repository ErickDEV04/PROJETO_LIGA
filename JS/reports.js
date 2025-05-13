function renderReports() {
  const html = `
    <div class="row">
      <div class="col-md-6 mb-4">
        <div class="card card-hover">
          <div class="card-header">
            <h5><i class="bi bi-bar-chart"></i> Atendimentos por Mês</h5>
          </div>
          <div class="card-body">
            <canvas id="chartAtendimentos"></canvas>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card card-hover">
          <div class="card-header">
            <h5><i class="bi bi-pie-chart"></i> Especialidades Mais Procuradas</h5>
          </div>
          <div class="card-body">
            <canvas id="chartEspecialidades"></canvas>
          </div>
        </div>
      </div>
    </div>
    <div class="card card-hover">
      <div class="card-header d-flex justify-content-between">
        <h5 class="mb-0"><i class="bi bi-table"></i> Relatório Detalhado</h5>
        <div>
          <button class="btn btn-sm btn-outline-primary me-2" onclick="exportToPDF()">
            <i class="bi bi-file-earmark-pdf"></i> PDF
          </button>
          <button class="btn btn-sm btn-outline-success" onclick="exportToExcel()">
            <i class="bi bi-file-earmark-excel"></i> Excel
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table" id="reportTable">
            <!-- Dados serão inseridos via JavaScript -->
          </table>
        </div>
      </div>
    </div>
  `;

  document.getElementById('app-content').innerHTML = html;
  renderCharts();
}

function renderCharts() {
  // Gráfico de atendimentos por mês
  const ctx1 = document.getElementById('chartAtendimentos').getContext('2d');
  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [{
        label: 'Atendimentos',
        data: [12, 19, 15, 20, 18, 25],
        backgroundColor: 'rgba(13, 110, 253, 0.7)'
      }]
    }
  });

  // Gráfico de especialidades
  const ctx2 = document.getElementById('chartEspecialidades').getContext('2d');
  new Chart(ctx2, {
    type: 'pie',
    data: {
      labels: ['Cardiologia', 'Pediatria', 'Dermatologia', 'Ortopedia'],
      datasets: [{
        data: [35, 25, 20, 20],
        backgroundColor: [
          'rgba(13, 110, 253, 0.7)',
          'rgba(25, 135, 84, 0.7)',
          'rgba(220, 53, 69, 0.7)',
          'rgba(255, 193, 7, 0.7)'
        ]
      }]
    }
  });
}

function exportToPDF() {
  // Simulação - em produção usar biblioteca como jsPDF
  alert('Relatório exportado como PDF (simulação)');
}

function exportToExcel() {
  // Simulação - em produção usar biblioteca como SheetJS
  alert('Relatório exportado como Excel (simulação)');
}
