const LS_KEY = "explicadores";

let users ;
 // Caregar utlizadores da LocalStorage
 export function init(){
    users = JSON.parse(localStorage.getItem(LS_KEY)) || [];
 }

 // Adicionar explicador
export function addExplicador(username,email,password,idade,disciplinas,morada,modalidade,preco) {
    if(users.some((user) => user.username === username)){
        throw Error(`User with username ${username} already exists`);
    }else{
    users.push(new Explicador(username,email,password,idade,disciplinas,morada,modalidade,preco));
    localStorage.setItem(LS_KEY, JSON.stringify(users));}

}


// Login do Explicador
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


// Logout do Explicador
export function logout() {
    sessionStorage.removeItem("loggedInUser");
}

// VERIFICA EXISTÊNCIA DE ALGUÉM AUTENTICADO
export function isLoggedIn() {
    return sessionStorage.getItem("loggedInUser") ? true : false;
}


// Devolve o explicador logado
export function getUserLogged(){
    return JSON.parse(sessionStorage.getItem("loggedInUser"));
}

class Explicador{
    username = "" ;
    email = "";
    password = "";
    idade = "";
    disciplinas = "";
    morada = "";
    modalidade = "";
    preco = "";

    constructor(username,email,password,idade,disciplinas,morada,modalidade,preco){
        this.username = username;
        this.email = email;
        this.password = password;
        this.idade = idade;
        this.disciplinas = disciplinas;
        this.morada = morada;
        this.modalidade = modalidade;
        this.preco = preco;
    }

    
}

