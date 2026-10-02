// ==========================================
// 1. CONTEÚDO E DADOS COMPLETOS DA PÁGINA
// ==========================================

const htmlInicio = `
  <h1>Início</h1>
  <p>Bem-vindo ao Portal da ONG Esperanza Viva. Juntos transformamos vidas!</p>
  <div style="margin-top: 1.5rem;">
    <p style="margin-bottom: 1rem;">
      A nossa instituição dedica-se a promover a inclusão social, educação de qualidade e apoio a famílias em situação de vulnerabilidade. Acreditamos que a união da comunidade é a força transformadora para um futuro mais justo e sustentável.
    </p>
    <p>
      Navegue pelos nossos projetos para conhecer as nossas causas ativas ou aceda à secção de cadastro para se tornar um voluntário ou doador!
    </p>
  </div>
`;

const projetosData = [
  {
    titulo: 'Educação para Todos',
    descricao: 'Aulas de reforço escolar, alfabetização e apoio pedagógico contínuo para crianças e adolescentes em situação de vulnerabilidade social.',
    categoria: 'Educação',
    imagem: 'assets/img/educacao.jpg' // Usando a imagem de educação
  },
  {
    titulo: 'Alimentando Esperanças',
    descricao: 'Distribuição diária de refeições nutritivas e cestas básicas mensais para famílias cadastradas na comunidade.',
    categoria: 'Ação Social',
    imagem: 'assets/img/combate-fome.jpg'
  },
  {
    titulo: 'Verde Urbano',
    descricao: 'Criação de hortas comunitárias, oficinas de plantio urbano e ações de consciencialização e sustentabilidade ambiental.',
    categoria: 'Meio Ambiente',
    imagem: 'assets/img/voluntarios-acao.jpg'
  }
];

const htmlProjetos = `
  <h1>Projetos Ativos</h1>
  <p style="margin-bottom: 1.5rem;">Conheça em detalhe as nossas causas e saiba como a sua colaboração faz a diferença:</p>
  <div id="lista-projetos" class="grid-projetos"></div>
`;

const htmlCadastro = `
  <h1>Cadastro / Envolva-se</h1>
  <p style="margin-bottom: 1.5rem;">Preencha o formulário abaixo para se juntar à nossa equipa de voluntários ou contribuir com os projetos da ONG.</p>
  <form id="form-cadastro">
    <div class="campo">
      <label for="nome">Nome Completo *</label>
      <input type="text" id="nome" required placeholder="Digite o seu nome completo">
    </div>

    <div class="campo">
      <label for="email">E-mail *</label>
      <input type="email" id="email" required placeholder="exemplo@email.com">
    </div>

    <div class="campo">
      <label for="telefone">Telefone / WhatsApp</label>
      <input type="tel" id="telefone" placeholder="(11) 99999-9999">
    </div>

    <div class="campo">
      <label for="tipo-ajuda">Como deseja participar? *</label>
      <select id="tipo-ajuda" required style="padding: var(--space-sm); border: 1px solid #ccc; border-radius: 4px;">
        <option value="">Selecione uma opção...</option>
        <option value="voluntario">Quero ser Voluntário</option>
        <option value="doador">Quero realizar Doações</option>
        <option value="parceiro">Quero ser Empresa Parceira</option>
      </select>
    </div>

    <div class="campo">
      <label for="mensagem">Mensagem / Disponibilidade</label>
      <textarea id="mensagem" rows="4" placeholder="Conte-nos um pouco sobre a sua motivação ou horários disponíveis..." style="padding: var(--space-sm); border: 1px solid #ccc; border-radius: 4px; font-family: inherit;"></textarea>
    </div>

    <button type="submit" class="btn" style="margin-top: 1rem;">Enviar Cadastro</button>
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

  // Normaliza o caminho do GitHub Pages (/Teste/ ou subrotas)
  let cleanPath = path.replace(/\/Teste\/?/, '/');

  if (cleanPath === '' || cleanPath === '/' || cleanPath === '/index.html' || cleanPath.includes('inicio')) {
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
      <img src="${proj.imagem}" alt="${proj.titulo}" class="img-projeto">
      <span class="badge" style="margin-top: 0.5rem;">${proj.categoria}</span>
      <h3 style="margin: 0.5rem 0;">${proj.titulo}</h3>
      <p>${proj.descricao}</p>
    </article>
  `).join('');
}

// ==========================================
// 3. EVENT LISTENERS E SALVAMENTO
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

    const novosDados = {
      nome: nomeInput.value.trim(),
      email: emailInput.value.trim(),
      telefone: document.getElementById('telefone')?.value || '',
      tipoAjuda: document.getElementById('tipo-ajuda')?.value || '',
      mensagem: document.getElementById('mensagem')?.value || '',
      data: new Date().toISOString()
    };

    const cadastrosAtuais = JSON.parse(localStorage.getItem('cadastros_ong')) || [];
    cadastrosAtuais.push(novosDados);
    localStorage.setItem('cadastros_ong', JSON.stringify(cadastrosAtuais));

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