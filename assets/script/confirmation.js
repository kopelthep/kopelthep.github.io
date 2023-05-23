orderdetails = JSON.parse(sessionStorage.getItem("orderdetails"));

function confirmation(nom, confirmation) {
  console.log(document.getElementById("name"));
  document.getElementById(
    "name"
  ).innerText = `Votre commande est confirmée ${nom}!`;

  console.log(document.getElementById("confirmation-number"));

  document.getElementById("confirmation-number").innerHTML =
    "0000" + confirmation;
}

let nom = orderdetails.fname + " " + orderdetails.lname;
confirmation(nom, orderdetails.orderId);
