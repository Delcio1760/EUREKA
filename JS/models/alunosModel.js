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
   constructor(username, password, telefone, dataNascimento, email, morada,filtros,favoritos, fotoPerfil,pontos) {
       this.username = username;
       this.password = password;
       this.telefone = telefone;
       this.dataNascimento = dataNascimento;
       this.email = email;
       this.morada = morada;
       this.pontos = pontos || 0; // Pontos do aluno inicia com 0           
       this.favoritos = favoritos|| [];
       this.filtros = filtros || {                 // Filtros para pesquisa de explicadores
           disciplinas: "",
           modalidades: [],
           disponibilidade: [],
           precoMax: 0,
           localidade: "",  
       };
       this.fotoPerfil = fotoPerfil || ""; // Foto de perfil do aluno
   }
}