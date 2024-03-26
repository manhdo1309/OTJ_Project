let login = JSON.parse(localStorage.getItem("loginAdmin")) || [];
let users = JSON.parse(localStorage.getItem("admins")) || [];

if(login != ""){
    document.getElementById("logout").style.display = "none";
    for(let i = 0; i < users.length; i++){
        if(login === users[i].email){
            document.getElementById("render-after-login").innerHTML =
            `
                <li id="render-after-login">
                    <a href="/index.html">
                        <i class="fa-solid fa-house"></i>
                        <div>Trang chủ</div>
                    </a>
                    <a href="../pages/admin.html" onclick="logout(event)">
                        <i class="fa-solid fa-right-from-bracket"></i>
                        <div>Đăng xuất</div>
                    </a>
                </li>
            `
            document.getElementsByClassName("header-welcome")[0].innerHTML = 
            `
                <div class="header-welcome">
                    Xin chào ${users[i].name}
                </div>
            `;
            break;
        }
    }
}else{
    document.getElementById("logout").style.display = "block";
    document.getElementById("render-after-login").innerHTML = "";
}

function logout(event){
    localStorage.removeItem("loginAdmin");
    document.getElementById("logout").style.display = "block";
    document.getElementById("render-after-login").innerHTML = "";
}

let productTable = document.getElementsByClassName("admin-content-products")[0];
let userTable = document.getElementsByClassName("admin-content-users")[0];
let orderTable = document.getElementsByClassName("admin-content-orders")[0];

function openUserList(event){
    event.preventDefault();
    if(login != ""){
        userTable.style.display = "block";
        productTable.style.display = "none";
        orderTable.style.display = "none";
    }else{
        window.location.href = "../pages/adminLogin.html";
    }
}
function openProductList(event){
    event.preventDefault();
    if(login != ""){
        productTable.style.display = "block";
        userTable.style.display = "none";
        orderTable.style.display = "none";
    }else{
        window.location.href = "../pages/adminLogin.html";
    }
}

function openOrderList(event){
    event.preventDefault();
    if(login != ""){
        orderTable.style.display = "block";
        userTable.style.display = "none";
        productTable.style.display = "none";
    }else{
        window.location.href = "../pages/adminLogin.html";
    }
}

let products = JSON.parse(localStorage.getItem("products")) || [];

localStorage.setItem("products", JSON.stringify(products));

let productInfo = document.getElementsByClassName("products-contents-table-body")[0];
function renderProduct(){
    let text = "";
    for(let i = 0; i < products.length; i++){
        text +=
        `
        <tbody class="products-contents-table-body">
            <td class="body-item">${products[i].id}</td>
            <td class="body-item"><img src="${products[i].image}" alt=""></td>
            <td class="body-item">${products[i].name}</td>
            <td class="body-item">${products[i].stock}</td>
            <td class="body-item">${products[i].date}</td>
            <td class="body-item"><button onclick="openEditProduct(${products[i].id})">Sửa</button></td>
            <td class="body-item"><button onclick="deleteProduct(${products[i].id})">Xóa</button></td>
        </tbody>
        `
    }
    productInfo.innerHTML = text;
}
renderProduct();

let d = new Date();
let year = d.getFullYear();
let month = d.getMonth() + 1;
let day = d.getDate();

let today = day + '/' + month+ '/'+ year;


let addForm = document.getElementsByClassName("products-add-form")[0];
let searchBar = document.getElementsByClassName("products-searchbar-container")[0];
function openAddProduct(event){
    event.preventDefault();
    if(addForm.style.display == "none"){
        addForm.style.display = "block";
        searchBar.style.display = "none";
    }else{
        addForm.style.display = "none";
        searchBar.style.display = "block";

    }
}

let action = "create";
function addProduct(event){
    event.preventDefault();
    if(document.getElementById("productName").value&&document.getElementById("productImage").value&&document.getElementById("productPrice").value&&document.getElementById("productQuantity").value){
        let newName = document.getElementById("productName").value;
        let newImage = document.getElementById("productImage").value;
        let newId = 1;
        if (products.length > 0) {
            newId = Math.max(...products.map(product => product.id)) + 1;
        }
        let newPrice = document.getElementById("productPrice").value;
        let newQuantity = document.getElementById("productQuantity").value;
        let newCreate = today;
        let newProduct = {
            id: newId,
            name: newName,
            image: newImage,
            price: newPrice,
            stock: newQuantity,
            date: newCreate,
        }
        if(action == "create"){
            products.push(newProduct);
            localStorage.setItem("products", JSON.stringify(products));
            alert("Thêm sản phẩm thành công");
            renderProduct();
            refresh();
        }else{
            for(let i = 0; i < products.length; i++){
                if(action == products[i].id){
                    products.splice(i, 1, {...newProduct, id:action});
                    localStorage.setItem("products", JSON.stringify(products));
                    document.getElementById("addProductBtn").innerText = "Sửa sản phẩm";
                    action = "create";
                    alert("Cập nhật sản phẩm thành công");
                    renderProduct();
                    addForm.style.display = "none";
                    return;
                }
            }
        }
    }else{
        alert("Vui lòng nhập đầy đủ thông tin");
    }
}

