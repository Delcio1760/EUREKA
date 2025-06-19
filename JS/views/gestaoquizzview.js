import { addQuizz, removeQuizz } from "../models/quizModel.js";




const formulario = document.querySelector(".quiz-form");
const deleteBtn = document.getElementById("apagar-quizbtn");

if (formulario) {
  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const titulo = document.getElementById("quizTitle").value.trim();
    const disciplina = document.getElementById("Disciplina-Nome").value.trim();
    const pergunta = document.getElementById("Pergunta1").value.trim();
    const r1 = document.getElementById("Resposta1-1").value.trim();
    const r2 = document.getElementById("Resposta1-2").value.trim();
    const r3 = document.getElementById("Resposta1-3").value.trim();
    const r4 = document.getElementById("Resposta1-4").value.trim();
    const correta = document.getElementById("RespostaCerta1").value.trim();


    const perguntas = [{pergunta, respostas: [r1, r2, r3, r4], respostaCerta: correta }];

    // Chamando a função da model
    addQuizz(titulo, disciplina, perguntas);
    if(addQuizz){alert('Quizz criado com Sucesso')}
    formulario.reset();
  });
  
}

if (deleteBtn) {
  deleteBtn.addEventListener("click", () => {
    const titulo = prompt("Digite o título do quiz a apagar:");
    if (!titulo) {
      alert("Título não fornecido.");
      return;
    }

    removeQuizz(titulo);
    alert("Quiz apagado com sucesso!");
  });
}

console.log(localStorage.getItem("quizzes"));