const LS_QUIZZES = "quizz";
let quizzes = [];
 
export function initQuizzes() {
    quizzes = JSON.parse(localStorage.getItem(LS_QUIZZES)) || [];
 }

export function listaQuizzes() {
    return quizzes;
}

// Adicionar novo quizz
export function addQuizz(titulo, disciplina, perguntas){
    const novoQuizz = new Quizz(titulo, disciplina, perguntas);
    if(quizzes.some((quizz) => quizz.titulo === titulo)){
        throw Error(`Quizz com título ${titulo} já existe`);
    } else {
        quizzes.push(novoQuizz);
        localStorage.setItem(LS_QUIZZES, JSON.stringify(quizzes));
    }

}

// Função para remover um quizz
export function removeQuizz(titulo){
    quizzes = quizzes.filter((quizz) => quizz.titulo !== titulo);
    localStorage.setItem(LS_QUIZZES, JSON.stringify(quizzes));
}


// Função para editar um quizz
export function editQuizz(tituloAntigo, tituloNovo, Novadisciplina, Novasperguntas) {
  const quizzIndex = quizzes.findIndex(quizz => quizz.titulo === tituloAntigo);

  if (quizzIndex === -1) {
    throw Error(`Quizz com título ${tituloAntigo} não encontrado`);
  }

  quizzes[quizzIndex].titulo = tituloNovo;
    quizzes[quizzIndex].disciplina = Novadisciplina;
    quizzes[quizzIndex].perguntas = Novasperguntas;
    localStorage.setItem(LS_QUIZZES, JSON.stringify(quizzes));
}


// Classe de Quizz
class Quizz {
    titulo = "";
    disciplina = "";
    perguntas = [];

    constructor(titulo, disciplina, perguntas) {
        this.titulo = titulo;
        this.disciplina = disciplina;
        this.perguntas = perguntas;
    }
}