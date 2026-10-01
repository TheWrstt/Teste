// 1. Mapeamento das rotas para navegação SPA
const routes = {
  '/index.html': '<h1>Início</h1><p>Bem-vindo ao Portal da ONG.</p>',
  '/projetos.html': '<h1>Projetos</h1><p>Conheça as nossas causas ativas.</p>',
  '/cadastro.html': `
    <h1>Cadastro / Envolva-se</h1>
    <form id="form-cadastro">
      <div class="campo">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" required>
        <span class="msg-erro"></span>
      </div>
      <div class="campo">
        <label for="email">E-mail:</label>
        <input type="email" id="email" required>
        <span class="msg-erro"></span>
      </div>
      <button type="submit" class="btn">Enviar Cadastramento</button>
    </form>
  `,
  '/': '<h1>Início</h1><p>Bem-vindo ao Portal da ONG.</p>'
};

// 2. Navegação da SPA
function navigateTo(url) {
  window.history.pushState({}, '', url);
  renderContent(url);
}

function renderContent(path) {
  const appDiv = document.getElementById('app');
  if (appDiv) {
    appDiv.innerHTML = routes[path] || '<h1>404</h1><p>Página não encontrada.</p>';
  }
}

// 3. Validação do Formulário e Persistência no LocalStorage
function salvarNoLocalStorage(dados) {
  const cadastrosAtuais = JSON.parse(localStorage.getItem('cadastros_ong')) || [];
  cadastrosAtuais.push(dados);
  localStorage.setItem('cadastros_ong', JSON.stringify(cadastrosAtuais));
}

// 4. Interceção de Cliques e Submissões Globais (Event Delegation)
document.addEventListener('click', (e) => {
  if (e.target.matches('a[data-link]')) {
    e.preventDefault();
    const url = e.target.getAttribute('href');
    navigateTo(url);
  }
});

document.addEventListener('submit', (e) => {
  if (e.target.id === 'form-cadastro') {
    e.preventDefault();
    
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!nomeInput.value.trim()) {
      alert('Por favor, preencha o nome.');
      return;
    }
    
    if (!regexEmail.test(emailInput.value.trim())) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }

    // Salva os dados localmente
    salvarNoLocalStorage({
      nome: nomeInput.value.trim(),
      email: emailInput.value.trim(),
      data: new Date().toISOString()
    });

    alert('Cadastro realizado com sucesso e salvo no navegador!');
    e.target.reset();
  }
});

window.addEventListener('popstate', () => {
  renderContent(window.location.pathname);
});
