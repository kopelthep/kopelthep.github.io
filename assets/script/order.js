function isCreditCardExpiryValid() {
  let valueArr = $("#credit-card-expiry").val().split("/");
  let monthIndex = Number(valueArr[0]) - 1;
  let year = "20" + valueArr[1];
  let expDate = new Date(year, monthIndex);
  let now = new Date();

  return expDate > now;
}
let $validator = $("form").validate({
  lang: "fr",
  rules: {
    "first-name": {
      required: true,
      minlength: 2,
    },
    "last-name": {
      required: true,
      minlength: 2,
    },
    email: { required: true, email: true },
    phone: {
      required: true,
      phoneUS: true,
    },
    "credit-card": {
      required: true,
      creditcard: true,
    },
    "credit-card-expiry": {
      required: true,
    },
  },
  submitHandler: function (form) {
    if (isCreditCardExpiryValid() === false) {
      $validator.showErrors({
        "credit-card-expiry":
          "La date d'expiration de votre carte de credit est invalide",
      });
      return false;
    }
    let orderdetails = JSON.parse(sessionStorage.getItem("orderdetails")) || {
      orderId: 0,
    };

    orderdetails.orderId++;
    orderdetails.fname = $("#first-name").val();
    orderdetails.lname = $("#last-name").val();

    sessionStorage.setItem("orderdetails", JSON.stringify(orderdetails));
    // save cart in session storage
    sessionStorage.setItem("panier", JSON.stringify([]));
    miseAJourPanier();
    window.location.href = "./confirmation.html";
  },
});