function refresh(){
    document.getElementById("productName").value = "";
    document.getElementById("productImage").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productQuantity").value = "";
}


function openEditProduct(productId){
    action = productId;
    if(addForm.style.display == "none"){
        addForm.style.display = "block";
        searchBar.style.display = "none";

    }else{
        addForm.style.display = "none";
        searchBar.style.display = "block";

    }
    for(let i = 0; i < products.length; i++){
        if(productId === products[i].id){
            document.getElementById("productName").value = products[i].name;
            document.getElementById("productImage").value = products[i].image;
            document.getElementById("productPrice").value = products[i].price;
            document.getElementById("productQuantity").value = products[i].stock;
            document.getElementById("addProductBtn").innerText = "Edit";
            break;
        }
    }
}

function deleteProduct(productId){
    let confirmDelete = confirm("Bạn có muốn xóa dữ liệu sản phẩm?");
    if(!confirmDelete){
        return
    }else{
        for(let i = 0; i < products.length; i++){
            if(productId === products[i].id){
                products.splice(i, 1);
                renderProduct();
                localStorage.setItem("products", JSON.stringify(products));
                break;
            }
        }
    }
}

function findProduct(){
    let findProduct = document.getElementById("search").value;
    let data = [];
    if(findProduct == null){
        renderProduct();
    }else{
        for(let i = 0; i < products.length; i++){
            if(products[i].name.includes(findProduct)){
                data.push(products[i]);
            }
        }
        outputProduct(data);
    }
}

function outputProduct(arr){
    let text = "";
    for(let i = 0; i < arr.length; i++){
        text +=
        `   
        <tbody class="products-contents-table-body">
            <td class="body-item">${arr[i].id}</td>
            <td class="body-item"><img src="${arr[i].image}" alt=""></td>
            <td class="body-item">${arr[i].name}</td>
            <td class="body-item">${arr[i].stock}</td>
            <td class="body-item">${arr[i].date}</td>
            <td class="body-item"><button onclick="openEditProduct(${arr[i].id})">Sửa</button></td>
            <td class="body-item"><button onclick="deleteProduct(${arr[i].id})">Xóa</button></td>
        </tbody>
        `
    }
    productInfo.innerHTML = text;
}




let shoppingUsers = JSON.parse(localStorage.getItem("users")) || [];

localStorage.setItem("users", JSON.stringify(shoppingUsers));

let userInfo = document.getElementsByClassName("users-contents-table-body")[0];
function renderUser(){
    let text = "";
    for(let i = 0; i < shoppingUsers.length; i++){
        let addId = shoppingUsers[i].id;
        text +=
        `
        <tbody class="users-contents-table-body">
            <td class="user-body-item">${addId}</td>
            <td class="user-body-item">${shoppingUsers[i].name}</td>
            <td class="user-body-item">${shoppingUsers[i].email}</td>
            <td class="user-body-item">${shoppingUsers[i].password}</td>
            <td class="user-body-item">${shoppingUsers[i].date}</td>
            <td class="user-body-item"><button onclick="openEditUser(${shoppingUsers[i].id})">Sửa</button></td>
            <td class="user-body-item"><button onclick="deleteUser(${shoppingUsers[i].id})">Xóa</button></td>
            <td class="user-body-item">
                <button id="unlockAccount-${shoppingUsers[i].id}" onclick="unlockAccount(${shoppingUsers[i].id})">Mở khóa</button>
                <button id="lockAccount-${shoppingUsers[i].id}" onclick="lockAccount(${shoppingUsers[i].id})">Khóa</button>
            </td>
        </tbody>
        `
    }
    userInfo.innerHTML = text;
}
renderUser();


