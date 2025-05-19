const LS_KEY = "admin";
let admins = [];

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