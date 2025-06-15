import { Aluno } from "../models/alunosModel.js";
import { Explicador } from "../models/professorModel.js";


//modals de aviso
function mostrarModal(mensagem, tipo = "success") {
  const modal = document.getElementById("mensagemModal");
  const modalContent = modal.querySelector(".modal-content");
  const texto = document.getElementById("modalMensagemTexto");

  texto.textContent = mensagem;
  modalContent.classList.remove("success", "error");
  modalContent.classList.add(tipo);

  modal.style.display = "block";

  document.querySelector(".modal .close").onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  setTimeout(() => {
    modal.style.display = "none";
  }, 3000);
}

const signInBtnLink = document.querySelector('.signInBtn-link');
const signUpBtnLink = document.querySelector('.signUpBtn-link');
const wrapper = document.querySelector('.wrapper');
const signUpForm = document.querySelector('.form-wrapper.sign-up');
const signInForm = document.querySelector('.form-wrapper.sign-in');

signUpBtnLink.addEventListener('click', () => {
   wrapper.classList.add('active');
});


signInBtnLink.addEventListener('click', () => {
   wrapper.classList.remove('active');
});

function login(){
  const username = document.getElementById("Username-input").value;
  const password = document.getElementById("Password-input").value;

  const alunos = JSON.parse(localStorage.getItem("users")) || [];
  const explicadores = JSON.parse(localStorage.getItem("explicador")) || [];

  const utilizador = alunos.find(aluno => aluno.username === username && aluno.password === password) ||
   explicadores.find(explicador => explicador.username === username && explicador.password === password);

   if(!utilizador){
   mostrarModal("Erro! Username ou password inválidos.", "error");
   return;
}

   
  sessionStorage.setItem("loggedInUser", JSON.stringify(utilizador));

  
  if (alunos.some(a => a.username === username)) {
    window.location.href = "../../HTML/paginaAlunoPosLogin.html";
  } else {
    window.location.href = "../../HTML/profiles/perfilProfessor.html";
  }
}

   

const loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", (e) => {e.preventDefault(); login();});


function register(){
   const username = document.getElementById("Username-Registro").value;
   const password = document.getElementById("Password-registro").value;
   const email = document.getElementById("Email-Registro").value;
  
   const isaluno = document.getElementById("aluno-radiobtn").checked;
   const isexplicador = document.getElementById("explicador-radiobtn").checked;

   if (!username || !password || !email) {
     mostrarModal("Erro! Todos os campos devem estar preenchidos.", "error");
     return;
   }

   if(!email.includes("@") || !email.includes(".") || email.includes(" ")){
     mostrarModal("Erro! Email inválido.", "error");
     return;
   }

   if(!isaluno && !isexplicador){
     mostrarModal("Erro! Deve selecionar se é aluno ou explicador.", "error");
     return;
   }
  
   const alunos = JSON.parse(localStorage.getItem("users")) || [];
   const explicadores = JSON.parse(localStorage.getItem("explicador")) || [];
  
   const existe = alunos.some(a => a.username === username || a.email === email ) ||
                  explicadores.some(e => e.username === username || email === e.email );

   if(existe){
     mostrarModal("Erro! Username ou email já existe.", "error");
     return;
   }

   if(isaluno){
       const novoAluno = new Aluno(
           username,
           password,
           "", // telefone
           "", // dataNascimento
           email,
           "", // morada
           {}, // disciplinas
           [], // favoritos
           "" // fotoPerfil
       );

       alunos.push(novoAluno);
       localStorage.setItem("users", JSON.stringify(alunos));
   }

    if(isexplicador){
        // Validar dados adicionais
        const idade = document.getElementById("idade").value.trim();
        const disciplinas = document.getElementById("disciplinas").value.trim();
        const morada = document.getElementById("morada").value.trim();
        const modalidades = document.getElementById("modalidades").value.trim();
        const preco = document.getElementById("preco").value.trim();
        const disponibilidade = document.getElementById("disponiblidade").value.trim();
        const numeroTelefone = document.getElementById("numero").value.trim();

        if(isNaN(numeroTelefone||numeroTelefone.length <8)){
          mostrarModal("Erro! Indique corretamente o numero de telefone","error")
        }

        if(!idade || !disciplinas || !morada || !modalidades || !preco || !disponibilidade||numeroTelefone){
     mostrarModal("Erro! Deve selecionar se é aluno ou explicador", "error");
     return;
   }
 
        
 
        const novoExplicador = new Explicador(
            username,
            email,
            password,
            idade,
            numeroTelefone,
            disciplinas.split(",").map(d => d.trim()),
            morada,
            modalidades.split(",").map(m => m.trim()),
            parseFloat(preco),
            0, // estrelas
            disponibilidade.split(",").map(d => d.trim()),
            "" // fotoPerfil
        );
 
        explicadores.push(novoExplicador);
        localStorage.setItem("explicador", JSON.stringify(explicadores));
    }
   

   // Mensagem de sucesso e retorno ao login
   mostrarModal("Conta criada com sucesso! Já pode fazer login.", "success");
   wrapper.classList.remove('active'); // volta ao formulário de login
}



const registrobtn = document.getElementById("registro-btn");
registrobtn.addEventListener("click", (e) =>{e.preventDefault(); register();});

//animação
const alunoRadio = document.getElementById("aluno-radiobtn");
const explicadorRadio = document.getElementById("explicador-radiobtn");
const explicadorBox = document.getElementById("explicador-box");

explicadorRadio.addEventListener("change", () => {
  explicadorBox.classList.add("visivel");
});

alunoRadio.addEventListener("change", () => {
  explicadorBox.classList.remove("visivel");
});

console.log(localStorage)






