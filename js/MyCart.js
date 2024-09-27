let list = document.querySelector(".list");
let quantity = document.querySelector(".quantity");

let arr_card = [];
let arr_cardStorage = JSON.parse(localStorage.getItem("Cart"));
if (arr_cardStorage) {
  arr_card = arr_cardStorage;
  disply_cards()
}

function disply_cards() {
  list.innerHTML = "";

  for (let key = 0; key < arr_card.length; key++) {
    let value = arr_card[key];

    let newDiv = document.createElement("div");
    newDiv.classList.add("item");

    newDiv.innerHTML = `
      <img src="${value.images[0]}" alt="${value.name}">
      <div class="title">${value.name}</div>
      <div class="price" id="price-${value._id}">${value.total_price!=0? value.total_price : value.price.price}</div>
      <div class='card-foot'>
        <div class="quantityContainer">
          <p class="plus-and-minus m-0" onclick="quantityMines('${value._id}')">-</p>
          <p class='quantityP m-0' id="quantity-${value._id}">${value.quantity}</p>
          <p class="plus-and-minus m-0" onclick="quantityPlus('${value._id}')">+</p>
        </div>
        <i onclick="show_details('${value._id}')" class="fa-solid fa-eye"></i>
        <button onclick="CheckOut()">BUY</button>
      </div>
    `;

    list.appendChild(newDiv);
  }

  quantity.innerHTML = arr_card.length;
  localStorage.setItem("quantity", JSON.stringify(quantity.innerHTML));
}

// function disply_cards() {
//   list.innerHTML = "";

//   for (let key = 0; key < arr_card.length; key++) {
//     let value = arr_card[key];

//     let newDiv = document.createElement("div");
//     newDiv.classList.add("item");

//     // console.log(value);
//     newDiv.innerHTML = `
//       <img src="${value.images[0]}">
//       <div class="title">${value.name}</div>
//       <div class="price" id='price-'${value._id}''>${value.total_price?value.total_price:value.price.price} </div>
//       <div class='card-foot'>
//           <div class="quantityContainer">
//             <p class="plus-and-minus m-0" onclick="quantityMines('${value._id}')">-</p>
//             <p class='quantityP m-0' id='quantity-'${value._id}''>${value.quantity}</p>
//             <p class="plus-and-minus m-0" onclick="quantityPlus('${value._id}'})">+</p>
//           </div>
//           <i onclick="show_details('${value._id}')" class="fa-solid fa-eye"></i>
//           <button onclick="CheckOut()">BUY</button>
 
//       </div>
//     `;

//     list.appendChild(newDiv);
//   }

//   quantity.innerHTML = arr_card.length;
//   localStorage.setItem("quantity", JSON.stringify( quantity.innerHTML));
  
// }

function total_price() {
  let total_price = 0;
  for (let i = 0; i < arr_card.length; i++) {
    let values = arr_card[i];
    total_price += values.price.price * values.quantity;
  }
  total.innerHTML = total_price.toLocaleString();
}

function delet_card(id) {
  let item = arr_card.find((item) => item.id === id);
  console.log(item);
  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      arr_card = arr_card.filter((item) => item.id !== id);
    }
  }
  disply_cards();
  total_price();
  save_card();
}

function local_card() {
  if (localStorage.getItem("cart")) {
    arr_card = JSON.parse(localStorage.getItem("cart"));
  } else {
    arr_card = [];
  }
}


// Plus quantity
function quantityPlus(id){
  let quantityValue=document.getElementById(`quantity-${id}`)
  let newQuantity= Number(quantityValue.innerHTML)+1
  quantityValue.innerHTML=newQuantity
  UpdateValues(newQuantity,id)
}
// Minus quantity
function quantityMines(id){
  let quantityValue = document.getElementById(`quantity-${id}`);
  let newQuantity = Number(quantityValue.innerHTML) - 1;
  if (newQuantity != 0) {
    quantityValue.innerHTML = newQuantity;
    UpdateValues(newQuantity, id);
  } else {
    arr_card = arr_card.filter((p) => p.id != id);
    localStorage.setItem("Cart", JSON.stringify(arr_card));
    disply_cards()
  }
}

  function UpdateValues(newQuantity,id){
    let priceValue=document.getElementById(`price-${id}`)
    let product=arr_card.find((p)=>p._id==id)
    product.quantity=newQuantity
    product.total_price = product.price.price * newQuantity;
    priceValue.innerHTML=product.total_price
    // console.log(product)
    let productIndex=arr_card.findIndex((p)=>p.id==id)
    arr_card[productIndex]=product
    localStorage.setItem("Cart", JSON.stringify(arr_card));
    disply_cards()
  }

function show_details(id) {
  location.href = `../pages/product.html?id=${id}`;
}
function CheckOut() {
  location.href = "../pages/check_out.html";
}


