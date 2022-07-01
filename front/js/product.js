// Récupère l'ID du produit contenu dans l'URL
let productID = new URLSearchParams(window.location.search);
let urlID = productID.get("id");


fetch("http://localhost:3000/api/products/" + urlID)  // Récupère les Data du produits ayant l'ID de l'URL
.then(function(res) {
    if(res.ok) {
        return res.json();
    }
})

.then(function(productData) {
    loadProductData(productData);
})

.catch((err) => console.log("Oh no", err));

function loadProductData(productData) {
    console.log(productData);
    
    const productImg = document.createElement("img");
    productImg.src = productData.imageUrl;
    productImg.alt = productData.altTxt;
    console.log(productImg);

    const productTitle = productData.name;
    console.log(productTitle);

    const productPrice = productData.price;
    console.log(productPrice);

    const productDescription = productData.description;
    console.log(productDescription);

    document.querySelector(".item__img").appendChild(productImg);
    document.getElementById("title").innerText = productTitle;
    document.getElementById("price").innerText = productPrice;
    document.getElementById("description").innerText = productDescription;

    productData.colors.map(function(color) {
        const addColor = document.createElement("option");
        addColor.value = color;
        addColor.innerHTML = color;
        document.getElementById("colors").appendChild(addColor)
    }) 
}