function renderizarLeaderBoard() {
  let alunos = JSON.parse(localStorage.getItem("users"));
  const alunosOrdenados = alunos.sort((a, b) => b.pontos - a.pontos);

  const linhas = document.querySelectorAll('.leaderboard-row');

  linhas.forEach((linha, index) => {
    const aluno = alunosOrdenados[index];

    if (aluno) {
      linha.querySelector(".rank").textContent = index +1+"º"; // Posição no ranking
      linha.querySelector(".nome").textContent = aluno.username;
      linha.querySelector(".pontos").textContent = aluno.pontos + " pts";
    } else {
      linha.querySelector(".rank").textContent = "";
      linha.querySelector(".nome").textContent = "";
      linha.querySelector(".pontos").textContent = "";
    }
  });
}

renderizarLeaderBoard();