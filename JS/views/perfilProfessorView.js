
import { explicadores } from "../models/professorModel.js";


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

//botão editar descrições
document.addEventListener('DOMContentLoaded', () => {
  const botaoEditarDescrições = document.getElementById('buttonEditarDescrições');
  const blankspace2 = document.getElementById('blank-space2');
  const videoArea = document.getElementById('video-area');

  const conteudoPerfil =`<div class="form-wrapper">
  <div class="input-container">
    <label for="descricao" class="input-label">Descrição do Professor</label>
    <textarea
      id="descricao"
      name="descricao"
      rows="6"
      placeholder="Escreva aqui a descrição do professor..."
      class="input-textarea"
    ></textarea>
  </div>
  <div class="input-container">
    <label for="descricaoAula" class="input-label">Descrição da aula</label>
    <textarea
      id="descricaoAula"
      name="descricaoAula"
      rows="6"
      placeholder="Escreva aqui a descrição da aula..."
      class="input-textarea"
    ></textarea>
  </div>
</div>

<button class="btn-edit" type="button">
          Editar Descrições <i class="fas fa-external-link-alt"></i>
        </button>

` ; // teu HTML do perfil

  function esconderTodasAsPaginas() {
    const todasAsPaginas = document.querySelectorAll('[id^="blank-space"]');
    todasAsPaginas.forEach(pagina => {
      pagina.classList.remove('active');
    });
  }

  botaoEditarDescrições.addEventListener('click', () => {
    esconderTodasAsPaginas();
    videoArea.style.display = 'none';
    blankspace2.innerHTML = conteudoPerfil;
    blankspace2.classList.add('active');
  });
});













//botão Editar Card 1
document.addEventListener('DOMContentLoaded', () => {
  const botaoEditarCard= document.getElementById('buttonEditarCard1')
  const blankspace3=document.getElementById('blank-space3')
  const videoArea = document.getElementById('video-area');

  const conteudoCard1 = `<main>
    <div aria-label="Perfil do usuário e dados exibidos" class="profile-container" role="region">
      <section class="profile-left">
        <h2>Editar Card 1</h2>
        <div class="field">
            <label class="label" >Disciplina</label>
            <input id="discplina" class="input-edit" type="text" placeholder="Matemática,Física" disabled></input>
        </div>
        <div class="field">
          <label class="label" >Grau de Ensino</label>
            <input id="grauEnsino" class="input-edit" type="text" placeholder="Do 5º Ano ao 3º Ano Ensino superior" disabled>
        </div>

        
        <div class="field">
          <label class="label" >Localização de ensino</label>
            <input id="localização" class="input-edit" type="text" placeholder="Porto-50km  "disabled>
        </div>
        
        <div class="field">
          <label class="label" >Modalidade</label>
            <input id="modalidade" class="input-edit" type="text" placeholder="Online/Presencial-Online e Presencila" disabled>
        </div>

        

        
      </section>
      <section aria-label="Informações do perfil do usuário" class="profile-right">
        
        <button class="btn-edit" type="button">
          Editar Card 1 <i class="fas fa-external-link-alt"></i>
        </button>
        
    </div>
  </main>`; // teu HTML do perfil

  function esconderTodasAsPaginas() {
    const todasAsPaginas = document.querySelectorAll('[id^="blank-space"]');
    todasAsPaginas.forEach(pagina => {
      pagina.classList.remove('active');
    });
  }

  botaoEditarCard.addEventListener('click', () => {
    esconderTodasAsPaginas();
    videoArea.style.display = 'none';
    blankspace3.innerHTML = conteudoCard1;
    blankspace3.classList.add('active');
  });
});









//botão Editar Card 2
document.addEventListener('DOMContentLoaded', () => {
  const botaoEditarCard2= document.getElementById('buttonEditarCard2')
  const blankspace4=document.getElementById('blank-space4')
  const videoArea = document.getElementById('video-area');

  const conteudoCard2 = `<main>
    <div aria-label="Perfil do usuário e dados exibidos" class="profile-container" role="region">
      <section class="profile-left">
        <h2>Editar Card 2</h2>
        <div class="field">
            <label class="label" >Nome-Apelido</label>
            <input id="discplina" class="input-edit" type="text" placeholder="Rubén Cristóvão" disabled></input>
        </div>
        <div class="field">
          <label class="label" >Preço por hora/aula</label>
            <input id="preçoHora" class="input-edit" type="text" placeholder="R$40,00" disabled>
        </div>

        
        <div class="field">
          <label class="label" >Data de Nascimento</label>
            <input id="dataNascimento" class="input-edit" type="text" placeholder="11/7/2002 "disabled>
        </div>
        
        <div class="field">
          <label class="label" >Modalidade</label>
            <input id="modalidade" class="input-edit" type="text" placeholder="Online/Presencial-Online e Presencila" disabled>
        </div>

        

        
      </section>
      <section aria-label="Informações do perfil do usuário" class="profile-right">
        
        <button class="btn-edit" type="button">
          Editar Card 2 <i class="fas fa-external-link-alt"></i>
        </button>
        
    </div>
  </main>`; // teu HTML do perfil

  function esconderTodasAsPaginas() {
    const todasAsPaginas = document.querySelectorAll('[id^="blank-space"]');
    todasAsPaginas.forEach(pagina => {
      pagina.classList.remove('active');
    });
  }

  botaoEditarCard2.addEventListener('click', () => {
    esconderTodasAsPaginas();
    videoArea.style.display = 'none';
    blankspace4.innerHTML = conteudoCard2;
    blankspace4.classList.add('active');
  });
});





