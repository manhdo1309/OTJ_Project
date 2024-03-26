function signup(event){
    event.preventDefault();
    let admins = JSON.parse(localStorage.getItem("admins")) || [];
    if(document.getElementById("first-name").value&&document.getElementById("last-name").value&&document.getElementById("email").value&&document.getElementById("password").value){
        let userFirstName = document.getElementById("first-name").value;
        let userLastName = document.getElementById("last-name").value;
        let userEmail = document.getElementById("email").value;
        let userPassword = document.getElementById("password").value;
        let emailExists = false;
        for (let i = 0; i < admins.length; i++) {
            if (userEmail === admins[i].email) {
                emailExists = true;
                alert("Email đã được đăng ký");
                break; 
            }
        }
        if (!emailExists) {
            let newAdmin = {
                name: userLastName + " " + userFirstName,
                email: userEmail,
                password: userPassword
            }
            admins.push(newAdmin);
            localStorage.setItem("admins", JSON.stringify(admins));
            alert("Đăng ký thành công");
            window.location.href = "../pages/adminLogin.html";
        }
    }else{
        alert("Hãy nhập đầy đủ thông tin");
    }
}

