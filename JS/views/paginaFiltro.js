function filtarExplicador(){
    const disciplina = document.getElementById("disciplina-input").value.trim().toLowerCase();
    const localizacao = document.getElementById("localizacao-input").value.trim().toLowerCase();
    const precoInput = document.getElementById("preco-input").value;
    const preco = precoInput ? parseInt(precoInput) : null;

    const selecionados = document.querySelectorAll(".filter-select");
    const ranking = selecionados[0].value;
    const nivelEnsino = selecionados[1].value;
    const modalidade = selecionados[2].value;

    const explicadores = JSON.parse(localStorage.getItem("explicador")) || [];
    
  const filtrar = explicadores.filter(explicador => {

    const disciplinasMatch = disciplina === "" ||explicador.disciplinas.some(d => d.toLowerCase().includes(disciplina));
    const localizacaoMatch = localizacao === "" || explicador.morada.toLowerCase().includes(localizacao);

    let rankingMatch = true;
    if (ranking !== "Todos") {
        let rankingValor = 0;
        if (ranking === "5 estrelas") rankingValor = 5;
        else if (ranking === "4+ estrelas") rankingValor = 4;
        else if (ranking === "3+ estrelas") rankingValor = 3;
        else if (ranking === "0 estrelas") rankingValor = 0;
        
        rankingMatch = explicador.estrelas >= rankingValor;
    }
    
    const nivelEnsinoMatch = nivelEnsino === "Todos" || 
        explicador.nivelEnsino === nivelEnsino;

    
    const modalidadeMatch = modalidade === "Qualquer" || 
        explicador.modalidades.some(m => m === modalidade);

   
    const precoMatch = preco === null || explicador.preco <= preco;

    return disciplinasMatch && localizacaoMatch && rankingMatch && 
           nivelEnsinoMatch && modalidadeMatch && precoMatch;
});

const grelha = document.getElementById("tutors-grid");
grelha.innerHTML = "";

if(filtrar.length > 0){
    filtrar.forEach(explicador => {
        const card = document.createElement("div");
        card.className = "tutor-card";
        card.innerHTML = `
            <img src="${explicador.fotoPerfil}" alt="Foto de perfil do explicador" />
            <h3>${explicador.username}</h3>
            <p>Disciplinas: ${explicador.disciplinas.join(", ")}</p>
            <p>Localização: ${explicador.morada}</p>
            <p>Preço: ${explicador.preco}€/hora</p>
            <p>Estrelas: ${explicador.estrelas}</p>`;
        grelha.appendChild(card);
    });
} else {
    grelha.innerHTML = `<p style="text-align: center; margin: 3rem 0;">Nenhum explicador encontrado com os filtros selecionados.</p>`;
}

console.log("Explicadores filtrados:", filtrar);
}

const filtrarBtn = document.querySelector(".filter-icon");
filtrarBtn.addEventListener("click", filtarExplicador);

// Adiciona event listener para o input da disciplina
document.getElementById("disciplina-input").addEventListener("input", filtarExplicador);
document.getElementById("localizacao-input").addEventListener("input", filtarExplicador);