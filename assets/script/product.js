// get id from url
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

function displayProduct(products) {
  console.log(id);
  if ((id < 13) & (id > 0)) {
    console.log("voci voilouu");

    // get product from products
    const product = products.find((product) => product.id == id);
    console.log(product);
    // display product
    console.log(document.getElementById("product-name"));
    document.getElementById("product-name").innerText = product.name;

    console.log(document.getElementById("product-desc"));
    document.getElementById("product-desc").innerHTML = product.description;
    // $('#product-title').text(product.name);

    $("#product-image").attr("src", "./assets/img/" + product.image);

    console.log(document.getElementById("product-features"));
    document.getElementById("product-features").innerText = product.features;

    console.log(document.getElementById("product-price"));
    document.getElementById("product-price").innerText = `${product.price}$`;
  } else {
    console.log("voci voilaaaa");
    console.log(document.getElementsByTagName("main").innerHTML);
    document.getElementById("MyMain").innerText = `Page non trouvée `;
  }
}
function showCartAlert() {
  const element = document.createElement("div");
  element.className = "cart-alert fadeInUp";
  element.innerHTML = "<p>Le produit a été ajouté au panier</p>";

  document.body.append(element);

  // wait for 3secs then remove the cart alert box
  setTimeout(function () {
    element.remove();
  }, 3000);
}
$.ajax({
  url: "./data/products.json",
  type: "GET",
  dataType: "json",
  success: (data) => {
    console.log(data);
    displayProduct(data);

    // listen to form submit
    $("form").submit((event) => {
      console.log("add to cart form submitted");
      event.preventDefault();
      // get product from products
      const product = data.find((product) => product.id == id);
      // get quantity
      const quantity = $("#product-quantity").val();
      // get cart from session storage
      let cart = JSON.parse(sessionStorage.getItem("panier"));
      // if cart is empty
      if (cart == null) {
        cart = [];
      }
      // check if product is already in cart
      const productInCart = cart.find((product) => product.id == id);

      // if product is already in cart
      if (productInCart) {
        productInCart.quantity =
          parseInt(productInCart.quantity) + parseInt(quantity);
      } else {
        // if product is not in cart
        product.quantity = quantity;
        cart.push(product);
      }
      // save cart in session storage
      sessionStorage.setItem("panier", JSON.stringify(cart));
      // display cart
      showCartAlert();
      miseAJourPanier();
    });
  },
  error: (error) => {
    console.log(error);
  },
});
