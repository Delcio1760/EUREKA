import { getAlunoByUsername } from "../models/alunoModel.js";
import { getExplicadorByUsername } from "../models/professorModel.js";

function carregarFavoritos() {
  const params = new URLSearchParams(window.location.search);
  const usernameAluno = params.get("username");
  const container = document.querySelector(".grid-container");

  if (!usernameAluno) {
    container.innerHTML = "<p>Aluno não especificado.</p>";
    return;
  }

  const aluno = getAlunoByUsername(usernameAluno);

  if (!aluno || !aluno.favoritos || aluno.favoritos.length === 0) {
    container.innerHTML = "<p>Sem favoritos ainda.</p>";
    return;
  }

  container.innerHTML = "";

  aluno.favoritos.forEach((usernameExplicador) => {
    const explicador = getExplicadorByUsername(usernameExplicador);
    if (!explicador) return;

    // Criar o card
    const link = document.createElement("a");
    link.classList.add("card-link");
    link.href = `../profiles/perfilProfessor.html?username=${encodeURIComponent(explicador.username)}`;

    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = explicador.fotoPerfil?.trim() || "https://via.placeholder.com/150?text=Sem+Foto";
    img.alt = `Foto do professor ${explicador.username}`;
    card.appendChild(img);

    const nome = document.createElement("p");
    nome.textContent = explicador.username || "Sem nome";
    card.appendChild(nome);

    const disciplina = document.createElement("p");
    disciplina.classList.add("subject");
    disciplina.textContent = explicador.disciplinas?.[0] || "Sem disciplina";
    card.appendChild(disciplina);

    link.appendChild(card);
    container.appendChild(link);
  });
}

document.addEventListener("DOMContentLoaded", carregarFavoritos);



