let quantity = document.querySelector(".quantity");

let quantity_sum = JSON.parse(localStorage.getItem("quantity"));
if (quantity_sum) {
  quantity.innerHTML=quantity_sum;
  
}