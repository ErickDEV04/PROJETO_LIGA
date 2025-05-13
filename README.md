 MedSchedule - Sistema de Gestão Médica

🚀 Visão Geral
O MedSchedule é um sistema completo para clínicas e consultórios médicos, oferecendo:

Agendamento inteligente de consultas

Gestão de pacientes e profissionais

Controle financeiro integrado

Telemedicina com WebRTC

Prontuário eletrônico digital

✨ Funcionalidades Principais
📅 Agendamento
Calendário interativo com arrastar e soltar

Bloqueio de horários indisponíveis

Confirmação automática por e-mail/SMS

🏥 Gestão Clínica
Prontuário eletrônico completo

Prescrição digital com assinatura

Anexo de exames e imagens

💻 Portal do Paciente
Histórico médico acessível

Agendamento online

Resultados de exames

🛠️ Tecnologias Utilizadas
Frontend
Pacote	Versão	Uso
React	18.2.0	Framework principal
Tailwind CSS	3.3.0	Estilização
React Big Calendar	1.6.0	Calendário interativo
Chart.js	4.2.1	Gráficos e dashboards
WebRTC	-	Videochamadas
Backend
Pacote	Versão	Uso
Node.js	18.x	Runtime
Express	4.18.2	API REST
MongoDB	6.0	Banco de dados
Mongoose	7.0.3	ODM
JWT	9.0.0	Autenticação
Mobile
Pacote	Versão	Uso
React Native	0.72.0	App móvel
Expo	48.0.0	Desenvolvimento
🚨 Pré-requisitos
Node.js 18.x+

MongoDB 6.0+

Yarn ou npm

Conta no Twilio (para SMS)

⚙️ Instalação
Clone o repositório

bash
git clone https://github.com/seu-usuario/medschedule.git
cd medschedule
Instale as dependências

bash
# Frontend
cd frontend
yarn install

# Backend
cd ../backend
yarn install
Configure as variáveis de ambiente
Crie um arquivo .env na pasta backend:

env
MONGODB_URI=mongodb://localhost:27017/medschedule
JWT_SECRET=seu_segredo_super_secreto
TWILIO_ACCOUNT_SID=seu_sid
TWILIO_AUTH_TOKEN=seu_token
Inicie os servidores

bash
# Em um terminal (backend)
cd backend
yarn start

# Em outro terminal (frontend)
cd frontend
yarn dev


🔧 Comandos Úteis
Comando	Descrição
yarn test	Roda os testes unitários
yarn lint	Verifica qualidade do código
yarn build	Cria build de produção
yarn generate:component	Cria novo componente React
🌐 Rotas da API
Autenticação
POST /api/auth/login - Login de usuários

POST /api/auth/refresh - Renova token

Agendamentos
GET /api/appointments - Lista agendamentos

POST /api/appointments - Cria novo agendamento

PUT /api/appointments/:id - Atualiza agendamento

Pacientes
GET /api/patients - Lista pacientes

GET /api/patients/:id - Detalhes do paciente

POST /api/patients - Cadastra novo paciente

📱 Telas Implementadas
Login

Autenticação com JWT

Validação de formulário

Dashboard

Gráficos de ocupação

Próximas consultas

Agendamento

Calendário interativo

Filtros por especialidade

Prontuário

Editor de texto rico

Anexos de exames

Configurações

Perfil do profissional

Preferências de agenda

🤝 Como Contribuir
Faça um fork do projeto

Crie uma branch (git checkout -b feature/AmazingFeature)

Commit suas mudanças (git commit -m 'Add some AmazingFeature')

Push para a branch (git push origin feature/AmazingFeature)

Abra um Pull Request

📄 Licença
Distribuído sob a licença MIT. Veja LICENSE para mais informações.
