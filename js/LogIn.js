document.getElementById("signupForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    const btnText = document.getElementById("btnText");
    const loader = document.getElementById("loader");

    // إظهار الـ loader وإخفاء النص
    btnText.classList.add("d-none");
    loader.classList.remove("d-none");
    submitBtn.disabled = true;

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(
            "https://first-backend-node.onrender.com/api/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }
        );

        if (response.ok) {
            const data = await response.json();

            // Save the token in localStorage
            localStorage.setItem("token", data.data.token);
            alert("تم تسجيل الدخول بنجاح");
            if(data.data.role=='user'){
                window.location.href = '../index.html';
            }else{
                window.location.href = '../pages/dashboard.html';
            }
        } else {
            const errorData = await response.json();
            alert("حدث خطأ: " + errorData.message);
        }
    } catch (error) {
        console.log(error);
        alert("حدث خطأ في الاتصال بالخادم");
    } finally {
        // إعادة حالة الزر للوضع الطبيعي
        submitBtn.disabled = false;
        btnText.classList.remove("d-none");
        loader.classList.add("d-none");
    }
});
