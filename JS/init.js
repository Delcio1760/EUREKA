import { Aluno } from "./models/alunosModel.js";
import { Explicador } from "./models/professorModel.js";
import { Quizz, initQuizzes, addQuizz } from "./models/quizModel.js";
import { renderCards, mostrarSeccao } from "./views/adminView.js";
import { renderTableAlunos, renderTableExplicadores } from "./views/adminView.js";
import { renderGraficoSimples , renderGraficoDisciplinas } from "./views/adminView.js";

console.log("init.js carregado");

let alunos;
if (!localStorage.getItem("users")) {
  alunos = [
    new Aluno("joao_silva", "1234", "912345678", "17/04/2006", "joao@gmail.com", "Rua das Flores 12", {
        disciplinas: "Matemática",
        modalidades: ["Online"],
        disponibilidade: ["Segunda 15:00-17:00", "Quarta 10:00-12:00"],
        precoMax: 15,
        localidade: "Lisboa"
      }, [],
      "joao.jpg",
      20),
    new Aluno("tiago_sousa", "pass2", "913456222", "30/08/2000", "tiago@gmail.com", "Av. do Saber 22", {
        disciplinas: "Física",
        modalidades: ["Presencial"],
        disponibilidade: ["Terça 15:00-17:00"],
        precoMax: 18,
        localidade: "Porto"
      }, [],
      "tiago.jpg",
      35),
    new Aluno("rita_ferreira", "pass3", "914567333", "28/02/2007", "rita@gmail.com", "Rua do Estudo 33", {
        disciplinas: "Química",
        modalidades: ["Online", "Presencial"],
        disponibilidade: ["Quarta 10:00-12:00"],
        precoMax: 20,
        localidade: "Coimbra"
      }, [],
      "rita.jpg",
      15),
    new Aluno("miguel_alves", "pass4", "915678444", "16/07/2002", "miguel@gmail.com", "Praça Central 44", {
        disciplinas: "Biologia",
        modalidades: ["Online"],
        disponibilidade: ["Sábado 10:00-12:00"],
        precoMax: 15,
        localidade: "Braga"
      }, [],
      "miguel.jpg",
      10)
  ];
  localStorage.setItem("users", JSON.stringify(alunos));
} else {
  alunos = JSON.parse(localStorage.getItem("users"));
}

let explicadores;
if (!localStorage.getItem("explicador")) {
  explicadores = [
    new Explicador("maria_gomes", "maria@gmail.com", "abc123", "04/04/1998", ["Matematica"], "Lisboa", ["Online"], 15, 0, ["Segunda 14:00-16:00"], "maria.jpg"),
    new Explicador("pedro_santos", "pedro@gmail.com", "pedro123", "05/06/1996", ["Fisica"], "Porto", ["Presencial"], 12, 0, ["Terça 15:00-17:00"], "pedro.jpg"),
    new Explicador("sara_lima", "sara@gmail.com", "sara456", "27/03/1990", ["Biologia"], "Coimbra", ["Online"], 18, 0, ["Quarta 10:00-12:00"], "sara.jpg"),
    new Explicador("ricardo_oliveira", "ricardo@gmail.com", "rico789", 40, ["Historia"], "Faro", ["Presencial"], 20, 0, ["Quinta 16:00-18:00"], "ricardo.jpg"),
    new Explicador("ana_pereira", "ana@gmail.com", "ana123", "12/04/1999", ["Ingles"], "Braga", ["Online"], 14, 0, ["Sexta 14:00-16:00"], "ana.jpg"),
    new Explicador("joao_marques", "joao@gmail.com", "joaopass", "26/10/1991", ["Matematica"], "Lisboa", ["Presencial"], 25, 0, ["Segunda 18:00-20:00"], "joao.jpg"),
    new Explicador("ines_silva", "ines@gmail.com", "inespwd", "30/11/1990", ["Fisica"], "Aveiro", ["Online"], 17, 0, ["Sábado 14:00-16:00"], "ines.jpg"),
    new Explicador("miguel_ferreira", "miguel@gmail.com", "migpass", "29/07/1997", ["Informática"], "Leiria", ["Presencial"], 22, 0, ["Domingo 10:00-12:00"], "miguel.jpg")
  ];
  localStorage.setItem("explicador", JSON.stringify(explicadores));
} else {
  explicadores = JSON.parse(localStorage.getItem("explicador"));
}

// Inicialização de quizzes
if (!localStorage.getItem("quizzes")) {
  const quizzesIniciais = [
    new Quizz("Multiplicações Simples", "Matemática", [
      { pergunta: "Quanto é 6 x 7?", respostas: ["42", "36", "48", "40"], respostaCerta: 0 },
      { pergunta: "Quanto é 5 x 9?", respostas: ["45", "54", "40", "50"], respostaCerta: 0 },
      { pergunta: "Quanto é 8 x 3?", respostas: ["24", "18", "21", "26"], respostaCerta: 0 }
    ]),
    new Quizz("Geografia do Mundo", "Geografia", [
      { pergunta: "Qual é a capital da França?", respostas: ["Paris", "Londres", "Berlim", "Madrid"], respostaCerta: 0 },
      { pergunta: "Qual é o maior país do mundo?", respostas: ["Rússia", "Canadá", "China", "Estados Unidos"], respostaCerta: 0 },
      { pergunta: "Qual é o continente mais populoso?", respostas: ["Ásia", "África", "Europa", "América do Norte"], respostaCerta: 0 }
    ]),
    new Quizz("História Antiga", "História", [
      { pergunta: "Quem foi o primeiro imperador romano?", respostas: ["Augusto", "Júlio César", "Nero", "Trajano"], respostaCerta: 0 },
      { pergunta: "Em que ano caiu o Império Romano do Ocidente?", respostas: ["476 d.C.", "395 d.C.", "410 d.C.", "500 d.C."], respostaCerta: 0 },
      { pergunta: "Quem foi o faraó mais famoso do Egito?", respostas: ["Tutancâmon", "Cleópatra", "Ramsés II", "Akhenaton"], respostaCerta: 0 }
    ]),
    new Quizz("Fisica", "Fisica", [
      { pergunta: "Qual é a unidade de medida da força?", respostas: ["Newton", "Joule", "Pascal", "Watt"], respostaCerta: 0 },
      { pergunta: "O que é a Lei da Gravitação Universal?", respostas: ["Atração entre massas", "Força centrípeta", "Lei de Ohm", "Princípio de Arquimedes"], respostaCerta: 0 },
      { pergunta: "Qual é a velocidade da luz no vácuo?", respostas: ["299.792 km/s", "150.000 km/s", "300.000 km/s", "1.080.000 km/s"], respostaCerta: 0 }
    ])
  ];

  localStorage.setItem("quizzes", JSON.stringify(quizzesIniciais));
}
// Inicializa os quizzes do localStorage
initQuizzes();

renderCards(alunos, explicadores);
mostrarSeccao("dashboard");
renderTableAlunos(alunos);
renderTableExplicadores(explicadores);
renderGraficoSimples(alunos, explicadores);
renderGraficoDisciplinas();



document.querySelectorAll('.menu-item').forEach(item => {
  const seccao = item.dataset.section;
  if (seccao) {
    item.addEventListener('click', () => { mostrarSeccao(seccao); });
  }
});
