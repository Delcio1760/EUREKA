
  document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const modal = document.getElementById("mensagemModal");
    const closeModal = document.querySelector(".modal .close");

    // Adiciona clique em cada card
    cards.forEach(card => {
      card.addEventListener("click", () => {
        modal.style.display = "block";
      });
    });

    // Fecha o modal ao clicar no X
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Fecha o modal se clicar fora
    window.addEventListener("click", event => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

    
  



  });

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("mensagemModal");
    const buttonVejaMais=document.getElementById('buttonVejaMais')


  buttonVejaMais.addEventListener('click',()=>{
    modal.style.display="block";
   closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });  
     window.addEventListener("click", event => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
    
  })

});


document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("mensagemModal");
    const buttonVejaMais=document.getElementById('buttonVejaMais')


  buttonVejaMais.addEventListener('click',()=>{
    modal.style.display="block";
   closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });  
     window.addEventListener("click", event => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
    
  })

});

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("mensagemModal");
    const buttonFiltro=document.getElementById('buttonFiltrar')
 

  buttonFiltro.addEventListener('click',()=>{
    modal.style.display="block";
   closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });  
     window.addEventListener("click", event => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
    
  })

});



document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("mensagemModal");
    const labelFiltro=document.getElementById('filtrar')

labelFiltro.addEventListener('click',()=>{
    modal.style.display="block";
   closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });  
    window.addEventListener("click", event => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
    
  })


});

   







