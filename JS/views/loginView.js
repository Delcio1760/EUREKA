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
       alert("Erro! Username ou Password incorreto/a.");
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
        alert("Erro! Email inválido.");
        return;
    }
 
    if(!isaluno && !isexplicador){
        alert("Erro! Deve selecionar se é aluno ou explicador.");
        return;
    }
 
    const alunos = JSON.parse(localStorage.getItem("users")) || [];
    const explicadores = JSON.parse(localStorage.getItem("explicador")) || [];
 
    const existe = alunos.some(a => a.username === username || a.email === email) ||
    explicadores.some(e => e.username === username || e.email === email);
 
    if(existe){
        alert("Erro! Este username, ou email já existe.");
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
 
        if (!idade || !disciplinas || !morada || !modalidades || !preco || !disponibilidade) {
            alert("Erro! Preencha todos os campos adicionais obrigatórios para explicador.");
            return;
        }
 
        const novoExplicador = new Explicador(
            username,
            email,
            password,
            idade,
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
 }
 
const registrobtn = document.getElementById("registro-btn");
registrobtn.addEventListener("click", (e) =>{e.preventDefault(); register();});

const alunoRadio = document.getElementById("aluno-radiobtn");
const explicadorRadio = document.getElementById("explicador-radiobtn");
const explicadorBox = document.getElementById("explicador-box");

explicadorRadio.addEventListener("change", () => {
  explicadorBox.classList.add("visivel");
});

alunoRadio.addEventListener("change", () => {
  explicadorBox.classList.remove("visivel");
});