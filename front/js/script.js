// Save API response with all products //
let productsData = [];

// Request API to get all product's data //
async function fetchProducts() {
  await fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })

    .then(function (promise) {
      productsData = promise;
    })

    .catch(err => console.error(err));
}

// Load each products of API on page //
async function loadProducts() {
  await fetchProducts();
  document.getElementById("items").innerHTML = productsData
    .map(function (product) {
      return `<a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
      </a>`;
    })
    .join("");
}

loadProducts();