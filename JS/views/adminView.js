export function mostrarSeccao(sectionId) {
   const seccoes = document.querySelectorAll('.content-section');
   seccoes.forEach(sec => sec.classList.remove('active'));

   const seccaoEscolhida = document.getElementById(sectionId);
   if (seccaoEscolhida) {
     seccaoEscolhida.classList.add('active');
   }
 }

export function renderCards(alunos,explicadores){
 const totalAlunos = alunos.length;
 const totalExplicadores = explicadores.length;
 const totalUtilizadores = totalAlunos + totalExplicadores;

document.getElementById("total-utilizadores").textContent = totalUtilizadores;
document.getElementById("total-alunos").textContent = totalAlunos;
document.getElementById("total-explicadores").textContent = totalExplicadores;

}

export function renderTableAlunos(alunos) {
   const tableBody = document.getElementById("alunos-tbody");
   tableBody.innerHTML = ""; // Limpa o conteÃºdo da tabela

   alunos.forEach(aluno => {
       const linha = document.createElement("tr");
       linha.innerHTML =
       `   <td><input type="checkbox" /></td>
           <td>${aluno.username}</td>
           <td>${aluno.dataNascimento}</td>
           <td>${aluno.email}</td>
           <td>${aluno.morada}</td>
           <td class="action-icons">
           <img src="/img/edit.png" alt="Editar" />
           <img src="/img/delete.png" alt="Eliminar" />
           </td>  
       `;
       tableBody.appendChild(linha);
   });
}

export function renderTableExplicadores(explicadores) {
 const tableBody = document.getElementById("explicadores-tbody");
 tableBody.innerHTML = "";

 explicadores.forEach(explicador => {
     const linha = document.createElement("tr");
     linha.innerHTML = `
         <td><input type="checkbox" /></td>
         <td>${explicador.username}</td>
         <td>${explicador.email}</td>
         <td>${explicador.disciplinas?.join(", ")}</td>
         <td>${explicador.morada}</td>
         <td class="action-icons">
             <img src="/img/edit.png" alt="Editar" />
             <img src="/img/delete.png" alt="Eliminar" />
         </td>
     `;
     tableBody.appendChild(linha);
 });
}

// Grafico de utilizadores mostra a relação entre alunos e explicadores

export function renderGraficoSimples(alunos, explicadores) {
    const totalAlunos = alunos.length;
    const totalExplicadores = explicadores.length;
  
    const ctx = document.getElementById("graficoUtilizadores").getContext("2d");
  
    new Chart(ctx, {
      type: 'bar', // ou 'pie' para gráfico de pizza
      data: {
        labels: ['Alunos', 'Explicadores'],
        datasets: [{
          label: 'Número de Utilizadores',
          data: [totalAlunos, totalExplicadores],
          backgroundColor: [ 'rgba(54, 162, 235, 0.7)','rgba(255, 99, 132, 0.7)'],  // Rosa para explicadores e azul para alunos
          borderColor: ['rgba(54, 162, 235, 1)','rgba(255, 99, 132, 1)'],            // Borda azul para alunos e rosa para explicadores
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false // Oculta legenda, pois o label já está claro
          },
          title: {
            display: true,
            text: 'Distribuição de Utilizadores'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            stepSize: 1
          }
        }
      }
    });
  }




// Prepara os dados para o gráfico

export function renderGraficoDisciplinas(){
    let explicadores = JSON.parse(localStorage.getItem("explicador")) || [];
    let disciplinasContagem = {};

    for(let i = 0; i < explicadores.length; i++){
    let disciplinas = explicadores[i].disciplinas;
    for(let j = 0; j < disciplinas.length; j++){
        let disciplina = disciplinas[j];
        if(disciplinasContagem[disciplina]){
            disciplinasContagem[disciplina]++;
         }else{
            disciplinasContagem[disciplina] = 1;
            }
        }
    }
    let nomeDisciplina = Object.keys(disciplinasContagem);
    let valores = Object.values(disciplinasContagem);

    // Renderiza o gráfico de pizza
    let ctx = document.getElementById("graficoDisciplinas").getContext("2d");

    new Chart(ctx,{
        type: 'pie',
        data:{
            labels: nomeDisciplina,
            datasets: [{label: 'Número de Explicadores por Disciplina',data: valores, 
            backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff", "#ff9f40"]}]
        },
        options : {responsive : true}
    });
}





