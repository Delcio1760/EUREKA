



function mostrarModal(mensagem, tipo = "success") {
  const modal = document.getElementById("mensagemModal");
  const modalContent = modal.querySelector(".modal-content");
  const texto = document.getElementById("modalMensagemTexto");

  texto.textContent = mensagem;
  modalContent.classList.remove("success", "error");
  modalContent.classList.add(tipo);

  modal.style.display = "block";

  document.querySelector(".modal .close").onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  setTimeout(() => {
    modal.style.display = "none";
  }, 3000);
}





// Obter o username da URL
const params = new URLSearchParams(window.location.search);
const username = params.get("username");
console.log(username); 

let explicador; // variável global para manter o explicador atual
let grauOriginal, localOriginal, precoOriginal, tempoOriginal, descProfOriginal, descAulaOriginal;

window.addEventListener("DOMContentLoaded", () => {
  const explicadores = JSON.parse(localStorage.getItem("explicador")) || [];
  explicador = explicadores.find(exp => exp.username === username);

  if (!explicador) {
    console.error("Explicador não encontrado");
    return;
  }

  // Preenchimento dos dados do perfil
  document.getElementById("nomeProfessor").textContent = explicador.username;
  document.getElementById("professorDisciplina").textContent = `Professor de ${explicador.disciplinas.join(", ")}`;
  document.getElementById("grauEnsino").textContent = explicador.anoEnsino || "";
  document.getElementById("localizacao").textContent = explicador.morada || "";
  document.getElementById("preco").innerHTML = `Preço por hora/aula: €${explicador.preco}`;
  document.getElementById("tempoResposta").innerHTML = `Tempo de Resposta: ${explicador.tempoResposta || "N/D"}`;
  document.getElementById("Idade").innerHTML = `Idade: ${calcularIdade(explicador.dataNascimento)} anos`;
  document.getElementById("descricaoProfessor").textContent = explicador.sobreoProfessor || "Sem descrição.";
  document.getElementById("descricaoAulas").textContent = explicador.sobreAula || "Sem descrição.";

  // Modalidades (Online/Presencial)
  const modalidades = (explicador.modalidades || []).map(m => m.toLowerCase());
  const btnOnline = document.getElementById("online");
  const btnPresencial = document.getElementById("presencial");

  if (modalidades.includes("online")) {
    btnOnline.style.display = "inline-block";
    btnOnline.disabled = false;
  } else {
    btnOnline.style.display = "none";
  }

  if (modalidades.includes("presencial")) {
    btnPresencial.style.display = "inline-block";
    btnPresencial.disabled = false;
  } else {
    btnPresencial.style.display = "none";
  }

  // Imagem de perfil
  const img = document.querySelector(".profile-card img");
  img.src = `../../img/${explicador.fotoPerfil || "default.jpg"}`;

});

function calcularIdade(dataNascimento) {
  if (!dataNascimento) return "N/D";

  const nascimento = new Date(dataNascimento);
  const hoje = new Date();

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();

  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
}

const botaoEditar = document.getElementById("botao-editar");
let editando = false;

