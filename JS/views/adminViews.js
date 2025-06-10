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
    tableBody.innerHTML = ""; // Limpa o conteúdo da tabela

    alunos.forEach(aluno => {
        const linha = document.createElement("tr");
        linha.innerHTML = 
        `   <td><input type="checkbox" /></td>
            <td>${aluno.username}</td>
            <td>${aluno.dataNascimento}</td>
            <td>${aluno.email}</td>
            <td>${aluno.morada}</td>
            <td class="action-icons">
            <img src="/EUREKA/img/edit.png" alt="Editar" />
            <img src="/EUREKA/img/delete.png" alt="Eliminar" />
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
              <img src="/EUREKA/img/edit.png" alt="Editar" />
              <img src="/EUREKA/img/delete.png" alt="Eliminar" />
          </td>
      `;
      tableBody.appendChild(linha);
  });
}
