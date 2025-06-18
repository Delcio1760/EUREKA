let users ;
// Caregar utlizadores da LocalStorage
export function init(){
   users = localStorage.users ? JSON.parse(localStorage.users) : [];
}

// Adicionar aluno
export function addAluno(username, password, telefone, idade, email, morada) {
   if(users.some((user) => user.username === username)){
       throw Error(`User with username ${username} already exists`);
   }else{
   users.push(new Aluno(username, password, telefone, idade, email, morada));
   localStorage.setItem("users", JSON.stringify(users));}

}

// Login do Utlizador
export function login(username, password) {
   const user = users.find(
       (user) => user.username === username && user.password === password
   );
   if (user) {
       sessionStorage.setItem("loggedInUser", JSON.stringify(user));
       return true;
   } else {
       throw Error("Invalid username or password");
   }           
}

// Logout do Utlizador
export function logout() {
   sessionStorage.removeItem("loggedInUser");
}

// VERIFICA EXISTÃŠNCIA DE ALGUÃ‰M AUTENTICADO
export function isLoggedIn() {
   return sessionStorage.getItem("loggedInUser") ? true : false;
}


// Devolve o utilizador logado
export function getUserLogged(){
   return JSON.parse(sessionStorage.getItem("loggedInUser"));
}


//mete os dados numa array explicadores
export function initProfessores() {
  explicadores = JSON.parse(localStorage.getItem('explicador')) || [];
}



//calcula a idade
export function calcularIdade(dataNascimento) {
  if (!dataNascimento) return "N/D";

  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
}
//ao adicionar o prof no favorito(sempre atualizar os objetos alunos)
export function atualizarAluno(alunoAtualizado) {
  const alunos = JSON.parse(localStorage.getItem("users")) || [];
  const index = alunos.findIndex(a => a.username === alunoAtualizado.username);
  if (index !== -1) {
    alunos[index] = alunoAtualizado;
    localStorage.setItem("users", JSON.stringify(alunos));
    sessionStorage.setItem("alunoLogado", JSON.stringify(alunoAtualizado));
  }
}

export class Aluno {
   username = "";
   password = "";
   telefone = "";
   dataNascimento = "";
   email = "";
   morada = "";
   pontos = 0;
   favoritos = []; // Lista de favoritos do aluno
   filtros = {};
   fotoPerfil = "";
   favoritos=""
   constructor(username, password, telefone, dataNascimento, email, morada,filtros,favoritos, fotoPerfil) {
       this.username = username;
       this.password = password;
       this.telefone = telefone;
       this.dataNascimento = dataNascimento;
       this.email = email;
       this.morada = morada;
       this.pontos = 0;               
       this.favoritos = [];
       this.filtros = {                 // Filtros para pesquisa de explicadores
           disciplinas: "",
           modalidades: [],
           disponibilidade: [],
           precoMax: 0,
           localidade: "",  
           
       };
       this.favoritos = [];
       this.fotoPerfil = fotoPerfil || ""; // Foto de perfil do aluno
   }
}


export function adicionarFavorito(usernameExplicador) {
  const aluno = getAlunoLogado();
  if (!aluno.favoritos.includes(usernameExplicador)) {
    aluno.favoritos.push(usernameExplicador);
    salvarAluno(aluno);
  }
}

export function removerFavorito(usernameExplicador) {
  const aluno = getAlunoLogado();
  aluno.favoritos = aluno.favoritos.filter(fav => fav !== usernameExplicador);
  salvarAluno(aluno);
}

function salvarAluno(alunoAtualizado) {
  const alunos = JSON.parse(localStorage.getItem("users")) || [];
  const atualizados = alunos.map(aluno =>
    aluno.username === alunoAtualizado.username ? alunoAtualizado : aluno
  );
  localStorage.setItem("alunos", JSON.stringify(atualizados));
  sessionStorage.setItem("loggedAluno", JSON.stringify(alunoAtualizado));
}


