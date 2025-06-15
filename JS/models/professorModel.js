const LS_KEY = "explicador";

let explicadores = [];
// Caregar explicadores da LocalStorage
export function init(){
  explicadores = JSON.parse(localStorage.getItem(LS_KEY)) || [];
}

// Adicionar explicador
export function addExplicador(username,email,password,idade,disciplinas,morada,modalidade,preco) {
   if(explicadores.some((user) => user.username === username)){
      throw Error(`User with username ${username} already exists`);
   }else{
  explicadores.push(new Explicador(username,email,password,idade,disciplinas,morada,modalidade,preco));
  localStorage.setItem(LS_KEY, JSON.stringify(explicadores));}

}


// Login do Explicador
export function loginExplicador(username, password) {
  const user = explicadores.find(
      (user) => user.username === username && user.password === password);

      if (user) {
      sessionStorage.setItem("loggedTutor", JSON.stringify(user));
      return true;
      } else {
      throw Error("Invalid username or password");
       }          
}


// Logout do Explicador
export function logoutExplicador() {
  sessionStorage.removeItem("loggedTutor");
}

// VERIFICA EXISTENCIA DE ALGUEM AUTENTICADO
export function isTutorLoggedin() {
  return sessionStorage.getItem("loggedTutor") ? true : false;
}


// Devolve o explicador logado
export function getTutorLogged(){
  return JSON.parse(sessionStorage.getItem("loggedTutor"));
}

export class Explicador{
  id=0
  username = "" ;
  email = "";
  password = "";
  dataNascimento = "";
  disciplinas = [];   // disciplinas que leciona
  morada = "";
  numeroTelefone=0
  modalidades = []; // presencial ou online
  preco = "";
  estrelas = 0;
  disponibilidade = [];  // disponibilidade do explicador (dias e horas)
  fotoPerfil = "";
  tempoResposta="";
  sobreoProfessor="";
  sobreAula=""
  anoEnsino="";

  constructor(username,email,password,dataNascimento,disciplinas,morada,numero,modalidades,preco,estrelas,disponibilidade,fotoPerfil,tempoResposta,sobreoProfessor,anoEnsino) {
      this.username = username;
      this.email = email;
      this.password = password;
      this.dataNascimento = dataNascimento;
      this.disciplinas = disciplinas;
      this.morada = morada;
      this.numeroTelefone=numero
      this.modalidades = modalidades;
      this.preco = Number(preco);
        this.estrelas = 0;                     // por defeito, o explicador comeÃ§a com 0 estrelas
        this.disponibilidade = [];
        this.fotoPerfil = fotoPerfil || ""; 
        this.tempoResposta=tempoResposta
        this.sobreoProfessor=sobreoProfessor
        this.sobreAula=sobreAula
  }
}




