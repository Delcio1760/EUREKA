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