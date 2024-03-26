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

let myCart = JSON.parse(localStorage.getItem("myCart"));
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
                    ${myCart[i].quantity}
                </td>
                <td class="itemTotal">
                    ${(parseFloat(myCart[i].price.replace(/\./g, '').replace(',', '.'))*myCart[i].quantity).toLocaleString('vi-VN')}đ
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
    <td colspan="5" style="font-size: 14px;">Tổng số tiền (${myCart.length} sản phẩm): <t style="color: #ee5341; font-size: 20px">${totalPayment.toLocaleString('vi-VN')}đ</t>  <button style="font-size: 130%" onclick="orderProduct()">Đặt hàng</button></td>
    
    `
}
renderProductList();
renderProductPay();

let recipientName = document.getElementById("recipient-name");
for(let i = 0; i < users.length; i++){
    if(login === users[i].name || login === users[i].email){
        recipientName.innerText = `Tên người nhận: ${users[i].name}`;
    }
}

function orderProduct(){
    let myOrder = JSON.parse(localStorage.getItem("myOrder")) || [];
    for(let i = 0; i < myCart.length; i++){
        let orderId = "OS" + Date.now();
        let orderRecipient;
        if(login === users[i].name || login === users[i].email){
            orderRecipient = users[i].name;
        }
        let orderAddress = document.getElementById("deliveryAddress").value;
        let recipientTel = document.getElementById("phone").value;
        
    }
}