let editForm = document.getElementsByClassName("users-edit-form")[0];
let userSearchBar = document.getElementsByClassName("users-searchbar-container")[0];
let editUserBtn = document.getElementById("editUserBtn");
function openEditUser(userId){
    if(editForm.style.display == "none"){
        editForm.style.display = "block";
        userSearchBar.style.display = "none";

    }else{
        editForm.style.display = "none";
        userSearchBar.style.display = "block";

    }
    for(let i = 0; i < shoppingUsers.length; i++){
        if(userId === shoppingUsers[i].id){
            document.getElementById("userName").value = shoppingUsers[i].name;
            document.getElementById("userEmail").value = shoppingUsers[i].email;
            document.getElementById("userPassword").value = shoppingUsers[i].password;
            editUserBtn.innerHTML = 
            `
                <button id="editUserBtn" onclick="editUser(${shoppingUsers[i].id}, event)">Edit thông tin</button>
            `
            break;
        }
    }
}

function editUser(userId, event){
    event.preventDefault();
    if(document.getElementById("userName").value&&document.getElementById("userEmail").value&&document.getElementById("userPassword").value){
        for(let i = 0; i < shoppingUsers.length; i++){
            if(userId === shoppingUsers[i].id){
                shoppingUsers[i].name = document.getElementById("userName").value;
                shoppingUsers[i].email = document.getElementById("userEmail").value;
                shoppingUsers[i].password = document.getElementById("userPassword").value;
                localStorage.setItem("users", JSON.stringify(shoppingUsers));
                renderUser();
                editForm.style.display = "none";
            }
        }
    }else{
        alert("Vui lòng nhập đầy đủ thông tin");
    }
}

function deleteUser(userId){
    let confirmDelete = confirm("Bạn có muốn xóa dữ liệu người dùng?");
    if(!confirmDelete){
        return
    }else{
        for(let i = 0; i < shoppingUsers.length; i++){
            if(userId === shoppingUsers[i].id){
                shoppingUsers.splice(i, 1);
                renderUser();
                localStorage.setItem("users", JSON.stringify(shoppingUsers));
                break;
            }
        }
    }
}

function findUser(){
    let findUser = document.getElementById("searchUser").value;
    let data = [];
    if(findUser == null){
        renderUser();
    }else{
        for(let i = 0; i < shoppingUsers.length; i++){
            if(shoppingUsers[i].name.includes(findUser)){
                data.push(shoppingUsers[i]);
            }
        }
        outputUser(data);
    }
}

function outputUser(arr){
    let text = "";
    for(let i = 0; i < arr.length; i++){
        let addId = arr[i].id;
        text +=
        `   
        <tbody class="users-contents-table-body">
            <td class="user-body-item">${addId}</td>
            <td class="user-body-item">${arr[i].name}</td>
            <td class="user-body-item">${arr[i].email}</td>
            <td class="user-body-item">${arr[i].password}</td>
            <td class="user-body-item">${arr[i].date}</td>
            <td class="user-body-item"><button onclick="openEditUser(${arr[i].id})">Sửa</button></td>
            <td class="user-body-item"><button onclick="deleteUser(${arr[i].id})">Xóa</button></td>
            <td class="user-body-item">
                <button id="unlockAccount-${arr[i].id}" onclick="unlockAccount(${arr[i].id})">Mở khóa</button>
                <button id="lockAccount-${arr[i].id}" onclick="lockAccount(${arr[i].id})">Khóa</button>
            </td>
        </tbody>
        `
    }
    userInfo.innerHTML = text;
}

function updateButtonStatus() {
    for (let i = 0; i < shoppingUsers.length; i++) {
        if (shoppingUsers[i].status === true) {
            document.getElementById(`unlockAccount-${shoppingUsers[i].id}`).disabled = true;
            document.getElementById(`lockAccount-${shoppingUsers[i].id}`).disabled = false;
        } else {
            document.getElementById(`unlockAccount-${shoppingUsers[i].id}`).disabled = false;
            document.getElementById(`lockAccount-${shoppingUsers[i].id}`).disabled = true;
        }
    }
}

updateButtonStatus()

function unlockAccount(userId) {
    for (let i = 0; i < shoppingUsers.length; i++) {
        if (shoppingUsers[i].id === userId) {
            shoppingUsers[i].status = true;
            break;
        }
    }
    localStorage.setItem("users", JSON.stringify(shoppingUsers));
    updateButtonStatus();
}

function lockAccount(userId) {
    for (let i = 0; i < shoppingUsers.length; i++) {
        if (shoppingUsers[i].id === userId) {
            shoppingUsers[i].status = false;
            break;
        }
    }
    localStorage.setItem("users", JSON.stringify(shoppingUsers));
    updateButtonStatus();
}

