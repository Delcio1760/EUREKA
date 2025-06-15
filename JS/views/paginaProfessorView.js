
//admin logado pode ver o botão
function getAdminLogged() {
  const adminStr = sessionStorage.getItem("Admin");
  if (!adminStr) return null; // Nenhum admin logado
  return JSON.parse(adminStr);
}

function isAdminLogged() {
  return sessionStorage.getItem("admin") !== null;
}
const adminLogado = getAdminLogged();

if (adminLogado) {
  // Admin logado - mostrar botões
  document.getElementById("botao-eliminar").style.display = "inline-block";
  
} 

//aluno logado pode ver o botão

import { getUserLogged, isLoggedIn } from '../models/alunosModel.js';  // ajusta o caminho

if (isLoggedIn()) {
  const aluno = getUserLogged();

  if (aluno) {
    document.getElementById("botao-avaliar").style.display = "inline-block";
    document.getElementById("botao-marcar").style.display = "inline-block";

  }
} 