







import { getExplicadorByUsername, initProfessores } from "../models/professorModel.js";










// Inicializar os dados
initProfessores();

function carregarCardsExplicadores() {
  const container = document.querySelector('.grid-container');
  container.innerHTML = ''; // limpa
  

  const explicadores = JSON.parse(localStorage.getItem('explicador')) || [];

  explicadores.forEach(explicador => {
    // Criar link com username na query string
    const link = document.createElement('a');
    link.classList.add('card-link');
    link.href = `../../HTML/profiles/perfilProfessor.html?username=${encodeURIComponent(explicador.username)}`;

    // Criar card
    const card = document.createElement('div');
    card.classList.add('card');

    // Imagem (se explicador.fotoPerfil existir, usa, senão placeholder)
    const img = document.createElement('img');
    img.src = explicador.fotoPerfil && explicador.fotoPerfil.trim() !== '' 
      ? explicador.fotoPerfil 
      : 'https://via.placeholder.com/150?text=Sem+Foto';
    img.alt = `Foto do professor ${explicador.username}`;
    card.appendChild(img);

    // Nome do professor (username)
    const nome = document.createElement('p');
    nome.textContent = explicador.username || 'Sem nome';
    card.appendChild(nome);

    // Disciplina principal — primeira da lista ou "Sem disciplina"
    const subject = document.createElement('p');
    subject.classList.add('subject');
    subject.textContent = (Array.isArray(explicador.disciplinas) && explicador.disciplinas.length > 0) 
      ? explicador.disciplinas[0] 
      : 'Sem disciplina';
    card.appendChild(subject);

    // Adiciona o card dentro do link
    link.appendChild(card);

    // Adiciona ao container
    container.appendChild(link);
  });
}

document.addEventListener('DOMContentLoaded', carregarCardsExplicadores);



const buttonFiltro=document.getElementById('filtrar')
buttonFiltro.addEventListener("click", function() {
  window.location.href = "../../HTML/paginaFiltro.html"; //muda a pagina
});




window.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  if (!loggedInUser) return;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const aluno = users.find(u => u.username === loggedInUser.username);
  if (!aluno || !Array.isArray(aluno.professoresContactados)) return;

  const explicadores = JSON.parse(localStorage.getItem("explicador")) || [];

  const tbody = document.querySelector("#tabela-professores-contactados tbody");
  tbody.innerHTML = ""; // Limpa a tabela

  aluno.professoresContactados.forEach(profContato => {
    const profCompleto = explicadores.find(e => e.username === profContato.username);

    if (profCompleto) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><img src="${profCompleto.foto.perfil|| '../../img/defaultimg.jpg'}" alt="Foto ${profCompleto.username}" width="50" height="50"></td>
        <td>${profCompleto.username}</td>
        <td>${(profCompleto.modalidades && profCompleto.modalidades[0]) || 'Modalidade não disponível'}</td>
        <td>${profCompleto.numeroTelefone || 'Telefone não disponível'}</td>
        <td>${profCompleto.email || 'Email não disponível'}</td>
        <td>${profCompleto.preco !== undefined ? profCompleto.preco + ' €' : 'Preço não disponível'}</td>
      `;
      tbody.appendChild(tr);
    }
  });
});