botaoEditar.addEventListener("click", () => {
  if (!editando) {
    // Entrar no modo edição
    editando = true;
    botaoEditar.textContent = "Salvar Perfil";

    // Guardar elementos originais
    grauOriginal = document.getElementById("grauEnsino");
    localOriginal = document.getElementById("localizacao");
    precoOriginal = document.getElementById("preco");
    tempoOriginal = document.getElementById("tempoResposta");
    descProfOriginal = document.getElementById("descricaoProfessor");
    descAulaOriginal = document.getElementById("descricaoAulas");

    // Criar inputs e substituir elementos originais

    const inputGrau = document.createElement("input");
    inputGrau.type = "text";
    inputGrau.id = "inputGrauEnsino";
    inputGrau.placeholder = "Ex: Ensino Basico, Ensino Superior ";
    inputGrau.value = explicador.anoEnsino || "";
    inputGrau.classList.add("input-editavel");
    grauOriginal.replaceWith(inputGrau);

    const inputLocal = document.createElement("input");
    inputLocal.type = "text";
    inputLocal.id = "inputLocalizacao";
    inputLocal.placeholder = "Ex: Lisboa, Porto";
    inputLocal.value = explicador.morada || "";
    inputLocal.classList.add("input-editavel");
    localOriginal.replaceWith(inputLocal);

    const inputPreco = document.createElement("input");
    inputPreco.type = "number";
    inputPreco.step = "0.01";
    inputPreco.min = "0";
    inputPreco.placeholder = "Ex: 15.00";
    inputPreco.id = "inputPreco";
    inputPreco.value = explicador.preco;
    inputPreco.classList.add("input-editavel");
    precoOriginal.replaceWith(inputPreco);

    const inputTempo = document.createElement("input");
    inputTempo.type = "text";
    inputTempo.id = "inputTempoResposta";
    inputTempo.placeholder = "Ex: 24 horas";
    inputTempo.value = explicador.tempoResposta || "";
    inputTempo.classList.add("input-editavel");
    tempoOriginal.replaceWith(inputTempo);

    const textareaDescProf = document.createElement("textarea");
    textareaDescProf.id = "inputDescricaoProfessor";
    textareaDescProf.placeholder = "Descreva seu perfil profissional";
    textareaDescProf.rows = 3;
    textareaDescProf.value = explicador.sobreoProfessor || "";
    textareaDescProf.classList.add("input-editavel");
    descProfOriginal.replaceWith(textareaDescProf);

    const textareaDescAula = document.createElement("textarea");
    textareaDescAula.id = "inputDescricaoAula";
    textareaDescAula.rows = 3;
    textareaDescAula.placeholder = "Descreva suas aulas";
    textareaDescAula.value = explicador.sobreAula || "";
    textareaDescAula.classList.add("input-editavel");
    descAulaOriginal.replaceWith(textareaDescAula);

  } else {
    // Salvar alterações

    const inputGrau = document.getElementById("inputGrauEnsino");
    const inputLocal = document.getElementById("inputLocalizacao");
    const inputPreco = document.getElementById("inputPreco");
    const inputTempo = document.getElementById("inputTempoResposta");
    const textareaDescProf = document.getElementById("inputDescricaoProfessor");
    const textareaDescAula = document.getElementById("inputDescricaoAula");

    // Atualiza objeto explicador e localStorage
    const explicadores = JSON.parse(localStorage.getItem("explicador")) || [];
    const index = explicadores.findIndex(exp => exp.username === username);
    if (index === -1) {
      console.error("Explicador não encontrado para salvar");
      return;
    }

    explicador.anoEnsino = inputGrau.value.trim();
    explicador.morada = inputLocal.value.trim();
    explicador.preco = parseFloat(inputPreco.value) || 0;
    explicador.tempoResposta = inputTempo.value.trim();
    explicador.sobreoProfessor = textareaDescProf.value.trim();
    explicador.sobreAula = textareaDescAula.value.trim();

    explicadores[index] = explicador;
    localStorage.setItem("explicador", JSON.stringify(explicadores));

    // Atualizar texto nos elementos originais
    grauOriginal.textContent = explicador.anoEnsino || "";
    localOriginal.textContent = explicador.morada || "";
    precoOriginal.innerHTML = `Preço por hora/aula: €${explicador.preco}`;
    tempoOriginal.innerHTML = `Tempo de Resposta: ${explicador.tempoResposta || "N/D"}`;
    descProfOriginal.textContent = explicador.sobreoProfessor || "Sem descrição.";
    descAulaOriginal.textContent = explicador.sobreAula || "Sem descrição.";

    // Substituir inputs pelos elementos originais
    inputGrau.replaceWith(grauOriginal);
    inputLocal.replaceWith(localOriginal);
    inputPreco.replaceWith(precoOriginal);
    inputTempo.replaceWith(tempoOriginal);
    textareaDescProf.replaceWith(descProfOriginal);
    textareaDescAula.replaceWith(descAulaOriginal);

    editando = false;
    botaoEditar.textContent = "Editar Perfil";
  }
});











//comentarios e reviews

import { getExplicadorByUsername } from '../models/professorModel.js';

// Pega o username do professor da URL (ex: ?username=joaodasilva)
function pegarUsernameDaURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("username");
}


// Atualiza as estrelas para mostrar quantas estão "cheias" (★) ou "vazias" (☆)
function atualizarEstrelas(qtd) {
  // Seleciona todas as estrelas dentro do elemento com id "estrelas"
  const estrelas = document.querySelectorAll("#estrelas span");

  // Para cada estrela que encontrar
  estrelas.forEach(function(star) {
    // Pega o número que representa essa estrela (1, 2, 3, ...)
    const valorEstrela = Number(star.getAttribute("data-value"));

    // Se o número da estrela for menor ou igual a qtd, mostra estrela cheia, senão vazia
    if (valorEstrela <= qtd) {
      star.textContent = "★"; // estrela cheia
    } else {
      star.textContent = "☆"; // estrela vazia
    }
  });
}


