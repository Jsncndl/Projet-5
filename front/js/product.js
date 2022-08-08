// Save API response with data of selected product //
let productData = [];

// Get ID of product in URL //
let urlID = new URLSearchParams(window.location.search);
let productID = urlID.get("id");

// Request API to get selected product's data //
async function fetchProduct() {
  await fetch("http://localhost:3000/api/products/" + productID)
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })

    .then(function(promise) {
      productData = promise;
    })

    .catch((err) => console.error(err));
}

// Load product on page //
async function loadProductData() {
  await fetchProduct();

  document.title = productData.name;
  document.querySelector(".item__img").innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}" />`;
  document.getElementById("title").innerHTML = `${productData.name}`;
  document.getElementById("price").innerHTML = `${productData.price}`;
  document.getElementById("description").innerHTML = `${productData.description}`;
  document.getElementById("colors").innerHTML += productData.colors.map(function(color) {
    return `<option value="${color}">${color}</option>`;
  });
}

loadProductData();

//----------------------------------LOCALSTORAGE----------------------------------//
// Array of products save in localStorage //
let productsInCart = JSON.parse(localStorage.getItem("products"));

// Search if same ID and color of product selected exist in localStorage
function findCartProductsIdColor() {
  for (i = 0; i < productsInCart.length; i++) {
    if (productsInCart[i].productID === productID) {
      if (productsInCart[i].productColor === document.getElementById("colors").value) {
        return true;
      }
    }
  }
}

// Save product selected in localStorage
function newProductInCart() {
  // Save ID, color and quantity selected //
  let newCartProduct = {
    productID: productID,
    productColor: document.getElementById("colors").value,
    productQuantity: document.getElementById("quantity").value,
  };

  // Save newCartProduct Object in array productsInCart //
  productsInCart.push(newCartProduct);

  // Convert array of objects productsInCart into a string to save all the products in "products" key of localStorage //
  localStorage.setItem("products", JSON.stringify(productsInCart));
}

// Click on "Ajouter au panier" //
function addToCart() {
  const MIN_QUANTITY_PRODUCT = 0;
  const MAX_QUANTITY_PRODUCT = 100;

  if (document.getElementById("colors").value === "") {
    alert("S'il vous plaît choisissez une couleur !");
  } else if (
    document.getElementById("quantity").value === MIN_QUANTITY_PRODUCT ||
    document.getElementById("quantity").value > MAX_QUANTITY_PRODUCT
  ) {
    alert("S'il vous plaît choisissez une quantité entre 1 et 100");
  }

  // If localStorage already contains products //
  else if (productsInCart) {
    // If localStorage already contain product with same ID & Color, modify quantity //
    if (findCartProductsIdColor() == true) {
      // Find product in array of products in cart (localStorage) with ID and Color of product selected //
      let productInCartData = productsInCart.find(function(product) {
        return product.productID === productID && product.productColor === document.getElementById("colors").value;
      });

      // Add quantity selected to quantity store //
      let newQuantity = Number(productInCartData.productQuantity) + Number(document.getElementById("quantity").value);

      // Set new Quantity for product selected into the array of products in cart //
      productInCartData.productQuantity = newQuantity.toString();

      // Save array of products in cart to localStorage //
      localStorage.setItem("products", JSON.stringify(productsInCart));
    } else {
      newProductInCart();
    }
  }

  // If localStorage don't contains products
  else {
    productsInCart = [];
    newProductInCart();
  }
}

const buttonAddToCart = document.getElementById("addToCart");
buttonAddToCart.addEventListener("click", addToCart);
