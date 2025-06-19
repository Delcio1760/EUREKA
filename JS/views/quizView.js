import { initQuizzes, listaQuizzes } from '../models/quizModel.js';
import { adicionarPontosAoAluno } from '../models/alunosModel.js';

// Inicializa os quizzes do localStorage
initQuizzes();
const quizzes = listaQuizzes();

// Obter o container dos cards
const container = document.getElementById("quizContainer");
const modal = document.getElementById("quizModal");
const modalTitulo = document.getElementById("modalTitulo");
const modalPerguntas = document.getElementById("modalPerguntas");
const closeModalBtn = document.getElementById("closeModal");

// Modal de resultado
const resultadoModal = document.getElementById("resultadoModal");
const resultadoTexto = document.getElementById("resultadoTexto");
const fecharResultadoBtn = document.getElementById("fecharResultadoBtn");


// Função que cria os cards na página
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
  // Atualiza o título do modal com o título e disciplina do quiz
  modalTitulo.textContent = `${quiz.titulo} - ${quiz.disciplina}`;
  // Limpa o conteúdo anterior das perguntas no modal
  modalPerguntas.innerHTML = "";

  // Variáveis para contar respostas certas e quantas perguntas já foram respondidas
  let respostasCertas = 0;
  let perguntasRespondidas = 0;

  // Percorre cada pergunta do quiz
  quiz.perguntas.forEach((p, index) => {
    // Cria uma div para conter a pergunta e as respostas
    const perguntaDiv = document.createElement("div");
    perguntaDiv.style.marginBottom = "1.5rem";

    // Cria o texto da pergunta com o número da pergunta
    const perguntaTexto = document.createElement("p");
    perguntaTexto.innerHTML = `<strong>${index + 1}. ${p.pergunta}</strong>`;
    perguntaDiv.appendChild(perguntaTexto);

    // Para cada resposta da pergunta, cria um botão
    p.respostas.forEach((resposta, i) => {
      const respostaBtn = document.createElement("button");
      // Texto do botão com a letra (A, B, C, D) e a resposta
      respostaBtn.textContent = `(${String.fromCharCode(65 + i)}) ${resposta}`;
      
      // Estilos básicos para o botão
      respostaBtn.style.margin = "0.25rem";
      respostaBtn.style.padding = "0.5rem 1rem";
      respostaBtn.style.borderRadius = "8px";
      respostaBtn.style.border = "1px solid #ccc";
      respostaBtn.style.cursor = "pointer";
      respostaBtn.disabled = false; // botão ativado

      // Evento que ocorre quando o botão é clicado
      respostaBtn.addEventListener("click", () => {
        // Desativa todos os botões para evitar múltiplos cliques
        const botoes = perguntaDiv.querySelectorAll("button");
        botoes.forEach(btn => btn.disabled = true);

        // Verifica se a resposta escolhida é correta
        if (i === p.respostaCerta) {
          // Se correta, pinta o botão de verde claro
          respostaBtn.style.backgroundColor = "lightgreen";
          respostaBtn.style.color = "black";
          respostasCertas++; // conta mais uma resposta certa
        } else {
          // Se errada, pinta o botão clicado de vermelho claro
          respostaBtn.style.backgroundColor = "lightcoral";
          respostaBtn.style.color = "white";
          // Mostra também qual era a resposta correta (verde)
          botoes[p.respostaCerta].style.backgroundColor = "lightgreen";
          botoes[p.respostaCerta].style.color = "black";
        }

        perguntasRespondidas++; // conta que esta pergunta já foi respondida

        // Se já respondeu a todas as perguntas, mostra o resultado no modal
        if (perguntasRespondidas === quiz.perguntas.length) {
          setTimeout(() => {
            const pontos = respostasCertas * 10;
            adicionarPontosAoAluno(pontos); // Exemplo: 10 pontos por resposta certa
            mostrarResultadoModal(pontos, respostasCertas, quiz.perguntas.length);
          }, 500); // espera para mostrar a última resposta colorida
        }
      });

      // Adiciona o botão da resposta à div da pergunta
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

// Fecha o modal ao clicar fora da área de conteúdo
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

// Função para mostrar o modal de resultado com os pontos
function mostrarResultadoModal(pontos, certas, total) {
  resultadoTexto.innerHTML = `
    <h2>Quiz concluído!</h2>
    <p>Acertaste ${certas} de ${total} perguntas.</p>
    <p>Ganhaste <strong>${pontos}</strong> pontos!</p>
  `;
  resultadoModal.classList.remove("hidden");
}

// Fecha o modal de resultado
fecharResultadoBtn.addEventListener("click", () => {
  resultadoModal.classList.add("hidden");
  modal.classList.add("hidden"); // também fecha o modal de perguntas
});

console.log(localStorage.getItem("quizzes"));