// Limpa modal e reseta estrelas e comentário
function limparModal() {
  atualizarEstrelas(0);
  avaliacaoEstrelas = 0;
  document.getElementById("comentario").value = "";
}

// Mostra avaliações no container .reviews, substituindo conteúdo existente
function mostrarAvaliacoes(professor) {
  const container = document.querySelector(".reviews");
  container.innerHTML = "<h3>Avaliações</h3>";

  if (!professor.avaliacoes || professor.avaliacoes.length === 0) {
    container.innerHTML += "<p>Sem avaliações ainda.</p>";
    return;
  }

  professor.avaliacoes.forEach(avaliacao => {
    const div = document.createElement("div");
    div.classList.add("review");

    // Inicial do nome do autor ou "A" se anônimo
    const inicial = avaliacao.autor ? avaliacao.autor.charAt(0).toUpperCase() : "A";

    // Estrelas (★ cheio e ☆ vazio)
    const estrelasTexto = "★".repeat(avaliacao.estrelas) + "☆".repeat(5 - avaliacao.estrelas);

    div.innerHTML = `
      <div class="review-header">
        <div class="review-initial">${inicial}</div>
        <span><strong>${avaliacao.autor || "Anônimo"}</strong></span>
        <span style="color: gold; margin-left: 10px;">${estrelasTexto}</span>
      </div>
      <p>${avaliacao.comentario || ""}</p>
    `;

    container.appendChild(div);
  });
}

// Salva a avaliação no localStorage do professor e atualiza a tela
function adicionarAvaliacaoNoProfessor(username, avaliacao) {
  const LS_KEY = "explicador";
  const listaProfessores = JSON.parse(localStorage.getItem(LS_KEY)) || [];
  const index = listaProfessores.findIndex(prof => prof.username === username);

  if (index === -1) {
    
    mostrarModal("Professor não encontrado!", "error");
    return;
  }

  if (!Array.isArray(listaProfessores[index].avaliacoes)) {
    listaProfessores[index].avaliacoes = [];
  }

  listaProfessores[index].avaliacoes.push(avaliacao);
  localStorage.setItem(LS_KEY, JSON.stringify(listaProfessores));

  // Atualizar variável local também para mostrar na tela
  professorAtual.avaliacoes.push(avaliacao);
  mostrarAvaliacoes(professorAtual);
}

// --- Variáveis globais ---
let avaliacaoEstrelas = 0;
const btnAvaliar = document.getElementById("botao-avaliar");
const modal = document.getElementById("modal-avaliacao");
const fecharModal = document.getElementById("fechar-modal");
const estrelas = document.querySelectorAll("#estrelas span");
const btnConfirmar = document.getElementById("confirmar-avaliacao");
const comentarioInput = document.getElementById("comentario");

const usernameProfessor = pegarUsernameDaURL();
const professorAtual = getExplicadorByUsername(usernameProfessor);

if (!usernameProfessor || !professorAtual) {
  alert("Professor não encontrado!");
} else {
  mostrarAvaliacoes(professorAtual);
}

// Abrir modal ao clicar no botão avaliar
btnAvaliar.addEventListener("click", () => {
  modal.style.display = "block";
  limparModal();
});

// Fechar modal ao clicar no X
fecharModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Selecionar estrelas no modal
estrelas.forEach(star => {
  star.addEventListener("click", () => {
    avaliacaoEstrelas = Number(star.dataset.value);
    atualizarEstrelas(avaliacaoEstrelas);
  });
});

// Confirmar avaliação
btnConfirmar.addEventListener("click", () => {
  if (avaliacaoEstrelas === 0) {
    
    mostrarModal("Por favor, selecione a quantidade de estrelas.", "error");
    return;
  }

  const comentario = comentarioInput.value.trim();
  const aluno = JSON.parse(sessionStorage.getItem("loggedInUser"));
  if (!aluno) {
    
    mostrarModal("Você precisa estar logado como aluno para avaliar.", "error");
    return;
  }

  const novaAvaliacao = {
    estrelas: avaliacaoEstrelas,
    comentario: comentario,
    autor: aluno.username,
  };

  adicionarAvaliacaoNoProfessor(usernameProfessor, novaAvaliacao);
  
  // Fecha o modal
  modal.style.display = "none";
  mostrarModal("Avaliação adicionada com sucesso!", "error");
    return;
  
  
  
});







