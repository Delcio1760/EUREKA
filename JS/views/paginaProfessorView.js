



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
  }, 8000);
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
  document.getElementById("professorDisciplina").textContent = `Professor (a) de ${explicador.disciplinas.join(", ")}`;
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
  mostrarModal("Avaliação adicionada com sucesso!", "sucess");
    return;
  
  
  
});





import { getUserLogged } from '../models/alunosModel.js';






document.addEventListener("DOMContentLoaded", () => {
  
  const botaoContacto = document.getElementById('btn-contactar');
  if (!botaoContacto) {
    console.error("Botão btn-contactar não encontrado.");
    return;
  }
botaoContacto.addEventListener("click", () => {
  const params = new URLSearchParams(window.location.search);
  const usernameProf = params.get("username");
  const alunoLogado1 = getUserLogged();

  if (!alunoLogado1) {
    alert("Erro: usuário logado não encontrado.");
    return;
  }

  if (!usernameProf) {
    alert("Professor não especificado na URL.");
    return;
  }

  const explicadores = JSON.parse(localStorage.getItem("explicador")) || [];
  const index = explicadores.findIndex(e => e.username === usernameProf);
  if (index === -1) {
    alert("Professor não encontrado.");
    return;
  }

  const alunoLogado = JSON.parse(sessionStorage.getItem("loggedInUser"));
  console.log(alunoLogado);

  const novoContacto = {
    alunoUsername: alunoLogado.username,
    telefone: alunoLogado.telefone || "",
    fotoPerfil: alunoLogado.fotoPerfil || "../../img/defaultimg.jpg",
    email: alunoLogado.email || "",
    dataNascimento: alunoLogado.dataNascimento || "",
    modalidade: alunoLogado.filtros?.modalidades?.[0] || "Não especificada"
  };

  console.log("Novo contacto a ser adicionado:", novoContacto);

  if (!Array.isArray(explicadores[index].contactados)) {
    explicadores[index].contactados = [];
  }

  // Verifica se já existe esse aluno na lista de contactados
  const jaContactado = explicadores[index].contactados.some(
    c => c.alunoUsername === novoContacto.alunoUsername
  );

  if (jaContactado) {
 
  mostrarModal(" Você já entrou em contato com este professor.Os seus dados(numero de telemovel,nome,email...) foram enviados ao caminho dele.Fique atento ao teu email e ao whatsapp", "sucess");
  return;
  
    
  }

  explicadores[index].contactados.push(novoContacto);
  localStorage.setItem("explicador", JSON.stringify(explicadores));
const users = JSON.parse(localStorage.getItem("users")) || [];
  const alunoIndex = users.findIndex(u => u.username === alunoLogado.username);
  if (alunoIndex !== -1) {
    if (!Array.isArray(users[alunoIndex].professoresContactados)) {
      users[alunoIndex].professoresContactados = [];
    }

    // Verifica se já foi adicionado
    const jaExiste = users[alunoIndex].professoresContactados.some(
      p => p.username === usernameProf
    );

    if (!jaExiste) {
      users[alunoIndex].professoresContactados.push({ username: usernameProf });
      localStorage.setItem("users", JSON.stringify(users));
    }
  }

  


mostrarModal("Sucesso! agendamento feito! Aguarde o feedback do Professor", "sucess");
  return;
  

  
    

  
    
  
  
});

});




  








window.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  if (!loggedInUser) return;

  // Esconde todos os botões inicialmente
  document.getElementById("botao-avaliar").style.display = "none";
  document.getElementById("btn-contactar").style.display = "none";
  document.getElementById("botao-eliminar").style.display = "none";
  
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const explicadores = JSON.parse(localStorage.getItem("explicador")) || [];

  const isAluno = users.some(user => user.username === loggedInUser.username);
  const isProfessor = explicadores.some(prof => prof.username === loggedInUser.username);

  if (isAluno) {
    document.getElementById("botao-avaliar").style.display = "inline-block";
    document.getElementById("btn-contactar").style.display = "inline-block";
  }

  if (isProfessor) {
    document.getElementById("botao-eliminar").style.display = "inline-block";
    
  }
});


//mudar foto de perfil
const inputFoto = document.getElementById("fotoInput");
const imgPerfil = document.getElementById("fotoPerfil");

inputFoto.addEventListener("change", (event) => {
  const ficheiro = event.target.files[0];            // verifica se o utilizador selecionou um ficheiro
  if (!ficheiro) return;

  const leitor = new FileReader();

  leitor.onload = function (e) {         // quando a leitura do ficheiro for concluída e o resultado estiver disponível ele executa esta função
    const user = getUserLogged();
    if (!user) return;

    user.fotoPerfil = e.target.result;         // atribui o resultado da leitura do ficheiro à propriedade fotoPerfil do utilizador

    // Atualiza sessionStorage
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));

    // Atualiza localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex((u) => u.username === user.username);
    if (index !== -1) {     // verifica se o utilizador existe no localStorage
      users[index] = user;   // atualiza o utilizador no array de utilizadores
      localStorage.setItem("users", JSON.stringify(users));
    }

    // Atualiza imagem no DOM
    imgPerfil.src = user.fotoPerfil;
  };

  leitor.readAsDataURL(ficheiro);      // lê o ficheiro como uma URL de dados
});







window.addEventListener("DOMContentLoaded", () => {
  preencherPerfil();
});






document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-confirmacao");
  const titulo = document.getElementById("modal-titulo");
  const texto = document.getElementById("modal-texto");
  const btnConfirmar = document.getElementById("modal-confirmar");
  const btnCancelar = document.getElementById("modal-cancelar");
  const btnFechar = document.querySelector(".close-button");

  const botaoTerminarSessao = document.getElementById("btnMeuPerfil");
  const botaoEliminar = document.getElementById("botao-eliminar");

  let acaoAtual = ""; // "logout" ou "eliminar"

  // Abrir modal para logout
  botaoTerminarSessao.addEventListener("click", () => {
    acaoAtual = "logout";
    titulo.textContent = "Confirmar Logout";
    texto.textContent = "Deseja sair da conta e voltar à página de login?";
    modal.style.display = "block";
  });

  // Abrir modal para eliminar perfil
  botaoEliminar.addEventListener("click", () => {
    acaoAtual = "eliminar";
    titulo.textContent = "Eliminar Perfil";
    texto.textContent = "Tem a certeza que quer eliminar permanentemente este perfil?";
    modal.style.display = "block";
  });

  // Confirmar ação
  btnConfirmar.addEventListener("click", () => {
    modal.style.display = "none";

    if (acaoAtual === "logout") {
      sessionStorage.removeItem("loggedTutor");
      window.location.href = "/index.html";
    }

    if (acaoAtual === "eliminar") {
      const loggedTutor = JSON.parse(sessionStorage.getItem("loggedTutor"));
      const allTutors = JSON.parse(localStorage.getItem("explicadores")) || [];

      const novosTutors = allTutors.filter(tutor => tutor.email !== loggedTutor.email);
      localStorage.setItem("explicadores", JSON.stringify(novosTutors));
      sessionStorage.removeItem("loggedTutor");

      window.location.href = "/index.html";
    }
  });

  // Cancelar ou fechar
  btnCancelar.addEventListener("click", () => {
    modal.style.display = "none";
  });

  btnFechar.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Fechar modal ao clicar fora
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
