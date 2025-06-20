// Salva as disciplinas fixas no localStorage se ainda não tiver nadaAdd commentMore actions
  function inicializarDisciplinas() {
    if (!localStorage.getItem('disciplinas')) {
      localStorage.setItem('disciplinas', JSON.stringify(disciplinasFixas));
    }
  }
  
  // Função para obter disciplinas do localStorage
  function obterDisciplinas() {
    const dados = localStorage.getItem('disciplinas');
    return dados ? JSON.parse(dados) : [];
  }
  
  // Renderiza as disciplinas (fixas + adicionadas)
  function renderizarDisciplinas() {
    const disciplinas = obterDisciplinas();
    const main = document.querySelector('main');
  
    disciplinas.forEach(disciplina => {
      const card = document.createElement('a');
      card.className = 'card';
      card.href = '/HTML/paginaFiltro.html';
      card.tabIndex = 0;
  
      card.innerHTML = `
        <img src="${disciplina.imagem}" alt="Imagem da disciplina ${disciplina.nome}" />
        <h2>${disciplina.nome}</h2>
      `;
  
      main.appendChild(card);
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    inicializarDisciplinas();
    renderizarDisciplinas();
  });


  document.getElementById("disciplina-form").addEventListener('submit',function(e){
    e.preventDefault();

    const nome = document.getElementById('nomeDisciplina').value;
    const descricao = document.getElementById('descricaoDisciplina').value;
    const imagemFile = document.getElementById('imagemDisciplina').files[0];

    const leitor = new FileReader();
    leitor.onload = function(){
      const novaDisciplina = {
        nome: nome,
        descricao: descricao,
        imagem: leitor.result // imagem em base64
      };

      const disciplinas = JSON.parse(localStorage.getItem('disciplinas')) || [];
      disciplinas.push(novaDisciplina);
      localStorage.setItem('disciplinas', JSON.stringify(disciplinas));

      // Redericiona para a pagina das disciplinas
      window.location.href = '/HTML/disciplinas.html';

    };
    if (imagemFile) {
      leitor.readAsDataURL(imagemFile); // Converte a imagem para base64
    } else {
      alert('Por favor, escolha uma imagem.');
    }
  })