//botão Alunos
document.addEventListener('DOMContentLoaded', () => {
  const botaoAlunos= document.getElementById('buttonMeusAlunos')
  const blankspace5=document.getElementById('blank-space5')
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
</div>


`; // teu HTML do perfil

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
});



//botão Gerir Aula
document.addEventListener('DOMContentLoaded', () => {
  const botaoGerir= document.getElementById('buttonGerir')
  const blankspace=document.getElementById('blank-space')
  const videoArea = document.getElementById('video-area');

  const conteudoAlunos = `
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
</div>



`; // teu HTML do perfil

  function esconderTodasAsPaginas() {
    const todasAsPaginas = document.querySelectorAll('[id^="blank-space"]');
    todasAsPaginas.forEach(pagina => {
      pagina.classList.remove('active');
    });
  }

  botaoGerir.addEventListener('click', () => {
    esconderTodasAsPaginas();
    videoArea.style.display = 'none';
    blankspace.innerHTML = conteudoAlunos;
    blankspace.classList.add('active');
  });
});






const explicadores = JSON.parse(localStorage.getItem("explicador")) || [];

//para adicionar o conteudo de cada professor em paginas diferntes
function carregarPerfil() {
  
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');
  
   if (!username) {
    mostrarModal("Nenhum professor especificado na URL..", "error");
   return;
  }

  

  // Busca o professor pelo username
  const prof = explicadores.find(p => p.username === username);

  if (!prof) {
    mostrarModal("Professor não encontrado.", "error");
   return;
  }
  


 

  // Atualize os elementos do DOM com os dados do explicador
  document.getElementById('nomeProfessor').textContent = prof.username;  
  document.getElementById('professorDisciplina').textContent = prof.disciplinas.join(", ");
  document.getElementById('localização').textContent = prof.morada;
  document.getElementById('preço').textContent = `Preço por hora/aula: R$${prof.preco.toFixed(2)}`;
  document.getElementById('tempoResposta').textContent = `Tempo de Resposta: ${prof.tempoResposta || "Não informado"}`;
  document.getElementById('descriçãoProfessor').textContent = prof.sobreoProfessor || "Sem descrição disponível.";
  document.getElementById('descrição aulas').textContent = prof.sobreAula || "Sem descrição disponível.";
   document.getElementById("Idade").textContent = prof.idade ? `Idade: ${prof.idade}` : "Idade: N/D";
  // Foto
  const imgPerfil = document.querySelector('.profile-card img');
  if (imgPerfil) imgPerfil.src = prof.fotoPerfil || "https://via.placeholder.com/100";
  
  // Modalidades - Exemplo simples para ativar botões conforme modalidades
  const btnOnline = document.querySelector('.modalidade-buttons button:nth-child(1)');
  const btnPresencial = document.querySelector('.modalidade-buttons button:nth-child(2)');
  
  if (btnOnline && btnPresencial) {
    btnOnline.disabled = !prof.modalidades.includes("Online");
    btnPresencial.disabled = !prof.modalidades.includes("Presencial");
  }


   // Atualiza preço, tempo de resposta e idade
  
 

  

  // Atualiza descrições (corrigindo as ids no HTML para id="descricaoProfessor" e id="descricaoAulas")
  document.getElementById("descricaoProfessor").textContent = prof.sobreoProfessor || "Descrição do professor não disponível.";
  document.getElementById("descricaoAulas").textContent = prof.sobreAula || "Descrição da aula não disponível.";

  // Mostrar botões conforme contexto (exemplo simples)
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin")) || false;
  if (isAdmin) {
    document.getElementById("botao-eliminar").style.display = "inline-block";
  }
  // Mostrar avaliar e marcar para todos (ajuste conforme sua regra)
  document.getElementById("botao-avaliar").style.display = "inline-block";
  document.getElementById("botao-marcar").style.display = "inline-block";




}

document.addEventListener('DOMContentLoaded', carregarPerfil);


//para conseguir aceder a informação de tal professor separamos por user name
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');



console.log('Professor selecionado:', username);




function criarCard(professor) {
  const cardLink = document.createElement('a');
  cardLink.href = `perfilProfessor.html?username=${encodeURIComponent(professor.username)}`;
  cardLink.classList.add('card-link');

  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('img');
  img.src = professor.fotoPerfil || 'https://via.placeholder.com/150';
  img.alt = `Foto de ${professor.username}`;

  const nome = document.createElement('p');
  nome.textContent = professor.username;

  const disciplina = document.createElement('p');
  disciplina.textContent = professor.disciplina || 'Disciplina não informada';
  disciplina.classList.add('subject');

  card.appendChild(img);
  card.appendChild(nome);
  card.appendChild(disciplina);

  cardLink.appendChild(card);

  return cardLink;
}

function carregarProfessores() {
  const container = document.getElementById('containerProfessores');
  container.innerHTML = ''; // limpa antes de adicionar

  explicadores.forEach(prof => {
    const card = criarCard(prof);
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', carregarProfessores);
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
  // Executa a função que cria e mostra os cards
  carregarProfessores();
} else if (window.location.pathname.endsWith('perfilProfessor.html')) {
  // Executa a função que carrega o perfil do professor
  carregarPerfil();
}































