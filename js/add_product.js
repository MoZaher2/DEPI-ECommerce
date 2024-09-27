
document.getElementById('productForm').addEventListener('submit', function(event) {
  event.preventDefault();


  const submitBtn = document.getElementById("submitBtn");
  const btnText = document.getElementById("btnText");
  const loader = document.getElementById("loader");

  // إظهار الـ loader وإخفاء النص
  btnText.classList.add("d-none");
  loader.classList.remove("d-none");
  submitBtn.disabled = true;
  

  // Get token from localStorage
  const token = localStorage.getItem('token');
  if (!token) {
    alert("Token not found. Please log in.");
    return;
  }

  const formData = new FormData(this);

  // Get values from the oldPrice and discount fields
  const oldPrice = parseFloat(document.getElementById("oldPrice").value);
  const discount = parseFloat(document.getElementById("discount").value);

  // Calculate the new price
  const price = oldPrice - oldPrice * (discount / 100);

  // Append the calculated price to the FormData
  formData.append("price.price", price);

  // Send POST request to the API
  fetch("https://first-backend-node.onrender.com/api/products", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status == "success") {
        alert(data.message);
        window.location.href='../pages/dashboard.html'
      } else {
        alert("Error adding product: " + (data.message || "Unknown error"));
      }
      stopSpinner()      
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while adding the product.");
      stopSpinner()
    });
});


function stopSpinner(){
    submitBtn.disabled = false;
    btnText.classList.remove("d-none");
    loader.classList.add("d-none");
}
