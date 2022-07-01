let productsData = "";

fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })

  .then(function (productsData) {
    console.log(productsData);
    loadProducts(productsData);
  })

  .catch((err) => console.log("Oh no", err));

function loadProducts(productsData) {
  productsData.map(function (product) {
    const productUrl = document.createElement("a");
    productUrl.href = `product.html?id=${product._id}`;

    const productArticle = document.createElement("article");

    const productImg = document.createElement("img");
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;

    const productTitle = document.createElement("h3");
    productTitle.classList.add("productName");
    productTitle.innerHTML = product.name;

    const productDescription = document.createElement("p");
    productDescription.classList.add("productDescription");
    productDescription.innerHTML = product.description;

    document.getElementById("items").appendChild(productUrl);
    productUrl.appendChild(productArticle);
    productArticle.appendChild(productImg);
    productArticle.appendChild(productTitle);
    productArticle.appendChild(productDescription);
  });
}