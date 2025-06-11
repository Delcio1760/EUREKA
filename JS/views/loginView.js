import { Aluno } from "../models/alunosModel.js";
import { Explicador } from "../models/professorModel.js";

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
       alert("Erro! Username ou password invalidos.");
       return;
   }

   window.location.href = "../index.html";
}

const loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", (e) => {e.preventDefault(); login();});


function register(){
   const username = document.getElementById("Username-Registro").value;
   const password = document.getElementById("Password-registro").value;
   const email = document.getElementById("Email-Registro").value;
  
   const isaluno = document.getElementById("aluno-radiobtn").checked;
   const isexplicador = document.getElementById("explicador-radiobtn").checked;

   if(!email.includes("@") || !email.includes(".") || email.includes(" ")){
       alert("Erro! Email invalido.");
       return;
   }

   if(!isaluno && !isexplicador){
       alert("Erro! Deve selecionar se é aluno ou explicador.");
       return;
   }
  
   const alunos = JSON.parse(localStorage.getItem("users")) || [];
   const explicadores = JSON.parse(localStorage.getItem("explicador")) || [];
  
   const existe = alunos.some(a => a.username === username || a.email === email || password === a.password) ||
   explicadores.some(e => e.username === username || email === e.email || password === e.password);

   if(existe){
       alert("Erro! Username, email ou password já existe.");
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
       const novoExplicador = new Explicador(
           username,
           email,
           password,
           "", // dataNascimento
           [], // disciplinas
           "", //localidade
           [], // modalidades
           0, // preÃ§o
           0, //estrelas
           [], // disponibilidade
           "", // fotoPerfil
       );
       explicadores.push(novoExplicador);
       localStorage.setItem("explicador", JSON.stringify(explicadores));
   }

}

const registrobtn = document.getElementById("registro-btn");
registrobtn.addEventListener("click", (e) =>{e.preventDefault(); register();});
