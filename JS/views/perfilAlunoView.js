import { Aluno } from "../models/alunosModel.js";



// para editar o perfil
const editButton = document.querySelector('.btn-edit');
  const inputs = document.querySelectorAll('.input-edit');
  let isEditing = false;

  




  import {getUserLogged } from "../models/alunosModel.js";
  
function preencherPerfil() {
  const user = getUserLogged();
  

  if (!user) {
    console.error("Nenhum utilizador autenticado.");
    return;
  }

  // Preenche inputs do formulário
  document.querySelector("#nome-completo").value = user.username || "";
  document.querySelector("#data-nascimento").value = user.dataNascimento || "";
  document.querySelector("#email").value = user.email || "";
  document.querySelector("#telefone").value = user.telefone || "";
  document.querySelector("#morada").value = user.morada || "";

  // Preenche a secção lateral do perfil
  document.querySelector(".profile-right h3").textContent = user.username;
  document.querySelector(".profile-right p").textContent = calcularIdade(user.dataNascimento) + " anos";
  document.querySelector(".profile-right img").src = "../../img/" + (user.fotoPerfil || "default.jpg");
}

  





//para exibir no card  aluno
function calcularIdade(dataNascimento) {
  const [dia, mes, ano] = dataNascimento.split("/").map(Number);
  const nascimento = new Date(ano, mes - 1, dia);
  const hoje = new Date();

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();

  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
}


//para colocar o email do aluno logado
function preencherNomeEmail() {
  const user = getUserLogged();

  if (!user) return;

  // Preenche diretamente os campos nome e email
  document.querySelector("#nome-completo").value = user.username || "";
  document.querySelector("#email").value = user.email || "";
}

//para atualizar dados na local storage
function guardarAlteracoes() {
  const user = getUserLogged();
  if (!user) return;

  const usernameAntigo = user.username;


  user.dataNascimento = document.querySelector("#data-nascimento").value;
  user.telefone = document.querySelector("#telefone").value;
  user.morada = document.querySelector("#morada").value;

  sessionStorage.setItem("loggedInUser", JSON.stringify(user));

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const index = users.findIndex((u) => u.username === usernameAntigo);

  if (index !== -1) {
    users[index] = user;
    localStorage.setItem("users", JSON.stringify(users));
  }
}



editButton.addEventListener("click", () => {
  isEditing = !isEditing;

  //para que o email e o user name fiquem estaticos
  inputs.forEach(input => {
  
  if (input.id === "nome-completo" || input.id === "email") {
    return; 
  }
  input.disabled = !isEditing;
});

  if (!isEditing) {
    guardarAlteracoes(); // Quando clicas em "Guardar Alterações"
  }

  editButton.textContent = isEditing ? "Guardar Alterações" : "Editar Perfil";
});







window.addEventListener("DOMContentLoaded", () => {
  preencherPerfil();
});
