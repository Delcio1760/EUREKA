console.log("init.js carregado");
import { Aluno } from "./models/alunosModel.js";
import { Explicador } from "./models/professorModel.js";
import { renderCards, mostrarSeccao } from "./views/adminViews.js";
import { renderTableAlunos, renderTableExplicadores } from "./views/adminViews.js";


let alunos;
if(!localStorage.getItem("users")){
  alunos = [
    new Aluno("joao_silva", "1234", "912345678", "17/04/2006", "joao@gmail.com", "Rua das Flores 12",
      {
        disciplinas: "Matemática",
        modalidades: ["Online"],
        disponibilidade: ["Segunda 15:00-17:00", "Quarta 10:00-12:00"],
        precoMax: 15,
        localidade: "Lisboa"
      },
      ["prof_maria", "prof_pedro"],
      "joao.jpg"
    ),
    new Aluno(
      "tiago_sousa", "pass2", "913456222", "30/08/2000", "tiago@gmail.com", "Av. do Saber 22",
      {
        disciplinas: "Física",
        modalidades: ["Presencial"],
        disponibilidade: ["Terça 15:00-17:00"],
        precoMax: 18,
        localidade: "Porto"
      },
      ["prof_sara"],
      "tiago.jpg"
    ),

    new Aluno(
      "rita_ferreira", "pass3", "914567333", "28/02/2007", "rita@gmail.com", "Rua do Estudo 33",
      {
        disciplinas: "Química",
        modalidades: ["Online", "Presencial"],
        disponibilidade: ["Quarta 10:00-12:00"],
        precoMax: 20,
        localidade: "Coimbra"
      },
      [],
      "rita.jpg"
    ),

    new Aluno(
      "miguel_alves", "pass4", "915678444", "16/07/2002", "miguel@gmail.com", "Praça Central 44",
      {
        disciplinas: "Biologia",
        modalidades: ["Online"],
        disponibilidade: ["Sábado 10:00-12:00"],
        precoMax: 15,
        localidade: "Braga"
      },
      ["prof_pedro"],
      "miguel.jpg"
    )
  ];
  localStorage.setItem("users", JSON.stringify(alunos));
} else {
  alunos = JSON.parse(localStorage.getItem("users"));
}

let explicadores;
if(!localStorage.getItem("explicador")){
  explicadores = [
    new Explicador("maria_gomes", "maria@gmail.com", "abc123", "04/04/1998", ["Matemática"], "Lisboa", ["Online"], 15, 0, ["Segunda 14:00-16:00"], "maria.jpg"),
    new Explicador("pedro_santos", "pedro@gmail.com", "pedro123", "05/06/1996", ["Física"], "Porto", ["Presencial"], 12, 0, ["Terça 15:00-17:00"], "pedro.jpg"),
    new Explicador("sara_lima", "sara@gmail.com", "sara456", "27/03/1990", ["Biologia"], "Coimbra", ["Online"], 18, 0, ["Quarta 10:00-12:00"], "sara.jpg"),
    new Explicador("ricardo_oliveira", "ricardo@gmail.com", "rico789", 40, ["História"], "Faro", ["Presencial"], 20, 0, ["Quinta 16:00-18:00"], "ricardo.jpg"),
    new Explicador("ana_pereira", "ana@gmail.com", "ana123", "12/04/1999", ["Inglês"], "Braga", ["Online"], 14, 0, ["Sexta 14:00-16:00"], "ana.jpg"),
    new Explicador("joao_marques", "joao@gmail.com", "joaopass", "26/10/1991", ["Matemática"], "Lisboa", ["Presencial"], 25, 0, ["Segunda 18:00-20:00"], "joao.jpg"),
    new Explicador("ines_silva", "ines@gmail.com", "inespwd", "30/11/1990", ["Física"], "Aveiro", ["Online"], 17, 0, ["Sábado 14:00-16:00"], "ines.jpg"),
    new Explicador("miguel_ferreira", "miguel@gmail.com", "migpass", "29/07/1997", ["Informática"], "Leiria", ["Presencial"], 22, 0, ["Domingo 10:00-12:00"], "miguel.jpg")
  ];
  localStorage.setItem("explicador", JSON.stringify(explicadores));
} else {
  explicadores = JSON.parse(localStorage.getItem("explicador"));
}


renderCards(alunos, explicadores);
mostrarSeccao("dashboard");
renderTableAlunos(alunos);
renderTableExplicadores(explicadores);

document.querySelectorAll('.menu-item').forEach(item =>{
  const seccao = item.dataset.section;
  if(seccao){
      item.addEventListener('click',() => {mostrarSeccao(seccao);});
  }
})

