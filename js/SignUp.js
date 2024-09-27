document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById("submitBtn");
  const btnText = document.getElementById("btnText");
  const loader = document.getElementById("loader");

  // Show loader, hide button text, and disable submit button
  btnText.classList.add("d-none");
  loader.classList.remove("d-none");
  submitBtn.disabled = true;

  const formData = new FormData();
  formData.append("firstName", document.getElementById("firstName").value);
  formData.append("lastName", document.getElementById("lastName").value);
  formData.append("email", document.getElementById("email").value);
  formData.append("password", document.getElementById("password").value);
  formData.append("role", "user");

  const avatar = document.getElementById("avatar").files[0];
  if (avatar) {
    formData.append("avatar", avatar);
  }

  try {
    const response = await fetch("https://first-backend-node.onrender.com/api/users/register", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("تم إنشاء الحساب بنجاح");
      window.location.href = `../index.html`;
    } else {
      let errorMessage = "حدث خطأ غير معروف";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (error) {
        console.error("خطأ في قراءة الاستجابة: ", error);
      }
      alert("حدث خطأ: " + errorMessage);
    }
  } catch (error) {
    console.error("حدث خطأ في الاتصال بالخادم: ", error);
    alert("حدث خطأ في الاتصال بالخادم");
  } finally {
    // Reset button and loader state
    submitBtn.disabled = false;
    btnText.classList.remove("d-none");
    loader.classList.add("d-none");
  }
});
