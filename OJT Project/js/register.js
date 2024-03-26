function register(event){
    event.preventDefault();
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if(document.getElementById("name").value&&document.getElementById("password").value){
        let userName = document.getElementById("name").value;
        let userEmail = document.getElementById("email").value;
        let userPassword = document.getElementById("password").value;
        let userConfirm = document.getElementById("confirm").value;
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        let userId = Date.now();
        let today = day + '/' + month+ '/'+ year;
        let emailExists = false;
        for (let i = 0; i < users.length; i++) {
            if (userEmail === users[i].email) {
                emailExists = true;
                alert("Email đã được đăng ký");
                break; 
            }
        }
        if (!emailExists) {
            if (userConfirm === userPassword) {
                let newUser = {
                    cart: [],
                    id: userId,
                    name: userName,
                    email: userEmail,
                    password: userPassword,
                    date: today,
                    status: true
                }
                users.push(newUser);
                localStorage.setItem("users", JSON.stringify(users));
                alert("Đăng ký thành công");
                window.location.href = "./loginShopping.html"
            } else {
                alert("Vui lòng xác nhận đúng mật khẩu");
            }
    }
    }else{
        alert("Hãy nhập đầy đủ thông tin");
    }
}

