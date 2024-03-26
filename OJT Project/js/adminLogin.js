function login(event) {
    event.preventDefault();
    if (document.getElementById("email").value && document.getElementById("password").value) {
        let userEmail = document.getElementById("email").value;
        let userPassword = document.getElementById("password").value;
        let admins = JSON.parse(localStorage.getItem("admins")) || [];
        
        for (let i = 0; i < admins.length; i++) {
            if (userEmail === admins[i].email && userPassword === admins[i].password) {
                alert("Đăng nhập thành công");
                window.location.href = "../pages/admin.html";
                localStorage.setItem("loginAdmin", JSON.stringify(userEmail));
                return;
            }
        }
        alert("Vui lòng nhập đúng thông tin");
    } else {
        alert("Vui lòng nhập đủ thông tin");
    }
}

