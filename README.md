# NGO Portal SPA - Portal Institucional

Aplicação web do tipo Single Page Application (SPA) desenvolvida para um portal de Organização Não Governamental (ONG). O projeto foi construído em JavaScript Vanilla (ES6+), priorizando arquitetura leve sem dependência de frameworks pesados, acessibilidade web (WCAG 2.1) e design responsivo.

---

##  Objetivos do Projeto

- **Navegação Dinâmica (SPA):** Gestão de rotas no lado do cliente com a History API do navegador, sem recarregamento de página.
- **Acessibilidade Universal:** Conformidade com as diretrizes WCAG 2.1 (Nível AA), garantindo navegabilidade por teclado, leitores de ecrã e elevado contraste cromático.
- **Engajamento e Formulários:** Validação robusta de formulários em tempo real com expressões regulares (RegEx) e persistência de dados local (`localStorage`).
- **Performance:** Carregamento otimizado de recursos estáticos e suporte a temas claro/escuro.

---

##  Tecnologias Utilizadas

- **HTML5 Semântico:** Uso de *landmarks* (`<header>`, `<nav>`, `<main>`, `<footer>`) e atributos WAI-ARIA.
- **CSS3 Moderm:** Variáveis globais (`Custom Properties`), Flexbox, CSS Grid e media queries para responsividade e suporte a temas.
- **JavaScript (ES6+):** Programação funcional, manipulação otimizada do DOM com delegação de eventos e History API.
- **Bibliotecas Externas:** [SweetAlert2](https://sweetalert2.github.io/) para modais e alertas interativos.
- **Versionamento & Deploy:** Git, GitHub Flow/GitFlow e GitHub Pages.

---

##  Diretrizes de Acessibilidade (WCAG 2.1)

1. **Estrutura Semântica:** Adoção rigorosa de tags semânticas para facilitar a leitura por softwares de apoio.
2. **Contraste de Cores:** Todos os pares de cores (texto/fundo) cumprem o rácio mínimo de 4.5:1 exigido no Nível AA.
3. **Navegação por Teclado:** Foco visível configurado (`:focus-visible`) em todos os elementos interativos e ordem lógica de tabulação (`tabindex`).
4. **Atributos ARIA:** Aplicação de `aria-label`, `aria-expanded` e `role` onde a semântica nativa do HTML precisa de reforço.

---

##  Estrutura do Repositório e Branches (GitFlow)

O projeto segue a convenção de **Conventional Commits** e a estrutura de branches organizada:

- `main` / `master`: Código estável em produção (alinhado ao GitHub Pages).
- `develop`: Branch de integração para desenvolvimento de funcionalidades.
- `feature/*`: Branches temporárias criadas para funcionalidades específicas (ex.: `feature/spa-routing`, `feature/dark-mode`).

---

## Como Executar o Projeto Localmente

1. Clone este repositório:
   ```bash
   git clone [https://github.com/thewrstt/Teste.git](https://github.com/thewrstt/Teste.git)
