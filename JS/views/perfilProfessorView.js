import {getTutorLogged} from  "../models/professorModel.js"



//modals de aviso
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


document.addEventListener('DOMContentLoaded', () => {
  const botaoAlunos = document.getElementById('buttonMeusAlunos');
  const blankspace5 = document.getElementById('blank-space5');
  const botaoGerir = document.getElementById('buttonGerir');
  const blankspace = document.getElementById('blank-space');
  const videoArea = document.getElementById('video-area');

  const conteudoAlunos = `
    <table class="tabela-alunos">
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Idade</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><img src="img/aluno1.jpg" alt="Aluno 1" class="foto-perfil" /></td>
          <td>Ana Silva</td>
          <td>ana@email.com</td>
          <td>22</td>
        </tr>
        <tr>
          <td><img src="img/aluno2.jpg" alt="Aluno 2" class="foto-perfil" /></td>
          <td>João Costa</td>
          <td>joao@email.com</td>
          <td>19</td>
        </tr>
      </tbody>
    </table>
  `;

  const conteudoGerir = `
    <table class="tabela-alunos">
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nome</th>
          <th>Modalidade</th>
          <th>Contacto</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><img src="img/aluno1.jpg" alt="Aluno 1" class="foto-perfil" /></td>
          <td>Ana Silva</td>
          <td>presencial</td>
          <td>912 345 678</td>
        </tr>
        <tr>
          <td><img src="img/aluno2.jpg" alt="Aluno 2" class="foto-perfil" /></td>
          <td>João Costa</td>
          <td>Online</td>
          <td>913 876 543</td>
        </tr>
      </tbody>
    </table>
  `;

  // Esta função precisa estar disponível para ambos os botões
  function esconderTodasAsPaginas() {
    const todasAsPaginas = document.querySelectorAll('[id^="blank-space"]');
    todasAsPaginas.forEach(pagina => {
      pagina.classList.remove('active');
    });
  }

  botaoAlunos.addEventListener('click', () => {
    esconderTodasAsPaginas();
    videoArea.style.display = 'none';
    blankspace5.innerHTML = conteudoAlunos;
    blankspace5.classList.add('active');
  });

  botaoGerir.addEventListener('click', () => {
    esconderTodasAsPaginas();
    videoArea.style.display = 'none';
    blankspace.innerHTML = conteudoGerir;
    blankspace.classList.add('active');
  });
});

  




const explicador = getTutorLogged();


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







































