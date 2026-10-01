// Mapeamento das rotas e conteúdos/fragmentos
const routes = {
  '/': '<h1>Início</h1><p>Bem-vindo ao Portal da ONG.</p>',
  '/projetos': '<h1>Projetos</h1><p>Conheça as nossas causas ativas.</p>',
  '/cadastro': '<h1>Cadastro</h1><p>Junte-se como voluntário ou doador.</p>'
};

// Função responsável por renderizar o conteúdo na div principal
function navigateTo(url) {
  // Atualiza a URL sem recarregar a página
  window.history.pushState({}, '', url);
  renderContent(url);
}

// Limpa o contêiner e injeta o fragmento HTML da rota
function renderContent(path) {
  const appDiv = document.getElementById('app');
  if (appDiv) {
    appDiv.innerHTML = routes[path] || '<h1>404</h1><p>Página não encontrada.</p>';
  }
}

// Interceção dos cliques nos links do menu
document.addEventListener('click', (e) => {
  if (e.target.matches('a[data-link]')) {
    e.preventDefault();
    const url = e.target.getAttribute('href');
    navigateTo(url);
  }
});

// Suporte para botões do navegador (Avançar / Recuar)
window.addEventListener('popstate', () => {
  renderContent(window.location.pathname);
});
