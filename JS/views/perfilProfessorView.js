

//botões de entrada para mudar de pagina (meus alunos, solicitações)


// const botaoAlunos= document.getElementById('buttonAlunos')
// const botaoMensagem=document.getElementById("buttonMensagem")

// document.addEventListener("DOMContentLoaded", () => {
// const botaoSolicitações=document.getElementById('buttonSolicitações')


//   botaoSolicitações.addEventListener("click", () => {
//     tela1.classList.remove("ativa");
//     tela2.classList.add("ativa");
//   });
// });


const btnSolicitacoes = document.getElementById('buttonSolicitações');
const videoArea = document.getElementById('video-area');
const blankSpace = document.getElementById('blank-space');

//botão solicitações
btnSolicitacoes.addEventListener('click', () => {
  // oculta o vídeo (display:none para liberar a área)
  videoArea.style.display = 'none';

  // mostra a div branca sem tirar do DOM
  blankSpace.classList.add('active');
});


//botao alunos
const botaoAlunos= document.getElementById('buttonAlunos')
const blankspace1=document.getElementById('blank-space1')

botaoAlunos.addEventListener('click',()=>{
     // oculta o vídeo (display:none para liberar a área)
  videoArea.style.display = 'none';

  // mostra a div branca sem tirar do DOM
  blankspace1.classList.add('active');
    
})


//botão editar descrições
document.addEventListener('DOMContentLoaded', () => {
  const botaoPerfil = document.getElementById('buttonPerfil');
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

  botaoPerfil.addEventListener('click', () => {
    esconderTodasAsPaginas();
    videoArea.style.display = 'none';
    blankspace2.innerHTML = conteudoPerfil;
    blankspace2.classList.add('active');
  });
});













//botão 
document.addEventListener('DOMContentLoaded', () => {
  const botaoAjuda= document.getElementById('buttonAjuda')
  const blankspace3=document.getElementById('blank-space3')
  const videoArea = document.getElementById('video-area');

  const conteudoAjuda = `<main>
    <div aria-label="Perfil do usuário e dados exibidos" class="profile-container" role="region">
      <section class="profile-left">
        <h2>O meu perfil</h2>
        <div class="field">
            <label class="label" >Nome Do Professor</label>
            <input id="nome-completo" class="input-edit" type="text" placeholder="José Soares" disabled></input>
        </div>
        <div class="field">
          <label class="label" >Email</label>
            <input id="email" class="input-edit" type="text" placeholder="joão@gmail.com" disabled>
        </div>

        
        <div class="field">
          <label class="label" >Data de Nascimento</label>
            <input id="data-nascimento" class="input-edit" type="text" placeholder="01/11/2000 "disabled>
        </div>
        
        <div class="field">
          <label class="label" >telefone</label>
            <input id="telefone" class="input-edit" type="text" placeholder="923452900" disabled>
        </div>
        <div class="field">
          <label class="label" >Morada</label>
            <input id="morada" class="input-edit" type="text" placeholder="Rua Dom Sancho I, Arjivai" disabled>
        </div>
        <div class="field">
          <label class="label" >Grau que leciona</label>
            <input id="leciono" class="input-edit" type="text" placeholder="Do 5º Ano ao 3º Ano Ensino superior" disabled>
        </div>
        <div class="field">
          <label class="label" >Modalidade</label>
            <input id="modalidade" class="input-edit" type="text" placeholder="Online-Presencial" disabled>
        </div>
        <div class="field">
          <label class="label" >Onde Leciona</label>
            <input id="ondeLeciona" class="input-edit" type="text" placeholder="Porto,Matosinhos" disabled>
        </div>
        <div class="field">
          <label class="label" >Preço por Aula </label>
            <input id="preço" class="input-edit" type="text" placeholder="40$" disabled>
        </div>
        

        
      </section>
      <section aria-label="Informações do perfil do usuário" class="profile-right">
        <img alt="Foto de perfil" height="80" src="https://storage.googleapis.com/a1aa/image/f4237d22-8060-43f4-4c48-6e95fbdbc151.jpg" width="80"/>
        <h3>José Soares</h3>
        <p>16 nos</p>
        <p class="role">Aluno</p>
        <button class="btn-edit" type="button">
          Editar Perfil <i class="fas fa-external-link-alt"></i>
        </button>
        <button class="btn-delete" type="button">Eliminar Perfil</button>
      </section>
    </div>
  </main>`; // teu HTML do perfil

  function esconderTodasAsPaginas() {
    const todasAsPaginas = document.querySelectorAll('[id^="blank-space"]');
    todasAsPaginas.forEach(pagina => {
      pagina.classList.remove('active');
    });
  }

  botaoAjuda.addEventListener('click', () => {
    esconderTodasAsPaginas();
    videoArea.style.display = 'none';
    blankspace3.innerHTML = conteudoAjuda;
    blankspace3.classList.add('active');
  });
});
















//botão gerir sessões
const botaoGerirSessões= document.getElementById('buttonGerir')
const blankspace4=document.getElementById('blank-space4')

botaoGerirSessões.addEventListener('click',()=>{
     // oculta o vídeo (display:none para liberar a área)
  videoArea.style.display = 'none';

  // mostra a div branca sem tirar do DOM
  blankspace4.classList.add('active');
    
})

//botão logout
const botaoLogout= document.getElementById('buttonLogout')
const blankspace5=document.getElementById('blank-space5')

botaoLogout.addEventListener('click',()=>{
     // oculta o vídeo (display:none para liberar a área)
  videoArea.style.display = 'none';

  // mostra a div branca sem tirar do DOM
  blankspace5.classList.add('active');
    
})



//permissão para ver os botões no card do professor

















