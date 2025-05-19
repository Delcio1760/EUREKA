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

// VERIFICA EXISTÊNCIA DE ALGUÉM AUTENTICADO
export function isLoggedIn() {
    return sessionStorage.getItem("loggedInUser") ? true : false;
}


// Devolve o utilizador logado
export function getUserLogged(){
    return JSON.parse(sessionStorage.getItem("loggedInUser"));
}

class Aluno {
    username = "";
    password = "";
    telefone = "";
    idade = "";
    email = "";
    morada = "";

    constructor(username, password, telefone, idade, email, morada) {
        this.username = username;
        this.password = password;
        this.telefone = telefone;
        this.idade = idade;
        this.email = email;
        this.morada = morada;
    }
}

