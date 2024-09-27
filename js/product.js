
let favBtn = document.querySelector("#favBtn");
let loveIcon = document.querySelector("#loveIcon");

let quantity = document.querySelector(".quantity");
let check = document.querySelector(".add");
check.addEventListener("click", () => {
  location.href = "../pages/check_out.html";
});

let arr_card = [];
let cartOnStorage = JSON.parse(localStorage.getItem("Card"));
if (cartOnStorage) {
  arr_card = cartOnStorage;
}

let arr_favcard = [];
let favcartOnStorage = JSON.parse(localStorage.getItem("FavCard"));
if (favcartOnStorage) {
  arr_favcard = favcartOnStorage;
}

let quantity_item = JSON.parse(localStorage.getItem("quantity"))
if (quantity_item) {
  quantity.innerHTML = quantity_item;
}

let product;
// قراءة الـ id من الـ URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

async function fetchProductwithId() {
  console.log("Start get single product...");
  // اخفاء المنتج
  const productCont = document.getElementById("productCont");
  productCont.classList.add("hide-loader");

  const loader = document.getElementById("loaderCont");
  // إظهار الـ loader وإخفاء النص
  loader.classList.remove("hide-loader");
  loader.classList.add("show-loader");

  try {
    const response = await fetch(
      `https://first-backend-node.onrender.com/api/products/${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      product = data.data.product;
      document.title = product.name;
      showProduct(product);
      productCont.classList.remove("hide-loader");
      isLove(product._id)
    } else {
      const errorData = await response.json();
      alert("حدث خطأ: " + errorData.message);
    }
  } catch (error) {
    console.log(error);
    alert("حدث خطأ في الاتصال بالخادم");
  } finally {
    loader.classList.add("hide-loader");
    loader.classList.remove("show-loader");
    fetchProduct();
  }
}
fetchProductwithId();

function showProduct(product) {
  // Show product images in carousel

  // Get carousel element
  const carouselInner = document.getElementById("carouselInner");

  product.images.forEach((image, index) => {
    // Create a div for each item
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item", "z-product-img-container");
    // Add 'active' class to the first item
    if (index === 0) {
      carouselItem.classList.add("active");
    }

    // Create an img element
    const imgElement = document.createElement("img");
    imgElement.src = `${image}`;
    imgElement.classList.add("d-block", "w-100", "z-product-img");
    imgElement.alt = "product-image";

    carouselItem.appendChild(imgElement);
    carouselInner.appendChild(carouselItem);
  });

  ///////////////////////

  // Fill product details
  document.getElementById("productName").textContent = product.name;
  document.getElementById("productSKU").textContent = product.info.SKU;

  const availabilityElement = document.getElementById("productAvailability");
  availabilityElement.textContent = product.info.Availability;

  // Add 'available' or 'not-available'
  if (product.info.Availability === "In Stock") {
    availabilityElement.classList.add("available");
    availabilityElement.classList.remove("not-available");
  } else {
    availabilityElement.classList.add("not-available");
    availabilityElement.classList.remove("available");
  }

  document.getElementById("productBrand").textContent = product.info.Brand;
  document.getElementById("productCategory").textContent =
    product.info.Category;
  document.getElementById(
    "productPrice"
  ).textContent = `$${product.price.price}`;
  document.getElementById(
    "oldPrice"
  ).textContent = `$${product.price.oldPrice}`;
  document.getElementById("off").textContent = `${product.price.off}%`;

  // Fill description
  document.getElementById("productDescription").textContent =
    product.description;
}

// More product //////////////

let products = [];
async function fetchProduct() {
  console.log("Start get all products...");
  const loader2 = document.getElementById("loaderCont2");
  // إظهار الـ loader وإخفاء النص
  loader2.classList.remove("hide-loader");
  loader2.classList.add("show-loader");
  try {
    const response = await fetch(
      "https://first-backend-node.onrender.com/api/products?limit=12&page=1",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      products = data.data.products;
      ShowMoreProduct(products);
    } else {
      const errorData = await response.json();
      alert("حدث خطأ: " + errorData.message);
    }
  } catch (error) {
    console.log(error);
    alert("حدث خطأ في الاتصال بالخادم");
  } finally {
    loader2.classList.add("hide-loader");
    loader2.classList.remove("show-loader");
  }
}

function ShowMoreProduct(products) {
  const moreProductsContainer = document.getElementById("more-products");
  products.forEach((product) => {
    const productHTML = `
      <div class="col-6 col-sm-6 col-md-4 mb-2">
        <div class="z-more-product-cont" onclick="redirectToProduct('${product._id}')">
          <img src="${product.images[0]}" alt="more-product">
          <div>
            <p class="m-0">${product.name}</p>
            <p class="m-0 z-price">$${product.price.price}</p>
          </div>
        </div>
      </div>
    `;

    // إضافة المنتج إلى الحاوية
    moreProductsContainer.innerHTML += productHTML;
  });
}

// دالة التوجيه
function redirectToProduct(productId) {
  window.location.href = `product.html?id=${productId}`;
}
  let btn = document.querySelector("#add_btn");
  btn.addEventListener("click", () => {
    addToCard(product._id);
  });


  favBtn.addEventListener("click", () => {
    favBtn.classList.add("z-love-cont-done");
    loveIcon.classList.add("z-love-icon-done");
    addToFavCard(product._id);
  });

function addToCard(id) {
  // let product = products.find((ele) => ele._id === id);
  let card_item = arr_card.find((item) => item._id === id);
console.log(card_item)
  if (card_item) {
    alert("Product already on your cart");
  } else {
    arr_card.push({ ...product, quantity: 1 });
    quantity.innerHTML = arr_card.length;
    localStorage.setItem("Card", JSON.stringify(arr_card));
  }
}

function addToFavCard(id) {
  let card_item = arr_favcard.find((item) => item._id === id);
  if (card_item) {
    alert("Product already on your favourite cart");
  } else {
    arr_favcard.push({ ...product, quantity: 1 });
    localStorage.setItem("FavCard", JSON.stringify(arr_favcard));
  }
}
function isLove(id){
  const pIsLove=arr_favcard.find((ele)=>ele._id==id)
  if(pIsLove){
    favBtn.classList.add("z-love-cont-done");
    loveIcon.classList.add("z-love-icon-done");
  }
}