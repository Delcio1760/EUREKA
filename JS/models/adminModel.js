const LS_KEY = "admin";
const LS_Disciplina = "disciplina";
let admins = [];
let disciplinas = [];


export function init(){
   admins = JSON.parse(localStorage.getItem(LS_KEY)) || [];
}


// Adicionar Administrador
export function addAdmin(username, email, password) {
   if(admins.some((admin) => admin.username === username)){
       throw Error(`User with username ${username} already exists`);
   }else{
       admins.push(new Admin(username, email, password));
       localStorage.setItem(LS_KEY, JSON.stringify(admins));
   }
}

export function loginAdmin(username, password){
   const admin = admins.find(a => a.username === username && a.password === password);
   if(!admin) throw Error("Credenciais invalidas");

   sessionStorage.setItem("admin", JSON.stringify(admin));
  
   // Redericiona para o Dasboard
   window.location.href = "/dashboard.html";
}

//Logout do Administrador
export function logoutAdmin() {
   sessionStorage.removeItem("admin");
}

class Admin{
   username = "";
   email = "";
   password = "";

   constructor(username, email, password) {
       this.username = username;
       this.email = email;
       this.password = password;
   }
}

// Gestão de Disciplinas
export function initDisciplinas() {
   disciplinas = JSON.parse(localStorage.getItem(LS_Disciplina)) || [];
}

function guardarDisciplinas(){                                           // Função para guardar disciplinas na LocalStorage
   localStorage.setItem(LS_Disciplina, JSON.stringify(disciplinas));
}

export function addDisciplina(nome, nivelEnsino) {                      // Função para adicionar disciplina
   if(disciplinas.some((disciplina) => disciplina.nome === nome)){
       throw Error(`Disciplina com nome ${nome} já existe`);           
   }else{
       disciplinas.push({ nome, nivelEnsino });
       guardarDisciplinas();
   }
}


export function removeDisciplina(index){                           // Função para remover disciplina
   
   if(index < 0 || index >= disciplinas.length){
      throw Error("Índice inválido");
   } else {
      disciplinas.splice(index, 1);
      guardarDisciplinas();
   }

}

export function listarDisciplinas() {                               // Função para listar disciplinas
   return disciplinas;
}