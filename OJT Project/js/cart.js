let login = JSON.parse(localStorage.getItem("login")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];

let userName = document.getElementById("username-render");
for(let i = 0; i < users.length; i++){
    if(login === users[i].name || login === users[i].email){
        userName.innerText = users[i].name;
    }
}

function logout(event){
    localStorage.removeItem("login");
    document.querySelectorAll(".unlog").forEach(element => {
        element.style.display = "block";
    });
    document.getElementById("render-user").innerHTML = "";
}

let noRender = document.getElementsByClassName("no-product-render-container")[0];
let renderProduct = document.getElementById("product-table");

let myCart;
for(let i = 0; i < users.length; i++){
    let currentUser = users[i];
    if(login === currentUser.name || login === currentUser.email){
        myCart = currentUser.cart;
    }
    
}
if(myCart.length === 0){
    noRender.style.display = "block";
    renderProduct.style.display = "none";
}else{
    let productInfo = document.getElementById("product-infos");
    function renderProductList(){
        let text = "";
        for(let i = 0; i < myCart.length; i++){
            text +=
            `
                <tr class="item-detail">
                    <td class="itemPicAndName">
                        <img src="${myCart[i].image}" alt="">
                        <div>${myCart[i].name}</div>
                    </td>
                    <td class="itemPrice" id="itemPrice">
                        ${myCart[i].price}đ
                    </td>
                    <td class="itemQuantity">
                        <button id="decrease-btn" onclick="decreaseBtn(${myCart[i].id})">-</button>
                        <input type="number" name="itemQuantity" id="itemQuantity${[i]}" value="${myCart[i].quantity}">
                        <button id="increase-btn" onclick="increaseBtn(${myCart[i].id})">+</button>
                        </td>
                    <td class="itemTotal">
                        ${(parseFloat(myCart[i].price.replace(/\./g, '').replace(',', '.'))*myCart[i].quantity).toLocaleString('vi-VN')}đ
                    </td>
                    <td class="delete-btn">
                        <button onclick="deleteBtn(${myCart[i].id})">Xóa</button>
                    </td>
                </tr>
                
            `;
        }
        productInfo.innerHTML = text;
        
    }
    function renderProductPay(){
        let productPay = document.getElementById("product-pay");
        let totalPayment = 0;
        for(let i = 0; i < myCart.length; i++){
            totalPayment += parseFloat(myCart[i].price.replace(/\./g, '').replace(',', '.'))*myCart[i].quantity;
        }
        productPay.innerHTML =
        `
        <td colspan="5">Tổng thanh toán (${myCart.length} sản phẩm): <t style="color: #ee5341; font-size: 130%">${totalPayment.toLocaleString('vi-VN')}đ</t>  <button onclick="toPaymentPage()">Mua hàng</button></td>
        
        `
    }
    renderProductList();
    renderProductPay();
    renderProduct.style.display = "block";
    noRender.style.display = "none";
}

function decreaseBtn(itemId){
    for(let i = 0; i < users.length; i++){
        let currentUser = users[i];
        if(login === currentUser.name || login === currentUser.email){
            myCart = currentUser.cart;
            for(let i = 0; i < myCart.length; i++){
                if(itemId == myCart[i].id){
                    if(myCart[i].quantity == 1){
                        let confirmDelete = confirm("Bạn có muốn bỏ sản phẩm?");
                        if(!confirmDelete){
                            return;
                        }else{
                            for(let j = 0; j < myCart.length; j++){
                                if(itemId == myCart[j].id){
                                    myCart.splice(j, 1);
                                    currentUser.cart = myCart;
                                    localStorage.setItem("users", JSON.stringify(users));
                                    renderProductList();
                                    renderProductPay();
                                    window.location.href = "/pages/myCart.html";
                                    break;
                                }
                            }
                        }
                    }else{
                        for(let j = 0; j < myCart.length; j++){
                            if(itemId == myCart[j].id){
                                myCart[j].quantity--;
                                currentUser.cart = myCart;
                                localStorage.setItem("users", JSON.stringify(users));
                                renderProductList();
                                renderProductPay();
                            }
                        }
                    }
                }
            }
        }
    }
}

function increaseBtn(itemId){
    for(let i = 0; i < users.length; i++){
        let currentUser = users[i];
        if(login === currentUser.name || login === currentUser.email){
            myCart = currentUser.cart;
            for(let j = 0; j < myCart.length; j++){
                if(itemId == myCart[j].id){
                    myCart[j].quantity++;
                    users[i].cart = myCart;
                    localStorage.setItem("users", JSON.stringify(users))
                    renderProductList();
                    renderProductPay();
                }
            }
        }
    }
}

function deleteBtn(itemId){
    let confirmDelete = confirm("Bạn có muốn xóa sản phẩm?");
    if(!confirmDelete){
        return;
    }else{
        for(let i = 0; i < myCart.length; i++){
            if(itemId == myCart[i].id){
                myCart.splice(i, 1);
                users[i].cart = myCart;
                localStorage.setItem("users", JSON.stringify(users));
                renderProductList();
                renderProductPay();
                window.location.href = "../pages/loginShopping.html";
                break;
            }
        }
    }
}


function toPaymentPage(){
    window.location.href = "../pages/payment.html";
    localStorage.setItem("myCart", JSON.stringify(myCart));
}

