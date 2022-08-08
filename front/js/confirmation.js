// Get ID of order in URL //
const urlId = new URLSearchParams(window.location.search);
const orderId = urlId.get("id");

// Display order ID on page //
document.getElementById("orderId").innerHTML = `<br>${orderId}`