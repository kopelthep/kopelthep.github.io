function displayProducts(products) {
  // clear products list
  $('#products-list').empty();

  // display products
  products.forEach((product) => {
    $('#products-list').append(
      `<div class="product">
        <a href="./product.html?id=${product.id}" title="En savoir plus...">
          <h2>${product.name}</h2>
          <img alt="${product.name}" src="./assets/img/${product.image}">
          <p class="price"><small>Prix</small> ${product.price}&thinsp;$</p>
        </a>
      </div>
      `
    );
  });
}

function sortAndFilterProducts(data) {
  console.log(data)

  let filteredDatas;
  if (current_category == "Tous les produits") {
    console.log(data)
    filteredDatas = data;
  } else if (current_category == "Appareils photo") {
    filteredDatas = data.filter((element) => {
      console.log(element)
      return element.category == "cameras"
    })
  } else if (current_category == "Consoles") {
    filteredDatas = data.filter((element) => {
      console.log(element)
      return element.category == "consoles"
    })
  } else if (current_category == "Écrans") {
    filteredDatas = data.filter((element) => {
      console.log(element)
      return element.category == "screens"
    })
  } else if (current_category == "Ordinateurs") {
    filteredDatas = data.filter((element) => {
      console.log(element)
      return element.category == "computers"
    })
  }
  console.log(filteredDatas)
  let sortedData;
  if (current_criteria == "Prix (bas-haut)") {
    sortedData = filteredDatas.sort((a,b) => {
      console.log(a,b)
      return a.price - b.price;
    })
  } else if (current_criteria == "Prix (haut-bas)") {
    sortedData = filteredDatas.sort((a,b) => {
      console.log(a,b)
      return b.price - a.price;
    })
  } else if (current_criteria == "Nom (A-Z)") {
    sortedData = filteredDatas.sort((a,b) => {
      console.log(a,b)
      return a.name.localeCompare(b.name);
    })
  } else if (current_criteria == "Nom (Z-A)") {
    sortedData = filteredDatas.sort((a,b) => {
      console.log(a,b)
      return a.name.localeCompare(b.name);
    }).reverse()
  }
  console.log(sortedData)
  displayProducts(sortedData)
  console.log(sortedData.length)
  console.log(document.getElementById ("products-count"))
  document.getElementById ("products-count").innerHTML = `${sortedData.length} produits`

  // displayProducts(filteredDatas)
}

console.log("products.js")

let current_category = "Tous les produits"
let current_criteria = "Prix (bas-haut)"

// fetch products from json file
$.ajax({
  url: './data/products.json',
  type: 'GET',
  dataType: 'json',
  success: (data) => {
    console.log(data);
    displayProducts(data);

    function updateSelectedCategories() {
      console.log("updateSelected")
      let selected = document.querySelectorAll('.selected-categories');
      console.log(selected);
      selected.forEach((item) => {
        item.classList.remove('selected-categories');
      })
      console.log(this)
      current_category = this.innerHTML;
      console.log(current_category)
      this.classList.add('selected-categories');
      sortAndFilterProducts(data)

    }

    function updateSelectedCriteria() {
      console.log("updateSelected")
      let selected = document.querySelectorAll('.selected-criteria');
      console.log(selected);
      selected.forEach((item) => {
        item.classList.remove('selected-criteria');
      })
      this.classList.add('selected-criteria');
      current_criteria = this.innerHTML;
      console.log(current_criteria);
      sortAndFilterProducts(data)

    }


    // add an event listener to each button of the product categories
    let categoriesButton = document.getElementById('product-categories').children;
    console.log(categoriesButton);
    for (let i = 0; i < categoriesButton.length; i++) {
      console.log(categoriesButton[i]);
      categoriesButton[i].addEventListener("click", updateSelectedCategories);
    }

    let criteriaButton = document.getElementById('product-criteria').children;
    console.log(criteriaButton);
    for (let i = 0; i < criteriaButton.length; i++) {
      console.log(criteriaButton[i]);
      criteriaButton[i].addEventListener("click", updateSelectedCriteria);
    }
  },
  error: (error) => {
    console.log(error);
  }
});






// let categoriesButton = document.getElementById('product-categories').children;
// console.log(categoriesButton.children);
// for (element in categoriesButton)  {
//   console.log(element);
//   element.addEventListener("click", updateSelected);
// }
// console.log("products.js end") 

