import { initQuizzes, listaQuizzes } from '../models/quizModel.js';

initQuizzes();
const quizzes = listaQuizzes();



// Inicializa os quizzes do localStorage


// Obter o container dos cards
const container = document.getElementById("quizContainer");
const modal = document.getElementById("quizModal");
const modalTitulo = document.getElementById("modalTitulo");
const modalPerguntas = document.getElementById("modalPerguntas");
const closeModalBtn = document.getElementById("closeModal");



// FunÃ§Ã£o que cria os cards na pÃ¡gina
quizzes.forEach((quiz) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h3>${quiz.titulo}</h3>
    <p><strong>Disciplina:</strong> ${quiz.disciplina}</p>
  `;
  
  // Ao clicar no card, abre o modal com as perguntas
  card.addEventListener("click", () => {
    mostrarModal(quiz);
  });

  container.appendChild(card);
});

function mostrarModal(quiz) {
  // Atualiza o tÃ­tulo do modal com o tÃ­tulo e disciplina do quiz
  modalTitulo.textContent = `${quiz.titulo} - ${quiz.disciplina}`;
  // Limpa o conteÃºdo anterior das perguntas no modal
  modalPerguntas.innerHTML = "";

  // VariÃ¡veis para contar respostas certas e quantas perguntas jÃ¡ foram respondidas
  let respostasCertas = 0;
  let perguntasRespondidas = 0;

  // Percorre cada pergunta do quiz
  quiz.perguntas.forEach((p, index) => {
    // Cria uma div para conter a pergunta e as respostas
    const perguntaDiv = document.createElement("div");
    perguntaDiv.style.marginBottom = "1.5rem";

    // Cria o texto da pergunta com o nÃºmero da pergunta
    const perguntaTexto = document.createElement("p");
    perguntaTexto.innerHTML = `<strong>${index + 1}. ${p.pergunta}</strong>`;
    perguntaDiv.appendChild(perguntaTexto);

    // Para cada resposta da pergunta, cria um botÃ£o
    p.respostas.forEach((resposta, i) => {
      const respostaBtn = document.createElement("button");
      // Texto do botÃ£o com a letra (A, B, C, D) e a resposta
      respostaBtn.textContent = `(${String.fromCharCode(65 + i)}) ${resposta}`;
      
      // Estilos bÃ¡sicos para o botÃ£o
      respostaBtn.style.margin = "0.25rem";
      respostaBtn.style.padding = "0.5rem 1rem";
      respostaBtn.style.borderRadius = "8px";
      respostaBtn.style.border = "1px solid #ccc";
      respostaBtn.style.cursor = "pointer";
      respostaBtn.disabled = false; // botÃ£o ativado

      // Evento que ocorre quando o botÃ£o Ã© clicado
      respostaBtn.addEventListener("click", () => {
        // Desativa todos os botÃµes para evitar mÃºltiplos cliques
        const botoes = perguntaDiv.querySelectorAll("button");
        botoes.forEach(btn => btn.disabled = true);

        // Verifica se a resposta escolhida Ã© correta
        if (i === p.respostaCerta) {
          // Se correta, pinta o botÃ£o de verde claro
          respostaBtn.style.backgroundColor = "lightgreen";
          respostaBtn.style.color = "black";
          respostasCertas++; // conta mais uma resposta certa
        } else {
          // Se errada, pinta o botÃ£o clicado de vermelho claro
          respostaBtn.style.backgroundColor = "lightcoral";
          respostaBtn.style.color = "white";
          // Mostra tambÃ©m qual era a resposta correta (verde)
          botoes[p.respostaCerta].style.backgroundColor = "lightgreen";
          botoes[p.respostaCerta].style.color = "black";
        }

        perguntasRespondidas++; // conta que esta pergunta jÃ¡ foi respondida

        // Se jÃ¡ respondeu a todas as perguntas, mostra um alerta com o resultado
        if (perguntasRespondidas === quiz.perguntas.length) {
          setTimeout(() => {
            alert(`Respostas corretas: ${respostasCertas} de ${quiz.perguntas.length}`);
          }, 500); // pequeno delay para melhor experiÃªncia visual
        }
      });

      // Adiciona o botÃ£o da resposta Ã  div da pergunta
      perguntaDiv.appendChild(respostaBtn);
    });

    // Adiciona a div da pergunta completa (pergunta + respostas) ao modal
    modalPerguntas.appendChild(perguntaDiv);
  });

  // Mostra o modal
  modal.classList.remove("hidden");
}


// Fecha o modal
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Fecha o modal ao clicar fora da Ã¡rea de conteÃºdo
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

console.log(localStorage.getItem("quizzes"));
