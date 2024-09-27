let list = document.querySelector(".list");
let body = document.querySelector("body");
let quantity = document.querySelector(".quantity");

let products = [];
async function fetchProduct() {
  console.log("Start get all products...")
  const loader = document.getElementById("loaderCont");
  // إظهار الـ loader وإخفاء النص
  loader.classList.remove("hide-loader");
  loader.classList.add("show-loader");
  try {
    const response = await fetch(
      "https://first-backend-node.onrender.com/api/products?limit=25&page=1",
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
      console.log(products);
      initApp();
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
  }
}

fetchProduct();

// const products = [
//   {
//     id: 1,
//     images: ["1.jpg", "try2.png", "try3.jpg"],
//     name: "2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Space Gray",
//     info: {
//       SKU: "A264671",
//       Availability: "In Stock",
//       Brand: "Apple",
//       Category: "Electronics",
//     },
//     price: { price: 1699, oldPrice: 2012, off: 25 },
//     description:
//       "The most powerful MacBook Pro ever is here. With the blazing-fast M1 Pro or M1 Max chip — the first Apple silicon designed for pros — you get groundbreaking performance and amazing battery life. Add to that a stunning Liquid Retina XDR display, the best camera and audio ever in a Mac notebook, and all the ports you need. The first notebook of its kind, this MacBook Pro is a beast. M1 Pro takes the exceptional performance of the M1 architecture to a whole new level for pro users. Even the most ambitious projects are easily handled with up to 10 CPU cores, up to 16 GPU cores, a 16‑core Neural Engine, and dedicated encode and decode media engines that support H.264, HEVC, and ProRes codecs.",
//   },
//   {
//     id: 2,
//     images: ["2.jpg", "try5.png", "try6.jpg"],
//     name: "2021 Apple MacBook Pro with M1 Chip (13-inch, 16GB RAM, 512GB SSD Storage) - Silver",
//     info: {
//       SKU: "A264672",
//       Availability: "Out of Stock",
//       Brand: "Apple",
//       Category: "Electronics",
//     },
//     price: { price: 1999, oldPrice: 2300, off: 13 },
//     description:
//       "The 2021 MacBook Pro is a powerhouse for creative professionals, offering the M1 chip and a dazzling Retina display. It supports high-performance workloads with up to 16GB RAM and 512GB SSD storage.",
//   },
//   {
//     id: 3,
//     images: ["3.jpg", "try8.png", "try9.jpg"],
//     name: "2020 Apple MacBook Air with M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Gold",
//     info: {
//       SKU: "A264673",
//       Availability: "In Stock",
//       Brand: "Apple",
//       Category: "Electronics",
//     },
//     price: { price: 999, oldPrice: 1200, off: 17 },
//     description:
//       "The MacBook Air is the lightest and most portable Apple notebook ever, featuring the M1 chip and long-lasting battery life. Ideal for on-the-go productivity.",
//   },
//   {
//     id: 4,
//     images: ["4.jpg", "try11.png", "try12.jpg"],
//     name: "2020 Apple MacBook Pro with Intel i9 Chip (16-inch, 16GB RAM, 1TB SSD Storage) - Space Gray",
//     info: {
//       SKU: "A264674",
//       Availability: "In Stock",
//       Brand: "Apple",
//       Category: "Electronics",
//     },
//     price: { price: 2999, oldPrice: 3500, off: 14 },
//     description:
//       "For the most demanding professional users, the 16-inch MacBook Pro with Intel i9 offers a top-of-the-line experience for heavy workloads, including video editing and 3D rendering.",
//   },
//   {
//     id: 5,
//     images: ["5.jpg", "try14.png", "try15.jpg"],
//     name: "2021 Apple MacBook Air with M1 Chip (13-inch, 16GB RAM, 512GB SSD Storage) - Space Gray",
//     info: {
//       SKU: "A264675",
//       Availability: "In Stock",
//       Brand: "Apple",
//       Category: "Electronics",
//     },
//     price: { price: 1499, oldPrice: 1800, off: 17 },
//     description:
//       "A lightweight and powerful MacBook Air with 16GB RAM, 512GB SSD, and the revolutionary M1 chip for seamless performance and portability.",
//   },
//   {
//     id: 6,
//     images: ["6.jpg", "try17.png", "try18.jpg"],
//     name: "2021 Apple MacBook Pro with M1 Max Chip (14-inch, 32GB RAM, 1TB SSD Storage) - Silver",
//     info: {
//       SKU: "A264676",
//       Availability: "In Stock",
//       Brand: "Apple",
//       Category: "Electronics",
//     },
//     price: { price: 3499, oldPrice: 3999, off: 12 },
//     description:
//       "The 14-inch MacBook Pro with M1 Max chip is perfect for high-performance tasks, with its 32GB RAM and 1TB SSD providing unbeatable speed and power for professional work.",
//   },
//   {
//     id: 7,
//     images: ["1.jpg", "try20.png", "try21.jpg"],
//     name: "2020 Apple MacBook Pro with Intel i7 Chip (15-inch, 16GB RAM, 512GB SSD Storage) - Space Gray",
//     info: {
//       SKU: "A264677",
//       Availability: "In Stock",
//       Brand: "Apple",
//       Category: "Electronics",
//     },
//     price: { price: 2499, oldPrice: 2900, off: 14 },
//     description:
//       "With Intel i7 processor, 16GB RAM, and 512GB SSD, this 15-inch MacBook Pro offers great balance between performance and portability.",
//   },
//   {
//     id: 8,
//     images: ["1.jpg", "try23.png", "try24.jpg"],
//     name: "2020 Apple MacBook Air with M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Silver",
//     info: {
//       SKU: "A264678",
//       Availability: "Out of Stock",
//       Brand: "Apple",
//       Category: "Electronics",
//     },
//     price: { price: 999, oldPrice: 1150, off: 13 },
//     description:
//       "Apple's most affordable MacBook Air with the M1 chip offers excellent performance and long battery life in a sleek, lightweight design.",
//   },
// ];

let arr_card = [];
let cartOnStorage = JSON.parse(localStorage.getItem("Cart"));
if (cartOnStorage) {
  arr_card = cartOnStorage;
}

// Function to initialize the app and load products
function initApp() {
  console.log("Initapp");
  // Populate the product list initially
  renderProducts(products);
  quantity.innerHTML = arr_card.length;
}

// Function to render products based on a given list
function renderProducts(productList) {
  list.innerHTML = ""; // Clear the existing product list

  productList.forEach((value) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
      <img src="${value.images[0]}">
      <div class="title">${value.name}</div>
      <div class="price">$${value.price.price.toLocaleString()}</div>
      <button onclick="addToCard('${value._id}')">Add To Card</button>
      <i  onclick="show_details('${value._id}')" class="fa-solid fa-eye"></i>`;

    list.appendChild(newDiv);
  });
}

// Function to handle sorting
function sortProducts() {
  const sortOption = document.getElementById("sort-options").value;

  let sortedProducts = [...products]; // Create a copy of the products array to sort

  if (sortOption === "high-to-low") {
    sortedProducts.sort((a, b) => b.price.price - a.price.price);
  } else if (sortOption === "low-to-high") {
    sortedProducts.sort((a, b) => a.price.price - b.price.price);
  }

  renderProducts(sortedProducts); // Render the sorted products
}

// Event listener for sorting option change
document
  .getElementById("sort-options")
  .addEventListener("change", sortProducts);

function addToCard(id) {
  console.log(id)
  let product = products.find((ele) => ele._id === id);
  let card_item = arr_card.find((item) => item._id === id);

  if (card_item) {
    alert("Product already on your cart");
  } else {
    arr_card.push({ ...product, quantity: 1, total_price: 0 });
    quantity.innerHTML = arr_card.length;
    localStorage.setItem("Cart", JSON.stringify(arr_card));
  }
}

function show_details(id) {
  location.href = `./pages/product.html?id=${id}`;
}

// Add an event listener to each radio button
function filterByCategory(category) {
  let filterProducts = products.filter((ele) => {
    return ele.info.Category == category;
  });
  renderProducts(filterProducts);
}

const radioButtons = document.querySelectorAll('input[name="category"]');
radioButtons.forEach((radio) => {
  radio.addEventListener("change", () => {
    filterByCategory(radio.value);
  });
});
