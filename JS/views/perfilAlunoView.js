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


// tabela de professores contactados
window.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  if (!loggedInUser) return;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const explicadores = JSON.parse(localStorage.getItem("explicador")) || [];

  const aluno = users.find(u => u.username === loggedInUser.username);
  if (!aluno || !Array.isArray(aluno.professoresContactados)) return;

  const tbody = document.querySelector("#tabela-professores-contactados tbody");
  tbody.innerHTML = "";

  aluno.professoresContactados.forEach(contactado => {
    const prof = explicadores.find(e => e.username === contactado.username);
    if (prof) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><img src="${prof.fotoPerfil || '../../img/defaultimg.jpg'}" width="50" height="50" alt="Foto de ${prof.username}"></td>
        <td>${prof.username}</td>
        <td>${prof.tempoResposta || "N/A"}</td>
        <td>${prof.numeroTelefone || "N/A"}</td>
        <td>${prof.email || "N/A"}</td>
        <td>${prof.preco ? prof.preco + "€" : "N/A"}</td>
      `;
      tbody.appendChild(tr);
    }
  });
});


  





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


document.addEventListener('DOMContentLoaded', () => {
  const btnDelete = document.querySelector('.btn-delete');
  const modal = document.getElementById('modal-confirmacao');
  const btnConfirm = document.getElementById('confirmar-eliminar');
  const btnCancel = document.getElementById('cancelar-eliminar');
  const btnClose = document.querySelector('.close-button');

  btnDelete.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  btnCancel.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  btnClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target == modal) {
      modal.style.display = 'none';
    }
  });

  btnConfirm.addEventListener('click', () => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      alert("Nenhum utilizador autenticado.");
      return;
    }

    const username = loggedInUser.username || loggedInUser.email;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.filter(user => user.username !== username && user.email !== username);

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    sessionStorage.removeItem("loggedInUser");

    alert("Perfil eliminado com sucesso.");
    window.location.href = "../../index.html";
  });
});




//mudar foto de perfil
const inputFoto = document.getElementById("fotoInput");
const imgPerfil = document.getElementById("fotoPerfil");

inputFoto.addEventListener("change", (event) => {
  const ficheiro = event.target.files[0];            // verifica se o utilizador selecionou um ficheiro
  if (!ficheiro) return;

  const leitor = new FileReader();

  leitor.onload = function (e) {         // quando a leitura do ficheiro for concluída e o resultado estiver disponível ele executa esta função
    const user = getUserLogged();
    if (!user) return;

    user.fotoPerfil = e.target.result;         // atribui o resultado da leitura do ficheiro à propriedade fotoPerfil do utilizador

    // Atualiza sessionStorage
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));

    // Atualiza localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex((u) => u.username === user.username);
    if (index !== -1) {     // verifica se o utilizador existe no localStorage
      users[index] = user;   // atualiza o utilizador no array de utilizadores
      localStorage.setItem("users", JSON.stringify(users));
    }

    // Atualiza imagem no DOM
    imgPerfil.src = user.fotoPerfil;
  };

  leitor.readAsDataURL(ficheiro);      // lê o ficheiro como uma URL de dados
});







window.addEventListener("DOMContentLoaded", () => {
  preencherPerfil();
});


