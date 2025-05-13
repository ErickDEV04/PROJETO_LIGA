// Dados de usuários (simulado - em produção usar backend)
const users = [
  { id: 1, email: "admin@medschedule.com", password: "123456", role: "admin", name: "Administrador" },
  { id: 2, email: "medico@medschedule.com", password: "123456", role: "medico", name: "Dr. Carlos" }
];

// Verifica se o usuário está logado
function checkAuth() {
  const token = localStorage.getItem('authToken');
  if (!token && !window.location.pathname.endsWith('index.html')) {
    window.location.href = 'index.html';
  }
}

// Processa o login
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Simula token JWT
    const token = btoa(JSON.stringify({
      id: user.id,
      email: user.email,
      role: user.role
    }));
    
    localStorage.setItem('authToken', token);
    localStorage.setItem('userName', user.name);
    localStorage.setItem('userRole', user.role);
    
    window.location.href = 'app.html';
  } else {
    alert('Credenciais inválidas!');
  }
});

// Logout
function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userName');
  localStorage.removeItem('userRole');
  window.location.href = 'index.html';
}

// Verifica autenticação ao carregar a aplicação
checkAuth();
