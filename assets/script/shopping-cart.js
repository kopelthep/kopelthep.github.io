function panier(panier) {
  console.log(panier);
  if (panier == null || panier.length == 0) {
    $("article").empty();
    $("article").html("<h1>Panier</h1><p>Aucun produit dans le panier</p>");
    // document.getElementsByClassName("table shopping-cart-table").innerText = `Aucun produit dans le panier`;
  } else {
    $("#cart-body").empty();
    let total = 0;
    panier.forEach((product) => {
      itemTotal = Number(product.price) * Number(product.quantity);
      const tableRow = $("<tr></tr>");
      tableRow.append(`
    <td><button class="product-remove" title="Supprimer"><i class="fa fa-times"></i></button></td>
    <td><a href="./product.html?id=${product.id}">${product.name}</a></td>
    <td>${product.price}&thinsp;$</td>
    <td>
        <div class="row">
            <div class="col">
                <button class="quantity-minus" title="Retirer" disabled=""><i class="fa fa-minus"></i></button>
            </div>
            <div class="col quantity-value">${product.quantity}</div>
            <div class="col">
                <button class="quantity-plus" title="Ajouter"><i class="fa fa-plus"></i></button>
            </div>
        </div>
    </td> 
    <td class="item-total">${itemTotal}&thinsp;$</td>
    `);
      $("#cart-body").append(tableRow);
      if (Number(product.quantity) > 1) {
        tableRow.find(".quantity-minus").removeAttr("disabled");
      }

      const addButton = tableRow.find("button.quantity-plus");
      addButton.click(function () {
        let quantity = Number(product.quantity) + 1;
        product.quantity = quantity;
        let total = product.price * quantity;

        tableRow.find(".quantity-value").text(quantity);
        if (quantity > 1) {
          tableRow.find(".quantity-minus").removeAttr("disabled");
        }
        tableRow.find(".item-total").html(total.toFixed(2) + "&thinsp;$");
        showCartTotal();
        // save cart in session storage
        sessionStorage.setItem("panier", JSON.stringify(cart));
      });

      const minusButton = tableRow.find("button.quantity-minus");
      minusButton.click(function () {
        let quantity = Number(product.quantity);
        if (quantity > 1) {
          quantity -= 1;
        }
        product.quantity = quantity;
        let total = product.price * quantity;
        tableRow.find(".quantity-value").text(quantity);
        if (quantity === 1) {
          tableRow.find(".quantity-minus").attr("disabled", "");
        }
        tableRow.find(".item-total").html(total.toFixed(2) + "&thinsp;$");
        showCartTotal();
        // save cart in session storage
        sessionStorage.setItem("panier", JSON.stringify(cart));
      });

      const removeButton = tableRow.find("button.product-remove");
      removeButton.click(function () {
        let value = confirm("voulez vous supprimer le produit du panier?");
        if (value === true) {
          tableRow.remove();
          cart = cart.filter(function (item) {
            return item.id !== product.id;
          });
          showCartTotal();
          // save cart in session storage
          sessionStorage.setItem("panier", JSON.stringify(cart));
        }
      });
    });
    showCartTotal();
  }
}
function showCartTotal() {
  let total = 0;
  cart.forEach(function (item) {
    let itemTotal = Number(item.quantity) * Number(item.price);
    total += itemTotal;
  });
  $(".shopping-cart-total").html(
    `Total: <strong>${total.toFixed(2)}&thinsp;$</strong>`
  );
}
let cart = JSON.parse(sessionStorage.getItem("panier")) || [];

cart.sort(function (a, b) {
  const nameA = a.name.toUpperCase(); // ignore upper and lowercase
  const nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});

$(".clear-cart").click(function () {
  let value = confirm("Voulez-vous supprimer tous les produits du panier?");
  if (value === true) {
    cart = [];
    panier(cart);

    // save cart in session storage
    sessionStorage.setItem("panier", JSON.stringify(cart));

    miseAJourPanier();
  }
});
panier(cart);
