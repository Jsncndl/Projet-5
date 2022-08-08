import * as validate from "./regex.js";

// Save API response with all products //
let productsData = [];

// Save products contain in localStorage //
let productsInCart = JSON.parse(localStorage.getItem("products"));

// Save products contain in localStorage with their data contain in API //
let productsDataInCart = JSON.parse(localStorage.getItem("products"));

// Array to contain products ID for POST method when order is confirmed //
let products = [];

// Object with value of form's inputs for POST method when order is confirmed //
let contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: "",
};

// Request API to get all product's data //
async function fetchProducts() {
  await fetch("http://localhost:3000/api/products/")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(promise) {
      productsData = promise;
    })
    .catch((err) => console.error(err));
}

// Post order in API sent object contact and array of ID products to get orderID in response //
async function fetchOrder() {
  const order = { contact, products };
  await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(order),
  })
    .then(function(res) {
      if (res.status == 201) {
        return res.json();
      } else {
        alert("Erreur");
        console.error("Echec de la requête POST, status : " + res.status);
      }
    })
    .then(function(data) {
      return (location.href = `./confirmation.html?id=${data.orderId}`);
    });
}

// Search for product by ID in API to get price, name, image url & alt and save all in productsDataInCart//
async function getProductData() {
  await fetchProducts();

  productsDataInCart.forEach(function(productDataInCart) {
    let productDataOfCart = productsData.find(function(productData) {
      return productDataInCart.productID === productData._id;
    });
    productDataInCart.productName = productDataOfCart.name;
    productDataInCart.productPrice = productDataOfCart.price;
    productDataInCart.productImage = productDataOfCart.imageUrl;
    productDataInCart.productAltTxt = productDataOfCart.altTxt;
  });
  return productsDataInCart;
}

// Sort productsDataInCart by ID //
function sortProductID() {
  productsDataInCart.sort(function(a, b) {
    return b.productID.localeCompare(a.productID);
  });
}

// Update total price and articles on page //
function updatePriceQuantity() {
  let totalQuantity = 0;
  let totalPrice = 0;

  productsDataInCart.forEach(function(productDataInCart) {
    return (totalQuantity = totalQuantity + Number(productDataInCart.productQuantity));
  });

  productsDataInCart.forEach(function(productDataInCart) {
    let productPrice = productDataInCart.productPrice * Number(productDataInCart.productQuantity);
    return (totalPrice = totalPrice + productPrice);
  });
  document.getElementById("totalPrice").innerHTML = totalPrice;
  document.getElementById("totalQuantity").innerHTML = totalQuantity;
}

// Load products with their datas using productsDataInCart //
async function loadCart() {
  await getProductData();
  sortProductID();

  productsDataInCart.forEach(function(productDataInCart) {
    document.getElementById("cart__items").innerHTML += `<article class="cart__item" data-id="${
      productDataInCart.productID
    }" data-color="${productDataInCart.productColor}">
      <div class="cart__item__img">
        <img src="${productDataInCart.productImage}" alt="${productDataInCart.productAltTxt}">
      </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${productDataInCart.productName}</h2>
            <p>${productDataInCart.productColor}</p>
            <p>${productDataInCart.productPrice} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté :</p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
                productDataInCart.productQuantity
              }">
            </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;

    // Add product ID of each product to array of string for POST API //
    products.push(productDataInCart.productID);

    // Add Event Listener for each class=deleteItem //
    deleteProduct();
  });
  // Event listener for total articles and total quantity //
  updatePriceQuantity();
}

loadCart();

// Save quantity selected on page in localStorage //
const setNewQuantity = function() {
  let itemQuantity = document.getElementsByName("itemQuantity");

  addEventListener("change", function() {
    itemQuantity.forEach(function(modifyQuantity) {
      let articleId = modifyQuantity.closest("article").dataset.id;
      let articleColor = modifyQuantity.closest("article").dataset.color;

      productsInCart.forEach(function(productInCart) {
        if (articleId === productInCart.productID && articleColor === productInCart.productColor) {
          return (productInCart.productQuantity = modifyQuantity.closest("input").value);
        }
      });

      productsDataInCart.forEach(function(productDataInCart) {
        if (articleId === productDataInCart.productID && articleColor === productDataInCart.productColor) {
          return (productDataInCart.productQuantity = modifyQuantity.closest("input").value);
        }
      });
    });
    localStorage.setItem("products", JSON.stringify(productsInCart));
    updatePriceQuantity();
  });
};

setNewQuantity();

// Create events for each buttons to delete product on page and in localStorage //
const deleteProduct = function() {
  let deleteButtons = document.querySelectorAll(".deleteItem");

  deleteButtons.forEach(function(deleteButton) {
    deleteButton.addEventListener("click", function() {
      let articleId = deleteButton.closest("article").dataset.id;
      let articleColor = deleteButton.closest("article").dataset.color;
      // Check products in cart and return products with different ID or color of article data //
      productsInCart = productsInCart.filter(function(productToDelete) {
        return productToDelete.productID !== articleId || productToDelete.productColor !== articleColor;
      });
      // Sent array with only products with different ID or color of article data in localStorage //
      localStorage.setItem("products", JSON.stringify(productsInCart));
      // Refresh to display new cart //
      location.reload();
    });
  });
};

// Create event listener for order button and test if the form is correct //
const orderButton = document.getElementById("order");
orderButton.addEventListener("click", function order() {
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const address = document.getElementById("address");
  const city = document.getElementById("city");
  const email = document.getElementById("email");

  (contact.firstName = firstName.value),
    (contact.lastName = lastName.value),
    (contact.address = address.value),
    (contact.city = city.value),
    (contact.email = email.value);

  let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  let addressErrorMsg = document.getElementById("addressErrorMsg");
  let cityErrorMsg = document.getElementById("cityErrorMsg");
  let emailErrorMsg = document.getElementById("emailErrorMsg");

  if (!validate.validateName(firstName.value) || firstName.validity.valueMissing) {
    firstName.setCustomValidity(" ");
    return (firstNameErrorMsg.innerHTML = "Vérifier votre prénom");
  } 
  
  else if (validate.validateName(lastName.value) === false || lastName.validity.valueMissing) {
    firstNameErrorMsg.innerHTML = "";
    lastName.setCustomValidity(" ");
    return (lastNameErrorMsg.innerHTML = "Vérifier votre nom");
  } 
  
  else if (validate.validateAddress(address.value) === false || address.validity.valueMissing) {
    lastNameErrorMsg.innerHTML = "";
    address.setCustomValidity(" ")
    return (addressErrorMsg.innerHTML = "Vérifier votre adresse");
  } 
  
  else if (validate.validateName(city.value) === false || city.validity.valueMissing) {
    addressErrorMsg.innerHTML = "";
    city.setCustomValidity(" ")
    return (cityErrorMsg.innerHTML = "Vérifier votre ville");
  } 
  
  else if (validate.validateEmail(email.value) === false || email.validity.valueMissing) {
    cityErrorMsg.innerHTML = "";
    email.setCustomValidity(" ")
    return (emailErrorMsg.innerHTML = "Vérifier votre email");
  } 
  
  else {
    fetchOrder();
    alert("La commande a réussi");
    localStorage.clear();
  }
});
