function miseAJourPanier() {
  //le oenier de header
  //lecture du nombre d'articles dans le panier
  let panier = JSON.parse(sessionStorage.getItem("panier")) || [];
  let nombre = panier.length;
  // traitement de la valeur
  elementDOM = document.getElementsByClassName("count")[0];
  elementDOM.innerHTML = nombre;
  
  if (nombre == 0) {
    elementDOM.classList.add("hidden");
  } else {
    elementDOM.classList.remove("hidden");

  }
}

window.addEventListener("load", miseAJourPanier);
