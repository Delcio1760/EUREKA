








// Obter o username da URL
const params = new URLSearchParams(window.location.search);
const username = params.get("username");
console.log(username); 

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const username = params.get("username");

  

  const explicadores = JSON.parse(localStorage.getItem("explicador")) || [];
  const explicador = explicadores.find(exp => exp.username === username);

 

  // Preenchimento dos dados do perfil
  document.getElementById("nomeProfessor").textContent = explicador.username;
  document.getElementById("professorDisciplina").textContent = `Professor de ${explicador.disciplinas.join(", ")}`;
  document.getElementById("grauEnsino").textContent = explicador.anoEnsino || "";
  document.getElementById("localizacao").textContent = explicador.morada;
  document.getElementById("preco").innerHTML = `Preço por hora/aula: €${explicador.preco}`;
  document.getElementById("tempoResposta").innerHTML = `Tempo de Resposta: ${explicador.tempoResposta || "N/D"}`;
  document.getElementById("Idade").innerHTML = `Idade: ${calcularIdade(explicador.dataNascimento)} anos`;
  document.getElementById("descricaoProfessor").textContent = explicador.sobreoProfessor || "Sem descrição.";
  document.getElementById("descricaoAulas").textContent = explicador.sobreAula || "Sem descrição.";
  document.getElementById('')

  
// Modalidades (Online/Presencial)
const modalidadesExplicador = explicador.modalidades?.map(m => m.toLowerCase()) || [];

const modalBtns = document.querySelectorAll(".modalidade-buttons button");
let peloMenosUma = false;

// Verifica as modalidades do explicador (garantindo lowercase)
const modalidades = explicador.modalidades?.map(m => m.toLowerCase()) || [];

// Seleciona os botões
const btnOnline = document.getElementById("online");
const btnPresencial = document.getElementById("presencial");

// Mostra ou esconde os botões com base nas modalidades
if (modalidades.includes("online")) {
  btnOnline.style.display = "inline-block";
  btnOnline.disabled = false;
} else {
  btnOnline.style.display = "none";
}

if (modalidades.includes("presencial")) {
  btnPresencial.style.display = "inline-block";
  btnPresencial.disabled = false;
} else {
  btnPresencial.style.display = "none";
}





  // Imagem de perfil
  const img = document.querySelector(".profile-card img");
  img.src = `../../img/${explicador.fotoPerfil || "default.jpg"}`;
});

// Função auxiliar
function calcularIdade(dataNascimento) {
  if (!dataNascimento) return "N/D";

  const nascimento = new Date(dataNascimento);
  const hoje = new Date();

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();

  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
}


import {  } from "../models/professorModel.js";

// Função para ir ao perfil do explicador logado
function irParaPerfilExplicador() {
  const explicador = JSON.parse(sessionStorage.getItem("loggedTutor"));

  if (!explicador || !explicador.username) {
    alert("Nenhum explicador autenticado.");
    return;
  }

  
  window.location.href = `../profiles/perfilProfessor.html?username=${encodeURIComponent(explicador.username)}`;
}



// Adiciona o event listener se o botão existir
document.getElementById("btnMeuPerfil")?.addEventListener("click", irParaPerfilExplicador);
console.log(sessionStorage.getItem("loggedTutor"));
const user = JSON.parse(sessionStorage.getItem("loggedTutor"));
console.log(user.username); // <- funciona para aluno ou explicador


