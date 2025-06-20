import {getTutorLogged} from  "../models/professorModel.js"
















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
  }, 10000);
}





window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(sessionStorage.getItem("loggedTutor"));
  if (!user) return;

  const chavePrimeiroLogin = `primeiroLogin_${user.username}`;
  const estaPrimeiroLogin = localStorage.getItem(chavePrimeiroLogin);

  if (estaPrimeiroLogin === "true") {
    mostrarModal("Preencha as tuas informações no teu perfil para evitar que o teu perfil fique sem informações", "success");

    // Marca como já mostrado para esse professor
    localStorage.setItem(chavePrimeiroLogin, "false");
  }
});








document.addEventListener('DOMContentLoaded', () => {
  const botaoAlunos = document.getElementById('buttonMeusAlunos');
  const areaTabela = document.getElementById('blank-space5');
  const videoArea = document.getElementById('video-area');

  function calcularIdade(dataNascimento) {
    if (!dataNascimento) return "N/D";

    const partes = dataNascimento.split('/');
    const dia = parseInt(partes[0]);
    const mes = parseInt(partes[1]) - 1;
    const ano = parseInt(partes[2]);

    const hoje = new Date();
    const nascimento = new Date(ano, mes, dia);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesDif = hoje.getMonth() - nascimento.getMonth();

    if (mesDif < 0 || (mesDif === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  }

  function mostrarTabela(professor) {
    if (!professor.contactados || professor.contactados.length === 0) {
      areaTabela.innerHTML = "<p>Nenhum aluno entrou em contato com você ainda.</p>";
      areaTabela.classList.remove('active');
      return;
    }

    let linhas = "";
    for (const aluno of professor.contactados) {
      linhas += `
        <tr>
          <td><img src="${aluno.fotoPerfil}" alt="Foto" ></td>
          <td>${aluno.alunoUsername}</td>
          <td>${aluno.email || ""}</td>
          <td>${calcularIdade(aluno.dataNascimento)}</td>
          <td>${aluno.telefone || "N/D"}</td>
        </tr>
      `;
    }

    const tabelaHTML = `
      <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Contacto</th>
          </tr>
        </thead>
        <tbody>
          ${linhas}
        </tbody>
      </table>
    `;

    areaTabela.innerHTML = tabelaHTML;
    areaTabela.classList.add('active');
  }

  botaoAlunos.addEventListener('click', () => {
    videoArea.style.display = 'none';

    const professorLogado = JSON.parse(sessionStorage.getItem("loggedInUser"));

    if (!professorLogado) {
      areaTabela.innerHTML = "<p>Erro: nenhum professor está logado.</p>";
      areaTabela.classList.remove('active');
      return;
    }

    const professores = JSON.parse(localStorage.getItem("explicador")) || [];
    const professorAtual = professores.find(prof => prof.username === professorLogado.username);

    if (!professorAtual) {
      areaTabela.innerHTML = "<p>Erro: professor não encontrado nos dados.</p>";
      areaTabela.classList.remove('active');
      return;
    }

    mostrarTabela(professorAtual);
  });
});


  




const explicador = getTutorLogged();

//cria link dinamico para cada professor(cada prof tem as suas infos reenderizadas )
import { isTutorLoggedin, } from "../../JS/models/professorModel.js";
console.log(getTutorLogged)
console.log(explicador.username);
document.addEventListener("DOMContentLoaded", () => {
  const perfilDiv = document.getElementById("btnMeuPerfil");

  if (isTutorLoggedin()) {
    const explicador = getTutorLogged();
    const username = explicador.username;

    // Limpa o conteúdo e adiciona o link "Meu Perfil"
    perfilDiv.innerHTML = '';  // limpa

    // Cria link dinâmico para o perfil
    const linkPerfil = document.createElement("a");
    linkPerfil.href = "../profiles/perfilProfessor.html?username=" + username;
    linkPerfil.textContent = "Meu Perfil";
    linkPerfil.style.cursor = "pointer";
    linkPerfil.style.textDecoration = "none";
    linkPerfil.style.color = "inherit";

    perfilDiv.appendChild(linkPerfil);
  } else {
    perfilDiv.style.display = "none";
  }
});




//logout
// Pega userName da URL
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("buttonLogout");
  const modal = document.getElementById("modal-confirmacao");
  const fecharModalBtn = modal.querySelector(".close-button");
  const confirmarLogoutBtn = document.getElementById("confirmar-logout");
  const cancelarLogoutBtn = document.getElementById("cancelar-logout");

  // Mostrar o modal
  logoutBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Fechar modal (cancelar)
  fecharModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  cancelarLogoutBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Confirmar logout
  confirmarLogoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("loggedTutor");
    modal.style.display = "none";
    window.location.href = "/index.html"; // Redireciona para a página inicial
  });

  // Clicar fora do modal para fechar
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});



























































