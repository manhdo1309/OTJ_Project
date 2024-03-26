function login(event) {
    event.preventDefault();
    if (document.getElementById("name").value && document.getElementById("password").value) {
        let userName = document.getElementById("name").value;
        let userPassword = document.getElementById("password").value;
        let users = JSON.parse(localStorage.getItem("users")) || [];
        
        for (let i = 0; i < users.length; i++) {
            if ((userName === users[i].name || userName === users[i].email) && userPassword === users[i].password) {
                alert("Đăng nhập thành công");
                window.location.href = "/index.html";
                localStorage.setItem("login", JSON.stringify(userName));
                return;
            }
        }
        alert("Vui lòng nhập đúng thông tin");
    } else {
        alert("Vui lòng nhập đủ thông tin");
    }
}