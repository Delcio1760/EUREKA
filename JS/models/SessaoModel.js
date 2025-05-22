const LS_KEY_SESSOES = "sessoes";
let sessoes = [];

export function initSessoes(){
    sessoes = JSON.parse(localStorage.getItem(LS_KEY_SESSOES)) || [];
}

// Adicionar Sessao

export function addSessao(alunoUsername, explicadorUsername, data){
    const novaSessao = new Sessao(alunoUsername, explicadorUsername, data);
    sessoes.push(novaSessao);
    localStorage.setItem(LS_KEY_SESSOES, JSON.stringify(sessoes));

    return novaSessao;
}

// Listar Sessoes marcadas por alunos

export function getSessoesPorAluno(alunoUsername){
    return sessoes.filter(sessao => sessao.alunoUsername === alunoUsername);

}

// Listar Sessoes marcadas por explicadores

export function getSessoesPorExplicador(explicadorUsername){
    return sessoes.filter(sessao => sessao.explicadorUsername === explicadorUsername);
}

class Sessao{
    alunoUsername = "";
    explicadorUsername = "";
    data = "";
    estado = "pendente"; // por defeito, a sessão fica pendente
    constructor(alunoUsername, explicadorUsername, data, estado="pendente"){
        this.alunoUsername = alunoUsername;
        this.explicadorUsername = explicadorUsername;
        this.data = data;
        this.estado = estado;
    }
}