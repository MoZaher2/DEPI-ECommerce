// All product //////////////
const token = localStorage.getItem('token');
let products = [];
async function fetchProduct() {
  console.log("Start get all products...");
  const loader2 = document.getElementById("loaderCont2");
  // إظهار الـ loader وإخفاء النص
  loader2.classList.remove("hide-loader");
  loader2.classList.add("show-loader");
  try {
    const response = await fetch(
      "https://first-backend-node.onrender.com/api/products?limit=50&page=1",
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
      ShowProductInTable(products);
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
fetchProduct();

function ShowProductInTable(products) {
  const tbody = document.querySelector("#productsTable tbody");
  products.forEach((product) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.description}</td>
        <td>${product.info.Category}</td>
        <td>${product.info.Brand}</td>
        <td>${product.info.SKU}</td>
        <td>${product.price.price}</td>
        <td>${product.price.off}%</td>
        <td>${product.price.oldPrice}</td>
        <td><a href="./product.html?id=${product._id}"><i class="fa-solid fa-eye"></i></a></td>
        <td><button class="btn" onclick="deleteProduct('${product._id}')">حذف</button></td>
      `;

    tbody.appendChild(row);
  });
}

function deleteProduct(productId) {
  fetch(`https://first-backend-node.onrender.com/api/products/${productId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`, // Send the token as Bearer
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.ok) {
        alert("تم حذف المنتج بنجاح");
        fetchProduct()
      } else {
        alert("حدث خطأ أثناء حذف المنتج");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("فشل الاتصال بالخادم");
    });
}

function goToAddProduct(){
  window.location.href=`../pages/add_product.html`
}