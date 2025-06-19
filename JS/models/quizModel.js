const LS_QUIZZES = "quizzes";
export let quizzes = [];

// Inicializa os quizzes do localStorage
export function initQuizzes() {
  const stored = JSON.parse(localStorage.getItem(LS_QUIZZES)) || [];
  quizzes.splice(0, quizzes.length, ...stored.map(q => new Quizz(q.titulo, q.disciplina, q.perguntas)));
}

// Retorna a lista de quizzes
export function listaQuizzes() {
  return quizzes;
}

// Adiciona um novo quiz
export function addQuizz(titulo, disciplina, perguntas) {
  let quizzesSalvos = JSON.parse(localStorage.getItem("quizzes")) || [];

  // Cria o novo quiz
  const novoQuiz = new Quizz(titulo, disciplina, perguntas);

  // Adiciona à lista e salva novamente
  quizzesSalvos.push(novoQuiz);
  localStorage.setItem("quizzes", JSON.stringify(quizzesSalvos));
}


// Remove um quiz pelo título
export function removeQuizz(titulo) {
  const index = quizzes.findIndex(q => q.titulo === titulo);
  if (index === -1) {
    throw Error(`Quizz com título ${titulo} não encontrado`);
  }

  quizzes.splice(index, 1);
  localStorage.setItem(LS_QUIZZES, JSON.stringify(quizzes));
}

// Edita um quiz existente
export function editQuizz(tituloAntigo, tituloNovo, novaDisciplina, novasPerguntas) {
  const quizzIndex = quizzes.findIndex(quizz => quizz.titulo === tituloAntigo);

  if (quizzIndex === -1) {
    throw Error(`Quizz com título ${tituloAntigo} não encontrado`);
  }

  quizzes[quizzIndex].titulo = tituloNovo;
  quizzes[quizzIndex].disciplina = novaDisciplina;
  quizzes[quizzIndex].perguntas = novasPerguntas;
  localStorage.setItem(LS_QUIZZES, JSON.stringify(quizzes));
}

// Classe Quizz
export class Quizz {
  titulo = "";
  disciplina = "";
  perguntas = []; // array de objetos { pergunta, respostas: [], respostaCerta }

  constructor(titulo, disciplina, perguntas) {
    this.titulo = titulo;
    this.disciplina = disciplina;
    this.perguntas = perguntas;
  }
}