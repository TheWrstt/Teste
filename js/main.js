// ==========================================
// 1. DADOS E Mapeamento de Rotas (SPA)
// ==========================================
const projetosData = [
  {
    titulo: 'Educação para Todos',
    descricao: 'Aulas de reforço escolar e alfabetização para crianças em situação de vulnerabilidade.',
    categoria: 'Educação'
  },
  {
    titulo: 'Alimentando Esperanças',
    descricao: 'Distribuição de refeições diárias e cestas básicas para famílias da comunidade.',
    categoria: 'Ação Social'
  },
  {
    titulo: 'Verde Urbano',
    descricao: 'Plantação de hortas comunitárias e oficinas de sustentabilidade ambiental.',
    categoria: 'Meio Ambiente'
  }
];

const htmlInicio = `
  <h1>Início</h1>
  <p>Bem-vindo ao Portal da ONG. Juntos transformamos vidas!</p>
`;

const htmlProjetos = `
  <h1>Projetos Ativos</h1>
  <p>Conheça as nossas causas e saiba como ajudar:</p>
  <div id="lista-projetos" class="grid-projetos"></div>
`;

const htmlCadastro = `
  <h1>Cadastro / Envolva-se</h1>
  <form id="form-cadastro">
    <div class="campo">
      <label for="nome">Nome Completo:</label>
      <input type="text" id="nome" required placeholder="Digite o seu nome">
    </div>
    <div class="campo">
      <label for="email">E-mail:</label>
      <input type="email" id="email" required placeholder="seu@email.com">
    </div>
    <button type="submit" class="btn">Enviar Cadastro</button>
  </form>
`;

// ==========================================
// 2. SISTEMA DE ROTAS E RENDERIZAÇÃO
// ==========================================
function navigateTo(url) {
  window.history.pushState({}, '', url);
  renderContent(url);
}

function renderContent(path) {
  const appDiv = document.getElementById('app');
  if (!appDiv) return;

  // Normaliza o caminho removendo o nome do repositório /Teste se existir
  let cleanPath = path.replace('/Teste', '');

  // Trata caminhos vazios ou raízes como início
  if (cleanPath === '' || cleanPath === '/' || cleanPath === '/index.html') {
    appDiv.innerHTML = htmlInicio;
  } else if (cleanPath.includes('projetos')) {
    appDiv.innerHTML = htmlProjetos;
    renderizarProjetos();
  } else if (cleanPath.includes('cadastro')) {
    appDiv.innerHTML = htmlCadastro;
  } else {
    appDiv.innerHTML = '<h1>404</h1><p>Página não encontrada.</p>';
  }
}

function renderizarProjetos() {
  const container = document.getElementById('lista-projetos');
  if (!container) return;

  container.innerHTML = projetosData.map(proj => `
    <article class="card-projeto">
      <span class="badge">${proj.categoria}</span>
      <h3>${proj.titulo}</h3>
      <p>${proj.descricao}</p>
    </article>
  `).join('');
}

// ==========================================
// 3. PERSISTÊNCIA DE DADOS (LOCALSTORAGE)
// ==========================================
function salvarNoLocalStorage(dados) {
  const cadastrosAtuais = JSON.parse(localStorage.getItem('cadastros_ong')) || [];
  cadastrosAtuais.push(dados);
  localStorage.setItem('cadastros_ong', JSON.stringify(cadastrosAtuais));
}

// ==========================================
// 4. EVENT DELEGATION E LISTENERS GLOBAIS
// ==========================================
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
      exibirAlerta('Atenção', 'Por favor, preencha o seu nome.', 'warning');
      return;
    }
    
    if (!regexEmail.test(emailInput.value.trim())) {
      exibirAlerta('E-mail Inválido', 'Por favor, insira um e-mail válido.', 'error');
      return;
    }

    salvarNoLocalStorage({
      nome: nomeInput.value.trim(),
      email: emailInput.value.trim(),
      data: new Date().toISOString()
    });

    exibirAlerta('Sucesso!', 'O seu cadastro foi realizado e salvo com sucesso.', 'success');
    e.target.reset();
  }
});

window.addEventListener('popstate', () => {
  renderContent(window.location.pathname);
});

window.addEventListener('DOMContentLoaded', () => {
  renderContent(window.location.pathname);
});

function exibirAlerta(titulo, texto, icone) {
  if (typeof Swal !== 'undefined') {
    Swal.fire({ title: titulo, text: texto, icon: icone });
  } else {
    alert(`${titulo}: ${texto}`);
  }
}